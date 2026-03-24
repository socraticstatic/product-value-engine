import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageSquare, 
  Send, 
  User, 
  Bot, 
  X, 
  Lightbulb,
  Target,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { CustomerPersona } from '@/data/personas';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface RolePlayChatProps {
  persona: CustomerPersona;
  onClose: () => void;
}

export function RolePlayChat({ persona, onClose }: RolePlayChatProps) {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/roleplay-chat`;

  useEffect(() => {
    // Start conversation with persona greeting
    startConversation();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startConversation = async () => {
    setIsLoading(true);
    let assistantContent = '';

    try {
      // Use a special "start" flag instead of a fake user message
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          messages: [], 
          persona,
          isStart: true // Signal to start the conversation
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to start conversation');
      }

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      // Add empty assistant message to update
      setMessages([{ role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages([{ role: 'assistant', content: assistantContent }]);
            }
          } catch {
            buffer = line + '\n' + buffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast({
        title: 'Connection Error',
        description: error instanceof Error ? error.message : 'Failed to connect to AI',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    

    let assistantContent = '';

    try {
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: newMessages, persona }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'assistant') {
                  return prev.map((m, i) => 
                    i === prev.length - 1 ? { ...m, content: assistantContent } : m
                  );
                }
                return [...prev, { role: 'assistant', content: assistantContent }];
              });
            }
          } catch {
            buffer = line + '\n' + buffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to get response',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const getFeedback = async () => {
    if (messages.length === 0) {
      toast({
        title: 'Start a conversation first',
        description: 'Have a short role-play conversation before requesting feedback.',
      });
      return;
    }

    setIsFeedbackLoading(true);
    setFeedback(null);

    try {
      const { data, error } = await supabase.functions.invoke('roleplay-feedback', {
        body: { messages, persona },
      });

      if (error) {
        console.error('Error getting feedback:', error);
        throw error;
      }

      const feedbackText = (data as any)?.feedback;
      if (typeof feedbackText !== 'string' || !feedbackText.trim()) {
        throw new Error('Unexpected feedback format from server');
      }

      setFeedback(feedbackText);
    } catch (error) {
      console.error('Error getting feedback:', error);
      toast({
        title: 'Feedback error',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to generate feedback for this conversation.',
        variant: 'destructive',
      });
    } finally {
      setIsFeedbackLoading(false);
    }
  };

  const resetConversation = () => {
    setMessages([]);
    startConversation();
  };

  return (
    <div className="space-y-4">
      <Card className="bg-card border-border h-[700px] flex flex-col">
        <CardHeader className="pb-3 border-b border-border shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{persona.avatar}</div>
              <div>
                <CardTitle className="text-lg text-foreground flex items-center gap-2">
                  Role-Play: {persona.name}
                  <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                    Segment {persona.segmentId}
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{persona.title} at {persona.company}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="ghost" size="icon" onClick={resetConversation} title="Reset conversation">
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <div className="flex flex-1 overflow-hidden">
          {/* Chat area */}
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 text-lg">
                        {persona.avatar}
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 text-lg">
                      {persona.avatar}
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-border shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex gap-2"
              >
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your sales pitch..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>End the role-play and get AI feedback on your pitch so far.</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={getFeedback}
                  disabled={isFeedbackLoading || messages.length === 0}
                >
                  <Bot className="w-3 h-3 mr-1" />
                  {isFeedbackLoading ? 'Analyzing...' : 'Get Feedback'}
                </Button>
              </div>
            </div>
          </div>

          {/* Tips sidebar */}
          <div className="w-64 border-l border-border p-4 bg-muted/30 shrink-0 overflow-y-auto">
            <h4 className="font-semibold text-foreground flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Sales Tips
            </h4>
            
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex items-center gap-1 text-emerald-400 font-medium mb-1">
                  <Target className="w-3 h-3" /> Top Needs
                </div>
                <ul className="space-y-1 text-muted-foreground">
                  {persona.topNeeds.slice(0, 3).map((need, idx) => (
                    <li key={idx}>• {need.need}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <div className="flex items-center gap-1 text-amber-400 font-medium mb-1">
                  <AlertTriangle className="w-3 h-3" /> Pain Points
                </div>
                <ul className="space-y-1 text-muted-foreground">
                  {persona.painPoints.slice(0, 3).map((point, idx) => (
                    <li key={idx}>• {point}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-1 text-blue-400 font-medium mb-1">
                  <MessageSquare className="w-3 h-3" /> Lead With
                </div>
                <div className="flex flex-wrap gap-1">
                  {persona.leadProducts.slice(0, 3).map((prod, idx) => (
                    <Badge key={idx} variant="outline" className="text-[10px]">
                      {prod}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* AI Feedback Section */}
      {(feedback || isFeedbackLoading) && (
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              Session Feedback
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              AI analysis of what you did well and areas to improve
            </p>
          </CardHeader>
          <CardContent>
            {isFeedbackLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-sm">Analyzing your conversation...</span>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {feedback}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

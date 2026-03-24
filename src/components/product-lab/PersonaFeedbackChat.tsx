import { useState, useRef, useEffect } from 'react';
import { customerPersonas } from '@/data/personas';
import { Product, products } from '@/data/products';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, User, Bot, Loader2, RotateCcw, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface PersonaFeedbackChatProps {
  selectedProducts: string[];
  focusArea: 'feature-gaps' | 'value-clarity' | 'market-position' | 'overall' | 'features' | 'pricing' | 'comparison';
  competitorContext?: string;
  selectedPersonaId: string;
  embedded?: boolean;
}

// Map new focus areas to API-compatible values
const mapFocusArea = (area: string): 'features' | 'pricing' | 'comparison' | 'overall' => {
  switch (area) {
    case 'feature-gaps': return 'features';
    case 'value-clarity': return 'overall';
    case 'market-position': return 'comparison';
    default: return area as 'features' | 'pricing' | 'comparison' | 'overall';
  }
};

export function PersonaFeedbackChat({ 
  selectedProducts, 
  focusArea,
  competitorContext,
  selectedPersonaId,
  embedded = false,
}: PersonaFeedbackChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const selectedPersona = customerPersonas.find(p => p.id === selectedPersonaId);
  const selectedProductDetails = selectedProducts
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as Product[];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startConversation = async () => {
    if (!selectedPersona || selectedProductDetails.length === 0) {
      toast({
        title: "Missing Selection",
        description: "Please select a persona and at least one product.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setMessages([]);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/product-feedback-chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            persona: selectedPersona,
            products: selectedProductDetails.map(p => ({
              id: p.id,
              name: p.name,
              category: p.category,
              price: p.price,
              monthlyPrice: p.monthlyPrice,
              features: p.features,
              valueProps: p.valueProps,
            })),
            focusArea: mapFocusArea(focusArea),
            competitorContext,
            isStart: true,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to start conversation');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let assistantContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                assistantContent += content;
                setMessages([{ role: 'assistant', content: assistantContent }]);
              }
            } catch {
              // Ignore parse errors for incomplete chunks
            }
          }
        }
      }

    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !selectedPersona || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/product-feedback-chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            persona: selectedPersona,
            products: selectedProductDetails.map(p => ({
              id: p.id,
              name: p.name,
              category: p.category,
              price: p.price,
              monthlyPrice: p.monthlyPrice,
              features: p.features,
              valueProps: p.valueProps,
            })),
            focusArea: mapFocusArea(focusArea),
            competitorContext,
            messages: [...messages, userMessage],
            isStart: false,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send message');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let assistantContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
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
              // Ignore parse errors
            }
          }
        }
      }

    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const containerClass = embedded 
    ? "h-full flex flex-col" 
    : "h-[600px] flex flex-col";

  const header = embedded ? null : (
    <CardHeader className="pb-3 border-b shrink-0">
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          {selectedPersona ? (
            <span className="flex items-center gap-2">
              <span>{selectedPersona.avatar}</span>
              Feedback from {selectedPersona.name}
            </span>
          ) : (
            'Persona Feedback Collection'
          )}
        </CardTitle>
        <div className="flex items-center gap-2">
          {messages.length === 0 && selectedPersona && selectedProductDetails.length > 0 && (
            <Button onClick={startConversation} disabled={isLoading} size="sm">
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              Begin Evaluation
            </Button>
          )}
          {messages.length > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setMessages([])}
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          )}
        </div>
      </div>
      {selectedProductDetails.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {selectedProductDetails.map(p => (
            <Badge key={p.id} variant="secondary" className="text-xs">
              {p.name}
            </Badge>
          ))}
        </div>
      )}
    </CardHeader>
  );

  const embeddedHeader = embedded ? (
    <div className="px-4 pt-3 pb-2 border-b shrink-0">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium flex items-center gap-2">
          {selectedPersona ? (
            <>
              <span>{selectedPersona.avatar}</span>
              Feedback from {selectedPersona.name}
            </>
          ) : (
            'Persona Feedback'
          )}
        </span>
        <div className="flex items-center gap-2">
          {messages.length === 0 && selectedPersona && selectedProductDetails.length > 0 && (
            <Button onClick={startConversation} disabled={isLoading} size="sm" variant="outline">
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              Begin Evaluation
            </Button>
          )}
          {messages.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setMessages([])}
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  ) : null;

  const chatContent = (
    <>
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <Bot className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">
              {!selectedPersona 
                ? "Select a persona to start"
                : selectedProductDetails.length === 0
                  ? "Select products to evaluate"
                  : "Click 'Begin Evaluation' to start"
              }
            </h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
              Collect persona-based insights on product positioning and market fit.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-lg">{selectedPersona?.avatar || '🤖'}</span>
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce delay-100" />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {messages.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Explore positioning angles, feature priorities, or market fit questions..."
              className="min-h-[60px] resize-none"
              disabled={isLoading}
            />
            <Button 
              onClick={sendMessage} 
              disabled={!input.trim() || isLoading}
              className="shrink-0"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      )}
    </>
  );

  if (embedded) {
    return (
      <div className={containerClass}>
        {embeddedHeader}
        <div className="flex-1 flex flex-col overflow-hidden">
          {chatContent}
        </div>
      </div>
    );
  }

  return (
    <Card className={containerClass}>
      {header}
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {chatContent}
      </CardContent>
    </Card>
  );
}

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Loader2, Search, AlertTriangle, CheckCircle, MessageSquare, HelpCircle, Copy, Check, Shield, History, Save, ChevronDown, ChevronUp, Trash2, Sparkles, Lightbulb } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ClaimResponse {
  claimAnalysis?: string;
  notApplesToApples?: string[];
  attAdvantage?: string;
  suggestedResponse?: string;
  questionsToAsk?: string[];
  rawContent?: string;
  error?: string;
}

interface CustomerResponses {
  [questionIndex: number]: string;
}

interface SavedClaim {
  id: string;
  claim: string;
  competitor: string | null;
  product_category: string | null;
  claim_analysis: string | null;
  not_apples_to_apples: string[] | null;
  att_advantage: string | null;
  suggested_response: string | null;
  questions_to_ask: string[] | null;
  created_at: string;
}

const competitors = [
  { value: 'any', label: 'Any / Not Sure' },
  { value: 'verizon', label: 'Verizon' },
  { value: 'comcast', label: 'Comcast / Xfinity' },
  { value: 'spectrum', label: 'Spectrum / Charter' },
  { value: 'tmobile', label: 'T-Mobile' },
  { value: 'lumen', label: 'Lumen / CenturyLink' },
  { value: 'cox', label: 'Cox' },
  { value: 'frontier', label: 'Frontier' },
  { value: 'other', label: 'Other' },
];

const productCategories = [
  { value: 'any', label: 'Any / General' },
  { value: 'internet', label: 'Internet / Fiber' },
  { value: 'voice', label: 'Voice / UCaaS' },
  { value: 'wireless', label: 'Wireless / Mobility' },
  { value: 'security', label: 'Cybersecurity' },
  { value: 'bundle', label: 'Multi-Product Services' },
];

interface SampleClaim {
  claim: string;
  competitor: string;
  category: string;
  label: string;
}

const sampleClaims: { category: string; claims: SampleClaim[] }[] = [
  {
    category: 'Internet / Fiber',
    claims: [
      {
        claim: "Comcast told us their business internet is faster than AT&T Fiber and they'll give us the first 6 months free with no contract.",
        competitor: 'comcast',
        category: 'internet',
        label: 'Comcast speed & promo claim'
      },
      {
        claim: "Spectrum said they can get us 1 Gbps symmetrical for $99/month, which is way cheaper than what AT&T quoted us.",
        competitor: 'spectrum',
        category: 'internet',
        label: 'Spectrum pricing claim'
      },
      {
        claim: "Frontier offered us 2 Gbps fiber for the same price AT&T quoted for 1 Gbps. Why would we pay more for less?",
        competitor: 'frontier',
        category: 'internet',
        label: 'Frontier 2 Gbps offer'
      }
    ]
  },
  {
    category: 'Wireless / Mobility',
    claims: [
      {
        claim: "T-Mobile says their 5G network covers more businesses than AT&T and they'll pay up to $800 per line to switch, plus give us free phones.",
        competitor: 'tmobile',
        category: 'wireless',
        label: 'T-Mobile 5G & switch offer'
      },
      {
        claim: "Verizon told us their Business Unlimited plan includes better international coverage and hotspot data than AT&T's comparable plan.",
        competitor: 'verizon',
        category: 'wireless',
        label: 'Verizon unlimited comparison'
      },
      {
        claim: "T-Mobile claims their 5G SA network provides superior speed and coverage, especially in urban areas & offers network slicing for tailored performance.",
        competitor: 'tmobile',
        category: 'wireless',
        label: 'T-Mobile 5G SA claims'
      }
    ]
  },
  {
    category: 'Voice / UCaaS',
    claims: [
      {
        claim: "RingCentral said their UCaaS platform has better uptime and more integrations than AT&T Office@Hand, and it's $10 less per user.",
        competitor: 'other',
        category: 'voice',
        label: 'RingCentral UCaaS comparison'
      },
      {
        claim: "Zoom Phone is offering us unlimited calling to 40+ countries for $20/user/month. Can AT&T match that?",
        competitor: 'other',
        category: 'voice',
        label: 'Zoom Phone international'
      }
    ]
  },
  {
    category: 'Cybersecurity',
    claims: [
      {
        claim: "CrowdStrike said their endpoint protection is rated higher than AT&T's managed security and they can deploy in half the time.",
        competitor: 'other',
        category: 'security',
        label: 'CrowdStrike endpoint claim'
      },
      {
        claim: "Our IT guy said we can just use Microsoft Defender and save money instead of paying for AT&T cybersecurity services.",
        competitor: 'other',
        category: 'security',
        label: 'Microsoft Defender comparison'
      }
    ]
  },
  {
    category: 'Multi-Product Services',
    claims: [
      {
        claim: "Comcast Business is offering us internet, phone, and TV all for $199/month with a 2-year price lock. AT&T's pricing is almost double.",
        competitor: 'comcast',
        category: 'bundle',
        label: 'Comcast multi-product pricing'
      },
      {
        claim: "Spectrum said if we sign a 3-year deal, they'll throw in free WiFi equipment and installation, plus a dedicated account manager.",
        competitor: 'spectrum',
        category: 'bundle',
        label: 'Spectrum 3-year deal'
      }
    ]
  },
  {
    category: 'General / Pricing',
    claims: [
      {
        claim: "The other provider said AT&T has hidden fees and their actual bill is always 30% higher than the quoted price.",
        competitor: 'any',
        category: 'any',
        label: 'Hidden fees accusation'
      },
      {
        claim: "We've heard AT&T's customer service for business is terrible and it takes forever to get issues resolved.",
        competitor: 'any',
        category: 'any',
        label: 'Service quality concern'
      }
    ]
  }
];

const getCompetitorLabel = (value: string | null) => {
  if (!value) return null;
  return competitors.find(c => c.value === value)?.label || value;
};

const getCategoryLabel = (value: string | null) => {
  if (!value) return null;
  return productCategories.find(c => c.value === value)?.label || value;
};

export const CompetitorClaimsPage: React.FC = () => {
  const { user } = useAuth();
  const [claim, setClaim] = useState('');
  const [competitor, setCompetitor] = useState('any');
  const [productCategory, setProductCategory] = useState('any');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [response, setResponse] = useState<ClaimResponse | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [savedClaims, setSavedClaims] = useState<SavedClaim[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [currentClaimText, setCurrentClaimText] = useState('');
  const [customerResponses, setCustomerResponses] = useState<CustomerResponses>({});
  const [isGeneratingRecommendation, setIsGeneratingRecommendation] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);

  useEffect(() => {
    fetchSavedClaims();
  }, []);

  const fetchSavedClaims = async () => {
    const { data, error } = await supabase
      .from('saved_claims')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error fetching saved claims:', error);
      return;
    }

    setSavedClaims(data || []);
  };

  const handleAnalyzeClaim = async () => {
    if (!claim.trim()) {
      toast.error('Please enter a competitor claim to analyze');
      return;
    }

    setIsLoading(true);
    setResponse(null);
    setCurrentClaimText(claim.trim());

    try {
      const { data, error } = await supabase.functions.invoke('claim-response', {
        body: {
          claim: claim.trim(),
          competitor: competitor !== 'any' ? competitor : null,
          productCategory: productCategory !== 'any' ? productCategory : null,
        },
      });

      if (error) throw error;

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setResponse(data);
      setCustomerResponses({});
      setAiRecommendation(null);
    } catch (error) {
      console.error('Error analyzing claim:', error);
      toast.error('Failed to analyze claim. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomerResponseChange = (index: number, value: string) => {
    setCustomerResponses(prev => ({
      ...prev,
      [index]: value
    }));
  };

  const handleGenerateRecommendation = async () => {
    if (!response?.questionsToAsk || Object.keys(customerResponses).length === 0) {
      toast.error('Please enter at least one customer response');
      return;
    }

    setIsGeneratingRecommendation(true);
    setAiRecommendation(null);

    try {
      const { data, error } = await supabase.functions.invoke('response-recommendation', {
        body: {
          claim: currentClaimText,
          questions: response.questionsToAsk,
          customerResponses,
          suggestedResponse: response.suggestedResponse,
          competitor: competitor !== 'any' ? competitor : null,
          productCategory: productCategory !== 'any' ? productCategory : null,
        },
      });

      if (error) throw error;

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setAiRecommendation(data.recommendation);
    } catch (error) {
      console.error('Error generating recommendation:', error);
      toast.error('Failed to generate recommendation. Please try again.');
    } finally {
      setIsGeneratingRecommendation(false);
    }
  };

  const handleSaveClaim = async () => {
    if (!response || !currentClaimText) return;

    setIsSaving(true);
    try {
      const { error } = await supabase.from('saved_claims').insert({
        claim: currentClaimText,
        competitor: competitor !== 'any' ? competitor : null,
        product_category: productCategory !== 'any' ? productCategory : null,
        claim_analysis: response.claimAnalysis || null,
        not_apples_to_apples: response.notApplesToApples || null,
        att_advantage: response.attAdvantage || null,
        suggested_response: response.suggestedResponse || null,
        questions_to_ask: response.questionsToAsk || null,
        user_id: user?.id ?? null,
      });

      if (error) throw error;

      toast.success('Claim saved to history');
      fetchSavedClaims();
    } catch (error) {
      console.error('Error saving claim:', error);
      toast.error('Failed to save claim');
    } finally {
      setIsSaving(false);
    }
  };

  const loadSavedClaim = (saved: SavedClaim) => {
    setCurrentClaimText(saved.claim);
    setClaim(saved.claim);
    setCompetitor(saved.competitor || 'any');
    setProductCategory(saved.product_category || 'any');
    setResponse({
      claimAnalysis: saved.claim_analysis || undefined,
      notApplesToApples: saved.not_apples_to_apples || undefined,
      attAdvantage: saved.att_advantage || undefined,
      suggestedResponse: saved.suggested_response || undefined,
      questionsToAsk: saved.questions_to_ask || undefined,
    });
    setIsHistoryOpen(false);
    toast.success('Loaded saved analysis');
  };

  const handleDeleteClaim = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    try {
      const { error } = await supabase.from('saved_claims').delete().eq('id', id);
      if (error) throw error;
      toast.success('Analysis deleted');
      fetchSavedClaims();
    } catch (error) {
      console.error('Error deleting claim:', error);
      toast.error('Failed to delete analysis');
    }
  };

  const copyToClipboard = async (text: string, section: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedSection(section);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const CopyButton = ({ text, section }: { text: string; section: string }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => copyToClipboard(text, section)}
      className="h-6 w-6 p-0"
    >
      {copiedSection === section ? (
        <Check className="h-3 w-3 text-green-500" />
      ) : (
        <Copy className="h-3 w-3" />
      )}
    </Button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Claim Analysis</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Input competitor claims and get AI-powered responses that help you 
          separate fact from fiction in competitive comparisons.
        </p>
      </div>

      {/* History Section */}
      {savedClaims.length > 0 && (
        <Collapsible open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <History className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-lg">Past Analyses ({savedClaims.length})</CardTitle>
                  </div>
                  {isHistoryOpen ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {savedClaims.map((saved) => (
                    <div
                      key={saved.id}
                      className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 cursor-pointer transition-all"
                      onClick={() => loadSavedClaim(saved)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm text-foreground line-clamp-2 flex-1">
                          "{saved.claim}"
                        </p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(saved.created_at)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex gap-2">
                          {saved.competitor && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                              {getCompetitorLabel(saved.competitor)}
                            </span>
                          )}
                          {saved.product_category && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                              {getCategoryLabel(saved.product_category)}
                            </span>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                          onClick={(e) => handleDeleteClaim(e, saved.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">What did you hear?</CardTitle>
          <CardDescription>
            Enter the competitor claim, offer, or statement your customer mentioned
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="claim">Competitor Claim</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-muted-foreground hover:text-foreground">
                    <Lightbulb className="h-3.5 w-3.5" />
                    Try a Sample
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 max-h-80 overflow-y-auto bg-popover">
                  {sampleClaims.map((group, groupIndex) => (
                    <React.Fragment key={group.category}>
                      {groupIndex > 0 && <DropdownMenuSeparator />}
                      <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
                        {group.category}
                      </DropdownMenuLabel>
                      {group.claims.map((sample) => (
                        <DropdownMenuItem
                          key={sample.label}
                          className="cursor-pointer"
                          onClick={() => {
                            setClaim(sample.claim);
                            setCompetitor(sample.competitor);
                            setProductCategory(sample.category);
                            toast.success('Sample claim loaded');
                          }}
                        >
                          <span className="text-sm">{sample.label}</span>
                        </DropdownMenuItem>
                      ))}
                    </React.Fragment>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Textarea
              id="claim"
              placeholder='e.g., "T-Mobile is offering $50/month for 5G business internet" or "Spectrum said they can do 1 Gbps for $99"'
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="competitor">Competitor (Optional)</Label>
              <Select value={competitor} onValueChange={setCompetitor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select competitor" />
                </SelectTrigger>
                <SelectContent>
                  {competitors.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Product Category (Optional)</Label>
              <Select value={productCategory} onValueChange={setProductCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {productCategories.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleAnalyzeClaim} 
            disabled={isLoading || !claim.trim()}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Claim...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Analyze Claim
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Response Section */}
      {response && !response.error && (
        <div className="space-y-4">
          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveClaim}
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save to History
            </Button>
          </div>

          {/* Suggested Response - MOVED UP */}
          {response.suggestedResponse && (
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Suggested Response</CardTitle>
                  </div>
                  <CopyButton text={response.suggestedResponse} section="response" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground italic">"{response.suggestedResponse}"</p>
              </CardContent>
            </Card>
          )}

          {/* Questions to Ask Your Customer */}
          {response.questionsToAsk && response.questionsToAsk.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-purple-500" />
                    <div>
                      <CardTitle className="text-lg">Questions to Ask Your Customer</CardTitle>
                      <CardDescription className="text-xs mt-1">Discovery questions to help uncover what the customer really needs</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateRecommendation}
                    disabled={isGeneratingRecommendation || Object.keys(customerResponses).filter(k => customerResponses[parseInt(k)]?.trim()).length === 0}
                    className="text-purple-600 border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950"
                  >
                    {isGeneratingRecommendation ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Get AI Recommendation
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {response.questionsToAsk.map((question, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-purple-500 font-medium">{index + 1}.</span>
                        <span className="text-muted-foreground">{question}</span>
                      </div>
                      <div className="ml-5">
                        <Textarea
                          placeholder="Enter customer's response..."
                          value={customerResponses[index] || ''}
                          onChange={(e) => handleCustomerResponseChange(index, e.target.value)}
                          className="min-h-[60px] text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Recommendation */}
                {aiRecommendation && (
                  <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-primary/5 dark:from-purple-950/30 dark:to-primary/10 border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-500" />
                        <span className="font-semibold text-foreground">AI Recommendation</span>
                      </div>
                      <CopyButton text={aiRecommendation} section="recommendation" />
                    </div>
                    <div className="text-sm text-muted-foreground space-y-4">
                      {aiRecommendation.split(/(?=## 5\. RECOMMENDED NEXT STEPS)/i).map((section, idx) => {
                        const isNextSteps = section.toLowerCase().includes('## 5. recommended next steps');
                        
                        const renderFormattedText = (text: string) => {
                          return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
                            }
                            return part;
                          });
                        };
                        
                        if (isNextSteps) {
                          return (
                            <div 
                              key={idx} 
                              className="mt-4 p-4 rounded-lg bg-primary/10 border-2 border-primary/30 dark:bg-primary/20"
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <span className="font-bold text-primary text-base">Recommended Next Steps</span>
                              </div>
                              <div className="whitespace-pre-wrap text-foreground font-medium">
                                {renderFormattedText(section.replace(/## 5\. RECOMMENDED NEXT STEPS\n?/i, '').trim())}
                              </div>
                            </div>
                          );
                        }
                        return (
                          <div key={idx} className="whitespace-pre-wrap">
                            {renderFormattedText(section)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Claim Analysis */}
          {response.claimAnalysis && (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-lg">Claim Analysis</CardTitle>
                  </div>
                  <CopyButton text={response.claimAnalysis} section="analysis" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{response.claimAnalysis}</p>
              </CardContent>
            </Card>
          )}

          {/* Not Apples-to-Apples */}
          {response.notApplesToApples && response.notApplesToApples.length > 0 && (
            <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-800">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <CardTitle className="text-lg">Fertilizer: It's Not Apples-to-Apples</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {response.notApplesToApples.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span className="text-muted-foreground">
                        {point.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
                          }
                          return part;
                        })}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* AT&T's Advantage */}
          {response.attAdvantage && (
            <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20 dark:border-green-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <CardTitle className="text-lg">AT&T's Advantage</CardTitle>
                  </div>
                  <CopyButton text={response.attAdvantage} section="advantage" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{response.attAdvantage}</p>
              </CardContent>
            </Card>
          )}

          {/* Raw content fallback */}
          {response.rawContent && !response.claimAnalysis && (
            <Card>
              <CardHeader>
                <CardTitle>Response</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
                  {response.rawContent}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

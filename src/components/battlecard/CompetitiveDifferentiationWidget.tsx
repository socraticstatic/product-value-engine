import { useState } from "react";
import { Product } from "@/data/products";
import { CustomerProfile } from "@/types/customer";
import {
  getProductDifferentiators,
  generalDifferentiators,
  ProductDifferentiator,
} from "@/data/competitiveDifferentiation";
import { BattlecardWidget } from "./BattlecardWidget";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Swords,
  Shield,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Zap,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Target,
  RefreshCw,
  Bot,
  TrendingUp,
  TrendingDown,
  Minus,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import {
  fetchCompetitorIntel,
  getLastUpdatedText,
  mergeWithStaticData,
  LiveCompetitorData,
  CompetitorIntelResult,
} from "@/services/competitorIntel";
import { DemoBlur } from '@/components/ui/DemoBlur';

interface CompetitiveDifferentiationWidgetProps {
  products: Product[];
  customerProfile: CustomerProfile;
}

// Fixed list of competitors with brand colors
const COMPETITORS = [
  { name: "Verizon", color: "bg-red-600", textColor: "text-white" },
  { name: "T-Mobile", color: "bg-pink-500", textColor: "text-white" },
  { name: "Comcast", color: "bg-blue-700", textColor: "text-white" },
  { name: "Spectrum", color: "bg-blue-500", textColor: "text-white" },
];

export function CompetitiveDifferentiationWidget({
  products,
  customerProfile,
}: CompetitiveDifferentiationWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedProducts, setExpandedProducts] = useState<string[]>([]);
  const [liveIntel, setLiveIntel] = useState<Record<string, CompetitorIntelResult>>({});
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null);
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>(
    COMPETITORS.map(c => c.name)
  );
  const productDifferentiators = products
    .map((p) => ({
      product: p,
      differentiators: getProductDifferentiators(p.id),
    }))
    .filter((p) => p.differentiators);

  const handleCompetitorToggle = (competitor: string) => {
    setSelectedCompetitors(prev => 
      prev.includes(competitor)
        ? prev.filter(c => c !== competitor)
        : [...prev, competitor]
    );
  };

  const handleRefreshIntel = async (productId: string, productName: string) => {
    setLoadingProduct(productId);
    try {
      const intel = await fetchCompetitorIntel(productId, productName, true);
      setLiveIntel(prev => ({ ...prev, [productId]: intel }));
      toast.success("Competitor intel updated", {
        description: `Latest data for ${productName}`
      });
    } catch (error) {
      console.error("Failed to fetch competitor intel:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch intel";
      
      if (errorMessage.includes("Rate limit")) {
        toast.error("Rate limit exceeded", {
          description: "Please try again in a few minutes"
        });
      } else if (errorMessage.includes("credits")) {
        toast.error("AI credits exhausted", {
          description: "Please add credits to continue"
        });
      } else {
        toast.error("Failed to refresh intel", {
          description: errorMessage
        });
      }
    } finally {
      setLoadingProduct(null);
    }
  };

  // Summary for collapsed state
  const competitorCount = selectedCompetitors.length;
  const summaryText = `AT&T Guarantee + comparisons vs ${competitorCount} competitors`;

  // Demo mode: We render the real UI with blur applied to sensitive content (no placeholder replacement)

  return (
    <BattlecardWidget
      title="Competitive Differentiation"
      icon={Swords}
      iconColor="text-destructive"
    >
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        {/* Collapsed Summary */}
        <CollapsibleTrigger asChild>
          <div className="cursor-pointer">
            {!isExpanded && (
              <div className="space-y-3">
                {/* AT&T Guarantee Preview */}
                <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">
                        The AT&T Guarantee
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        <DemoBlur>{generalDifferentiators.attGuarantee.description}</DemoBlur>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick competitor badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-muted-foreground">Comparing vs:</span>
                  {selectedCompetitors.slice(0, 4).map(name => {
                    const competitor = COMPETITORS.find(c => c.name === name);
                    return competitor ? (
                      <span 
                        key={name}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${competitor.color} ${competitor.textColor}`}
                      >
                        {competitor.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-between mt-3 text-muted-foreground hover:text-foreground"
            >
              <span className="text-xs">{isExpanded ? 'Show less' : `${summaryText} →`}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="space-y-6 pt-2">
            {/* AT&T Guarantee Banner */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    The AT&T Guarantee
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    <DemoBlur>{generalDifferentiators.attGuarantee.description}</DemoBlur>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {generalDifferentiators.attGuarantee.components.map(
                      (component, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs font-normal"
                        >
                          {component}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Competitor Filter */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Compare against:</span>
              </div>
              <div className="flex flex-wrap gap-4">
                {COMPETITORS.map(competitor => (
                  <div 
                    key={competitor.name} 
                    className="flex items-center gap-3 p-2 rounded-md border border-border bg-background"
                  >
                    <div className={`px-2 py-0.5 rounded text-xs font-bold ${competitor.color} ${competitor.textColor}`}>
                      {competitor.name}
                    </div>
                    <Switch
                      id={`competitor-${competitor.name}`}
                      checked={selectedCompetitors.includes(competitor.name)}
                      onCheckedChange={() => handleCompetitorToggle(competitor.name)}
                    />
                  </div>
                ))}
              </div>
              {selectedCompetitors.length === 0 && (
                <p className="text-xs text-muted-foreground mt-2">No competitors selected - select at least one to see comparisons</p>
              )}
            </div>

            {/* Product-Specific Differentiation */}
            <Accordion
              type="multiple"
              value={expandedProducts}
              onValueChange={setExpandedProducts}
              className="space-y-3"
            >
              {productDifferentiators.map(({ product, differentiators }) => {
                const productIntel = liveIntel[product.id];
                const isLoading = loadingProduct === product.id;

                return (
                  <AccordionItem
                    key={product.id}
                    value={product.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                      <div className="flex items-center gap-3 text-left flex-1">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="font-medium">{product.name}</span>
                        {productIntel?.isLive && (
                          <Badge variant="outline" className="text-xs gap-1 ml-auto mr-2">
                            <Bot className="w-3 h-3" />
                            AI Intel
                          </Badge>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      {differentiators && (
                        <>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              {productIntel && (
                                <>
                                  <span>Updated {getLastUpdatedText(productIntel.lastUpdated)}</span>
                                  <span>•</span>
                                </>
                              )}
                              <span>AI-powered competitive research</span>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRefreshIntel(product.id, product.name);
                              }}
                              disabled={isLoading}
                              className="text-xs h-7 gap-1.5"
                            >
                              <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
                              {isLoading ? "Researching..." : "Refresh Intel"}
                            </Button>
                          </div>
                          <ProductDifferentiatorContent
                            differentiators={differentiators}
                            customerProfile={customerProfile}
                            liveData={productIntel?.competitors}
                            marketTrends={productIntel?.marketTrends}
                            selectedCompetitors={selectedCompetitors}
                          />
                        </>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>

            {/* Multi-Product Strategy */}
            {products.length > 1 && (
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Converge/ Multi-Product Advantage
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      <DemoBlur>{generalDifferentiators.bundleStrategy.message}</DemoBlur>
                    </p>
                    <ul className="space-y-1.5">
                      {generalDifferentiators.bundleStrategy.advantages.map(
                        (adv, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                            <DemoBlur>{adv}</DemoBlur>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </BattlecardWidget>
  );
}

function ProductDifferentiatorContent(props: {
  differentiators: ProductDifferentiator;
  customerProfile: CustomerProfile;
  liveData?: LiveCompetitorData[];
  marketTrends?: string[];
  selectedCompetitors: string[];
}) {
  const { differentiators, liveData, marketTrends, selectedCompetitors } = props;
  const [activeTab, setActiveTab] = useState<
    "comparisons" | "nuances" | "hidden" | "trends"
  >("comparisons");

  // Merge static data with live data if available
  const allComparisons: LiveCompetitorData[] = liveData
    ? mergeWithStaticData(differentiators.competitorComparisons, liveData)
    : differentiators.competitorComparisons.map(c => ({ ...c, isLive: false }));

  // Filter comparisons by selected competitors (partial match to handle full business names)
  const comparisons = allComparisons.filter(c => 
    selectedCompetitors.some(selected => 
      c.competitor.toLowerCase().includes(selected.toLowerCase())
    )
  );

  // Filter hidden costs by selected competitors (partial match)
  const hiddenCosts = differentiators.hiddenCosts?.filter(c => 
    selectedCompetitors.some(selected => 
      c.competitor.toLowerCase().includes(selected.toLowerCase())
    )
  );

  const getCompetitorBadge = (competitorName: string) => {
    const competitor = COMPETITORS.find(c => c.name === competitorName);
    if (competitor) {
      return (
        <span className={`px-2 py-0.5 rounded text-xs font-bold ${competitor.color} ${competitor.textColor}`}>
          {competitor.name}
        </span>
      );
    }
    return <span className="text-sm font-medium">{competitorName}</span>;
  };

  const getPriceChangeIcon = (change?: string) => {
    switch (change) {
      case "up":
        return <TrendingUp className="w-3 h-3 text-destructive" />;
      case "down":
        return <TrendingDown className="w-3 h-3 text-success" />;
      case "same":
        return <Minus className="w-3 h-3 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getConfidenceBadge = (confidence?: string) => {
    if (!confidence) return null;
    const colors = {
      high: "bg-success/10 text-success border-success/20",
      medium: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      low: "bg-destructive/10 text-destructive border-destructive/20"
    };
    return (
      <Badge variant="outline" className={`text-[10px] ${colors[confidence as keyof typeof colors]}`}>
        {confidence} confidence
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      {/* Market Trends Banner */}
      {marketTrends && marketTrends.length > 0 && (
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
          <h5 className="text-xs font-medium text-primary mb-2 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            Market Trends
          </h5>
          <ul className="space-y-1">
            {marketTrends.map((trend, idx) => (
              <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                <ChevronRight className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                {trend}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-1.5">
        <Button
          type="button"
          variant={activeTab === "comparisons" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("comparisons")}
          className="text-xs h-7"
        >
          vs Competitors
        </Button>
        <Button
          type="button"
          variant={activeTab === "nuances" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("nuances")}
          className="text-xs h-7"
        >
          Not Apples-to-Apples
        </Button>
        {hiddenCosts && hiddenCosts.length > 0 && (
          <Button
            type="button"
            variant={activeTab === "hidden" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("hidden")}
            className="text-xs h-7"
          >
            Hidden Costs
          </Button>
        )}
      </div>

      {/* Tab Content */}
      {activeTab === "comparisons" && (
        <div className="space-y-3">
          {comparisons.length === 0 ? (
            <div className="p-4 rounded-lg bg-muted/50 border border-border text-center">
              <p className="text-sm text-muted-foreground">
                No competitor data matches your filter. Try selecting different competitors or clear the filter.
              </p>
            </div>
          ) : comparisons.map((comp, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg border border-border bg-card"
            >
              <div className="flex items-center justify-between mb-2 gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">vs</span>
                  {getCompetitorBadge(comp.competitor)}
                  {comp.isLive && (
                    <Badge variant="secondary" className="text-[10px] gap-1">
                      <Bot className="w-2.5 h-2.5" />
                      Live
                    </Badge>
                  )}
                  {getPriceChangeIcon(comp.priceChange)}
                </div>
                {getConfidenceBadge(comp.confidence)}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-muted-foreground shrink-0">Their offer: </span>
                  <span className="text-foreground"><DemoBlur>{comp.theirOffer}</DemoBlur></span>
                  {comp.priceChange === "up" && (
                    <Badge variant="outline" className="text-[10px] text-destructive border-destructive/30 shrink-0">
                      ↑ Price increased
                    </Badge>
                  )}
                  {comp.priceChange === "down" && (
                    <Badge variant="outline" className="text-[10px] text-success border-success/30 shrink-0">
                      ↓ Price dropped
                    </Badge>
                  )}
                </div>

                <div className="flex items-start gap-2 p-2 rounded-md bg-primary/5 border border-primary/20">
                  <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">
                      AT&T advantage:{" "}
                    </span>
                    <span className="text-muted-foreground">
                      <DemoBlur>{comp.attAdvantage}</DemoBlur>
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "nuances" && (
        <div className="space-y-3">
          {differentiators.notApplesToApples.map((nuance, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800"
            >
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    <DemoBlur>{nuance.scenario}</DemoBlur>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <DemoBlur>{nuance.explanation}</DemoBlur>
                  </p>
                  <p className="text-xs text-primary mt-1">
                    → <DemoBlur>{nuance.howToPosition}</DemoBlur>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "hidden" && hiddenCosts && (
        <div className="space-y-3">
          {hiddenCosts.map((cost, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg border border-border bg-card"
            >
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-destructive" />
                {getCompetitorBadge(cost.competitor)}
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p><span className="text-destructive">•</span> <DemoBlur>{cost.hiddenFee}</DemoBlur></p>
                <p className="text-xs text-primary mt-1">AT&T: <DemoBlur>{cost.attApproach}</DemoBlur></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

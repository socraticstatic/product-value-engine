import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trophy, CheckCircle2, Lightbulb, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import { getProductDifferentiators, generalDifferentiators } from '@/data/competitiveDifferentiation';
import { products, Product } from '@/data/products';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { DemoBlur } from '@/components/ui/DemoBlur';

interface CompetitiveSnapshotCardProps {
  productId?: string;
  productName?: string;
  productIds?: string[];
}

export function CompetitiveSnapshotCard({ productId, productName, productIds }: CompetitiveSnapshotCardProps) {
  // Handle multiple products
  if (productIds && productIds.length > 1) {
    return <CombinedCompetitiveSnapshot productIds={productIds} />;
  }

  // Single product mode (backward compatible)
  const singleProductId = productId || productIds?.[0];
  const singleProductName = productName || products.find(p => p.id === singleProductId)?.name || '';
  
  if (!singleProductId) return null;

  const differentiators = getProductDifferentiators(singleProductId);
  const product = products.find(p => p.id === singleProductId);

  // If we have specific competitive data, use the rich display
  if (differentiators) {
    const topUSPs = differentiators.uniqueSellingPoints.slice(0, 3);
    const primaryComparison = differentiators.competitorComparisons[0];
    const primaryHiddenCost = differentiators.hiddenCosts?.[0];

    return (
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Why AT&T Wins</CardTitle>
              <CardDescription>Competitive advantages for {singleProductName}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Top Differentiators */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              Top Differentiators
            </h4>
            <ul className="space-y-2">
              {topUSPs.map((usp, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-success font-bold mt-0.5">✓</span>
                  <span className="text-foreground/90"><DemoBlur>{usp}</DemoBlur></span>
                </li>
              ))}
            </ul>
          </div>

          {/* Winning Position */}
          {primaryComparison && (
            <div className="pt-3 border-t border-border/50">
              <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-warning" />
                Winning Position vs {primaryComparison.competitor}
              </h4>
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
                <p className="text-sm text-foreground/90 italic">
                  "<DemoBlur>{primaryComparison.winningStatement}</DemoBlur>"
                </p>
              </div>
              {primaryComparison.nuance && (
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="font-medium">Note:</span> <DemoBlur>{primaryComparison.nuance}</DemoBlur>
                </p>
              )}
            </div>
          )}

          {/* Hidden Cost Advantage */}
          {primaryHiddenCost && (
            <div className="pt-3 border-t border-border/50">
              <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                Hidden Cost Advantage
              </h4>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 shrink-0">
                  {primaryHiddenCost.competitor}
                </Badge>
                <div className="space-y-1 text-sm">
                  <p className="text-foreground/80 line-through decoration-destructive/50">
                    <DemoBlur>{primaryHiddenCost.hiddenFee}</DemoBlur>
                  </p>
                  <p className="text-primary font-medium flex items-center gap-1">
                    → <DemoBlur>{primaryHiddenCost.attApproach}</DemoBlur>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Additional Competitors Preview */}
          {differentiators.competitorComparisons.length > 1 && (
            <div className="pt-3 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                Also compare against:{' '}
                {differentiators.competitorComparisons.slice(1).map((c, i) => (
                  <span key={c.competitor}>
                    <span className="font-medium text-foreground/70">{c.competitor}</span>
                    {i < differentiators.competitorComparisons.length - 2 ? ', ' : ''}
                  </span>
                ))}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Fallback: Show product-level advantages + general differentiators
  if (product) {
    return (
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Why AT&T Wins</CardTitle>
              <CardDescription>Competitive advantages for {singleProductName}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Product Competitive Advantages */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              Product Advantages
            </h4>
            <ul className="space-y-2">
              {product.competitiveAdvantages.slice(0, 4).map((adv, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-success font-bold mt-0.5">✓</span>
                  <span className="text-foreground/90"><DemoBlur>{adv}</DemoBlur></span>
                </li>
              ))}
            </ul>
          </div>

          {/* AT&T Network Leadership */}
          <div className="pt-3 border-t border-border/50">
            <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-warning" />
              AT&T Network Leadership
            </h4>
            <ul className="space-y-2">
              {generalDifferentiators.networkLeadership.slice(0, 2).map((point, i) => (
                <li key={i} className="text-sm text-foreground/80">• <DemoBlur>{point}</DemoBlur></li>
              ))}
            </ul>
          </div>

          {/* AT&T Guarantee */}
          <div className="pt-3 border-t border-border/50">
            <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              The AT&T Guarantee
            </h4>
            <p className="text-sm text-foreground/80">
              <DemoBlur>{generalDifferentiators.attGuarantee.description}</DemoBlur>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}

// Expandable USP list component
function ExpandableUSPList({ usps }: { usps: string[] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialCount = 6;
  const hasMore = usps.length > initialCount;
  const displayedItems = isExpanded ? usps : usps.slice(0, initialCount);
  const remainingCount = usps.length - initialCount;

  return (
    <div>
      <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-success" />
        Combined Solution Differentiators
      </h4>
      <ul className="space-y-2">
        {displayedItems.map((usp, i) => (
          <li 
            key={i} 
            className="flex items-start gap-2 text-sm animate-fade-in"
            style={{ animationDelay: isExpanded && i >= initialCount ? `${(i - initialCount) * 30}ms` : '0ms' }}
          >
            <span className="text-success font-bold mt-0.5">✓</span>
            <span className="text-foreground/90"><DemoBlur>{usp}</DemoBlur></span>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors mt-2 pl-5",
            "hover:underline focus:outline-none focus:underline"
          )}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-3 h-3" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3" />
              +{remainingCount} more differentiators
            </>
          )}
        </button>
      )}
    </div>
  );
}

// Combined view for multiple products
function CombinedCompetitiveSnapshot({ productIds }: { productIds: string[] }) {
  const selectedProducts = productIds
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => p !== undefined);

  // Gather all competitive data
  const allDifferentiators = productIds.map(id => getProductDifferentiators(id)).filter(Boolean);
  
  // Combine USPs from all products (deduplicated)
  const combinedUSPs = [...new Set(
    allDifferentiators.flatMap(d => d?.uniqueSellingPoints || [])
  )];
  
  // If no specific competitive data, use product advantages
  const fallbackUSPs = combinedUSPs.length === 0 
    ? [...new Set(selectedProducts.flatMap(p => p.competitiveAdvantages))]
    : [];

  const displayUSPs = combinedUSPs.length > 0 ? combinedUSPs : fallbackUSPs;

  // Combine winning positions from all products
  const allComparisons = allDifferentiators.flatMap(d => d?.competitorComparisons || []);
  const uniqueCompetitors = [...new Set(allComparisons.map(c => c.competitor))];
  const primaryComparisons = uniqueCompetitors.slice(0, 2).map(competitor => 
    allComparisons.find(c => c.competitor === competitor)
  ).filter(Boolean);

  // Combine hidden costs
  const allHiddenCosts = allDifferentiators.flatMap(d => d?.hiddenCosts || []);
  const uniqueHiddenCosts = allHiddenCosts.reduce((acc, cost) => {
    if (!acc.find(c => c.competitor === cost.competitor)) {
      acc.push(cost);
    }
    return acc;
  }, [] as typeof allHiddenCosts);

  const productNames = selectedProducts.map(p => p.name).join(' + ');

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Trophy className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Why AT&T Wins</CardTitle>
            <CardDescription>Combined competitive advantages for your solution</CardDescription>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {selectedProducts.map(p => (
            <Badge key={p.id} variant="secondary" className="text-xs">
              {p.name}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Combined Differentiators */}
        <ExpandableUSPList usps={displayUSPs} />

        {/* Winning Positions */}
        {primaryComparisons.length > 0 && (
          <div className="pt-3 border-t border-border/50">
            <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-warning" />
              Winning Positions
            </h4>
            <div className="space-y-3">
              {primaryComparisons.map((comparison, i) => comparison && (
                <div key={i} className="bg-warning/10 border border-warning/20 rounded-lg p-3">
                  <p className="text-xs font-medium text-warning mb-1">vs {comparison.competitor}</p>
                  <p className="text-sm text-foreground/90 italic">
                    "<DemoBlur>{comparison.winningStatement}</DemoBlur>"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hidden Cost Advantages */}
        {uniqueHiddenCosts.length > 0 && (
          <div className="pt-3 border-t border-border/50">
            <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              Hidden Cost Advantages
            </h4>
            <div className="space-y-3">
              {uniqueHiddenCosts.slice(0, 2).map((cost, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 shrink-0">
                    {cost.competitor}
                  </Badge>
                  <div className="space-y-1 text-sm">
                    <p className="text-foreground/80 line-through decoration-destructive/50">
                      <DemoBlur>{cost.hiddenFee}</DemoBlur>
                    </p>
                    <p className="text-primary font-medium flex items-center gap-1">
                      → <DemoBlur>{cost.attApproach}</DemoBlur>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Multi-Product Synergy Note */}
        <div className="pt-3 border-t border-border/50">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
            <p className="text-sm text-foreground/90">
              <span className="font-medium text-primary">Multi-Product Advantage:</span> Single provider for {selectedProducts.length} solutions means one bill, one support contact, and integrated service management.
            </p>
          </div>
        </div>

        {/* Additional Competitors */}
        {uniqueCompetitors.length > 2 && (
          <div className="pt-3 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              Also compare against:{' '}
              {uniqueCompetitors.slice(2).map((competitor, i) => (
                <span key={competitor}>
                  <span className="font-medium text-foreground/70">{competitor}</span>
                  {i < uniqueCompetitors.length - 3 ? ', ' : ''}
                </span>
              ))}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

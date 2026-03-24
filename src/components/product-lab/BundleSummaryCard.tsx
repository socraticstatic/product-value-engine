import { BundleCalculation } from '@/utils/bundleCalculations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DollarSign, Package, Zap, Target, CheckCircle2 } from 'lucide-react';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { DemoBlur } from '@/components/ui/DemoBlur';

interface BundleSummaryCardProps {
  bundle: BundleCalculation;
  valueStatement?: string;
}

const segmentLabels: Record<string, string> = {
  'small-business': 'Small Business',
  'mid-market': 'Mid-Market',
  'enterprise': 'Enterprise',
};

export function BundleSummaryCard({ bundle, valueStatement }: BundleSummaryCardProps) {
  const { isDemoMode } = useDemoMode();

  if (bundle.products.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Package className="w-12 h-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground">No Products Selected</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Select products to see solution summary
          </p>
        </CardContent>
      </Card>
    );
  }

  // Remove demo mode early return - render real UI with blur applied

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">Solution Summary</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {bundle.products.length} product{bundle.products.length > 1 ? 's' : ''} selected
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-2xl font-bold text-primary">
              <DollarSign className="w-5 h-5" />
              {bundle.totalMonthlyPrice > 0 ? (
                <span>{bundle.totalMonthlyPrice}{bundle.hasCustomPricing ? '+' : ''}</span>
              ) : (
                <span className="text-base font-medium text-muted-foreground">Custom</span>
              )}
            </div>
            {bundle.totalMonthlyPrice > 0 && (
              <p className="text-xs text-muted-foreground">per month{bundle.hasCustomPricing ? ' (+ custom)' : ''}</p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Products */}
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            <Package className="w-4 h-4" />
            Products
          </h4>
          <div className="space-y-2">
            {bundle.products.map((product) => (
              <div 
                key={product.id}
                className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                  <span className="text-sm font-medium">{product.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{product.price}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Target Segments */}
        {bundle.targetSegments.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Best For
            </h4>
            <div className="flex flex-wrap gap-2">
              {bundle.targetSegments.map((segment) => (
                <Badge 
                  key={segment} 
                  variant="outline"
                  className="bg-primary/5 text-primary border-primary/20"
                >
                  {segmentLabels[segment] || segment}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Synergies */}
        {bundle.synergies.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-warning" />
              Multi-Product Synergies
            </h4>
            <ul className="space-y-2">
              {bundle.synergies.map((synergy, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <span className="text-muted-foreground"><DemoBlur>{synergy}</DemoBlur></span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Value Statement */}
        {valueStatement && (
          <>
            <Separator />
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
              <h4 className="text-sm font-medium mb-1 text-primary">Value Proposition</h4>
              <p className="text-sm text-foreground/90"><DemoBlur>{valueStatement}</DemoBlur></p>
            </div>
          </>
        )}

        {/* Combined Stats */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-lg bg-muted/50 text-center">
            <div className="text-2xl font-bold text-primary">{bundle.totalFeatures.length}</div>
            <div className="text-xs text-muted-foreground">Total Features</div>
          </div>
          <div className="p-3 rounded-lg bg-muted/50 text-center">
            <div className="text-2xl font-bold text-primary">{bundle.combinedValueProps.length}</div>
            <div className="text-xs text-muted-foreground">Value Props</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

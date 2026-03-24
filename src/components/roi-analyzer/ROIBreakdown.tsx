import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingDown, ArrowRight } from 'lucide-react';
import { ProductROI, formatCurrencyFull } from '@/lib/roi-calculator';
import { DemoBlur } from '@/components/ui/DemoBlur';

interface ROIBreakdownProps {
  products: ProductROI[];
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  reliability: { bg: 'bg-primary/10', text: 'text-primary' },
  productivity: { bg: 'bg-success/10', text: 'text-success' },
  security: { bg: 'bg-warning/10', text: 'text-warning' },
  support: { bg: 'bg-accent/10', text: 'text-accent-foreground' }
};

const categoryLabels: Record<string, string> = {
  reliability: 'Reliability',
  productivity: 'Productivity',
  security: 'Security',
  support: 'Support'
};

export function ROIBreakdown({ products }: ROIBreakdownProps) {
  // Aggregate all components across products
  const aggregatedComponents = products.reduce((acc, product) => {
    product.components.forEach(comp => {
      if (!acc[comp.category]) {
        acc[comp.category] = {
          currentCost: 0,
          projectedCost: 0,
          savings: 0,
          descriptions: []
        };
      }
      acc[comp.category].currentCost += comp.currentCost;
      acc[comp.category].projectedCost += comp.projectedCost;
      acc[comp.category].savings += comp.savings;
      if (!acc[comp.category].descriptions.includes(comp.description)) {
        acc[comp.category].descriptions.push(comp.description);
      }
    });
    return acc;
  }, {} as Record<string, { currentCost: number; projectedCost: number; savings: number; descriptions: string[] }>);

  const totalSavings = Object.values(aggregatedComponents).reduce((sum, c) => sum + c.savings, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingDown className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle>Investment Breakdown</CardTitle>
            <CardDescription>Detailed breakdown by category</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(aggregatedComponents).map(([category, data]) => {
          const colors = categoryColors[category] || { bg: 'bg-muted', text: 'text-foreground' };
          const savingsPercent = totalSavings > 0 ? (data.savings / totalSavings) * 100 : 0;
          const reductionPercent = data.currentCost > 0 
            ? ((data.currentCost - data.projectedCost) / data.currentCost) * 100 
            : 0;

          return (
            <div key={category} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`${colors.bg} ${colors.text} border-0`}>
                    {categoryLabels[category] || category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(reductionPercent)}% reduction
                  </span>
                </div>
                <span className="text-lg font-semibold text-primary">
                  {formatCurrencyFull(data.savings)}
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Current:</span>
                  <span className="font-medium line-through text-muted-foreground">
                    {formatCurrencyFull(data.currentCost)}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Projected:</span>
                  <span className="font-medium text-success">
                    {formatCurrencyFull(data.projectedCost)}
                  </span>
                </div>
              </div>

              <Progress 
                value={savingsPercent} 
                className="h-2"
              />

              <p className="text-xs text-muted-foreground">
                <DemoBlur>{data.descriptions[0]}</DemoBlur>
              </p>
            </div>
          );
        })}

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Total Annual Savings</span>
            <span className="text-2xl font-bold text-primary">
              {formatCurrencyFull(totalSavings)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

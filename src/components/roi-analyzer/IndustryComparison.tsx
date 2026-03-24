import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { getBenchmarkByIndustry, businessSizeMultipliers } from '@/lib/benchmarks';
import { formatCurrency } from '@/lib/roi-calculator';

interface IndustryComparisonProps {
  industryKey: string;
  businessSize: string;
  currentCosts: {
    downtime: number;
    productivity: number;
    security: number;
    support: number;
  };
}

export function IndustryComparison({ industryKey, businessSize, currentCosts }: IndustryComparisonProps) {
  const benchmark = getBenchmarkByIndustry(industryKey);
  const sizeMultiplier = businessSizeMultipliers[businessSize] || businessSizeMultipliers['51-200'];

  // Calculate industry average costs
  const industryAvgDowntime = benchmark.avgDowntimeHoursPerYear * benchmark.downtimeCostPerHour * sizeMultiplier.downtimeMultiplier;
  const industryAvgProductivity = (benchmark.avgEmployeeCost * (benchmark.productivityLossPercent / 100)) * sizeMultiplier.avgEmployeeCount;
  const industryAvgSecurity = benchmark.avgDataBreachCost * sizeMultiplier.securityRiskMultiplier * 0.1; // Annualized
  const industryAvgSupport = benchmark.avgITSupportCostPerEmployee * sizeMultiplier.avgEmployeeCount;

  const comparisons = [
    {
      label: 'Downtime Costs',
      current: currentCosts.downtime,
      average: industryAvgDowntime,
      description: `${benchmark.avgDowntimeHoursPerYear}hrs avg downtime/year`
    },
    {
      label: 'Productivity Loss',
      current: currentCosts.productivity,
      average: industryAvgProductivity,
      description: `${benchmark.productivityLossPercent}% industry avg loss`
    },
    {
      label: 'Security Risk',
      current: currentCosts.security,
      average: industryAvgSecurity,
      description: `${formatCurrency(benchmark.avgDataBreachCost)} avg breach cost`
    },
    {
      label: 'IT Support',
      current: currentCosts.support,
      average: industryAvgSupport,
      description: `${formatCurrency(benchmark.avgITSupportCostPerEmployee)}/employee avg`
    }
  ];

  const getComparisonStatus = (current: number, average: number) => {
    const ratio = current / average;
    if (ratio > 1.1) return { status: 'above', icon: TrendingUp, color: 'text-destructive' };
    if (ratio < 0.9) return { status: 'below', icon: TrendingDown, color: 'text-success' };
    return { status: 'average', icon: Minus, color: 'text-muted-foreground' };
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle>Industry Comparison</CardTitle>
            <CardDescription>How your costs compare to {benchmark.name} industry averages</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {comparisons.map((comp, idx) => {
          const { status, icon: Icon, color } = getComparisonStatus(comp.current, comp.average);
          const percentDiff = ((comp.current - comp.average) / comp.average) * 100;

          return (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{comp.label}</p>
                  <p className="text-xs text-muted-foreground">{comp.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${color}`} />
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      status === 'above' 
                        ? 'border-destructive/50 text-destructive' 
                        : status === 'below' 
                          ? 'border-success/50 text-success' 
                          : ''
                    }`}
                  >
                    {Math.abs(percentDiff).toFixed(0)}% {status === 'above' ? 'above' : status === 'below' ? 'below' : 'at'} avg
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Your Est.</span>
                    <span className="text-xs font-medium">{formatCurrency(comp.current)}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        status === 'above' ? 'bg-destructive' : status === 'below' ? 'bg-success' : 'bg-primary'
                      }`}
                      style={{ width: `${Math.min((comp.current / (comp.average * 1.5)) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Industry Avg</span>
                    <span className="text-xs font-medium">{formatCurrency(comp.average)}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-muted-foreground/40 rounded-full"
                      style={{ width: `${Math.min((comp.average / (comp.average * 1.5)) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="p-4 rounded-lg bg-muted/50 border border-border mt-4">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Estimates based on {benchmark.name} industry benchmarks for businesses with{' '}
            {sizeMultiplier.employeeRange} employees. Actual costs may vary based on specific circumstances.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

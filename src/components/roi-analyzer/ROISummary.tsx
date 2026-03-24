import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Clock, Shield, Sparkles } from 'lucide-react';
import { ROISummary as ROISummaryType, formatCurrency } from '@/lib/roi-calculator';

interface ROISummaryProps {
  summary: ROISummaryType;
}

export function ROISummary({ summary }: ROISummaryProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Annual Savings */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-8 -mt-8" />
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-primary" />
            Annual Savings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary">
            {formatCurrency(summary.totalAnnualSavings)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Projected annual cost reduction
          </p>
        </CardContent>
      </Card>

      {/* Risk Avoidance */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-warning/5 rounded-full -mr-8 -mt-8" />
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Shield className="w-4 h-4 text-warning" />
            Risk Avoidance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-warning">
            {formatCurrency(summary.totalRiskAvoidance)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Annual security risk reduction
          </p>
        </CardContent>
      </Card>

      {/* Payback Period */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-success/5 rounded-full -mr-8 -mt-8" />
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Clock className="w-4 h-4 text-success" />
            Payback Period
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-success">
            {summary.avgPaybackMonths < 12 
              ? `${summary.avgPaybackMonths} mo`
              : `${(summary.avgPaybackMonths / 12).toFixed(1)} yr`
            }
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Average time to recoup investment
          </p>
        </CardContent>
      </Card>

      {/* 5-Year Value */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full -mr-8 -mt-8" />
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            5-Year Value
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary">
            {formatCurrency(summary.fiveYearValue)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Net value over 5 years
          </p>
          <Badge variant="outline" className="mt-2 text-xs text-primary border-primary/30">
            {summary.avgROIPercentage}% ROI
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
}

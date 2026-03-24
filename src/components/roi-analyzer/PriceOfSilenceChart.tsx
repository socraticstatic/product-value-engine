import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { calculateCumulativeLoss, getLossNarrative, generateSavingsAlternatives } from '@/lib/loss-messaging';
import { formatCurrency, formatCurrencyFull } from '@/lib/roi-calculator';

interface PriceOfSilenceChartProps {
  annualLoss: number;
  industryKey: string;
}

export function PriceOfSilenceChart({ annualLoss, industryKey }: PriceOfSilenceChartProps) {
  const cumulativeLosses = calculateCumulativeLoss(annualLoss, 5);
  const lossNarrative = getLossNarrative(industryKey);
  const savingsAlternatives = generateSavingsAlternatives(annualLoss);

  const chartData = cumulativeLosses.map(loss => ({
    year: `Year ${loss.year}`,
    loss: loss.cumulativeLoss,
    yearly: loss.yearlyLoss
  }));

  return (
    <Card className="border-destructive/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-destructive/10">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <CardTitle className="text-destructive">Price of In-Action</CardTitle>
            <CardDescription>{lossNarrative.headline}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Cumulative Loss Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="year" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrencyFull(value), 'Cumulative Loss']}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="loss" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
                fill="url(#lossGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Key Stats */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
            <p className="text-sm text-muted-foreground">Year 1 Loss</p>
            <p className="text-xl font-bold text-destructive">
              {formatCurrency(cumulativeLosses[0]?.cumulativeLoss || 0)}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
            <p className="text-sm text-muted-foreground">Year 3 Loss</p>
            <p className="text-xl font-bold text-destructive">
              {formatCurrency(cumulativeLosses[2]?.cumulativeLoss || 0)}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
            <p className="text-sm text-muted-foreground">Year 5 Loss</p>
            <p className="text-xl font-bold text-destructive">
              {formatCurrency(cumulativeLosses[4]?.cumulativeLoss || 0)}
            </p>
          </div>
        </div>

        {/* Industry-Specific Impact */}
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <h4 className="font-semibold text-sm mb-2">Industry Impact</h4>
          <p className="text-sm text-muted-foreground mb-3">{lossNarrative.hourlyImpact}</p>
          <div className="flex flex-wrap gap-2">
            {lossNarrative.criticalMoments.slice(0, 3).map((moment, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {moment}
              </Badge>
            ))}
          </div>
        </div>

        {/* What You Could Do Instead */}
        <div className="p-4 rounded-lg bg-success/5 border border-success/20">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-success" />
            <h4 className="font-semibold text-sm text-success">Instead of losing money, you could...</h4>
          </div>
          <ul className="space-y-2">
            {savingsAlternatives.map((alt, idx) => (
              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-success">•</span>
                {alt}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

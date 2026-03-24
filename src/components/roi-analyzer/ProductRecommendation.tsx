import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, AlertTriangle, DollarSign, Clock, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Recommendation } from './types';
import { formatCurrency } from '@/lib/roi-calculator';
import { DemoBlur } from '@/components/ui/DemoBlur';

interface ProductRecommendationProps {
  recommendation: Recommendation;
  rank: number;
}

export function ProductRecommendation({ recommendation, rank }: ProductRecommendationProps) {
  const [isExpanded, setIsExpanded] = useState(rank === 1);

  const matchColor = recommendation.matchScore >= 90 
    ? 'text-success' 
    : recommendation.matchScore >= 75 
      ? 'text-primary' 
      : 'text-warning';

  return (
    <Card className={cn(
      "transition-all",
      rank === 1 && "border-primary/50 shadow-lg"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
              rank === 1 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground"
            )}>
              {rank}
            </div>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {recommendation.productName}
                {rank === 1 && (
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Top Match
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>{recommendation.category}</CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className={cn("text-2xl font-bold", matchColor)}>
              {recommendation.matchScore}%
            </div>
            <p className="text-xs text-muted-foreground">Match Score</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Progress value={recommendation.matchScore} className="h-2" />

        <p className="text-sm text-muted-foreground"><DemoBlur>{recommendation.description}</DemoBlur></p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-success" />
            <div>
              <p className="text-sm font-medium">{recommendation.estimatedSavings}</p>
              <p className="text-xs text-muted-foreground">Est. Savings</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <div>
              <p className="text-sm font-medium">{recommendation.paybackPeriod}</p>
              <p className="text-xs text-muted-foreground">Payback</p>
            </div>
          </div>
        </div>

        {/* Why Recommended */}
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-primary">Why Recommended</p>
              <p className="text-sm text-muted-foreground mt-1"><DemoBlur>{recommendation.whyRecommended}</DemoBlur></p>
            </div>
          </div>
        </div>

        {/* Expandable Details */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>Less Details <ChevronUp className="w-4 h-4 ml-2" /></>
          ) : (
            <>More Details <ChevronDown className="w-4 h-4 ml-2" /></>
          )}
        </Button>

        {isExpanded && (
          <div className="space-y-4 pt-2 border-t border-border">
            {/* Industry Use Case */}
            <div>
              <p className="text-sm font-medium mb-2">Industry Use Case</p>
              <p className="text-sm text-muted-foreground"><DemoBlur>{recommendation.industryUseCase}</DemoBlur></p>
            </div>

            {/* Value Drivers */}
            <div>
              <p className="text-sm font-medium mb-2">Value Drivers</p>
              <div className="flex flex-wrap gap-2">
                {recommendation.valueDrivers.map((driver, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    <DemoBlur>{driver}</DemoBlur>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Risk of Inaction */}
            <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/10">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-destructive">Risk of Inaction</p>
                  <p className="text-sm text-muted-foreground mt-1"><DemoBlur>{recommendation.riskOfInaction}</DemoBlur></p>
                  <p className="text-sm font-medium text-destructive mt-2">
                    Potential Loss: <DemoBlur>{recommendation.potentialLoss}</DemoBlur>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

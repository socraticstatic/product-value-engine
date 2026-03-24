import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Clock, DollarSign, ChevronDown, ChevronUp, Crown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { MockPersona } from './mockPersonas';
import { ROISummary, formatCurrency } from '@/lib/roi-calculator';
import { INDUSTRIES, BUSINESS_SIZES, PAIN_POINTS } from './types';

interface PersonaROICardProps {
  persona: MockPersona;
  roiSummary: ROISummary;
  isBestFit?: boolean;
  rank?: number;
}

export function PersonaROICard({ persona, roiSummary, isBestFit, rank }: PersonaROICardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const industryLabel = INDUSTRIES.find(i => i.id === persona.profile.industry)?.label || persona.profile.industry;
  const sizeLabel = BUSINESS_SIZES.find(s => s.id === persona.profile.businessSize)?.label || persona.profile.businessSize;
  
  const painPointLabels = persona.profile.painPoints
    .map(pp => PAIN_POINTS.find(p => p.id === pp)?.label)
    .filter(Boolean)
    .slice(0, 3);

  return (
    <Card className={cn(
      "transition-all",
      isBestFit && "ring-2 ring-primary shadow-lg"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{persona.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{persona.name}</h3>
                {isBestFit && (
                  <Badge className="bg-primary text-primary-foreground text-xs">
                    <Crown className="w-3 h-3 mr-1" />
                    Best Fit
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                <Badge variant="outline" className="text-xs">
                  {industryLabel}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {sizeLabel}
                </Badge>
              </div>
            </div>
          </div>
          {rank && !isBestFit && (
            <span className="text-sm text-muted-foreground font-medium">#{rank}</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <TrendingUp className="w-4 h-4 mx-auto text-primary mb-1" />
            <p className="text-lg font-bold text-primary">{roiSummary.avgROIPercentage}%</p>
            <p className="text-xs text-muted-foreground">ROI</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <DollarSign className="w-4 h-4 mx-auto text-green-600 mb-1" />
            <p className="text-lg font-bold text-green-600">{formatCurrency(roiSummary.totalAnnualSavings)}</p>
            <p className="text-xs text-muted-foreground">Annual Savings</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <Clock className="w-4 h-4 mx-auto text-blue-600 mb-1" />
            <p className="text-lg font-bold text-blue-600">{roiSummary.avgPaybackMonths} mo</p>
            <p className="text-xs text-muted-foreground">Payback</p>
          </div>
        </div>

        {/* Pain Points */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">Key Pain Points:</p>
          <div className="flex flex-wrap gap-1">
            {painPointLabels.map((label, idx) => (
              <Badge key={idx} variant="destructive" className="text-xs font-normal">
                {label}
              </Badge>
            ))}
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
            <>
              Hide Details <ChevronUp className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              View Details <ChevronDown className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>

        {isExpanded && (
          <div className="space-y-4 pt-2 border-t">
            {/* Investment Summary */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Annual Investment</p>
                <p className="font-semibold">{formatCurrency(roiSummary.totalProjectedCosts)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">5-Year Value</p>
                <p className="font-semibold text-green-600">{formatCurrency(roiSummary.fiveYearValue)}</p>
              </div>
            </div>

            {/* Product Breakdown */}
            {roiSummary.products.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Investment Breakdown:</p>
                {roiSummary.products.map(product => (
                  <div key={product.productId} className="flex justify-between text-sm p-2 bg-muted/30 rounded">
                    <span className="text-muted-foreground">{product.productName}</span>
                    <span className="font-medium">{formatCurrency(product.totalAnnualSavings)}/yr</span>
                  </div>
                ))}
              </div>
            )}

            {/* Company Context */}
            <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
              <p className="font-medium text-foreground mb-1">{persona.profile.companyName}</p>
              <p>{persona.profile.additionalContext}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

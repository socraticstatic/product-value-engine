import { useMemo } from 'react';
import {
  calculateAllDimensionFits,
  EnhancedSegmentFit
} from '@/utils/segmentFitScoring';
import { PersonaFitScore } from '@/utils/personaFitScoring';
import { 
  aggregateSegmentCharacteristics, 
  getBusinessProfileSummary,
  getPrimaryDecisionStyle,
  industryIcons 
} from '@/utils/segmentAggregation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';


import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { 
  TrendingUp,
  Users,
  Check,
  Lightbulb,
  CircleDot,
  Building2,
  ChevronDown
} from 'lucide-react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { DemoBlur } from '@/components/ui/DemoBlur';



// Helper component for score breakdown bars
function ScoreBar({ label, score, weight }: { label: string; score: number; weight: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-20 text-muted-foreground">{label}</span>
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full rounded-full transition-all",
            score >= 70 ? "bg-success" : score >= 45 ? "bg-warning" : "bg-destructive/60"
          )}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="w-8 text-right">{score}%</span>
      <span className="w-12 text-muted-foreground text-right">({weight})</span>
    </div>
  );
}

// Helper component for persona badges with hover details
interface PersonaHoverBadgeProps {
  personaFit: PersonaFitScore;
  fitLevel: 'strong' | 'moderate' | 'weak';
}

function PersonaHoverBadge({ personaFit, fitLevel }: PersonaHoverBadgeProps) {
  const { 
    persona, 
    overallScore, 
    needsAlignment, 
    painPointMatch, 
    productAffinityMatch, 
    budgetFit, 
    reasoning, 
    matchedNeeds, 
    addressedPainPoints 
  } = personaFit;
  
  const bgClass = fitLevel === 'strong' 
    ? 'bg-success/10' 
    : fitLevel === 'moderate' 
      ? 'bg-warning/10' 
      : '';

  const fitLevelColors = fitLevel === 'strong'
    ? 'bg-success/20 text-success border-success/30'
    : fitLevel === 'moderate'
      ? 'bg-warning/20 text-warning border-warning/30'
      : 'bg-muted text-muted-foreground';

  const fitLevelLabel = fitLevel.charAt(0).toUpperCase() + fitLevel.slice(1);
  
  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Badge 
          variant="outline" 
          className={cn('text-xs cursor-pointer hover:bg-muted/80 transition-colors', bgClass)}
        >
          Seg {persona.segmentId} - {persona.industry}
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent className="w-80" side="top">
        <div className="space-y-3">
          {/* Header */}
          <div>
            <p className="font-semibold text-sm">{persona.segmentName}</p>
            <p className="text-xs text-muted-foreground">{persona.industry}</p>
          </div>
          
          {/* Fit Analysis Section */}
          <div className="space-y-2 pt-2 border-t">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium">Fit Analysis</p>
              <Badge variant="outline" className={cn('text-xs', fitLevelColors)}>
                {overallScore}/100 {fitLevelLabel}
              </Badge>
            </div>
            
            {/* Score Breakdown Bars */}
            <div className="space-y-1.5 text-xs">
              <ScoreBar label="Needs" score={needsAlignment} weight="35%" />
              <ScoreBar label="Pain Points" score={painPointMatch} weight="30%" />
              <ScoreBar label="Affinity" score={productAffinityMatch} weight="20%" />
              <ScoreBar label="Budget" score={budgetFit} weight="15%" />
            </div>
          </div>
          
          {/* Reasoning Section */}
          {reasoning.length > 0 && (
            <div className="pt-2 border-t">
              <p className="text-xs font-medium mb-1">Why This Rating</p>
              <ul className="text-xs space-y-0.5 text-muted-foreground">
                {reasoning.slice(0, 3).map((reason, i) => (
                  <li key={i}>• <DemoBlur>{reason}</DemoBlur></li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Matched Needs */}
          {matchedNeeds.length > 0 && (
            <div className="pt-2 border-t">
              <p className="text-xs font-medium mb-1 text-success">
                ✓ Matched Needs ({matchedNeeds.length})
              </p>
              <div className="flex flex-wrap gap-1">
                {matchedNeeds.slice(0, 4).map((need, i) => (
                  <Badge key={i} variant="outline" className="text-xs bg-success/10 text-success border-success/30">
                    {need}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Addressed Pain Points */}
          {addressedPainPoints.length > 0 && (
            <div className="pt-2 border-t">
              <p className="text-xs font-medium mb-1 text-primary">
                ✓ Addressed Pain Points ({addressedPainPoints.length})
              </p>
              <ul className="text-xs space-y-0.5 text-muted-foreground">
                {addressedPainPoints.slice(0, 3).map((pain, i) => (
                  <li key={i}>• <DemoBlur>{pain}</DemoBlur></li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Top Needs */}
          <div className="pt-2 border-t">
            <p className="text-xs font-medium mb-1">Top Needs</p>
            <div className="space-y-1">
              {persona.topNeeds.slice(0, 3).map((need, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span>{need.need}</span>
                  <span className="text-muted-foreground">{need.importance}%</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Key Pain Points */}
          <div>
            <p className="text-xs font-medium mb-1">Key Pain Points</p>
            <ul className="text-xs space-y-0.5 text-muted-foreground">
              {persona.painPoints.slice(0, 3).map((pain, i) => (
                <li key={i}>• <DemoBlur>{pain}</DemoBlur></li>
              ))}
            </ul>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

interface SegmentFitGridProps {
  productIds: string[];
  defaultDimension?: string;
}

export function SegmentFitGrid({ productIds }: SegmentFitGridProps) {
  const { topSegment, segmentLabel, characteristics, primarySegmentId } = useMemo(() => {
    if (productIds.length === 0) {
      return { 
        topSegment: null, 
        segmentLabel: '', 
        dimensionLabel: '',
        otherStrongSegments: [],
        characteristics: null,
        primarySegmentId: null
      };
    }

    const allDimensionFits = calculateAllDimensionFits(productIds);
    
    // Find the best segment across all dimensions
    let bestSegment: EnhancedSegmentFit | null = null;
    let bestDimensionLabel = '';
    const otherStrong: { segment: EnhancedSegmentFit; dimensionLabel: string }[] = [];
    
    allDimensionFits.forEach(dim => {
      dim.segments.forEach(seg => {
        if (seg.fitBreakdown.strong > 0) {
          if (!bestSegment || seg.fitBreakdown.strong > bestSegment.fitBreakdown.strong) {
            if (bestSegment) {
              otherStrong.push({ segment: bestSegment, dimensionLabel: bestDimensionLabel });
            }
            bestSegment = seg;
            bestDimensionLabel = dim.dimensionLabel;
          } else {
            otherStrong.push({ segment: seg, dimensionLabel: dim.dimensionLabel });
          }
        }
      });
    });

    // Sort other segments by strong fit count
    const sortedOther = otherStrong
      .sort((a, b) => b.segment.fitBreakdown.strong - a.segment.fitBreakdown.strong)
      .slice(0, 4);

    // Find most common segment ID from personas
    let mostCommonSegId: number | null = null;
    if (bestSegment) {
      const segIdCounts: Record<number, number> = {};
      bestSegment.personas.forEach(p => {
        const segId = p.persona.segmentId;
        if (segId) {
          segIdCounts[segId] = (segIdCounts[segId] || 0) + 1;
        }
      });
      const entries = Object.entries(segIdCounts);
      if (entries.length > 0) {
        mostCommonSegId = parseInt(entries.sort((a, b) => b[1] - a[1])[0][0]);
      }
    }

    return {
      topSegment: bestSegment,
      segmentLabel: bestSegment?.label || '',
      dimensionLabel: bestDimensionLabel,
      otherStrongSegments: sortedOther,
      characteristics: bestSegment ? aggregateSegmentCharacteristics(bestSegment.personas) : null,
      primarySegmentId: mostCommonSegId,
    };
  }, [productIds]);

  if (productIds.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <TrendingUp className="w-10 h-10 text-muted-foreground/50 mb-3" />
          <p className="text-sm text-muted-foreground">
            Select products to see segment fit analysis
          </p>
        </CardContent>
      </Card>
    );
  }



  if (!topSegment || !characteristics) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <Users className="w-10 h-10 text-muted-foreground/50 mb-3" />
          <p className="text-sm text-muted-foreground">
            No strong segment fits found for selected products
          </p>
        </CardContent>
      </Card>
    );
  }

  const { strong, total } = topSegment.fitBreakdown;
  const primaryIndustry = characteristics.industries[0];
  const industryIcon = primaryIndustry 
    ? industryIcons[primaryIndustry.name] || '🏢' 
    : '🏢';

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Best Fit Segments
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Where this product resonates most
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Primary Segment Summary */}
        <div className="p-4 rounded-lg bg-card border">
          {/* Industry Header */}
          <Collapsible>
            <div className="flex items-start gap-3 mb-4">
              <span className="text-3xl">{industryIcon}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-base uppercase tracking-wide">
                  {primarySegmentId ? `${primarySegmentId > 7 ? 'Enterprise' : `Seg ${primarySegmentId}`} - ` : ''}{primaryIndustry?.name || segmentLabel}
                </h3>
                {characteristics.industries.length > 1 && (
                  <CollapsibleTrigger className="flex items-center gap-1 text-xs text-primary hover:underline cursor-pointer">
                    <ChevronDown className="w-3 h-3 transition-transform data-[state=open]:rotate-180" />
                    +{characteristics.industries.length - 1} more industries
                  </CollapsibleTrigger>
                )}
              </div>
              <Badge variant="outline" className={cn('text-xs', topSegment.color)}>
                {segmentLabel}
              </Badge>
            </div>
            <CollapsibleContent>
              <div className="grid grid-cols-2 gap-2 mb-4 pl-11">
                {characteristics.industries.slice(1).map((industry, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span>{industryIcons[industry.name] || '🏢'}</span>
                    <span>{industry.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {industry.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Business Profile */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Building2 className="w-3.5 h-3.5" />
              Business Profile:
            </div>
            <ul className="text-sm space-y-1.5 pl-5">
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground">•</span>
                <span>{getBusinessProfileSummary(characteristics) || 'Various sizes'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground">•</span>
                <span>{getPrimaryDecisionStyle(characteristics)} decision making</span>
              </li>
              {characteristics.buyingBehaviors[0] && (
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground">•</span>
                  <span>{characteristics.buyingBehaviors[0].label} buying behavior</span>
                </li>
              )}
            </ul>
          </div>

          {/* Common Needs */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              Common Needs They Share:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {characteristics.commonNeeds.slice(0, 4).map((need, i) => (
                <Badge 
                  key={i}
                  variant="outline" 
                  className={cn(
                    'text-xs gap-1',
                    need.coverage >= 70 && 'bg-success/10 text-success border-success/30',
                    need.coverage >= 40 && need.coverage < 70 && 'bg-muted',
                    need.coverage < 40 && 'bg-muted/50 text-muted-foreground'
                  )}
                >
                  {need.coverage >= 70 && <Check className="w-3 h-3" />}
                  {need.need}
                </Badge>
              ))}
            </div>
          </div>

          {/* Fit Indicator */}
          <Collapsible>
            <div className="pt-3 border-t">
              <CollapsibleTrigger className="flex items-center gap-3 w-full hover:bg-muted/50 -mx-2 px-2 py-1 rounded cursor-pointer">
                <div className="flex gap-0.5">
                  {Array.from({ length: Math.min(total, 5) }).map((_, i) => (
                    <CircleDot 
                      key={i}
                      className={cn(
                        'w-4 h-4',
                        i < strong && 'text-success fill-success',
                        i >= strong && i < strong + topSegment.fitBreakdown.moderate && 'text-warning fill-warning',
                        i >= strong + topSegment.fitBreakdown.moderate && 'text-muted-foreground'
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">
                  {strong} of {total} Strong Fit
                </span>
                <ChevronDown className="w-4 h-4 ml-auto transition-transform data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              
              <CollapsibleContent className="pt-3 space-y-3">
                {/* Strong Fits */}
                {strong > 0 && (
                  <div>
                    <p className="text-xs font-medium text-success mb-1.5">Strong Fit ({strong})</p>
                    <div className="flex flex-wrap gap-1.5">
                      {topSegment.personas
                        .filter(p => p.overallScore >= 75)
                        .map((p, i) => (
                          <PersonaHoverBadge key={i} personaFit={p} fitLevel="strong" />
                        ))}
                    </div>
                  </div>
                )}
                
                {/* Moderate Fits */}
                {topSegment.fitBreakdown.moderate > 0 && (
                  <div>
                    <p className="text-xs font-medium text-warning mb-1.5">Moderate Fit ({topSegment.fitBreakdown.moderate})</p>
                    <div className="flex flex-wrap gap-1.5">
                      {topSegment.personas
                        .filter(p => p.overallScore >= 50 && p.overallScore < 75)
                        .map((p, i) => (
                          <PersonaHoverBadge key={i} personaFit={p} fitLevel="moderate" />
                        ))}
                    </div>
                  </div>
                )}
                
                {/* Weak Fits */}
                {topSegment.fitBreakdown.weak > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1.5">
                      Weak Fit ({topSegment.fitBreakdown.weak})
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {topSegment.personas
                        .filter(p => p.overallScore < 50)
                        .map((p, i) => (
                          <PersonaHoverBadge key={i} personaFit={p} fitLevel="weak" />
                        ))}
                    </div>
                  </div>
                )}
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>

        {/* Sales Tip */}
        {topSegment.salesTip && (
          <div className="p-3 rounded-lg bg-card border border-border">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium mb-1">Sales Tip</p>
                <p className="text-xs text-muted-foreground"><DemoBlur>{topSegment.salesTip}</DemoBlur></p>
              </div>
            </div>
          </div>
        )}

      </CardContent>
    </Card>
  );
}

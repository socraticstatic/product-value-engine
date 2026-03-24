import { useMemo } from 'react';
import { EnhancedSegmentFit } from '@/utils/segmentFitScoring';
import { 
  aggregateSegmentCharacteristics, 
  getBusinessProfileSummary,
  getPrimaryDecisionStyle,
  industryIcons 
} from '@/utils/segmentAggregation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';


import { TrendingUp, Users, Check, CircleDot, Building2 } from 'lucide-react';
import { SegmentNeedsBar } from './SegmentNeedsBar';
import { cn } from '@/lib/utils';

interface TopSegmentCardProps {
  allDimensionFits: DimensionFitResult[];
}

export function TopSegmentCard({ allDimensionFits }: TopSegmentCardProps) {
  // Find the best segment across all dimensions
  const { topSegment, topDimensionLabel, otherStrongSegments, characteristics } = useMemo(() => {
    let bestSegment: EnhancedSegmentFit | null = null;
    let bestDimensionLabel = '';
    const otherStrong: { segment: EnhancedSegmentFit; dimensionLabel: string }[] = [];

    allDimensionFits.forEach(dim => {
      dim.segments.forEach(seg => {
        if (seg.fitBreakdown.strong > 0) {
          if (!bestSegment || seg.fitBreakdown.strong > bestSegment.fitBreakdown.strong) {
            // Move current best to "other" list
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

    // Sort and limit other segments
    const sortedOther = otherStrong
      .sort((a, b) => b.segment.fitBreakdown.strong - a.segment.fitBreakdown.strong)
      .slice(0, 4);

    return {
      topSegment: bestSegment,
      topDimensionLabel: bestDimensionLabel,
      otherStrongSegments: sortedOther,
      characteristics: bestSegment ? aggregateSegmentCharacteristics(bestSegment.personas) : null,
    };
  }, [allDimensionFits]);

  if (!topSegment || !characteristics) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <Users className="w-10 h-10 text-muted-foreground/50 mb-3" />
          <p className="text-sm text-muted-foreground">
            No strong segment fits found — showing moderate matches
          </p>
        </CardContent>
      </Card>
    );
  }

  const { strong, moderate, total } = topSegment.fitBreakdown;
  const primaryIndustry = characteristics.industries[0];
  const industryIcon = primaryIndustry 
    ? industryIcons[primaryIndustry.name] || '🏢' 
    : '🏢';

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          Best Fit Segments
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Best Match Header */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Best Match:</span>
            <Badge variant="outline" className={cn('py-1 px-2.5', topSegment.color)}>
              {topSegment.label}
            </Badge>
            <span className="text-xs text-muted-foreground">({topDimensionLabel})</span>
          </div>
          <div className="text-sm font-medium">
            <span className="text-primary">{strong}</span>
            <span className="text-muted-foreground"> of {total} strong fit</span>
          </div>
        </div>

        {/* Segment Profile Summary - Replaces Persona Cards */}
        <div className="p-4 rounded-lg bg-card border">
          {/* Industry Header */}
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">{industryIcon}</span>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm uppercase tracking-wide">
                {primaryIndustry?.name || 'Various Industries'}
              </h4>
              {characteristics.industries.length > 1 && (
                <p className="text-xs text-muted-foreground">
                  +{characteristics.industries.length - 1} more
                </p>
              )}
            </div>
          </div>

          {/* Business Profile */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Building2 className="w-3 h-3" />
              <span>Business Profile:</span>
            </div>
            <ul className="text-xs space-y-1 pl-5">
              <li className="flex items-start gap-1.5">
                <span className="text-muted-foreground">•</span>
                <span>{getBusinessProfileSummary(characteristics) || 'Various sizes'}</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-muted-foreground">•</span>
                <span>{getPrimaryDecisionStyle(characteristics)} decisions</span>
              </li>
              {characteristics.buyingBehaviors[0] && (
                <li className="flex items-start gap-1.5">
                  <span className="text-muted-foreground">•</span>
                  <span>{characteristics.buyingBehaviors[0].label}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Common Needs */}
          <div className="flex flex-wrap gap-1">
            {characteristics.commonNeeds.slice(0, 4).map((need, i) => (
              <Badge 
                key={i}
                variant="outline" 
                className={cn(
                  'text-xs gap-1',
                  need.coverage >= 70 && 'bg-success/10 text-success border-success/30'
                )}
              >
                {need.coverage >= 70 && <Check className="w-2.5 h-2.5" />}
                {need.need}
              </Badge>
            ))}
          </div>

          {/* Fit dots */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t">
            <div className="flex gap-0.5">
              {Array.from({ length: Math.min(total, 5) }).map((_, i) => (
                <CircleDot 
                  key={i}
                  className={cn(
                    'w-3.5 h-3.5',
                    i < strong && 'text-success fill-success',
                    i >= strong && i < strong + moderate && 'text-warning fill-warning',
                    i >= strong + moderate && 'text-muted-foreground'
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              Fit: {strong} strong, {moderate} moderate
            </span>
          </div>
        </div>

        {/* Common Needs Aggregation */}
        <SegmentNeedsBar personas={topSegment.personas} />

        {/* Other Strong Segments */}
        {otherStrongSegments.length > 0 && (
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Other Strong Segments:</p>
            <div className="flex flex-wrap gap-2">
              {otherStrongSegments.map(({ segment }) => (
                <Badge 
                  key={`${segment.dimension}-${segment.value}`}
                  variant="outline"
                  className="text-xs"
                >
                  <span className="font-bold mr-1">
                    {segment.fitBreakdown.strong}/{segment.fitBreakdown.total}
                  </span>
                  {segment.label}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

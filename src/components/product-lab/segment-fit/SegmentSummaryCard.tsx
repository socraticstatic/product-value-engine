import { useMemo } from 'react';
import { EnhancedSegmentFit } from '@/utils/segmentFitScoring';
import { 
  aggregateSegmentCharacteristics, 
  getBusinessProfileSummary,
  getPrimaryDecisionStyle,
  industryIcons,
  SegmentCharacteristics 
} from '@/utils/segmentAggregation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Building2, 
  Users, 
  Check, 
  CircleDot,
  Lightbulb
} from 'lucide-react';

interface SegmentSummaryCardProps {
  segment: EnhancedSegmentFit;
  showSalesTip?: boolean;
  compact?: boolean;
}

export function SegmentSummaryCard({ 
  segment, 
  showSalesTip = true,
  compact = false 
}: SegmentSummaryCardProps) {
  const characteristics = useMemo(() => 
    aggregateSegmentCharacteristics(segment.personas),
    [segment.personas]
  );

  const primaryIndustry = characteristics.industries[0];
  const industryIcon = primaryIndustry 
    ? industryIcons[primaryIndustry.name] || '🏢' 
    : '🏢';

  const { strong, moderate, weak, total } = segment.fitBreakdown;

  // Fit dots visualization
  const fitDots = useMemo(() => {
    const dots: ('strong' | 'moderate' | 'weak')[] = [];
    for (let i = 0; i < strong; i++) dots.push('strong');
    for (let i = 0; i < moderate; i++) dots.push('moderate');
    for (let i = 0; i < weak; i++) dots.push('weak');
    return dots.slice(0, 5); // Max 5 dots
  }, [strong, moderate, weak]);

  if (compact) {
    return (
      <Card className="border-l-4 border-l-primary/50 min-w-[260px]">
        <CardContent className="p-4">
          {/* Industry Header */}
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">{industryIcon}</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">
                {primaryIndustry?.name || segment.label}
              </p>
              <p className="text-xs text-muted-foreground">
                {getBusinessProfileSummary(characteristics)}
              </p>
            </div>
          </div>

          {/* Fit indicator */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {fitDots.map((fit, i) => (
                <CircleDot 
                  key={i}
                  className={cn(
                    'w-3 h-3',
                    fit === 'strong' && 'text-success fill-success',
                    fit === 'moderate' && 'text-warning fill-warning',
                    fit === 'weak' && 'text-muted-foreground'
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {strong} of {total} strong
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-l-4 border-l-primary/50">
      <CardContent className="p-5 space-y-4">
        {/* Industry Header */}
        <div className="flex items-start gap-3">
          <span className="text-3xl">{industryIcon}</span>
          <div className="flex-1">
            <h3 className="font-semibold text-base uppercase tracking-wide">
              {primaryIndustry?.name || segment.label}
            </h3>
            {characteristics.industries.length > 1 && (
              <p className="text-xs text-muted-foreground">
                +{characteristics.industries.length - 1} more industries
              </p>
            )}
          </div>
          <Badge variant="outline" className={cn('text-xs', segment.color)}>
            {segment.label}
          </Badge>
        </div>

        {/* Business Profile */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Building2 className="w-3.5 h-3.5" />
            <span>Business Profile:</span>
          </div>
          <ul className="text-sm space-y-1 pl-5">
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
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            <span>Common Needs They Share:</span>
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
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {fitDots.map((fit, i) => (
                <CircleDot 
                  key={i}
                  className={cn(
                    'w-4 h-4',
                    fit === 'strong' && 'text-success fill-success',
                    fit === 'moderate' && 'text-warning fill-warning',
                    fit === 'weak' && 'text-muted-foreground'
                  )}
                />
              ))}
            </div>
            <span className="text-sm font-medium">
              {strong} of {total} Strong Fit
            </span>
          </div>
        </div>

        {/* Sales Tip */}
        {showSalesTip && segment.salesTip && (
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground line-clamp-2">
                {segment.salesTip}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

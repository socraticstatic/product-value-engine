import { useMemo } from 'react';
import { EnhancedSegmentFit } from '@/utils/segmentFitScoring';
import { 
  aggregateSegmentCharacteristics, 
  getBusinessProfileSummary,
  getPrimaryDecisionStyle,
  industryIcons 
} from '@/utils/segmentAggregation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { ChevronRight, Users, Lightbulb, Building2, ChevronDown, Check, CircleDot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FitBreakdownDisplay } from './FitBreakdownDisplay';
import { AddressedNeedsDisplay } from './AddressedNeedsDisplay';
import { CompetitivePositionDisplay } from './CompetitivePositionDisplay';

interface SegmentCardProps {
  segment: EnhancedSegmentFit;
  compact?: boolean;
}

export function SegmentCard({ segment, compact = false }: SegmentCardProps) {
  const hasStrongFit = segment.fitBreakdown.strong > 0;
  
  const characteristics = useMemo(() => 
    aggregateSegmentCharacteristics(segment.personas),
    [segment.personas]
  );

  const primaryIndustry = characteristics.industries[0];
  const industryIcon = primaryIndustry 
    ? industryIcons[primaryIndustry.name] || '🏢' 
    : '🏢';

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card 
          className={cn(
            'group cursor-pointer transition-all hover:shadow-md border-l-4',
            hasStrongFit ? 'border-l-success' : 'border-l-muted-foreground/30'
          )}
        >
          <CardContent className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={cn('text-xs font-semibold', segment.color)}>
                  {segment.personas.length > 0 && segment.personas[0].persona.segmentId
                    ? `${segment.personas[0].persona.segmentId > 7 ? 'Enterprise' : `Seg ${segment.personas[0].persona.segmentId}`} - ${characteristics.industries[0]?.name || segment.label}`
                    : segment.label}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  ({segment.personaCount} profiles)
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Three Metrics */}
            <div className="space-y-3">
              <FitBreakdownDisplay fitBreakdown={segment.fitBreakdown} compact={compact} />
              
              {!compact && (
                <>
                  <Separator className="my-2" />
                  <AddressedNeedsDisplay addressedNeeds={segment.addressedNeeds} compact={compact} />
                  <Separator className="my-2" />
                  <CompetitivePositionDisplay positions={segment.competitivePosition} compact={compact} />
                </>
              )}

              {/* Sales Tip Preview */}
              {segment.salesTip && !compact && (
                <>
                  <Separator className="my-2" />
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Lightbulb className="w-3 h-3 mt-0.5 shrink-0 text-primary" />
                    <span className="line-clamp-2">{segment.salesTip}</span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      {/* Expanded Dialog */}
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Badge variant="outline" className={cn('text-sm', segment.color)}>
              {segment.personas.length > 0 && segment.personas[0].persona.segmentId
                ? `${segment.personas[0].persona.segmentId > 7 ? 'Enterprise' : `Seg ${segment.personas[0].persona.segmentId}`} - ${characteristics.industries[0]?.name || segment.label}`
                : segment.label}
            </Badge>
            <span className="text-lg font-medium text-muted-foreground">
              Segment Profile
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Description */}
          <div className="p-3 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">{segment.description}</p>
          </div>

          {/* Segment Characteristics - NEW SECTION */}
          <div className="p-4 rounded-lg border bg-card">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">{industryIcon}</span>
              <div className="flex-1">
                <h4 className="font-semibold text-sm uppercase tracking-wide">
                  {primaryIndustry?.name || 'Various Industries'}
                </h4>
                {characteristics.industries.length > 1 && (
                  <p className="text-xs text-muted-foreground">
                    Also: {characteristics.industries.slice(1, 3).map(i => i.name).join(', ')}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Building2 className="w-3 h-3" />
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
                {characteristics.techSophisticationSummary && characteristics.techSophisticationSummary !== 'N/A' && (
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>{characteristics.techSophisticationSummary} sophistication</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Common Needs */}
            <div className="flex flex-wrap gap-1.5">
              {characteristics.commonNeeds.slice(0, 5).map((need, i) => (
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
          </div>

          {/* Fit Breakdown */}
          <FitBreakdownDisplay fitBreakdown={segment.fitBreakdown} />

          {/* Addressed Needs */}
          <AddressedNeedsDisplay addressedNeeds={segment.addressedNeeds} />

          {/* Competitive Position */}
          <CompetitivePositionDisplay positions={segment.competitivePosition} />

          {/* Sales Tip */}
          {segment.salesTip && (
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium mb-1">Sales Tip</h4>
                  <p className="text-sm text-muted-foreground">{segment.salesTip}</p>
                </div>
              </div>
            </div>
          )}

          {/* Example Profiles - Collapsible */}
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4" />
                <span>View Example Business Profiles</span>
                <span className="text-muted-foreground">({segment.personaCount})</span>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform [[data-state=open]>&]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3">
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {segment.personas.map((fit) => (
                  <div 
                    key={fit.persona.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/30"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{fit.persona.avatar}</span>
                      <div>
                        <p className="text-sm font-medium">{fit.persona.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {fit.persona.industry} • {fit.persona.employeeCount}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CircleDot 
                        className={cn(
                          'w-3 h-3',
                          fit.overallScore >= 70 && 'text-success fill-success',
                          fit.overallScore >= 45 && fit.overallScore < 70 && 'text-warning fill-warning',
                          fit.overallScore < 45 && 'text-muted-foreground'
                        )}
                      />
                      <span className="text-xs text-muted-foreground">
                        {fit.overallScore >= 70 ? 'Strong' : fit.overallScore >= 45 ? 'Moderate' : 'Weak'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </DialogContent>
    </Dialog>
  );
}

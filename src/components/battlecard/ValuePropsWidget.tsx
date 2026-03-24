import { useState } from 'react';
import { Product, getValuePropositionSummary } from '@/data/products';
import { BattlecardWidget } from './BattlecardWidget';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Zap, Briefcase, CheckCircle2, Heart, Star, Target, ArrowRight, Lightbulb, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { CustomerProfile, painPointOptions, priorityOptions } from '@/types/customer';
import { getProductDifferentiators } from '@/data/competitiveDifferentiation';
import { getNeedTagColor } from '@/utils/needTagsSystem';
import { 
  getNuancedSolution,
  getNuancedPriority,
  getEmpatheticOpener,
  mapFeaturesToBusinessImpacts,
  getSituationAcknowledgment,
  getFullValueProposition,
  getContextSpecificBenefit,
  getContextSpecificBenefits
} from '@/utils/businessImpactLanguage';
import { businessGradeCore } from '@/data/businessGradePillars';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { DemoBlur } from '@/components/ui/DemoBlur';

interface ValuePropsWidgetProps {
  products: Product[];
  customerProfile: CustomerProfile;
}

// Get customer type label - more conversational
function getCustomerTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'small-business': 'Small Business',
    'mid-market': 'Growing Business',
    'enterprise': 'Enterprise'
  };
  return labels[type] || type;
}

// Get location context - more natural
function getLocationContext(locations: string): string {
  const contexts: Record<string, string> = {
    '1': 'at your location',
    '2-5': 'across your locations',
    '6-20': 'across your multi-site operation',
    '20+': 'enterprise-wide'
  };
  return contexts[locations] || 'at your locations';
}

// Generate a full, narrative-driven value proposition statement
function getPersonalizedValueStatement(product: Product, profile: CustomerProfile): string {
  // Use the new full value proposition generator with quantified impacts and industry transformations
  return getFullValueProposition(product, profile);
}

// Generate a shorter value statement for collapsed view
function getShortValueStatement(product: Product, profile: CustomerProfile): string {
  const vps = product.valuePropositionStatement;
  
  // Get nuanced outcome based on priority or pain point  
  let outcomeStatement = '';
  if (profile.priorities.length > 0) {
    const priorityInfo = getNuancedPriority(profile.priorities[0], profile);
    outcomeStatement = priorityInfo.outcome;
  } else if (profile.painPoints.length > 0) {
    outcomeStatement = getNuancedSolution(profile.painPoints[0], profile);
  }
  
  // Build concise statement: Benefit → Outcome
  const benefit = vps.keyBenefit.replace(/^that /, '').charAt(0).toUpperCase() + vps.keyBenefit.replace(/^that /, '').slice(1);
  
  if (outcomeStatement) {
    return `${benefit} — ${outcomeStatement.charAt(0).toLowerCase() + outcomeStatement.slice(1)}.`;
  }
  
  return `${benefit}.`;
}

// Map product features to customer needs
function matchProductToNeeds(product: Product, profile: CustomerProfile): Array<{
  need: string;
  needType: 'priority' | 'painPoint';
  feature: string;
  benefit: string;
}> {
  const matches: Array<{
    need: string;
    needType: 'priority' | 'painPoint';
    feature: string;
    benefit: string;
  }> = [];
  
  const featureKeywords: Record<string, string[]> = {
    'reliability': ['uptime', 'reliable', 'guarantee', 'sla', '99.9'],
    'security': ['security', 'protect', 'encrypt', 'safe', 'threat'],
    'speed': ['speed', 'fast', 'gbps', 'bandwidth', 'fiber'],
    'scalability': ['scale', 'grow', 'flexible', 'expand'],
    'cost-savings': ['save', 'no fee', 'included', 'value', 'no extra'],
    'backup-failover': ['backup', 'failover', 'redundant', '5g backup'],
    'slow-speeds': ['speed', 'fast', 'gbps', 'bandwidth'],
    'downtime': ['uptime', 'reliable', 'backup', 'failover'],
    'security-concerns': ['security', 'protect', 'encrypt', 'threat'],
    'high-costs': ['no fee', 'included', 'no extra', 'save'],
    'poor-support': ['support', '24/7', 'dedicated', 'priority'],
    'no-backup': ['backup', 'failover', 'redundant'],
  };
  
  const allNeeds = [
    ...profile.priorities.map(p => ({ id: p, type: 'priority' as const })),
    ...profile.painPoints.map(p => ({ id: p, type: 'painPoint' as const }))
  ];
  
  for (const need of allNeeds) {
    const keywords = featureKeywords[need.id] || [];
    for (const feature of product.features) {
      const lower = feature.toLowerCase();
      if (keywords.some(kw => lower.includes(kw))) {
        const benefit = need.type === 'painPoint' 
          ? getNuancedSolution(need.id, profile)
          : getNuancedPriority(need.id, profile).outcome;
        
        if (!matches.find(m => m.need === need.id)) {
          matches.push({
            need: need.id,
            needType: need.type,
            feature,
            benefit
          });
        }
        break;
      }
    }
  }
  
  return matches;
}

export function ValuePropsWidget({ products, customerProfile }: ValuePropsWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const { isDemoMode } = useDemoMode();
  const primaryProduct = products[0];
  const competitiveAdvantages = [...new Set(products.flatMap(p => p.competitiveAdvantages))];
  const businessDifferentiators = [...new Set(products.flatMap(p => p.businessDifferentiators || []))];
  
  // Get feature-to-impact mappings for the customer's industry
  const featureImpacts = mapFeaturesToBusinessImpacts(
    primaryProduct?.features || [],
    customerProfile.industry
  );
  
  // Match product features to customer needs
  const needMatches = primaryProduct ? matchProductToNeeds(primaryProduct, customerProfile) : [];
  
  // Get empathetic opener for primary pain point (now conversational)
  const primaryPainPoint = customerProfile.painPoints[0];
  const empatheticOpener = primaryPainPoint 
    ? getEmpatheticOpener(primaryPainPoint, customerProfile)
    : null;
  
  // Get situation acknowledgment for additional context
  const situationContext = primaryPainPoint 
    ? getSituationAcknowledgment(primaryPainPoint, customerProfile)
    : null;

  // Get pain point labels
  const getPainPointLabel = (painPoint: string) => 
    painPointOptions.find(p => p.id === painPoint)?.label || painPoint;

  // Summary for collapsed state - more conversational
  const summaryText = primaryProduct 
    ? `How we help with your ${needMatches.length} key challenges`
    : 'Value proposition details';

  // Demo mode: We render the real UI with blur applied to sensitive content (no placeholder replacement)

  return (
    <BattlecardWidget title="Value Proposition" icon={Zap} iconColor="text-warning">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        {/* Collapsed Summary */}
        <CollapsibleTrigger asChild>
          <div className="cursor-pointer">
            {!isExpanded && (
              <div className="space-y-3">
                {/* Empathetic Opener Preview */}
                {empatheticOpener && (
                  <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageCircle className="w-4 h-4 text-accent" />
                      <span className="text-xs font-semibold text-accent uppercase tracking-wide">Open With</span>
                    </div>
                    <p className="text-sm text-foreground line-clamp-2">
                      <DemoBlur>"{empatheticOpener}"</DemoBlur>
                    </p>
                  </div>
                )}
                
                {/* Value Statement Preview - shorter version */}
                {primaryProduct && (
                  <div className="p-3 rounded-lg gradient-primary text-primary-foreground">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-wide opacity-90">
                        Value Proposition
                      </span>
                    </div>
                    <p className="text-[10px] uppercase tracking-wide opacity-70 mb-1">The Bottom Line</p>
                    <p className="text-sm font-medium leading-relaxed line-clamp-3">
                      <DemoBlur>{getShortValueStatement(primaryProduct, customerProfile)}</DemoBlur>
                    </p>
                  </div>
                )}
              </div>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-between mt-3 text-muted-foreground hover:text-foreground"
            >
              <span className="text-xs">{isExpanded ? 'Show less' : `${summaryText} →`}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="space-y-4 pt-2">
            {/* Conversational Opener */}
            {empatheticOpener && (
              <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
                <div className="flex items-center gap-2 mb-1">
                  <MessageCircle className="w-4 h-4 text-accent" />
                  <span className="text-xs font-semibold text-accent uppercase tracking-wide">Open the Conversation</span>
                </div>
                <p className="text-sm text-foreground">
                  <DemoBlur>"{empatheticOpener}"</DemoBlur>
                </p>
              </div>
            )}

            {/* The Value Statement */}
            {primaryProduct && (
              <div className="p-4 rounded-lg gradient-primary text-primary-foreground">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide opacity-90">
                    Value Proposition
                  </span>
                </div>
                <p className="text-[10px] uppercase tracking-wide opacity-70 mb-2">The Bottom Line for {customerProfile.industry.replace(/-/g, ' ')}</p>
                <p className="text-sm font-medium leading-relaxed">
                  <DemoBlur>{getPersonalizedValueStatement(primaryProduct, customerProfile)}</DemoBlur>
                </p>
              </div>
            )}

            {/* What This Solves - More conversational header */}
            {needMatches.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Heart className="w-4 h-4 text-destructive" />
                  What This Solves For You
                </h4>
                <div className="space-y-2">
                  {needMatches.slice(0, 4).map((match, idx) => {
                    const colors = getNeedTagColor(match.need);
                    const label = match.needType === 'painPoint' 
                      ? getPainPointLabel(match.need)
                      : getNuancedPriority(match.need, customerProfile).label;
                    
                    // Use context-specific benefit for speed and downtime related needs
                    let benefitText = match.benefit;
                    if (match.need === 'slow-speeds' || match.need === 'speed') {
                      benefitText = getContextSpecificBenefit('speed-performance', customerProfile);
                    } else if (match.need === 'downtime' || match.need === 'reliability' || match.need === 'no-backup') {
                      benefitText = getContextSpecificBenefit('reliability-uptime', customerProfile);
                    }
                    
                    return (
                      <div 
                        key={idx} 
                        className="p-3 rounded-md bg-muted/30 border border-border/50"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <Badge 
                            variant="outline"
                            className={`${colors.bg} ${colors.text} ${colors.border} text-[10px]`}
                          >
                            {match.needType === 'painPoint' ? '✓ ' : ''}{label}
                          </Badge>
                        </div>
                        <div className="flex items-start gap-2">
                          <ArrowRight className="w-3 h-3 text-success mt-1 shrink-0" />
                          <div>
                            <p className="text-sm text-foreground font-medium"><DemoBlur>{benefitText}</DemoBlur></p>
                            <p className="text-xs text-muted-foreground mt-0.5">via: <DemoBlur>{match.feature}</DemoBlur></p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Feature to Business Impact - Industry Specific */}
            {featureImpacts.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  In Plain Terms for {customerProfile.industry.replace(/-/g, ' ')}
                </h4>
                <div className="space-y-1.5">
                  {featureImpacts.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2 rounded bg-muted/20">
                      <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-foreground"><DemoBlur>{item.feature}</DemoBlur></span>
                        <span className="text-sm text-muted-foreground"> — <DemoBlur>{item.impact}</DemoBlur></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Business Grade Core - More conversational */}
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">Why AT&T Business</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {businessGradeCore.tagline}
              </p>
            </div>

            {/* Business vs Consumer - More conversational */}
            {businessDifferentiators.length > 0 && (
              <div className="p-3 rounded-lg bg-secondary/20 border border-secondary/30">
                <h4 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">
                  The Difference {getLocationContext(customerProfile.locations)}
                </h4>
                <div className="space-y-1.5">
                  {businessDifferentiators.slice(0, 3).map((diff, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-accent font-bold">→</span>
                      <span className="text-muted-foreground">{diff}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Competitive advantages - More conversational */}
            {competitiveAdvantages.length > 0 && customerProfile.currentProvider && customerProfile.currentProvider.length > 0 && (
              <div className="pt-3 border-t border-border">
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  What Changes When You Switch from {customerProfile.currentProvider.join(', ')}
                </h4>
                <div className="space-y-1.5">
                  {competitiveAdvantages.slice(0, 3).map((advantage, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-success font-bold">✓</span>
                      <span className="text-muted-foreground">{advantage}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </BattlecardWidget>
  );
}

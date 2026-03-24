import { useState } from 'react';
import { Product } from '@/data/products';
import { CustomerProfile, painPointOptions } from '@/types/customer';
import { BattlecardWidget } from './BattlecardWidget';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Quote, Lightbulb, Shield, Wifi, HeadphonesIcon, Sparkles, DollarSign, Radio, ChevronDown } from 'lucide-react';
import { getNeedTagColor } from '@/utils/needTagsSystem';
import {
  getEmpatheticOpener,
  getPriorityOpener,
  getNuancedPriority
} from '@/utils/businessImpactLanguage';
import {
  businessGradePillars,
  painPointToPillarMap,
  priorityToPillarMap,
  getBusinessGradePillar
} from '@/data/businessGradePillars';
import {
  is5GAdvancedRelevant,
  get5GTalkingPointsForIndustry
} from '@/data/fiveGEducation';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { DemoBlur } from '@/components/ui/DemoBlur';

interface TalkingPointsWidgetProps {
  products: Product[];
  customerProfile: CustomerProfile;
}

interface TalkingPoint {
  opener: string;
  detail: string;
  needId: string;
  needType: 'priority' | 'painPoint' | 'general';
  needLabel: string;
  businessGradePillar?: string;
  keyPhrase?: string;
}

const pillarIcons: Record<string, typeof Wifi> = {
  'always-connected': Wifi,
  'always-secure': Shield,
  'effortlessly-simple': Sparkles,
  'expert-support': HeadphonesIcon,
  'best-value': DollarSign,
  '5g-advanced': Radio,
};

export function TalkingPointsWidget({ products, customerProfile }: TalkingPointsWidgetProps) {
  const [isOpen, setIsOpen] = useState(true);
  // Helper to get business-specific phrase
  const getBusinessPhrase = (): string | null => {
    if (!customerProfile.businessDescription?.trim()) return null;
    const desc = customerProfile.businessDescription.trim().toLowerCase();
    return desc.replace(/^(a |an |the |our |my |your )/i, '');
  };

  const getCustomizedPoints = (): TalkingPoint[] => {
    const points: TalkingPoint[] = [];
    const businessPhrase = getBusinessPhrase();
    
    customerProfile.painPoints.forEach(painPoint => {
      const painPointOption = painPointOptions.find(p => p.id === painPoint);
      const matchingPoint = findMatchingTalkingPoint(painPoint, products);
      const pillarId = painPointToPillarMap[painPoint];
      const pillar = pillarId ? getBusinessGradePillar(pillarId) : undefined;
      
      if (matchingPoint && points.length < 5) {
        // Use business-specific opener if available
        const opener = getEmpatheticOpener(painPoint, customerProfile);
        
        points.push({
          opener,
          detail: matchingPoint,
          needId: painPoint,
          needType: 'painPoint',
          needLabel: painPointOption?.label || painPoint,
          businessGradePillar: pillarId,
          keyPhrase: pillar?.keyPhrases[0]
        });
      }
    });

    customerProfile.priorities.forEach(priority => {
      if (points.length >= 5) return;
      const priorityInfo = getNuancedPriority(priority, customerProfile);
      const matchingPoint = findMatchingTalkingPointForPriority(priority, products, points);
      const pillarId = priorityToPillarMap[priority];
      const pillar = pillarId ? getBusinessGradePillar(pillarId) : undefined;
      
      if (matchingPoint) {
        // Add business context to priority opener if available
        let opener = getPriorityOpener(priority, customerProfile);
        if (businessPhrase && !opener.includes(businessPhrase)) {
          // Append business context naturally
          const priorityBusinessContext: Record<string, string> = {
            'reliability': `For a ${businessPhrase}, that's non-negotiable`,
            'security': `especially important for a ${businessPhrase} like yours`,
            'speed': `and at your ${businessPhrase}, every second counts`,
            'cost-savings': `smart move for a ${businessPhrase}`,
            'scalability': `as your ${businessPhrase} grows`,
          };
          const context = priorityBusinessContext[priority];
          if (context) {
            opener = `${opener} — ${context}`;
          }
        }
        
        points.push({
          opener,
          detail: matchingPoint,
          needId: priority,
          needType: 'priority',
          needLabel: priorityInfo.label,
          businessGradePillar: pillarId,
          keyPhrase: pillar?.keyPhrases[0]
        });
      }
    });

    if (points.length < 4) {
      products.forEach(product => {
        product.talkingPoints.forEach(point => {
          if (!points.some(p => p.detail === point) && points.length < 5) {
            const matchedPillar = businessGradePillars.find(pillar =>
              pillar.keywords.some(kw => point.toLowerCase().includes(kw))
            );
            
            // Add business context to general openers
            let opener = matchedPillar 
              ? `When it comes to being ${matchedPillar.name.toLowerCase()}...`
              : "Here's something that sets us apart...";
            
            if (businessPhrase && matchedPillar) {
              opener = `For a ${businessPhrase}, being ${matchedPillar.name.toLowerCase()} matters...`;
            }
            
            points.push({
              opener,
              detail: point,
              needId: matchedPillar?.id || 'general',
              needType: 'general',
              needLabel: matchedPillar?.name || 'Key Differentiator',
              businessGradePillar: matchedPillar?.id,
              keyPhrase: matchedPillar?.keyPhrases[0]
            });
          }
        });
      });
    }

    const industry = customerProfile.industry || '';
    if (is5GAdvancedRelevant(industry, customerProfile.priorities) && points.length < 6) {
      const fiveGPoints = get5GTalkingPointsForIndustry(industry);
      if (fiveGPoints.length > 0) {
        let opener = "Speaking of next-generation connectivity...";
        if (businessPhrase) {
          opener = `For a ${businessPhrase} looking to the future...`;
        }
        
        points.push({
          opener,
          detail: fiveGPoints[0],
          needId: '5g-advanced',
          needType: 'general',
          needLabel: '5G Advanced',
          businessGradePillar: '5g-advanced',
          keyPhrase: "AT&T's 5G Standalone network is deployed nationwide—business grade connectivity engineered for the future."
        });
      }
    }

    return points.slice(0, 5);
  };

  const findMatchingTalkingPoint = (painPoint: string, products: Product[]): string | null => {
    const keywords = getPainPointKeywords(painPoint);
    for (const product of products) {
      const match = product.talkingPoints.find(tp => 
        keywords.some(kw => tp.toLowerCase().includes(kw))
      );
      if (match) return match;
    }
    return null;
  };

  const findMatchingTalkingPointForPriority = (priority: string, products: Product[], existingPoints: TalkingPoint[]): string | null => {
    const keywords = getPriorityKeywords(priority);
    for (const product of products) {
      const match = product.talkingPoints.find(tp => 
        keywords.some(kw => tp.toLowerCase().includes(kw)) &&
        !existingPoints.some(p => p.detail === tp)
      );
      if (match) return match;
    }
    return null;
  };

  const getPainPointKeywords = (painPoint: string): string[] => {
    const map: Record<string, string[]> = {
      'slow-speeds': ['speed', 'fast', 'gbps', 'fiber', 'bandwidth'],
      'downtime': ['uptime', 'reliable', 'sla', 'availability'],
      'security-concerns': ['secure', 'security', 'protect', 'threat'],
      'high-costs': ['save', 'cost', 'value', 'bundle'],
      'multiple-vendors': ['single', 'one provider', 'consolidate'],
      'poor-support': ['support', '24/7', 'dedicated'],
      'legacy-systems': ['modern', 'upgrade', 'digital'],
      'compliance': ['compliant', 'hipaa', 'pci'],
      'scalability-limits': ['scale', 'grow', 'expand'],
      'no-backup': ['backup', 'failover', 'redundant'],
    };
    return map[painPoint] || [];
  };

  const getPriorityKeywords = (priority: string): string[] => {
    const map: Record<string, string[]> = {
      'reliability': ['reliable', 'uptime', 'consistent'],
      'security': ['secure', 'security', 'protect'],
      'speed': ['speed', 'fast', 'gbps'],
      'scalability': ['scale', 'grow', 'flexible'],
      'cost-savings': ['save', 'cost', 'value'],
      'remote-work': ['remote', 'hybrid', 'anywhere'],
      'unified-comms': ['unified', 'collaborate', 'communication'],
      'iot': ['iot', 'connected', 'device'],
      'backup-failover': ['backup', 'failover', 'continuity'],
      'mobility': ['mobile', 'wireless', '5g'],
    };
    return map[priority] || [];
  };

  const customizedPoints = getCustomizedPoints();

  const getNeedLabel = (point: TalkingPoint) => {
    return point.needLabel || 'Key Feature';
  };

  // Remove demo mode early return - render real UI with blur applied

  return (
    <BattlecardWidget title="Conversation Starters" icon={MessageSquare} iconColor="text-info">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-2">
              <Quote className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {customizedPoints.length} talking points tailored to this customer
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="mt-3">
          <p className="text-xs text-muted-foreground mb-4">
            Customer-focused talking points using <span className="font-semibold text-primary">Business Grade</span> messaging
          </p>
          <div className="space-y-4">
            {customizedPoints.map((item, idx) => {
              const colors = item.needType !== 'general' 
                ? getNeedTagColor(item.needId) 
                : { bg: 'bg-muted', text: 'text-muted-foreground', border: 'border-border' };
              
              const PillarIcon = item.businessGradePillar ? pillarIcons[item.businessGradePillar] : null;
              const pillar = item.businessGradePillar ? getBusinessGradePillar(item.businessGradePillar) : null;
              
              return (
                <div 
                  key={idx} 
                  className="group relative p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <Badge 
                    variant="outline"
                    className={`absolute -top-2 right-3 ${colors.bg} ${colors.text} ${colors.border} text-[10px] py-0`}
                  >
                    {item.needType === 'painPoint' && '✓ '}
                    {getNeedLabel(item)}
                  </Badge>
                  
                  {pillar && (
                    <div className="flex items-center gap-1.5 mb-2">
                      {PillarIcon && <PillarIcon className="w-3.5 h-3.5 text-primary" />}
                      <span className="text-[10px] font-medium text-primary uppercase tracking-wide">
                        {pillar.name}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-2 mb-2">
                    <Quote className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <p className="text-sm font-medium text-foreground italic">
                      "<DemoBlur>{item.opener}</DemoBlur>"
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-2 pl-6 mb-2">
                    <Lightbulb className="w-4 h-4 text-warning mt-0.5 shrink-0" />
                    <p className="text-sm text-foreground leading-relaxed">
                      <DemoBlur>{item.detail}</DemoBlur>
                    </p>
                  </div>
                  
                  {item.keyPhrase && (
                    <div className="ml-6 pl-3 border-l-2 border-primary/30">
                      <p className="text-xs text-muted-foreground italic">
                        💡 <span className="font-medium text-foreground">Key phrase:</span> "<DemoBlur>{item.keyPhrase}</DemoBlur>"
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">
              <span className="font-semibold text-foreground">Business Grade Pillars:</span> Use these themes to connect with customers
            </p>
            <div className="flex flex-wrap gap-2">
              {businessGradePillars.map(pillar => {
                const Icon = pillarIcons[pillar.id];
                return (
                  <div key={pillar.id} className="flex items-center gap-1 text-[10px] text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {Icon && <Icon className="w-3 h-3" />}
                    <span>{pillar.name}</span>
                  </div>
                );
              })}
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground bg-muted px-2 py-1 rounded-full">
                <Radio className="w-3 h-3" />
                <span>5G Advanced</span>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </BattlecardWidget>
  );
}

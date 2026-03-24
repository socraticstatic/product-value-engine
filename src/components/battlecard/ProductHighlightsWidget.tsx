import { useState } from 'react';
import { Product } from '@/data/products';
import { CustomerProfile } from '@/types/customer';
import { BattlecardWidget } from './BattlecardWidget';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Sparkles, Check, Smartphone, Wifi, Phone, Package, Radio, Shield, Target, ArrowRight, Star, Zap, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { getNeedTagColor, getPriorityLabel, getPainPointLabel, mapProductToNeeds } from '@/utils/needTagsSystem';
import { mapFeaturesToBusinessImpacts } from '@/utils/businessImpactLanguage';
import { businessGradePillars } from '@/data/businessGradePillars';
import { is5GAdvancedRelevant, fiveGConcepts, fiveGCustomerBenefits } from '@/data/fiveGEducation';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { DemoBlur } from '@/components/ui/DemoBlur';

interface ProductHighlightsWidgetProps {
  products: Product[];
  customerProfile: CustomerProfile;
  onViewSolution?: (productId: string) => void;
}

const categoryIcons: Record<string, LucideIcon> = {
  connectivity: Wifi,
  voice: Phone,
  mobility: Smartphone,
  bundle: Package,
  '24-hour-internet': Zap,
  'all-in-one': Package,
  iot: Radio,
  security: Shield,
  wireless: Smartphone,
  internet: Wifi,
  tv: Package,
};

export function ProductHighlightsWidget({ products, customerProfile, onViewSolution }: ProductHighlightsWidgetProps) {
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());
  const totalMonthly = products.reduce((sum, p) => sum + p.monthlyPrice, 0);
  const hasCustomPricing = products.some(p => p.monthlyPrice === 0);
  const { isDemoMode } = useDemoMode();

  const toggleProduct = (productId: string) => {
    setExpandedProducts(prev => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  // Match product features to Business Grade pillars
  const getMatchedPillars = (product: Product) => {
    return businessGradePillars.filter(pillar =>
      pillar.keywords.some(kw =>
        product.features.some(f => f.toLowerCase().includes(kw)) ||
        product.talkingPoints.some(tp => tp.toLowerCase().includes(kw))
      )
    ).slice(0, 2);
  };

  // Remove demo mode early return - render real UI with blur applied

  return (
    <BattlecardWidget title="Recommended Solutions" icon={Sparkles} iconColor="text-accent">
      <div className="space-y-3">
        {products.map(product => {
          const Icon = categoryIcons[product.category] || Wifi;
          const { matchedPriorities, matchedPainPoints } = mapProductToNeeds(
            product.features,
            product.talkingPoints,
            customerProfile.priorities,
            customerProfile.painPoints
          );
          
          // Get feature-to-impact translations
          const featureImpacts = mapFeaturesToBusinessImpacts(product.features, customerProfile.industry);
          const hasMatches = matchedPriorities.length > 0 || matchedPainPoints.length > 0;
          const matchedPillars = getMatchedPillars(product);
          const isExpanded = expandedProducts.has(product.id);
          
          return (
            <Collapsible key={product.id} open={isExpanded} onOpenChange={() => toggleProduct(product.id)}>
              <div className="rounded-lg bg-muted/50 border border-border overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 flex items-center justify-between gap-3 hover:bg-muted/70 transition-colors">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Icon className="w-4 h-4 text-primary shrink-0" />
                    <h4 className="font-semibold text-foreground truncate">{product.name}</h4>
                    {matchedPillars.length > 0 && (
                      <div className="hidden sm:flex items-center gap-1">
                        <Star className="w-3 h-3 text-primary" />
                        <span className="text-[10px] text-primary font-medium">
                          {matchedPillars[0].name}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge className="gradient-accent text-white font-semibold">
                      {product.price}
                    </Badge>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div className="px-4 pb-4 space-y-3 border-t border-border/50 pt-3">
                    {/* Business Grade Pillars this product addresses */}
                    {matchedPillars.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Star className="w-3 h-3 text-primary" />
                        <span className="text-[10px] text-primary font-medium uppercase tracking-wide">
                          {matchedPillars.map(p => p.name).join(' • ')}
                        </span>
                      </div>
                    )}
                    
                    {/* Feature → Business Impact Section */}
                    {featureImpacts.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          What This Means For You
                        </div>
                        {featureImpacts.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm p-2 rounded-md bg-background/60">
                            <span className="text-muted-foreground font-medium shrink-0">{item.feature}</span>
                            <ArrowRight className="w-3 h-3 text-primary shrink-0" />
                            <span className="text-foreground font-medium"><DemoBlur>{item.impact}</DemoBlur></span>
                          </div>
                        ))}
                      </div>
                    )}

                    <ul className="space-y-1.5">
                      {product.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                          <span><DemoBlur>{feature}</DemoBlur></span>
                        </li>
                      ))}
                      {product.features.length > 3 && (
                        <li className="text-xs text-muted-foreground pl-6">
                          +{product.features.length - 3} more features
                        </li>
                      )}
                    </ul>

                    {/* Solves Section - connects to customer needs */}
                    {hasMatches && (
                      <div className="pt-3 border-t border-border/50">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-2">
                          <Target className="w-3 h-3" />
                          Addresses Your Needs:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {matchedPriorities.slice(0, 3).map(priority => {
                            const colors = getNeedTagColor(priority);
                            return (
                              <Badge 
                                key={priority}
                                variant="outline"
                                className={`${colors.bg} ${colors.text} ${colors.border} text-[10px] py-0`}
                              >
                                {getPriorityLabel(priority)}
                              </Badge>
                            );
                          })}
                          {matchedPainPoints.slice(0, 2).map(painPoint => {
                            const colors = getNeedTagColor(painPoint);
                            return (
                              <Badge 
                                key={painPoint}
                                variant="outline"
                                className={`${colors.bg} ${colors.text} ${colors.border} text-[10px] py-0`}
                              >
                                ✓ {getPainPointLabel(painPoint)}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    
                    {onViewSolution && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewSolution(product.id);
                        }}
                        className="w-full mt-3 pt-3 border-t border-border/50 flex items-center justify-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        <ExternalLink className="w-3 h-3" />
                        View full details in Solutions
                      </button>
                    )}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          );
        })}

        {products.length > 1 && (totalMonthly > 0 || hasCustomPricing) && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
            <span className="font-semibold text-foreground">Total Monthly</span>
            <span className="text-xl font-bold text-primary">
              ${totalMonthly}{hasCustomPricing ? '+' : ''}/mo
              {hasCustomPricing && totalMonthly === 0 && <span className="text-sm font-medium ml-1">(Custom)</span>}
            </span>
          </div>
        )}

        {/* 5G Advanced Solutions callout for mobility-related products */}
        {products.some(p => p.category === 'iot' || p.name.toLowerCase().includes('wireless') || p.name.toLowerCase().includes('5g') || p.name.toLowerCase().includes('mobile')) && 
         is5GAdvancedRelevant(customerProfile.industry || '', customerProfile.priorities) && (
          <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Radio className="w-5 h-5 text-primary" />
              <h4 className="font-semibold text-foreground">5G Advanced Solutions</h4>
              <Badge className="bg-primary/20 text-primary text-[10px]">Coming Soon</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              AT&T's 5G Standalone network is deployed nationwide, enabling next-generation capabilities:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {fiveGCustomerBenefits.slice(0, 4).map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs">
                  <Zap className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{benefit.label}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-3 italic">
              💡 Network slicing will be available in late 2026 for dedicated, secure network lanes
            </p>
          </div>
        )}
      </div>
    </BattlecardWidget>
  );
}

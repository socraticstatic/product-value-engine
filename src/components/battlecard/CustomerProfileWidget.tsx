import { useState } from 'react';
import { Product } from '@/data/products';
import { CustomerProfile, painPointOptions, industryOptions } from '@/types/customer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  User, Building2, Users, MapPin, Wallet, AlertTriangle, Target, 
  CheckCircle2, ArrowRight, Zap, TrendingUp, PenLine, ChevronDown, ChevronUp
} from 'lucide-react';
import { DemoBlur } from '@/components/ui/DemoBlur';

import {
  getNuancedBusinessImpact, 
  getNuancedSolution, 
  getNuancedPriority,
  getContextSpecificBenefit
} from '@/utils/businessImpactLanguage';

interface CustomerProfileWidgetProps {
  products: Product[];
  customerProfile: CustomerProfile;
}

// Pain point icons
const painPointIcons: Record<string, string> = {
  'slow-speeds': '⚡',
  'downtime': '🔄',
  'security-concerns': '🔐',
  'high-costs': '💰',
  'multiple-vendors': '🤝',
  'poor-support': '📞',
  'legacy-systems': '🔧',
  'compliance': '📋',
  'scalability-limits': '📈',
  'no-backup': '🛡️'
};

export function CustomerProfileWidget({ products, customerProfile }: CustomerProfileWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const getCustomerTypeLabel = () => {
    switch (customerProfile.type) {
      case 'small-business': return 'Small Business';
      case 'mid-market': return 'Mid-Market';
      case 'enterprise': return 'Enterprise';
    }
  };

  const getBudgetIcon = () => {
    switch (customerProfile.budget) {
      case 'cost-conscious': return '💵';
      case 'balanced': return '⚖️';
      case 'performance-focused': return '🚀';
    }
  };

  const getBudgetLabel = () => {
    switch (customerProfile.budget) {
      case 'cost-conscious': return 'Cost-Conscious';
      case 'balanced': return 'Balanced';
      case 'performance-focused': return 'Performance-First';
    }
  };

  const getIndustryLabel = () => {
    return industryOptions.find(opt => opt.id === customerProfile.industry)?.label || customerProfile.industry;
  };

  const getLocationLabel = () => {
    if (customerProfile.locations === '1') return '1 Location';
    return `${customerProfile.locations} Locations`;
  };

  // Get top pain point for summary
  const topPainPoint = customerProfile.painPoints[0];
  const topPainPointLabel = topPainPoint 
    ? painPointOptions.find(p => p.id === topPainPoint)?.label 
    : null;

  // Get context-specific benefit based on pain point
  const getContextualSolution = (painPoint: string): string => {
    if (painPoint === 'slow-speeds') {
      return getContextSpecificBenefit('speed-performance', customerProfile);
    } else if (painPoint === 'downtime' || painPoint === 'no-backup') {
      return getContextSpecificBenefit('reliability-uptime', customerProfile);
    }
    return getNuancedSolution(painPoint, customerProfile);
  };

  // Map pain points to specific AT&T features that solve them
  const painPointToFeatureMap: Record<string, string> = {
    'slow-speeds': 'AT&T Fiber with speeds up to 5 Gbps',
    'downtime': '99.9% uptime SLA and proactive monitoring',
    'security-concerns': 'AT&T Dynamic Defense network security',
    'high-costs': 'bundled pricing that reduces your total cost',
    'multiple-vendors': 'one AT&T account for internet, voice, and security — one bill, one number to call, one team that owns the fix',
    'poor-support': '24/7 dedicated business support',
    'legacy-systems': 'modern fiber and 5G infrastructure',
    'compliance': 'built-in compliance and security features',
    'scalability-limits': 'scalable bandwidth that grows with you',
    'no-backup': 'automatic 5G backup connectivity'
  };

  // Generate solution mapping for the summary with customer-centric language
  const getSolutionMapping = () => {
    return customerProfile.painPoints.slice(0, 3).map(painPoint => {
      const matchingProduct = products.find(p => 
        p.features.some(f => f.toLowerCase().includes(painPoint.replace('-', ' ')))
      );
      
      const painPointData = painPointOptions.find(p => p.id === painPoint);
      const customerLabel = painPointData?.label || painPoint;
      // Use context-specific solutions for speed and reliability
      const baseSolution = getContextualSolution(painPoint);
      const specificFeature = painPointToFeatureMap[painPoint] || 'AT&T Business solutions';
      
      return {
        painPoint,
        customerLabel,
        baseSolution,
        specificFeature,
        productName: matchingProduct?.name || 'AT&T Business',
        icon: painPointIcons[painPoint] || '✓'
      };
    });
  };

  const solutionMappings = getSolutionMapping();

  // Demo mode: We don't render a placeholder anymore - we render the real UI with blur applied to sensitive content

  return (
    <Card className="border-border bg-card shadow-sm overflow-hidden">
      {/* Compact Summary Bar - Always Visible */}
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <div className="p-4 cursor-pointer hover:bg-muted/30 transition-colors">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-wrap flex-1">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  <span className="font-bold text-foreground">{getCustomerTypeLabel()}</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-foreground">{getIndustryLabel()}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{customerProfile.employeeCount} employees</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{getLocationLabel()}</span>
                
                {customerProfile.currentProvider && customerProfile.currentProvider.length > 0 && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <Badge variant="secondary" className="text-xs">
                      From: {customerProfile.currentProvider.join(', ')}
                    </Badge>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-3 shrink-0">
                {/* Top Pain Point Badge */}
                {topPainPointLabel && (
                  <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30 text-xs hidden sm:flex">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {topPainPointLabel}
                  </Badge>
                )}
                
                <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                  {isExpanded ? (
                    <>
                      <span className="text-xs">Less</span>
                      <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span className="text-xs">Details</span>
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {/* Quick badges row */}
            {!isExpanded && (
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="text-xs text-muted-foreground">Needs:</span>
                {customerProfile.painPoints.slice(0, 3).map(painPoint => (
                  <Badge 
                    key={painPoint}
                    variant="outline" 
                    className="text-[10px] bg-muted/50"
                  >
                    {painPointIcons[painPoint]} {painPointOptions.find(p => p.id === painPoint)?.label}
                  </Badge>
                ))}
                {customerProfile.painPoints.length > 3 && (
                  <span className="text-xs text-muted-foreground">+{customerProfile.painPoints.length - 3} more</span>
                )}
              </div>
            )}
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0 pb-5 border-t border-border">
            {/* Customer Snapshot Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6 mt-4">
              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <Building2 className="w-3 h-3" />
                  Type
                </div>
                <p className="font-semibold text-foreground text-sm">{getCustomerTypeLabel()}</p>
              </div>
              
              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <Target className="w-3 h-3" />
                  Industry
                </div>
                <p className="font-semibold text-foreground text-sm">{getIndustryLabel()}</p>
              </div>
              
              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <Users className="w-3 h-3" />
                  Employees
                </div>
                <p className="font-semibold text-foreground text-sm">{customerProfile.employeeCount}</p>
              </div>
              
              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <MapPin className="w-3 h-3" />
                  Locations
                </div>
                <p className="font-semibold text-foreground text-sm">{getLocationLabel()}</p>
              </div>
              
              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <Wallet className="w-3 h-3" />
                  Budget
                </div>
                <p className="font-semibold text-foreground text-sm flex items-center gap-1">
                  <span>{getBudgetIcon()}</span>
                  {getBudgetLabel()}
                </p>
              </div>
            </div>

            {/* Key Priorities Section */}
            {customerProfile.priorities.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  What Matters Most to This Customer
                </h4>
                <div className="space-y-2">
                  {customerProfile.priorities.map((priority) => {
                    const priorityInfo = getNuancedPriority(priority, customerProfile);
                    return (
                      <div 
                        key={priority}
                        className="p-3 rounded-lg bg-primary/5 border border-primary/20 flex items-center gap-3"
                      >
                        <Badge 
                          variant="outline"
                          className="bg-primary/10 text-primary border-primary/30 font-medium shrink-0"
                        >
                          {priorityInfo.label}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          → <DemoBlur>{priorityInfo.outcome}</DemoBlur>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Custom Priority Section */}
            {customerProfile.customPriority?.trim() && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <PenLine className="w-4 h-4 text-emerald-600" />
                  Customer-Specific Priority
                </h4>
                <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800">
                  <p className="text-sm text-foreground italic">
                    <DemoBlur>"{customerProfile.customPriority}"</DemoBlur>
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    → <DemoBlur>Keep this priority top of mind when presenting solutions and ROI.</DemoBlur>
                  </p>
                </div>
              </div>
            )}

            {/* Pain Points Section */}
            {customerProfile.painPoints.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  What's Hurting Their Business
                </h4>
                <div className="grid gap-3 md:grid-cols-2">
                  {customerProfile.painPoints.map((painPoint) => {
                    const icon = painPointIcons[painPoint] || '⚠️';
                    const businessImpact = getNuancedBusinessImpact(painPoint, customerProfile);
                    // Use context-specific solutions for speed and reliability pain points
                    const solution = getContextualSolution(painPoint);
                    const painPointLabel = painPointOptions.find(p => p.id === painPoint)?.label || painPoint;
                    
                    return (
                      <div 
                        key={painPoint}
                        className="p-3 rounded-lg bg-muted/50 border border-border flex items-start gap-3"
                      >
                        <span className="text-xl">{icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-foreground">
                            "{painPointLabel}"
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 italic">
                            <DemoBlur>{businessImpact}</DemoBlur>
                          </p>
                          <p className="text-xs text-foreground mt-2 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                            <span className="font-medium"><DemoBlur>{solution}</DemoBlur></span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Custom Challenge Section */}
            {customerProfile.customChallenge?.trim() && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <PenLine className="w-4 h-4 text-amber-600" />
                  Customer-Specific Challenge
                </h4>
                <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-800">
                  <p className="text-sm text-foreground italic">
                    <DemoBlur>"{customerProfile.customChallenge}"</DemoBlur>
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    → <DemoBlur>Discuss this specific challenge during your conversation and tailor your solution accordingly.</DemoBlur>
                  </p>
                </div>
              </div>
            )}

            {/* Solution Summary */}
            {solutionMappings.length > 0 && (
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  How We Solve Their Challenges
                </h4>
                <div className="space-y-3">
                  {solutionMappings.map((mapping, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-card border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{mapping.icon}</span>
                        <span className="font-semibold text-sm text-foreground">
                          "{mapping.customerLabel}"
                        </span>
                      </div>
                      <div className="flex items-start gap-2 pl-7">
                        <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground">
                          <span className="font-medium"><DemoBlur>{mapping.baseSolution}</DemoBlur></span>
                          <span className="text-muted-foreground"> with </span>
                          <span className="text-primary font-semibold"><DemoBlur>{mapping.specificFeature}</DemoBlur></span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

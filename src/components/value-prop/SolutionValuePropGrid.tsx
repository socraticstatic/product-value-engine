import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ArrowLeft, RefreshCw, Copy, Check, ChevronDown, ChevronUp, Crown, Zap, Filter, Target, Shield, Sparkles, MessageSquareQuote, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/data/products';
import { MOCK_BUSINESS_PROFILES, MockBusinessProfile } from './mockBusinessProfiles';
import { generateStructuredValueProp, StructuredValueProp } from '@/utils/businessImpactLanguage';
import { toast } from 'sonner';
import { DemoBlur } from '@/components/ui/DemoBlur';
import { MultiProductValuePropDisplay } from '@/components/product-lab/MultiProductValuePropDisplay';

interface SolutionValuePropGridProps {
  products: Product[];
  onBack: () => void;
  onReset: () => void;
}

interface ValuePropResult {
  profile: MockBusinessProfile;
  structuredValueProp: StructuredValueProp;
}

type SegmentFilter = 'broad' | 'multi-product' | 'all' | 'small-business' | 'mid-market' | 'enterprise';

const getSegmentLabel = (type: string) => {
  const labels: Record<string, { label: string; color: string }> = {
    'small-business': { label: 'Small Business', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
    'mid-market': { label: 'Mid-Market', color: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
    'enterprise': { label: 'Enterprise', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' }
  };
  return labels[type] || { label: type, color: 'bg-muted text-muted-foreground' };
};

export function SolutionValuePropGrid({ products, onBack, onReset }: SolutionValuePropGridProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [segmentFilter, setSegmentFilter] = useState<SegmentFilter>(products.length > 1 ? 'multi-product' : 'broad');
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  const activeProduct = products[activeProductIndex];

  // Generate value props for all personas
  const results: ValuePropResult[] = useMemo(() => {
    return MOCK_BUSINESS_PROFILES.map(profile => {
      const structuredValueProp = generateStructuredValueProp(
        {
          industry: profile.industry,
          businessDescription: profile.businessDescription,
          painPoints: profile.painPoints,
          priorities: profile.priorities,
          employeeCount: profile.employeeCount,
          locations: profile.locations,
          type: profile.type,
        },
        activeProduct
      );
      return { profile, structuredValueProp };
    });
  }, [activeProduct]);

  // Filter results by segment
  const filteredResults = useMemo(() => {
    if (segmentFilter === 'all') return results;
    return results.filter(r => r.profile.type === segmentFilter);
  }, [results, segmentFilter]);

  // Calculate segment counts
  const segmentCounts = useMemo(() => ({
    'all': results.length,
    'small-business': results.filter(r => r.profile.type === 'small-business').length,
    'mid-market': results.filter(r => r.profile.type === 'mid-market').length,
    'enterprise': results.filter(r => r.profile.type === 'enterprise').length,
  }), [results]);

  const handleCopy = async (result: ValuePropResult) => {
    const text = `${activeProduct.name} for ${result.profile.name}

KEY DIFFERENTIATOR:
${result.structuredValueProp.keyDifferentiator}

CUSTOMER OUTCOME:
${result.structuredValueProp.customerOutcome}

RISK MITIGATED:
${result.structuredValueProp.riskMitigated}

THE BOTTOM LINE:
${result.structuredValueProp.bottomLine}

FULL VALUE PROPOSITION:
${result.structuredValueProp.overallStatement}`;
    await navigator.clipboard.writeText(text);
    setCopiedId(result.profile.id);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  // Get priority label
  const getPriorityLabel = (value: string) => {
    const labels: Record<string, string> = {
      'reliability': 'Reliability',
      'speed': 'Speed',
      'security': 'Security',
      'cost-savings': 'Cost Savings',
      'scalability': 'Scalability',
      'support': 'Support'
    };
    return labels[value] || value;
  };

  // Get pain point label
  const getPainPointLabel = (value: string) => {
    const labels: Record<string, string> = {
      'downtime': 'Downtime',
      'slow-speeds': 'Slow Speeds',
      'security-concerns': 'Security Concerns',
      'high-costs': 'High Costs',
      'poor-support': 'Poor Support',
      'scaling': 'Scaling Issues',
      'outdated-tech': 'Outdated Tech',
      'multiple-vendors': 'Multiple Vendors'
    };
    return labels[value] || value;
  };

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Change Products
        </Button>
        <Button variant="outline" size="sm" onClick={onReset}>
          <RefreshCw className="w-4 h-4 mr-1" />
          Start Over
        </Button>
      </div>

      {/* Product Tabs - shown when multiple products selected */}
      {products.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {products.map((product, index) => (
            <Button
              key={product.id}
              variant={activeProductIndex === index ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setActiveProductIndex(index);
                setExpandedId(null);
              }}
            >
              {product.name}
            </Button>
          ))}
        </div>
      )}

      {/* Product Summary - More compact */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="py-3 px-4">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold">{activeProduct.name}</h3>
              <p className="text-xs text-muted-foreground">{activeProduct.price}</p>
            </div>
            {activeProduct.valuePropositionStatement?.keyDifferentiator && (
              <p className="text-xs text-muted-foreground hidden md:block max-w-md truncate">
                {activeProduct.valuePropositionStatement.keyDifferentiator}
              </p>
            )}
            {products.length > 1 && (
              <Badge variant="secondary" className="text-xs shrink-0">
                {activeProductIndex + 1} of {products.length}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Section Header + Filter - Combined */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold">
            {segmentFilter === 'multi-product' ? 'Multi-Product Value Narrative' : segmentFilter === 'broad' ? 'Broad Value Proposition' : 'Value Propositions by Business Type'}
          </h3>
          <p className="text-muted-foreground text-xs">
            {segmentFilter === 'multi-product' ? 'Combined narrative, outcomes, and competitive positioning' : segmentFilter === 'broad' ? 'Universal value proposition for this solution' : 'Click any card for full details'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-muted-foreground" />
          <ToggleGroup 
            type="single" 
            value={segmentFilter} 
            onValueChange={(value) => value && setSegmentFilter(value as SegmentFilter)}
            className="gap-1"
          >
            {products.length > 1 && (
              <ToggleGroupItem value="multi-product" className="text-xs h-7 px-2">
                <Layers className="w-3 h-3 mr-1" />
                Multi-Product
              </ToggleGroupItem>
            )}
            <ToggleGroupItem value="broad" className="text-xs h-7 px-2">
              Broad
            </ToggleGroupItem>
            <ToggleGroupItem value="all" className="text-xs h-7 px-2">
              All ({segmentCounts['all']})
            </ToggleGroupItem>
            <ToggleGroupItem value="small-business" className="text-xs h-7 px-2">
              SMB ({segmentCounts['small-business']})
            </ToggleGroupItem>
            <ToggleGroupItem value="mid-market" className="text-xs h-7 px-2">
              Mid ({segmentCounts['mid-market']})
            </ToggleGroupItem>
            <ToggleGroupItem value="enterprise" className="text-xs h-7 px-2">
              Ent ({segmentCounts['enterprise']})
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {/* Multi-Product Value Prop View */}
      {segmentFilter === 'multi-product' && products.length > 1 && (
        <MultiProductValuePropDisplay productIds={products.map(p => p.id)} />
      )}

      {/* Broad Value Prop View */}
      {segmentFilter === 'broad' && (
        <Card className="border-primary/20">
          <CardContent className="py-6 space-y-4">
            {/* Target */}
            <div className="text-center mb-2">
              <Badge variant="outline" className="text-xs mb-2">
                For: {activeProduct.valuePropositionStatement.forTarget}
              </Badge>
            </div>

            {/* Structured sections */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-semibold text-blue-700">Key Differentiator</span>
                </div>
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <DemoBlur>{activeProduct.valuePropositionStatement.keyDifferentiator}</DemoBlur>
                </p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-semibold text-emerald-700">Customer Outcome</span>
                </div>
                <p className="text-sm text-emerald-900 dark:text-emerald-100">
                  <DemoBlur>{activeProduct.valuePropositionStatement.customerOutcome}</DemoBlur>
                </p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-semibold text-amber-700">Risk Mitigated</span>
                </div>
                <p className="text-sm text-amber-900 dark:text-amber-100">
                  <DemoBlur>{activeProduct.valuePropositionStatement.riskMitigated}</DemoBlur>
                </p>
              </div>
            </div>

            {/* Bottom Line */}
            <div className="bg-gradient-to-r from-primary/15 to-primary/5 border-2 border-primary/30 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquareQuote className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold text-primary">The Bottom Line</span>
              </div>
              <p className="text-base font-semibold text-foreground leading-relaxed">
                <DemoBlur>{activeProduct.valuePropositionStatement.keyBenefit}</DemoBlur>
              </p>
            </div>

            {/* Competitive Edge */}
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">Competitive Differentiation</p>
              <p className="text-sm leading-relaxed">
                <DemoBlur>Unlike {activeProduct.valuePropositionStatement.unlike}, {activeProduct.name} {activeProduct.valuePropositionStatement.differentiation}</DemoBlur>
              </p>
            </div>

            {/* Copy */}
            <div className="flex justify-center pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  const vps = activeProduct.valuePropositionStatement;
                  const text = `${activeProduct.name}\n\nFOR: ${vps.forTarget}\n\nKEY DIFFERENTIATOR:\n${vps.keyDifferentiator}\n\nCUSTOMER OUTCOME:\n${vps.customerOutcome}\n\nRISK MITIGATED:\n${vps.riskMitigated}\n\nTHE BOTTOM LINE:\n${vps.keyBenefit}\n\nCOMPETITIVE EDGE:\nUnlike ${vps.unlike}, ${activeProduct.name} ${vps.differentiation}`;
                  await navigator.clipboard.writeText(text);
                  toast.success('Copied to clipboard');
                }}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Broad Value Prop
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Value Prop Grid - Wider layout */}
      {segmentFilter !== 'broad' && segmentFilter !== 'multi-product' && <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredResults.length === 0 && (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No business profiles in this segment
          </div>
        )}
        {filteredResults.map((result, index) => (
          <Card 
            key={result.profile.id}
            className={cn(
              "transition-all cursor-pointer hover:shadow-md",
              expandedId === result.profile.id && "ring-2 ring-primary"
            )}
            onClick={() => toggleExpand(result.profile.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{result.profile.icon}</span>
                  <div>
                    <h4 className="font-semibold">{result.profile.name}</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {result.profile.industry}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={cn("text-xs", getSegmentLabel(result.profile.type).color)}
                      >
                        {getSegmentLabel(result.profile.type).label}
                      </Badge>
                    </div>
                  </div>
                </div>
                {index === 0 && segmentFilter === 'all' && (
                  <Badge className="bg-primary text-primary-foreground text-xs">
                    <Crown className="w-3 h-3 mr-1" />
                    Top Fit
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Quick Info */}
              <div className="flex flex-wrap gap-1">
                {result.profile.priorities.slice(0, 2).map(priority => (
                  <Badge key={priority} variant="secondary" className="text-xs">
                    {getPriorityLabel(priority)}
                  </Badge>
                ))}
              </div>

              {/* Preview or Full */}
              {expandedId === result.profile.id ? (
                <div className="space-y-4">
                  {/* Pain Points */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Challenges:</p>
                    <div className="flex flex-wrap gap-1">
                      {result.profile.painPoints.map(pp => (
                        <Badge key={pp} variant="destructive" className="text-xs font-normal">
                          {getPainPointLabel(pp)}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Structured Value Prop Sections */}
                  <div className="space-y-3">
                    {/* Key Differentiator */}
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-semibold text-blue-700">Key Differentiator</span>
                      </div>
                      <p className="text-sm text-blue-900 dark:text-blue-100">
                        <DemoBlur>{result.structuredValueProp.keyDifferentiator}</DemoBlur>
                      </p>
                    </div>

                    {/* Customer Outcome */}
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Target className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-semibold text-emerald-700">Customer Outcome</span>
                      </div>
                      <p className="text-sm text-emerald-900 dark:text-emerald-100">
                        <DemoBlur>{result.structuredValueProp.customerOutcome}</DemoBlur>
                      </p>
                    </div>

                    {/* Risk Mitigated */}
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Shield className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-semibold text-amber-700">Risk Mitigated</span>
                      </div>
                      <p className="text-sm text-amber-900 dark:text-amber-100">
                        <DemoBlur>{result.structuredValueProp.riskMitigated}</DemoBlur>
                      </p>
                    </div>
                  </div>

                  {/* Bottom Line - Highlighted separately */}
                  <div className="bg-gradient-to-r from-primary/15 to-primary/5 border-2 border-primary/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquareQuote className="w-5 h-5 text-primary" />
                      <span className="text-sm font-bold text-primary">The Bottom Line</span>
                    </div>
                    <p className="text-base font-semibold text-foreground leading-relaxed">
                      <DemoBlur>{result.structuredValueProp.bottomLine}</DemoBlur>
                    </p>
                  </div>

                  {/* Full Value Prop */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Full Value Proposition:</p>
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      <DemoBlur>{result.structuredValueProp.overallStatement}</DemoBlur>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(result);
                      }}
                    >
                      {copiedId === result.profile.id ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(result.profile.id);
                    }}
                    className="flex items-center justify-center w-full text-xs text-muted-foreground hover:text-foreground"
                  >
                    <ChevronUp className="w-4 h-4 mr-1" />
                    Collapse
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    <DemoBlur>{result.structuredValueProp.customerOutcome}</DemoBlur>
                  </p>
                  <div className="flex items-center text-xs text-primary">
                    <ChevronDown className="w-4 h-4 mr-1" />
                    Click to expand
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>}
    </div>
  );
}

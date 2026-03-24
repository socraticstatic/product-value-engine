import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DemoBlur } from '@/components/ui/DemoBlur';
import { 
  Copy, Check, ChevronDown, ChevronUp, Sparkles, Target, Shield, 
  Zap, MessageSquareQuote, Layers, Building2, ArrowRight, AlertTriangle, Download
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { generateMultiProductValueProp, MultiProductValueProp } from '@/utils/multiProductValueProp';
import { CustomerProfile, industryOptions } from '@/types/customer';
import { ValuePropExportModal } from './ValuePropExportModal';

interface MultiProductValuePropDisplayProps {
  productIds: string[];
  /** Optional profile for tailored mode */
  profile?: Partial<CustomerProfile>;
  /** Allow user to pick an industry for tailored insights */
  showIndustrySelector?: boolean;
}

export function MultiProductValuePropDisplay({ 
  productIds, 
  profile: externalProfile,
  showIndustrySelector = true 
}: MultiProductValuePropDisplayProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['narrative', 'outcomes']));
  const [selectedIndustry, setSelectedIndustry] = useState<string>(externalProfile?.industry || '');
  const [showExportModal, setShowExportModal] = useState(false);

  const effectiveProfile = useMemo(() => {
    if (externalProfile) return externalProfile;
    if (selectedIndustry) return { industry: selectedIndustry } as Partial<CustomerProfile>;
    return undefined;
  }, [externalProfile, selectedIndustry]);

  const valueProp = useMemo(
    () => generateMultiProductValueProp(productIds, effectiveProfile),
    [productIds, effectiveProfile]
  );

  if (productIds.length === 0) return null;

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleCopy = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const CopyBtn = ({ text, id }: { text: string; id: string }) => (
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7 shrink-0"
      onClick={(e) => { e.stopPropagation(); handleCopy(text, id); }}
    >
      {copiedSection === id ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
    </Button>
  );

  const SectionHeader = ({ id, icon: Icon, title, subtitle }: { id: string; icon: React.ElementType; title: string; subtitle?: string }) => (
    <CollapsibleTrigger asChild>
      <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-primary" />
            <CardTitle className="text-sm font-semibold">{title}</CardTitle>
          </div>
          {expandedSections.has(id) ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>
        {subtitle && <p className="text-xs text-muted-foreground ml-6">{subtitle}</p>}
      </CardHeader>
    </CollapsibleTrigger>
  );

  return (
    <div className="space-y-4">
      {/* Header & Industry Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Solution Value Narrative</h3>
          <Badge variant="secondary" className="text-xs">{productIds.length} product{productIds.length > 1 ? 's' : ''}</Badge>
        </div>
        {showIndustrySelector && !externalProfile?.industry && (
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-48 h-8 text-xs">
              <SelectValue placeholder="+ Add industry context" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No industry (broad)</SelectItem>
              {industryOptions.map(opt => (
                <SelectItem key={opt.id} value={opt.id}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Elevator Pitch */}
      {valueProp.elevatorPitch && (
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="py-3 px-4 flex items-start gap-3">
            <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground font-medium mb-1">Elevator Pitch</p>
              <DemoBlur>
                <p className="text-sm font-medium">{valueProp.elevatorPitch}</p>
              </DemoBlur>
            </div>
            <CopyBtn text={valueProp.elevatorPitch} id="pitch" />
          </CardContent>
        </Card>
      )}

      {/* Combined Narrative */}
      <Collapsible open={expandedSections.has('narrative')} onOpenChange={() => toggleSection('narrative')}>
        <Card>
          <SectionHeader id="narrative" icon={MessageSquareQuote} title="Combined Solution Narrative" subtitle="Unified story weaving all products together" />
          <CollapsibleContent>
            <CardContent className="pt-0 pb-4">
              <DemoBlur>
                <p className="text-sm leading-relaxed">{valueProp.combinedNarrative}</p>
              </DemoBlur>
              <div className="flex justify-end mt-2">
                <CopyBtn text={valueProp.combinedNarrative} id="narrative" />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Per-Product Roles */}
      {valueProp.perProduct.length > 1 && (
        <Collapsible open={expandedSections.has('perProduct')} onOpenChange={() => toggleSection('perProduct')}>
          <Card>
            <SectionHeader id="perProduct" icon={Layers} title="Each Product's Role" subtitle="How each product contributes to the solution" />
            <CollapsibleContent>
              <CardContent className="pt-0 pb-4 space-y-3">
                {valueProp.perProduct.map((pp) => (
                  <div key={pp.product.id} className="rounded-lg border border-border p-3 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{pp.product.category}</Badge>
                      <span className="text-sm font-medium">{pp.product.name}</span>
                    </div>
                    <DemoBlur>
                      <p className="text-xs text-primary font-medium">{pp.roleInSolution}</p>
                      <p className="text-xs text-muted-foreground mt-1">{pp.keyBenefit}</p>
                      <p className="text-xs text-muted-foreground italic mt-1">{pp.differentiator}</p>
                    </DemoBlur>
                  </div>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Customer Outcomes */}
      <Collapsible open={expandedSections.has('outcomes')} onOpenChange={() => toggleSection('outcomes')}>
        <Card>
          <SectionHeader id="outcomes" icon={Target} title="Customer Outcomes" subtitle="What the customer actually experiences" />
          <CollapsibleContent>
            <CardContent className="pt-0 pb-4 space-y-3">
              {valueProp.outcomes.map((outcome, i) => (
                <div key={i} className="flex gap-3">
                  <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <DemoBlur>
                      <p className="text-sm font-medium">{outcome.outcome}</p>
                      <p className="text-xs text-muted-foreground">{outcome.howDelivered}</p>
                    </DemoBlur>
                    {outcome.productsInvolved.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {outcome.productsInvolved.map(name => (
                          <Badge key={name} variant="secondary" className="text-[10px] h-4">{name.split(' ').slice(-2).join(' ')}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Competitive Positioning */}
      <Collapsible open={expandedSections.has('competitive')} onOpenChange={() => toggleSection('competitive')}>
        <Card>
          <SectionHeader id="competitive" icon={Shield} title="Competitive Positioning" subtitle="Why AT&T multi-product beats mixing vendors" />
          <CollapsibleContent>
            <CardContent className="pt-0 pb-4 space-y-4">
              <DemoBlur>
                <p className="text-sm leading-relaxed">{valueProp.competitivePositioning.primaryMessage}</p>
              </DemoBlur>

              {/* Vendor complexity risk */}
              <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
                  <span className="text-xs font-semibold text-destructive">Multi-Vendor Risk</span>
                </div>
                <DemoBlur>
                  <p className="text-xs text-muted-foreground">{valueProp.competitivePositioning.vendorComplexityRisk}</p>
                </DemoBlur>
              </div>

              {/* AT&T Advantages */}
              {valueProp.competitivePositioning.attAdvantages.length > 0 && (
                <div>
                  <p className="text-xs font-semibold mb-2">AT&T Advantages</p>
                  <div className="space-y-1.5">
                    {valueProp.competitivePositioning.attAdvantages.slice(0, 6).map((adv, i) => (
                      <DemoBlur key={i}>
                        <div className="flex items-start gap-2 text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                          <span>{adv}</span>
                        </div>
                      </DemoBlur>
                    ))}
                  </div>
                </div>
              )}

              {/* Competitor Weaknesses */}
              {valueProp.competitivePositioning.competitorWeaknesses.length > 0 && (
                <div>
                  <p className="text-xs font-semibold mb-2">Competitor Gaps</p>
                  <div className="space-y-1.5">
                    {valueProp.competitivePositioning.competitorWeaknesses.map((w, i) => (
                      <DemoBlur key={i}>
                        <div className="flex items-start gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-destructive/50 shrink-0 mt-1.5" />
                          <span>{w}</span>
                        </div>
                      </DemoBlur>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <CopyBtn 
                  text={`${valueProp.competitivePositioning.primaryMessage}\n\n${valueProp.competitivePositioning.vendorComplexityRisk}\n\nAT&T Advantages:\n${valueProp.competitivePositioning.attAdvantages.map(a => `• ${a}`).join('\n')}`} 
                  id="competitive" 
                />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Synergies */}
      {valueProp.synergies.length > 0 && (
        <Collapsible open={expandedSections.has('synergies')} onOpenChange={() => toggleSection('synergies')}>
          <Card>
            <SectionHeader id="synergies" icon={Zap} title="Solution Synergies" subtitle="How the products amplify each other" />
            <CollapsibleContent>
              <CardContent className="pt-0 pb-4 space-y-2">
                {valueProp.synergies.map((syn, i) => (
                  <DemoBlur key={i}>
                    <div className="flex items-start gap-2 text-sm">
                      <Sparkles className="w-3.5 h-3.5 text-warning shrink-0 mt-0.5" />
                      <span>{syn}</span>
                    </div>
                  </DemoBlur>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Industry Insights (tailored mode) */}
      {valueProp.industryInsights.length > 0 && (
        <Collapsible open={expandedSections.has('industry')} onOpenChange={() => toggleSection('industry')}>
          <Card className="border-accent/30">
            <SectionHeader id="industry" icon={Building2} title="Industry Insights" subtitle={`Tailored for ${industryOptions.find(o => o.id === (effectiveProfile?.industry))?.label || 'your industry'}`} />
            <CollapsibleContent>
              <CardContent className="pt-0 pb-4 space-y-2">
                {valueProp.industryInsights.map((insight, i) => (
                  <DemoBlur key={i}>
                    <div className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                      <span>{insight}</span>
                    </div>
                  </DemoBlur>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowExportModal(true)}
        >
          <Download className="w-4 h-4 mr-2" />
          Generate Slide / Flyer
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const full = [
              `ELEVATOR PITCH:\n${valueProp.elevatorPitch}`,
              `\nCOMBINED NARRATIVE:\n${valueProp.combinedNarrative}`,
              valueProp.perProduct.length > 1 ? `\nPRODUCT ROLES:\n${valueProp.perProduct.map(pp => `• ${pp.product.name}: ${pp.roleInSolution}`).join('\n')}` : '',
              `\nCUSTOMER OUTCOMES:\n${valueProp.outcomes.map(o => `• ${o.outcome}\n  → ${o.howDelivered}`).join('\n')}`,
              `\nCOMPETITIVE POSITIONING:\n${valueProp.competitivePositioning.primaryMessage}\n${valueProp.competitivePositioning.vendorComplexityRisk}`,
              valueProp.synergies.length > 0 ? `\nSYNERGIES:\n${valueProp.synergies.map(s => `• ${s}`).join('\n')}` : '',
              valueProp.industryInsights.length > 0 ? `\nINDUSTRY INSIGHTS:\n${valueProp.industryInsights.map(i => `• ${i}`).join('\n')}` : '',
            ].filter(Boolean).join('\n');
            handleCopy(full, 'all');
          }}
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy Full Value Prop
        </Button>
      </div>

      {/* Export Modal */}
      <ValuePropExportModal
        open={showExportModal}
        onOpenChange={setShowExportModal}
        valueProp={valueProp}
        industryLabel={industryOptions.find(o => o.id === effectiveProfile?.industry)?.label}
      />
    </div>
  );
}

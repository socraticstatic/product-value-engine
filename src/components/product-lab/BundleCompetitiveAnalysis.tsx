import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  AlertTriangle, 
  Target, 
  CheckCircle2,
  FileText,
  Building2,
  Receipt,
  Headphones
} from 'lucide-react';
import { 
  getBundleCompetitiveAdvantages, 
  identifyBundleVulnerabilities,
  generateBundlePositioningStrategy,
  getBundleVsCompetitorMix
} from '@/utils/bundleCompetitiveUtils';

interface BundleCompetitiveAnalysisProps {
  productIds: string[];
}

export function BundleCompetitiveAnalysis({ productIds }: BundleCompetitiveAnalysisProps) {
  const advantages = useMemo(() => getBundleCompetitiveAdvantages(productIds), [productIds]);
  const vulnerabilities = useMemo(() => identifyBundleVulnerabilities(productIds), [productIds]);
  const positioning = useMemo(() => generateBundlePositioningStrategy(productIds), [productIds]);
  const comparison = useMemo(() => getBundleVsCompetitorMix(productIds), [productIds]);

  if (productIds.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Multi-Product Advantages + Competitor Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Multi-Product Advantages */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Multi-Product Solution Advantages
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Why this combination is stronger than competitors
            </p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {advantages.map((advantage, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <span className="text-foreground">{advantage}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* VS Competitor Mix */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              VS Competitor Mix
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              AT&T solution vs multi-provider alternative
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Comparison Table */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="font-medium text-primary">AT&T Solution</div>
                <div className="font-medium text-muted-foreground">Competitor Mix</div>
                
                {/* Billing */}
                <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                  <Receipt className="w-4 h-4 text-primary" />
                  <span>{comparison.attBundle.billing}</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-muted/30">
                  <Receipt className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{comparison.competitorMix.billing}</span>
                </div>

                {/* Support */}
                <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                  <Headphones className="w-4 h-4 text-primary" />
                  <span>{comparison.attBundle.support}</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-muted/30">
                  <Headphones className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{comparison.competitorMix.support}</span>
                </div>

                {/* Accountability */}
                <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                  <Building2 className="w-4 h-4 text-primary" />
                  <span>{comparison.attBundle.accountability}</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-muted/30">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{comparison.competitorMix.accountability}</span>
                </div>
              </div>

              {/* Integration Note */}
              {comparison.integrationBenefit && (
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <p className="text-sm text-foreground">{comparison.integrationBenefit}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vulnerability Check */}
      {vulnerabilities.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Vulnerability Assessment
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Areas where competitors may have advantages
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {vulnerabilities.map((vuln, i) => (
                <div 
                  key={i} 
                  className="p-4 rounded-lg border border-warning/20 bg-warning/5"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{vuln.competitor}</p>
                      <p className="text-sm text-muted-foreground mt-1">{vuln.vulnerability}</p>
                      {vuln.mitigation && (
                        <p className="text-sm text-primary mt-2">
                          <span className="font-medium">Counter:</span> {vuln.mitigation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Positioning Strategy */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Differentiation Strategy
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Positioning for this solution against alternatives
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Positioning Statement */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-sm font-medium text-primary mb-1">Primary Message</p>
            <p className="text-foreground">{positioning.primaryStatement}</p>
          </div>

          {/* Key Talking Points */}
          <div>
            <p className="text-sm font-medium mb-2">Key Differentiation Points</p>
            <div className="flex flex-wrap gap-2">
              {positioning.keyPoints.map((point, i) => (
                <Badge 
                  key={i} 
                  variant="outline"
                  className="bg-muted/50"
                >
                  {point}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* "Not Apples to Apples" Scenarios */}
          {positioning.notApplesToApples.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2 text-muted-foreground">
                When Comparisons Arise
              </p>
              <ul className="space-y-2">
                {positioning.notApplesToApples.map((scenario, i) => (
                  <li key={i} className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{scenario.situation}:</span>{' '}
                    {scenario.response}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

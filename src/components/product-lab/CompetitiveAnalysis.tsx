import { useState } from 'react';
import { Product, products } from '@/data/products';
import { competitiveDifferentiation, ProductDifferentiator } from '@/data/competitiveDifferentiation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, XCircle, AlertTriangle, DollarSign, Shield, Zap } from 'lucide-react';
import { ProductSelector } from './ProductSelector';

const competitors = [
  { id: 'comcast', name: 'Comcast Business' },
  { id: 'verizon', name: 'Verizon Business' },
  { id: 't-mobile', name: 'T-Mobile' },
  { id: 'spectrum', name: 'Spectrum Enterprise' },
  { id: 'ringcentral', name: 'RingCentral' },
  { id: 'lumen', name: 'Lumen/CenturyLink' },
];

interface CompetitiveAnalysisProps {
  selectedProducts: string[];
  onProductsChange: (productIds: string[]) => void;
}

export function CompetitiveAnalysis({ selectedProducts, onProductsChange }: CompetitiveAnalysisProps) {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>('all');

  const selectedProductDetails = selectedProducts
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as Product[];

  // Get competitive data for selected products
  const competitiveData = selectedProducts
    .map(id => competitiveDifferentiation.find(d => d.productId === id))
    .filter(Boolean) as ProductDifferentiator[];

  // Check if we have specific competitive intel for the selected product
  const hasDetailedCompetitiveData = competitiveData.length > 0;

  // Get comparisons for selected competitor (use 'all' as the sentinel for no filter)
  const relevantComparisons = competitiveData.flatMap(data => 
    data.competitorComparisons.filter(c =>
      selectedCompetitor === 'all' || c.competitor.toLowerCase().includes(selectedCompetitor)
    )
  );

  const relevantHiddenCosts = competitiveData.flatMap(data => 
    (data.hiddenCosts || []).filter(c => 
      selectedCompetitor === 'all' || c.competitor.toLowerCase().includes(selectedCompetitor)
    )
  );

  // For USPs: use competitive data if available, otherwise fall back to product data
  const allUSPs = hasDetailedCompetitiveData
    ? competitiveData.flatMap(data => data.uniqueSellingPoints)
    : selectedProductDetails.flatMap(p => [
        ...(p.businessDifferentiators || []),
        ...p.competitiveAdvantages
      ]);

  const allNotApplesToApples = competitiveData.flatMap(data => data.notApplesToApples);
  
  // Fallback value props from product data when no competitive intel exists
  const fallbackValueProps = !hasDetailedCompetitiveData
    ? selectedProductDetails.flatMap(p => p.valueProps)
    : [];

  return (
    <div className="space-y-6">
      {/* Selection Controls */}
      <div className="grid md:grid-cols-2 gap-4">
        <ProductSelector
          mode="single"
          selectedProducts={selectedProducts}
          onSelectionChange={onProductsChange}
          label="Select Product to Analyze"
        />
        <div className="space-y-2">
          <label className="text-sm font-medium">Compare Against</label>
          <Select value={selectedCompetitor} onValueChange={setSelectedCompetitor}>
            <SelectTrigger>
              <SelectValue placeholder="All competitors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Competitors</SelectItem>
              {competitors.map(comp => (
                <SelectItem key={comp.id} value={comp.id}>
                  {comp.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedProducts.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Shield className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">Select a Product</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Choose a product to see competitive analysis
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Unique Selling Points */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-warning" />
                Unique Advantages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {allUSPs.map((usp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    <span className="text-sm">{usp}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Side-by-Side Comparisons or Value Props */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">
                {hasDetailedCompetitiveData ? 'Competitor Comparisons' : 'Value Propositions'}
              </CardTitle>
              {!hasDetailedCompetitiveData && (
                <p className="text-xs text-muted-foreground">
                  Detailed competitor comparisons coming soon for this solution
                </p>
              )}
            </CardHeader>
            <CardContent>
              {hasDetailedCompetitiveData ? (
                relevantComparisons.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No comparisons available for the selected competitor filter.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {relevantComparisons.map((comp, i) => (
                      <div key={i} className="p-4 rounded-lg bg-muted/50 space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{comp.competitor}</Badge>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-xs font-medium text-muted-foreground mb-1 uppercase">Competitor Positioning</h5>
                            <p className="text-sm">{comp.theirOffer}</p>
                          </div>
                          <div>
                            <h5 className="text-xs font-medium text-success mb-1 uppercase">AT&T Advantage</h5>
                            <p className="text-sm">{comp.attAdvantage}</p>
                          </div>
                        </div>
                        {comp.nuance && (
                          <div className="pt-2 border-t border-border/50">
                            <p className="text-xs text-muted-foreground italic">
                              <AlertTriangle className="w-3 h-3 inline mr-1" />
                              {comp.nuance}
                            </p>
                          </div>
                        )}
                        <div className="pt-2">
                          <p className="text-sm font-medium text-primary">
                            📌 Differentiation Strategy: "{comp.winningStatement}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <ul className="space-y-3">
                  {fallbackValueProps.map((prop, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{prop}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Hidden Costs */}
      {relevantHiddenCosts.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-warning" />
              Hidden Costs to Highlight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Competitor</TableHead>
                  <TableHead>Hidden Fee</TableHead>
                  <TableHead>AT&T Approach</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {relevantHiddenCosts.map((cost, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{cost.competitor}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-destructive" />
                        {cost.hiddenFee}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        {cost.attApproach}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Not Apples to Apples */}
      {allNotApplesToApples.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Watch Out: Not Apples to Apples
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Scenarios where customer comparisons may be misleading
            </p>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {allNotApplesToApples.map((scenario, i) => (
                <AccordionItem key={i} value={`scenario-${i}`}>
                  <AccordionTrigger className="text-sm text-left">
                    {scenario.scenario}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <div>
                      <h5 className="text-xs font-medium text-muted-foreground uppercase mb-1">
                        Why It's Different
                      </h5>
                      <p className="text-sm">{scenario.explanation}</p>
                    </div>
                    <Separator />
                    <div>
                      <h5 className="text-xs font-medium text-success uppercase mb-1">
                        Positioning Strategy
                      </h5>
                      <p className="text-sm">{scenario.howToPosition}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

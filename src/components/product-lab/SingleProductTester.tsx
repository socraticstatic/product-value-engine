import { useState } from 'react';
import { products, Product } from '@/data/products';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductSelector } from './ProductSelector';
import { SegmentFitGrid } from './SegmentFitGrid';
import { ExpandableList, ExpandableGrid } from './ExpandableList';

import { CompetitiveSnapshotCard } from './CompetitiveSnapshotCard';
import { CheckCircle2, Crosshair, FileText, BarChart3, Package, X, Zap, Layers } from 'lucide-react';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { DemoBlur } from '@/components/ui/DemoBlur';
import { cn } from '@/lib/utils';
import { getProductDifferentiators } from '@/data/competitiveDifferentiation';
import { generateBundleValueStatement, identifySynergies } from '@/utils/bundleCalculations';

interface SingleProductTesterProps {
  selectedProducts: string[];
  onProductsChange: (productIds: string[]) => void;
}

const segmentLabels: Record<string, string> = {
  'small-business': 'Small Business',
  'mid-market': 'Mid-Market',
  'enterprise': 'Enterprise',
};

export function SingleProductTester({ selectedProducts, onProductsChange }: SingleProductTesterProps) {
  const [activeSubTab, setActiveSubTab] = useState('details');
  const { isDemoMode } = useDemoMode();

  const selectedProductObjects = selectedProducts
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => p !== undefined);

  const removeProduct = (productId: string) => {
    const newSelection = selectedProducts.filter(id => id !== productId);
    onProductsChange(newSelection);
  };

  // Combine data from all selected products
  const combinedFeatures = [...new Set(selectedProductObjects.flatMap(p => p.features))];
  const combinedValueProps = [...new Set(selectedProductObjects.flatMap(p => p.valueProps))];
  const combinedBestFor = [...new Set(selectedProductObjects.flatMap(p => p.bestFor))];
  const combinedAdvantages = [...new Set(selectedProductObjects.flatMap(p => p.competitiveAdvantages))];
  const combinedDifferentiators = [...new Set(selectedProductObjects.flatMap(p => {
    const competitiveData = getProductDifferentiators(p.id);
    return competitiveData?.uniqueSellingPoints || p.businessDifferentiators || p.competitiveAdvantages;
  }))];
  const combinedBusinessDifferentiators = [...new Set(selectedProductObjects.flatMap(p => p.businessDifferentiators || []))];
  const allCategories = [...new Set(selectedProductObjects.map(p => p.category))];
  const allSegments = [...new Set(selectedProductObjects.flatMap(p => p.targetSegments))];

  // Combined price display
  const getCombinedPriceDisplay = () => {
    const prices = selectedProductObjects
      .filter(p => p.monthlyPrice > 0)
      .map(p => p.monthlyPrice);
    if (prices.length === 0) return 'Contact for pricing';
    const total = prices.reduce((a, b) => a + b, 0);
    return `Starting at $${total}/mo combined`;
  };

  return (
    <div className="space-y-6">
      <ProductSelector
        mode="multi"
        selectedProducts={selectedProducts}
        onSelectionChange={onProductsChange}
        label="Select Products to Analyze"
        maxSelections={5}
      />

      {selectedProductObjects.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Package className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">Select Products</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Choose one or more products from the catalog to analyze
            </p>
          </CardContent>
        </Card>
      ) : (
        // Removed demo mode placeholder - now uses blur on actual content
        <div className="space-y-6">
          {/* Selected Products Display */}
          <div className="flex flex-wrap gap-2">
            {selectedProductObjects.map(product => (
              <div
                key={product.id}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-primary bg-primary/10 text-primary text-sm font-medium"
              >
                <span>{product.name}</span>
                <button
                  onClick={() => removeProduct(product.id)}
                  className="hover:bg-destructive/20 rounded p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Combined Solution Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {allCategories.map(cat => (
                      <Badge key={cat} variant="outline">{cat}</Badge>
                    ))}
                    {allSegments.map(seg => (
                      <Badge key={seg} variant="outline" className="bg-primary/5 text-primary border-primary/20">
                        {segmentLabels[seg]}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-2xl">
                    {selectedProductObjects.length === 1 
                      ? selectedProductObjects[0].name
                      : 'Multi-Product / Converged Solution'}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {selectedProductObjects.length === 1 
                      ? selectedProductObjects[0].price
                      : getCombinedPriceDisplay()}
                  </CardDescription>
                  {selectedProductObjects.length > 1 && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      {selectedProductObjects.map(p => p.name).join(' + ')}
                    </div>
                  )}
                </div>
                <Badge variant="secondary">
                  {selectedProductObjects.length} product{selectedProductObjects.length > 1 ? 's' : ''}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Combined Value Proposition for Multi-Product */}
                {selectedProductObjects.length > 1 && (
                  <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="w-4 h-4 text-primary" />
                      <h4 className="text-sm font-semibold text-primary">Combined Solution Value</h4>
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      <DemoBlur>{generateBundleValueStatement(selectedProducts)}</DemoBlur>
                    </p>
                    {identifySynergies(selectedProducts).length > 0 && (
                      <div className="mt-3 pt-3 border-t border-primary/10">
                        <p className="text-xs font-medium text-primary/70 mb-1.5">Multi-Product Synergies</p>
                        <ul className="space-y-1">
                          {identifySynergies(selectedProducts).slice(0, 3).map((synergy, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-foreground/80">
                              <CheckCircle2 className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                              <span><DemoBlur>{synergy}</DemoBlur></span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Individual Product Value Props */}
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 space-y-3">
                  <h4 className="text-sm font-medium text-primary mb-2">
                    {selectedProductObjects.length === 1 ? 'Value Proposition' : 'Individual Product Value Propositions'}
                  </h4>
                  {selectedProductObjects.map((product, idx) => (
                    <div key={product.id} className={cn(idx > 0 && "pt-3 border-t border-primary/10")}>
                      {selectedProductObjects.length > 1 && (
                        <p className="text-xs font-semibold text-primary/70 mb-1">{product.name}</p>
                      )}
                      {product.valuePropositionStatement.customerOutcome && (
                        <div className="mb-2">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-0.5">Customer Outcome</p>
                          <p className="text-sm text-foreground/90 font-medium"><DemoBlur>{product.valuePropositionStatement.customerOutcome}</DemoBlur></p>
                        </div>
                      )}
                      {product.valuePropositionStatement.keyDifferentiator && (
                        <div>
                          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-0.5">Key Differentiator</p>
                          <p className="text-sm text-foreground/90 italic"><DemoBlur>{product.valuePropositionStatement.keyDifferentiator}</DemoBlur></p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabbed Content */}
          <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
            <TabsList>
              <TabsTrigger value="details" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Details
              </TabsTrigger>
              <TabsTrigger value="segments" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Segment Fit
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6 mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Combined Features */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">
                      {selectedProductObjects.length === 1 ? 'Features' : 'Combined Features'}
                    </CardTitle>
                    {selectedProductObjects.length > 1 && (
                      <CardDescription className="text-xs">
                        All features across selected solutions
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <ExpandableList
                      items={combinedFeatures}
                      initialCount={12}
                      itemLabel="features"
                      renderItem={(feature) => (
                        <div className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                          <span><DemoBlur>{feature}</DemoBlur></span>
                        </div>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Combined Value Props */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">
                      {selectedProductObjects.length === 1 ? 'Value Propositions' : 'Combined Value Propositions'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ExpandableList
                      items={combinedValueProps}
                      initialCount={8}
                      itemLabel="value propositions"
                      renderItem={(prop) => (
                        <div className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span><DemoBlur>{prop}</DemoBlur></span>
                        </div>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Combined Solution Differentiators */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" />
                      Solution Differentiators
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ExpandableList
                      items={combinedDifferentiators}
                      initialCount={10}
                      itemLabel="differentiators"
                      renderItem={(diff) => (
                        <div className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span><DemoBlur>{diff}</DemoBlur></span>
                        </div>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Combined Competitive Advantages */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Industry Differentiators</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ExpandableList
                      items={combinedAdvantages}
                      initialCount={10}
                      itemLabel="advantages"
                      renderItem={(adv) => (
                        <div className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                          <span><DemoBlur>{adv}</DemoBlur></span>
                        </div>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Combined Target Use Cases */}
              <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Crosshair className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Target Use Cases</CardTitle>
                      <CardDescription className="text-xs">
                        {selectedProductObjects.length === 1 
                          ? 'Ideal scenarios for this solution'
                          : 'Combined use cases across all selected solutions'}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ExpandableGrid
                    items={combinedBestFor}
                    initialCount={9}
                    itemLabel="use cases"
                    renderItem={(use) => (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-background border border-border hover:border-primary/30 transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-sm font-medium"><DemoBlur>{use}</DemoBlur></span>
                      </div>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Why AT&T Wins - Combined view */}
              <CompetitiveSnapshotCard productIds={selectedProducts} />

              {/* Combined Business Differentiators */}
              {combinedBusinessDifferentiators.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Business vs Consumer Differentiators</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ExpandableList
                      items={combinedBusinessDifferentiators}
                      initialCount={10}
                      itemLabel="differentiators"
                      renderItem={(diff) => (
                        <div className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{diff}</span>
                        </div>
                      )}
                    />
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="segments" className="mt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Segment Fit Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedProducts.length > 1 
                      ? `Combined segment fit for ${selectedProducts.length} products`
                      : 'Product alignment by buying behavior, value tier, and decision style'}
                  </p>
                </div>
                <SegmentFitGrid productIds={selectedProducts} />
              </div>
            </TabsContent>

          </Tabs>
        </div>
      )}
    </div>
  );
}

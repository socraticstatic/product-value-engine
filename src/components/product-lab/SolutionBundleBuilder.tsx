import { useState, useMemo } from 'react';
import { products } from '@/data/products';
import { calculateBundle, generateBundleValueStatement, getSuggestedBundles } from '@/utils/bundleCalculations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ProductSelector } from './ProductSelector';
import { BundleSummaryCard } from './BundleSummaryCard';
import { SegmentFitGrid } from './SegmentFitGrid';
import { BundleCompetitiveAnalysis } from './BundleCompetitiveAnalysis';
import { MultiProductValuePropDisplay } from './MultiProductValuePropDisplay';
import { Sparkles, RotateCcw, ChevronDown, BarChart3, FileText } from 'lucide-react';

interface SolutionBundleBuilderProps {
  selectedProducts: string[];
  onProductsChange: (productIds: string[]) => void;
}

export function SolutionBundleBuilder({ selectedProducts, onProductsChange }: SolutionBundleBuilderProps) {
  const bundle = useMemo(() => calculateBundle(selectedProducts), [selectedProducts]);
  const valueStatement = useMemo(() => generateBundleValueStatement(selectedProducts), [selectedProducts]);

  // Get suggested bundles based on first selected product
  const suggestions = useMemo(() => {
    if (selectedProducts.length !== 1) return [];
    return getSuggestedBundles(selectedProducts[0]);
  }, [selectedProducts]);

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Product Selection */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Evaluate Your Multi-Product Solution</h3>
            {selectedProducts.length > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onProductsChange([])}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
          <ProductSelector
            mode="multi"
            selectedProducts={selectedProducts}
            onSelectionChange={onProductsChange}
          />

          {/* Suggested Multi-Product Solutions */}
          {suggestions.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-warning" />
                  Suggested Combinations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, i) => {
                    const suggestionProducts = suggestion
                      .map(id => products.find(p => p.id === id))
                      .filter(Boolean);
                    const totalPrice = suggestionProducts.reduce((sum, p) => sum + (p?.monthlyPrice || 0), 0);
                    
                    return (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        className="h-auto py-2"
                        onClick={() => onProductsChange(suggestion)}
                      >
                        <div className="text-left">
                          <div className="text-xs">
                            {suggestionProducts.map(p => p?.name.split(' ').slice(-2).join(' ')).join(' + ')}
                          </div>
                          {totalPrice > 0 && (
                            <div className="text-xs text-muted-foreground">
                              ${totalPrice}/mo
                            </div>
                          )}
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Bundle Summary */}
        <div className="lg:col-span-1">
          <BundleSummaryCard bundle={bundle} valueStatement={valueStatement} />
        </div>
      </div>

      {/* Solution Value Narrative */}
      {selectedProducts.length > 0 && (
        <Collapsible defaultOpen>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Solution Value Narrative</CardTitle>
                  </div>
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground text-left">
                  Combined value proposition with competitive positioning and customer outcomes
                </p>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <MultiProductValuePropDisplay productIds={selectedProducts} />
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Competitive Position */}
      {selectedProducts.length > 0 && (
        <BundleCompetitiveAnalysis productIds={selectedProducts} />
      )}

      {/* Segment Fit Analysis - Collapsible */}
      {selectedProducts.length > 0 && (
        <Collapsible>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Segment Fit Analysis</CardTitle>
                  </div>
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground text-left">
                  Bundle alignment by buying behavior, value tier, and decision style
                </p>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <SegmentFitGrid productIds={selectedProducts} />
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}
    </div>
  );
}

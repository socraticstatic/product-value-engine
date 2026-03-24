import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { products, Product } from '@/data/products';

interface SolutionExplorerFormProps {
  onSubmit: (selectedProducts: { id: string; name: string }[]) => void;
  onBack: () => void;
}

// Group products by category
const CATEGORY_LABELS: Record<string, string> = {
  'connectivity': 'Connectivity',
  'voice': 'Voice & Communication',
  'mobility': 'Mobility',
  'bundle': 'Multi-Product Solutions',
  'iot': 'IoT Solutions',
  'security': 'Security',
  '24-hour-internet': '24-Hour Internet',
  'all-in-one': 'All-in-One Solutions'
};

const CATEGORY_ORDER = ['connectivity', '24-hour-internet', 'voice', 'bundle', 'mobility', 'security', 'iot', 'all-in-one'];

function groupProductsByCategory(productList: Product[]): Record<string, Product[]> {
  const grouped: Record<string, Product[]> = {};
  
  productList.forEach(product => {
    if (!grouped[product.category]) {
      grouped[product.category] = [];
    }
    grouped[product.category].push(product);
  });
  
  return grouped;
}

export function SolutionExplorerForm({ onSubmit, onBack }: SolutionExplorerFormProps) {
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  
  const groupedProducts = groupProductsByCategory(products);
  const sortedCategories = CATEGORY_ORDER.filter(cat => groupedProducts[cat]);

  const toggleProduct = (productId: string) => {
    setSelectedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleSubmit = () => {
    const selected = products
      .filter(p => selectedProducts.has(p.id))
      .map(p => ({ id: p.id, name: p.name }));
    onSubmit(selected);
  };

  const selectedCount = selectedProducts.size;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle>Select Solution(s)</CardTitle>
              <CardDescription>
                Choose one or more products to analyze ROI across different business types
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {sortedCategories.map(category => (
            <div key={category} className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {CATEGORY_LABELS[category] || category}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {groupedProducts[category].map(product => (
                  <div
                    key={product.id}
                    onClick={() => toggleProduct(product.id)}
                    className={cn(
                      "p-4 rounded-lg border-2 cursor-pointer transition-all",
                      selectedProducts.has(product.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={selectedProducts.has(product.id)}
                        onCheckedChange={() => toggleProduct(product.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <Label className="text-sm font-medium cursor-pointer block">
                          {product.name}
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          {product.price}
                        </p>
                        {product.valuePropositionStatement?.keyDifferentiator && (
                          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                            {product.valuePropositionStatement.keyDifferentiator}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Selected products summary */}
          {selectedCount > 0 && (
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">
                {selectedCount} product{selectedCount !== 1 ? 's' : ''} selected:
              </p>
              <div className="flex flex-wrap gap-2">
                {products
                  .filter(p => selectedProducts.has(p.id))
                  .map(p => (
                    <Badge key={p.id} variant="secondary" className="text-xs">
                      {p.name}
                    </Badge>
                  ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button onClick={handleSubmit} disabled={selectedCount === 0}>
              Analyze ROI
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { products, Product } from '@/data/products';

interface SolutionValuePropFormProps {
  onSubmit: (products: Product[]) => void;
  onBack: () => void;
}

// Group products by category
const CATEGORY_LABELS: Record<string, string> = {
  'connectivity': 'Connectivity',
  'voice': 'Voice & Communication',
  'mobility': 'Mobility',
  'bundle': 'Bundles',
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

export function SolutionValuePropForm({ onSubmit, onBack }: SolutionValuePropFormProps) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  
  const groupedProducts = groupProductsByCategory(products);
  const sortedCategories = CATEGORY_ORDER.filter(cat => groupedProducts[cat]);

  const toggleProduct = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSubmit = () => {
    const selected = products.filter(p => selectedProducts.includes(p.id));
    if (selected.length > 0) {
      onSubmit(selected);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle>Select Solutions</CardTitle>
              <CardDescription>
                Choose one or more products to see value propositions across different business types
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
                {groupedProducts[category].map(product => {
                  const isSelected = selectedProducts.includes(product.id);
                  return (
                    <div
                      key={product.id}
                      onClick={() => toggleProduct(product.id)}
                      className={cn(
                        "p-4 rounded-lg border-2 cursor-pointer transition-all",
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      )}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-medium">{product.name}</h4>
                          {isSelected && (
                            <Badge className="text-xs">Selected</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{product.price}</p>
                        {product.valuePropositionStatement?.keyDifferentiator && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {product.valuePropositionStatement.keyDifferentiator}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Selection summary */}
          {selectedProducts.length > 0 && (
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-muted-foreground">
                {selectedProducts.length} product{selectedProducts.length !== 1 ? 's' : ''} selected
              </span>
              <button
                type="button"
                onClick={() => setSelectedProducts([])}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button onClick={handleSubmit} disabled={selectedProducts.length === 0}>
              View Value Propositions
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

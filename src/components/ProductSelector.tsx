import { products, Product } from '@/data/products';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wifi, Phone, Smartphone, Package, Radio, Shield, Check } from 'lucide-react';

interface ProductSelectorProps {
  selectedProducts: string[];
  onProductsChange: (products: string[]) => void;
}

const categoryConfig = {
  connectivity: { icon: Wifi, label: 'Internet & Connectivity', color: 'text-primary' },
  voice: { icon: Phone, label: 'Voice Solutions', color: 'text-success' },
  mobility: { icon: Smartphone, label: 'Business Mobility', color: 'text-accent' },
  bundle: { icon: Package, label: 'Multi-Product Solutions', color: 'text-warning' },
  iot: { icon: Radio, label: 'IoT Solutions', color: 'text-muted-foreground' },
  security: { icon: Shield, label: 'Cybersecurity', color: 'text-destructive' },
};

export function ProductSelector({ selectedProducts, onProductsChange }: ProductSelectorProps) {
  const handleToggle = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      onProductsChange(selectedProducts.filter(id => id !== productId));
    } else {
      onProductsChange([...selectedProducts, productId]);
    }
  };

  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedProducts).map(([category, categoryProducts]) => {
        const config = categoryConfig[category as keyof typeof categoryConfig];
        if (!config) return null;
        const Icon = config.icon;

        return (
          <div key={category}>
            <div className="flex items-center gap-2 mb-3">
              <Icon className={`w-5 h-5 ${config.color}`} />
              <h3 className="font-display font-semibold text-foreground">{config.label}</h3>
              <Badge variant="outline" className="ml-2">{categoryProducts.length}</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {categoryProducts.map(product => (
                <Card
                  key={product.id}
                  className={`p-4 cursor-pointer transition-all duration-200 ${
                    selectedProducts.includes(product.id)
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:shadow-md hover:border-primary/50'
                  }`}
                  onClick={() => handleToggle(product.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 mt-0.5 ${
                      selectedProducts.includes(product.id)
                        ? 'bg-primary border-primary'
                        : 'border-border'
                    }`}>
                      {selectedProducts.includes(product.id) && (
                        <Check className="w-4 h-4 text-primary-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-foreground text-sm">{product.name}</h4>
                        <Badge variant="secondary" className="shrink-0 text-xs">{product.price}</Badge>
                      </div>
                      
                      {/* Target segments */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {product.targetSegments?.map(segment => (
                          <span 
                            key={segment}
                            className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded"
                          >
                            {segment === 'small-business' ? 'SMB' : segment === 'mid-market' ? 'Mid-Mkt' : 'Ent'}
                          </span>
                        ))}
                      </div>

                      {/* Key features preview */}
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {product.features.slice(0, 2).join(' • ')}
                      </p>

                      {/* Business differentiators indicator */}
                      {product.businessDifferentiators && product.businessDifferentiators.length > 0 && (
                        <div className="mt-2 flex items-center gap-1">
                          <span className="text-xs text-primary font-medium">
                            ✓ {product.businessDifferentiators.length} business-specific features
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      })}

      {selectedProducts.length > 0 && (
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {selectedProducts.length} product{selectedProducts.length !== 1 ? 's' : ''} selected
            </span>
            <button 
              type="button"
              onClick={() => onProductsChange([])}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

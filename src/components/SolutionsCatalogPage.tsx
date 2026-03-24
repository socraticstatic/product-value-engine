import { useState, useMemo, useEffect } from 'react';
import { products, Product } from '@/data/products';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Package, Wifi, Phone, Smartphone, Radio, Shield, 
  Check, X, DollarSign, Building2, ChevronDown, ChevronUp,
  Scale, Sparkles, Zap
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const categoryConfig: Record<string, { icon: LucideIcon; label: string; color: string }> = {
  connectivity: { icon: Wifi, label: 'Internet', color: 'text-blue-500' },
  voice: { icon: Phone, label: 'Voice', color: 'text-green-500' },
  bundle: { icon: Package, label: 'Multi-Product Solutions', color: 'text-purple-500' },
  '24-hour-internet': { icon: Zap, label: '24-Hour Internet', color: 'text-amber-500' },
  'all-in-one': { icon: Package, label: 'All-in-One', color: 'text-indigo-500' },
  iot: { icon: Radio, label: 'IoT', color: 'text-orange-500' },
  security: { icon: Shield, label: 'Security', color: 'text-red-500' },
};

const segmentLabels: Record<string, string> = {
  'small-business': 'Small Business',
  'mid-market': 'Mid-Market',
  'enterprise': 'Enterprise'
};

interface SolutionsCatalogPageProps {
  initialExpandedProduct?: string | null;
}

export function SolutionsCatalogPage({ initialExpandedProduct }: SolutionsCatalogPageProps = {}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(
    initialExpandedProduct ? new Set([initialExpandedProduct]) : new Set()
  );
  
  // Update expanded products when prop changes
  useEffect(() => {
    if (initialExpandedProduct) {
      setExpandedProducts(prev => new Set([...prev, initialExpandedProduct]));
    }
  }, [initialExpandedProduct]);

  const toggleExpanded = (productId: string) => {
    setExpandedProducts(prev => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category))];
    return cats.sort();
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products;
    return products.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const compareProducts = useMemo(() => {
    return products.filter(p => compareList.includes(p.id));
  }, [compareList]);

  const toggleCompare = (productId: string) => {
    setCompareList(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : prev.length < 4 ? [...prev, productId] : prev
    );
  };

  const getCategoryIcon = (category: string) => {
    const config = categoryConfig[category];
    return config ? config.icon : Package;
  };

  const ProductCard = ({ product }: { product: Product }) => {
    const Icon = getCategoryIcon(product.category);
    const config = categoryConfig[product.category];
    const isExpanded = expandedProducts.has(product.id);
    const isInCompare = compareList.includes(product.id);

    return (
      <Card className={`transition-all hover:shadow-lg ${isInCompare ? 'ring-2 ring-primary' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg bg-muted ${config?.color || 'text-primary'}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-sm leading-tight">{product.name}</CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  {config?.label || product.category}
                </CardDescription>
              </div>
            </div>
            <Badge className="gradient-accent text-white font-semibold shrink-0 text-xs">
              {product.price}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {/* Target Segments */}
          <div className="flex flex-wrap gap-1">
            {product.targetSegments.map(seg => (
              <Badge key={seg} variant="outline" className="text-[10px] py-0">
                {segmentLabels[seg]}
              </Badge>
            ))}
          </div>

          {/* Key Features Preview */}
          <div className="space-y-1">
            {product.features.slice(0, 3).map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                <Check className="w-3 h-3 text-success shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feature}</span>
              </div>
            ))}
            {product.features.length > 3 && (
              <p className="text-[10px] text-muted-foreground pl-5">
                +{product.features.length - 3} more features
              </p>
            )}
          </div>

          {/* Expandable Details */}
          {isExpanded && (
            <div className="pt-3 border-t border-border space-y-3 animate-in fade-in duration-200">
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2">Best For:</h4>
                <div className="flex flex-wrap gap-1">
                  {product.bestFor.slice(0, 4).map((use, idx) => (
                    <Badge key={idx} variant="secondary" className="text-[10px]">
                      {use}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2">Key Talking Points:</h4>
                <ul className="space-y-1">
                  {product.talkingPoints.slice(0, 2).map((point, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                      <Sparkles className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2">Competitive Advantages:</h4>
                <ul className="space-y-1">
                  {product.competitiveAdvantages.slice(0, 2).map((adv, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                      <Zap className="w-3 h-3 text-warning shrink-0 mt-0.5" />
                      {adv}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-xs h-8"
              onClick={() => toggleExpanded(product.id)}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3 h-3 mr-1" />
                  Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3 mr-1" />
                  Details
                </>
              )}
            </Button>
            <div className="flex items-center gap-2">
              <Checkbox
                id={`compare-${product.id}`}
                checked={isInCompare}
                onCheckedChange={() => toggleCompare(product.id)}
                disabled={!isInCompare && compareList.length >= 4}
              />
              <label 
                htmlFor={`compare-${product.id}`} 
                className="text-xs text-muted-foreground cursor-pointer"
              >
                Compare
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const CompareView = () => {
    if (compareProducts.length < 2) {
      return (
        <div className="text-center py-12">
          <Scale className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Select Products to Compare</h3>
          <p className="text-sm text-muted-foreground">
            Choose 2-4 products from the catalog to see a side-by-side comparison.
          </p>
        </div>
      );
    }

    // Collect all unique features for comparison
    const allFeatures = [...new Set(compareProducts.flatMap(p => p.features))];

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-3 bg-muted text-sm font-semibold text-foreground sticky left-0 min-w-[150px]">
                Feature
              </th>
              {compareProducts.map(product => (
                <th key={product.id} className="p-3 bg-muted text-center min-w-[180px]">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">{product.name}</p>
                    <Badge className="gradient-accent text-white text-xs">{product.price}</Badge>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Category */}
            <tr className="border-b border-border">
              <td className="p-3 text-sm text-muted-foreground sticky left-0 bg-card">Category</td>
              {compareProducts.map(product => (
                <td key={product.id} className="p-3 text-center">
                  <Badge variant="outline" className="text-xs">
                    {categoryConfig[product.category]?.label || product.category}
                  </Badge>
                </td>
              ))}
            </tr>

            {/* Target Segments */}
            <tr className="border-b border-border">
              <td className="p-3 text-sm text-muted-foreground sticky left-0 bg-card">Target Segments</td>
              {compareProducts.map(product => (
                <td key={product.id} className="p-3 text-center">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {product.targetSegments.map(seg => (
                      <Badge key={seg} variant="secondary" className="text-[10px]">
                        {segmentLabels[seg]}
                      </Badge>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Monthly Price */}
            <tr className="border-b border-border">
              <td className="p-3 text-sm text-muted-foreground sticky left-0 bg-card">Monthly Price</td>
              {compareProducts.map(product => (
                <td key={product.id} className="p-3 text-center">
                  <span className="text-lg font-bold text-primary">
                    {product.monthlyPrice > 0 ? `$${product.monthlyPrice}` : 'Custom'}
                  </span>
                </td>
              ))}
            </tr>

            {/* Features Comparison */}
            <tr>
              <td colSpan={compareProducts.length + 1} className="p-3 bg-muted">
                <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
                  Features Comparison
                </span>
              </td>
            </tr>
            {allFeatures.slice(0, 10).map((feature, idx) => (
              <tr key={idx} className="border-b border-border/50">
                <td className="p-3 text-xs text-muted-foreground sticky left-0 bg-card">
                  {feature}
                </td>
                {compareProducts.map(product => (
                  <td key={product.id} className="p-3 text-center">
                    {product.features.includes(feature) ? (
                      <Check className="w-5 h-5 text-success mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {/* Best For */}
            <tr>
              <td colSpan={compareProducts.length + 1} className="p-3 bg-muted">
                <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
                  Best For
                </span>
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-3 text-sm text-muted-foreground sticky left-0 bg-card">Use Cases</td>
              {compareProducts.map(product => (
                <td key={product.id} className="p-3 text-center">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {product.bestFor.slice(0, 3).map((use, idx) => (
                      <Badge key={idx} variant="outline" className="text-[10px]">
                        {use}
                      </Badge>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Competitive Advantages */}
            <tr>
              <td colSpan={compareProducts.length + 1} className="p-3 bg-muted">
                <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
                  Competitive Advantages
                </span>
              </td>
            </tr>
            {[0, 1].map(idx => (
              <tr key={idx} className="border-b border-border/50">
                <td className="p-3 text-xs text-muted-foreground sticky left-0 bg-card">
                  Advantage {idx + 1}
                </td>
                {compareProducts.map(product => (
                  <td key={product.id} className="p-3 text-center text-xs text-foreground">
                    {product.competitiveAdvantages[idx] || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold text-foreground mb-2">
          AT&T Business Solutions Catalog
        </h2>
        <p className="text-muted-foreground">
          Browse all solutions and compare side-by-side to find the best fit
        </p>
      </div>

      {/* Compare Bar */}
      {compareList.length > 0 && (
        <div className="sticky top-0 z-10 p-4 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scale className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {compareList.length} product{compareList.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-1">
              {compareProducts.map(p => (
                <Badge key={p.id} variant="secondary" className="text-xs">
                  {p.name.length > 20 ? p.name.slice(0, 20) + '...' : p.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCompareList([])}
            >
              Clear
            </Button>
            <Button
              size="sm"
              onClick={() => setShowCompare(!showCompare)}
              disabled={compareList.length < 2}
            >
              {showCompare ? 'View Catalog' : 'Compare Now'}
            </Button>
          </div>
        </div>
      )}

      {showCompare && compareList.length >= 2 ? (
        <Card className="p-4">
          <CompareView />
        </Card>
      ) : (
        <>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              All Solutions ({products.length})
            </Button>
            {categories.map(cat => {
              const config = categoryConfig[cat];
              const Icon = config?.icon || Package;
              const count = products.filter(p => p.category === cat).length;
              return (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className="gap-1"
                >
                  <Icon className="w-3 h-3" />
                  {config?.label || cat} ({count})
                </Button>
              );
            })}
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* 24-Hour Internet Highlight */}
          {selectedCategory === 'all' || selectedCategory === '24-hour-internet' ? (
            <Card className="p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-amber-500/20">
                  <Zap className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    24-Hour Internet - Core Solutions (Lead Offer)
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our lead offer solutions: Basic Fiber + Wireless Backup + 1 CRU line included. 
                    True always-on connectivity with built-in failover. Starting at $130/mo for 500M or $170/mo for 1 GIG.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">Fiber + Wireless</Badge>
                    <Badge variant="outline" className="text-xs">From $100/mo</Badge>
                    <Badge variant="outline" className="text-xs">Add-on phone seats $15/seat</Badge>
                    <Badge variant="outline" className="text-xs">Volume discounts on additional lines</Badge>
                  </div>
                </div>
              </div>
            </Card>
          ) : null}
        </>
      )}
    </div>
  );
}

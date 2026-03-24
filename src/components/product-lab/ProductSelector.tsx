import { useState } from 'react';
import { Product, products } from '@/data/products';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Package, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ProductSelectorProps {
  mode: 'single' | 'multi';
  selectedProducts: string[];
  onSelectionChange: (productIds: string[]) => void;
  label?: string;
  maxSelections?: number;
}

const categoryLabels: Record<string, string> = {
  'connectivity': 'Connectivity',
  'voice': 'Voice',
  'mobility': 'Mobility',
  'bundle': 'Multi-Product',
  'iot': 'IoT',
  'security': 'Security',
  '24-hour-internet': '24-Hour Internet',
  'all-in-one': 'All-in-One',
};

// Product family groupings - maps a family name to product IDs
const productFamilies: Record<string, { name: string; productIds: string[] }> = {
  'business-fiber': {
    name: 'AT&T Business Fiber',
    productIds: ['business-fiber-300m', 'business-fiber-1g', 'business-fiber-5g']
  },
  '24hr-internet': {
    name: '24 Hour Internet',
    productIds: ['24hr-internet-500m', '24hr-internet-1g']
  }
};

// Get the family ID for a product, if it belongs to one
const getProductFamily = (productId: string): string | null => {
  for (const [familyId, family] of Object.entries(productFamilies)) {
    if (family.productIds.includes(productId)) {
      return familyId;
    }
  }
  return null;
};

type GroupedItem = Product | { isFamily: true; familyId: string; name: string; products: Product[] };

// Group products by category, consolidating product families
const getGroupedProducts = (): Record<string, GroupedItem[]> => {
  const grouped: Record<string, GroupedItem[]> = {};
  const processedFamilies = new Set<string>();
  
  products.forEach(product => {
    const category = product.category;
    if (!grouped[category]) grouped[category] = [];
    
    const familyId = getProductFamily(product.id);
    
    if (familyId) {
      // This product belongs to a family
      if (!processedFamilies.has(familyId)) {
        // Add the family group once
        const family = productFamilies[familyId];
        const familyProducts = family.productIds
          .map(id => products.find(p => p.id === id))
          .filter((p): p is Product => p !== undefined);
        
        grouped[category].push({
          isFamily: true,
          familyId,
          name: family.name,
          products: familyProducts
        });
        processedFamilies.add(familyId);
      }
    } else {
      // Standalone product
      grouped[category].push(product);
    }
  });
  
  return grouped;
};

const isFamily = (item: GroupedItem): item is { isFamily: true; familyId: string; name: string; products: Product[] } => {
  return 'isFamily' in item && item.isFamily === true;
};

export function ProductSelector({ mode, selectedProducts, onSelectionChange, label, maxSelections }: ProductSelectorProps) {
  const [expandedFamilies, setExpandedFamilies] = useState<Set<string>>(new Set());
  const groupedProducts = getGroupedProducts();

  const toggleFamily = (familyId: string) => {
    setExpandedFamilies(prev => {
      const next = new Set(prev);
      if (next.has(familyId)) {
        next.delete(familyId);
      } else {
        next.add(familyId);
      }
      return next;
    });
  };

  // For single select mode
  if (mode === 'single') {
    return (
      <div className="space-y-2">
        {label && <Label className="text-sm font-medium">{label}</Label>}
        <Select
          value={selectedProducts[0] || ''}
          onValueChange={(value) => onSelectionChange([value])}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a product to test..." />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(groupedProducts).map(([category, items]) => (
              <div key={category}>
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {categoryLabels[category] || category}
                </div>
                {items.map((item) => {
                  if (isFamily(item)) {
                    // Render family with sub-items
                    return (
                      <div key={item.familyId}>
                        <div className="px-2 py-1 text-xs font-medium text-muted-foreground flex items-center gap-1">
                          <ChevronRight className="w-3 h-3" />
                          {item.name}
                        </div>
                        {item.products.map((product) => (
                          <SelectItem key={product.id} value={product.id} className="pl-6">
                            <div className="flex items-center gap-2">
                              <span>{product.name.replace('AT&T ', '').replace('24 Hour Internet ', '')}</span>
                              <span className="text-muted-foreground">({product.price})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </div>
                    );
                  } else {
                    // Standalone product
                    return (
                      <SelectItem key={item.id} value={item.id}>
                        <div className="flex items-center gap-2">
                          <span>{item.name}</span>
                          <span className="text-muted-foreground">({item.price})</span>
                        </div>
                      </SelectItem>
                    );
                  }
                })}
              </div>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  // Multi-select mode with accordion
  return (
    <div className="space-y-2">
      {label && <Label className="text-sm font-medium">{label}</Label>}
      <Accordion type="multiple" className="w-full">
        {Object.entries(groupedProducts).map(([category, items]) => {
          // Count selected items in this category
          const selectedCount = items.reduce((count, item) => {
            if (isFamily(item)) {
              return count + item.products.filter(p => selectedProducts.includes(p.id)).length;
            }
            return count + (selectedProducts.includes(item.id) ? 1 : 0);
          }, 0);
          
          return (
            <AccordionItem key={category} value={category} className="border-b-0">
              <AccordionTrigger className="text-sm py-2 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Package className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="font-medium">{categoryLabels[category] || category}</span>
                  {selectedCount > 0 && (
                    <Badge variant="secondary" className="text-xs ml-1">
                      {selectedCount} selected
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                <div className="space-y-0.5 pl-1">
                  {items.map((item) => {
                    if (isFamily(item)) {
                      const familySelectedCount = item.products.filter(p => selectedProducts.includes(p.id)).length;
                      const isExpanded = expandedFamilies.has(item.familyId);
                      
                      return (
                        <Collapsible key={item.familyId} open={isExpanded} onOpenChange={() => toggleFamily(item.familyId)}>
                          <CollapsibleTrigger className="flex items-center gap-2 py-1.5 hover:bg-muted/50 rounded px-2 cursor-pointer w-full text-left">
                            <ChevronRight className={cn("w-3.5 h-3.5 text-muted-foreground transition-transform", isExpanded && "rotate-90")} />
                            <span className="flex-1 text-sm font-medium">{item.name}</span>
                            {familySelectedCount > 0 && (
                              <Badge variant="outline" className="text-xs">
                                {familySelectedCount}
                              </Badge>
                            )}
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="pl-6 space-y-0.5">
                              {item.products.map((product) => {
                                const isSelected = selectedProducts.includes(product.id);
                                // Display shorter name for variants
                                const shortName = product.name
                                  .replace('AT&T Business Fiber ', '')
                                  .replace('AT&T ', '')
                                  .replace('24 Hour Internet ', '');
                                
                                return (
                                  <label
                                    key={product.id}
                                    className="flex items-center gap-2 py-1.5 hover:bg-muted/50 rounded px-2 cursor-pointer"
                                  >
                                    <Checkbox
                                      checked={isSelected}
                                      disabled={!isSelected && maxSelections !== undefined && selectedProducts.length >= maxSelections}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          if (maxSelections === undefined || selectedProducts.length < maxSelections) {
                                            onSelectionChange([...selectedProducts, product.id]);
                                          }
                                        } else {
                                          onSelectionChange(selectedProducts.filter(id => id !== product.id));
                                        }
                                      }}
                                    />
                                    <span className="flex-1 text-sm">{shortName}</span>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                                      {product.price}
                                    </span>
                                  </label>
                                );
                              })}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      );
                    } else {
                      // Standalone product
                      const isSelected = selectedProducts.includes(item.id);
                      return (
                        <label
                          key={item.id}
                          className="flex items-center gap-2 py-1.5 hover:bg-muted/50 rounded px-2 cursor-pointer"
                        >
                          <Checkbox
                            checked={isSelected}
                            disabled={!isSelected && maxSelections !== undefined && selectedProducts.length >= maxSelections}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                if (maxSelections === undefined || selectedProducts.length < maxSelections) {
                                  onSelectionChange([...selectedProducts, item.id]);
                                }
                              } else {
                                onSelectionChange(selectedProducts.filter(id => id !== item.id));
                              }
                            }}
                          />
                          <span className="flex-1 text-sm">{item.name}</span>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {item.price}
                          </span>
                        </label>
                      );
                    }
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

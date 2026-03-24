import { Product, products } from '@/data/products';

export interface BundleCalculation {
  products: Product[];
  totalMonthlyPrice: number;
  hasCustomPricing: boolean;
  totalFeatures: string[];
  combinedValueProps: string[];
  synergies: string[];
  targetSegments: ('small-business' | 'mid-market' | 'enterprise')[];
}

/**
 * Calculate the total monthly price for a bundle of products
 */
export function calculateBundlePrice(productIds: string[]): number {
  return productIds.reduce((total, id) => {
    const product = products.find(p => p.id === id);
    return total + (product?.monthlyPrice || 0);
  }, 0);
}

/**
 * Get all unique features from a bundle
 */
export function getCombinedFeatures(productIds: string[]): string[] {
  const features = new Set<string>();
  productIds.forEach(id => {
    const product = products.find(p => p.id === id);
    product?.features.forEach(f => features.add(f));
  });
  return Array.from(features);
}

/**
 * Get all unique value propositions from a bundle
 */
export function getCombinedValueProps(productIds: string[]): string[] {
  const valueProps = new Set<string>();
  productIds.forEach(id => {
    const product = products.find(p => p.id === id);
    product?.valueProps.forEach(v => valueProps.add(v));
  });
  return Array.from(valueProps);
}

/**
 * Identify synergies between products in a bundle
 */
export function identifySynergies(productIds: string[]): string[] {
  const synergies: string[] = [];
  const hasConnectivity = productIds.some(id => {
    const p = products.find(prod => prod.id === id);
    return p?.category === 'connectivity';
  });
  const hasVoice = productIds.some(id => {
    const p = products.find(prod => prod.id === id);
    return p?.category === 'voice';
  });
  const hasMobility = productIds.some(id => {
    const p = products.find(prod => prod.id === id);
    return p?.category === 'mobility' || p?.category === '24-hour-internet';
  });
  const hasBundle = productIds.some(id => {
    const p = products.find(prod => prod.id === id);
    return p?.category === 'bundle' || p?.category === 'all-in-one';
  });

  if (hasConnectivity && hasVoice) {
    synergies.push('Unified connectivity and voice under single provider - no finger-pointing during issues');
    synergies.push('Single bill for internet and voice services');
  }

  if (hasConnectivity && hasMobility) {
    synergies.push('5G backup provides automatic failover for business continuity');
    synergies.push('Seamless transition between wired and wireless connectivity');
  }

  if (hasVoice && hasMobility) {
    synergies.push('Voice continuity across desk phones and mobile devices');
    synergies.push('Unified communications experience for remote workforce');
  }

  if (hasConnectivity && hasVoice && hasMobility) {
    synergies.push('Complete business communications stack with single vendor accountability');
    synergies.push('AT&T Guarantee covers entire solution - fiber, voice, and wireless');
  }

  if (hasBundle) {
    synergies.push('Pre-configured solution optimized for your business size');
    synergies.push('Multi-product discounts vs purchasing services separately');
  }

  return synergies;
}

/**
 * Get overlapping target segments for a bundle
 */
export function getOverlappingSegments(productIds: string[]): ('small-business' | 'mid-market' | 'enterprise')[] {
  if (productIds.length === 0) return [];

  const segmentSets = productIds.map(id => {
    const product = products.find(p => p.id === id);
    return new Set(product?.targetSegments || []);
  });

  // Find intersection of all segment sets
  const intersection = segmentSets.reduce((acc, current) => {
    return new Set([...acc].filter(x => current.has(x)));
  });

  return Array.from(intersection) as ('small-business' | 'mid-market' | 'enterprise')[];
}

/**
 * Generate a full bundle calculation
 */
export function calculateBundle(productIds: string[]): BundleCalculation {
  const bundleProducts = productIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as Product[];

  // Check if any product has custom pricing (monthlyPrice === 0)
  const hasCustomPricing = bundleProducts.some(p => p.monthlyPrice === 0);

  return {
    products: bundleProducts,
    totalMonthlyPrice: calculateBundlePrice(productIds),
    hasCustomPricing,
    totalFeatures: getCombinedFeatures(productIds),
    combinedValueProps: getCombinedValueProps(productIds),
    synergies: identifySynergies(productIds),
    targetSegments: getOverlappingSegments(productIds),
  };
}

/**
 * Generate a combined value proposition statement for a bundle
 * Uses specific product combination templates for common pairings
 */
export function generateBundleValueStatement(productIds: string[]): string {
  const bundle = calculateBundle(productIds);

  if (bundle.products.length === 0) {
    return 'Select products to generate a value proposition.';
  }

  if (bundle.products.length === 1) {
    return bundle.products[0].valuePropositionStatement.keyBenefit;
  }

  const productNames = bundle.products.map(p => p.name.toLowerCase());
  const productNamesDisplay = bundle.products.map(p => p.name);
  
  // Check for specific high-value product combinations with tailored messaging
  const hasADI = productNames.some(n => n.includes('adi') || n.includes('dedicated internet'));
  const hasDynamicDefense = productNames.some(n => n.includes('dynamic defense') || n.includes('activearmor'));
  const hasFiber = productNames.some(n => n.includes('fiber'));
  const hasVoice = productNames.some(n => n.includes('voice') || n.includes('phone'));
  const hasInternetAir = productNames.some(n => n.includes('internet air') || n.includes('5g'));
  
  // ADI + Dynamic Defense: Connectivity + Security combination
  if (hasADI && hasDynamicDefense) {
    const otherProducts = productNamesDisplay.filter(n => 
      !n.toLowerCase().includes('adi') && 
      !n.toLowerCase().includes('dedicated internet') && 
      !n.toLowerCase().includes('dynamic defense') &&
      !n.toLowerCase().includes('activearmor')
    );
    const additionalContext = otherProducts.length > 0 
      ? ` Plus ${otherProducts.join(' and ')} to complete your solution.`
      : '';
    return `With ADI + Dynamic Defense, you get dedicated, symmetrical bandwidth backed by AT&T's global network and built-in, network-embedded security that blocks threats before they ever reach your sites—so you stay connected, productive, and secure from day one.${additionalContext}`;
  }

  // Fiber + Dynamic Defense: High-speed connectivity + Security
  if (hasFiber && hasDynamicDefense) {
    return `With AT&T Fiber + Dynamic Defense, you get fast, reliable connectivity with security embedded directly in the network—threats are blocked before they reach your business, so your team stays productive and protected without adding complexity.`;
  }

  // ADI + Voice: Dedicated connectivity + Communications
  if (hasADI && hasVoice) {
    return `With ADI + Business Voice, you get dedicated, symmetrical bandwidth that powers crystal-clear voice quality and reliable cloud access—all backed by AT&T's network with a single point of accountability when you need support.`;
  }

  // Fiber + Voice: Core connectivity + communications bundle
  if (hasFiber && hasVoice) {
    const hasBackup = hasInternetAir;
    const backupClause = hasBackup 
      ? ' With 5G backup, you maintain business continuity even during outages.'
      : '';
    return `With AT&T Fiber + Voice, you get fast, reliable internet paired with business-grade phone service—one provider, one bill, and one team to call when you need help.${backupClause}`;
  }

  // Fiber + Internet Air (5G backup)
  if (hasFiber && hasInternetAir) {
    return `With AT&T Fiber + Internet Air, you get high-speed primary connectivity with automatic 5G failover—keeping your business online even when the unexpected happens. One network, built-in redundancy, zero finger-pointing.`;
  }

  // Fallback: Generate contextual statement based on categories
  const categories = [...new Set(bundle.products.map(p => p.category))];
  const hasConnectivity = categories.some(c => c.includes('connectivity') || c.includes('fiber') || c.includes('internet'));
  const hasVoiceCategory = categories.some(c => c.includes('voice') || c.includes('communication'));
  const hasMobility = categories.some(c => c.includes('mobility') || c.includes('wireless') || c.includes('24-hour'));
  const hasSecurity = categories.some(c => c.includes('security'));

  // Build contextual benefits based on messaging pillars
  const benefits: string[] = [];
  
  if (hasConnectivity) {
    benefits.push('faster, more reliable connectivity in more places');
  }
  if (hasVoiceCategory) {
    benefits.push('seamless communication from anywhere to the cloud');
  }
  if (hasMobility) {
    benefits.push('always-on access for your mobile workforce');
  }
  if (hasSecurity) {
    benefits.push('security embedded in the network—not bolted on top');
  }

  const benefitsList = benefits.length > 1 
    ? benefits.slice(0, -1).join(', ') + ', and ' + benefits[benefits.length - 1]
    : benefits[0] || 'comprehensive business capabilities';

  const productList = productNamesDisplay.length <= 3 
    ? productNamesDisplay.join(' + ')
    : `${productNamesDisplay.slice(0, 2).join(', ')}, and more`;

  return `With ${productList}, you get ${benefitsList}—backed by AT&T's network with one provider, one bill, and one team to call. Simplify operations and stay focused on running your business.`;
}

/**
 * Get suggested bundle combinations based on a primary product
 */
export function getSuggestedBundles(primaryProductId: string): string[][] {
  const suggestions: string[][] = [];
  
  // Fiber + Voice bundle
  if (primaryProductId.includes('fiber')) {
    suggestions.push([primaryProductId, 'business-voice']);
    suggestions.push([primaryProductId, 'business-voice', 'internet-air-business']);
  }
  
  // Voice + Mobility bundle
  if (primaryProductId === 'business-voice') {
    suggestions.push([primaryProductId, 'business-fiber-1g']);
    suggestions.push([primaryProductId, 'business-fiber-1g', 'internet-air-business']);
  }
  
  // Complete solutions
  if (primaryProductId === 'hsia-enterprise') {
    suggestions.push([primaryProductId, 'business-voice']);
  }

  return suggestions;
}

import { Product, products } from '@/data/products';
import { CustomerPersona, customerPersonas } from '@/data/personas';

export interface PersonaFitScore {
  persona: CustomerPersona;
  overallScore: number;
  needsAlignment: number;
  painPointMatch: number;
  productAffinityMatch: number;
  budgetFit: number;
  reasoning: string[];
  matchedNeeds: string[];
  addressedPainPoints: string[];
}

export type FitLevel = 'strong' | 'moderate' | 'weak';

/**
 * Calculate how well a product aligns with a persona's top needs
 */
function calculateNeedsAlignment(product: Product, persona: CustomerPersona): { score: number; matched: string[] } {
  const matched: string[] = [];
  let totalWeight = 0;
  let matchedWeight = 0;

  const productKeywords = [
    ...product.features,
    ...product.valueProps,
    ...product.talkingPoints,
    ...product.bestFor,
  ].join(' ').toLowerCase();

  persona.topNeeds.forEach(need => {
    totalWeight += need.importance;
    const needKeywords = need.need.toLowerCase().split(' ');
    
    // Check if product addresses this need with expanded keyword matching
    const matches = needKeywords.some(keyword => 
      productKeywords.includes(keyword) ||
      keyword.includes('price') && product.monthlyPrice > 0 ||
      keyword.includes('reliab') && (productKeywords.includes('reliab') || productKeywords.includes('uptime') || productKeywords.includes('sla')) ||
      keyword.includes('security') && (productKeywords.includes('security') || productKeywords.includes('threat') || productKeywords.includes('defense')) ||
      keyword.includes('support') && productKeywords.includes('support') ||
      keyword.includes('speed') && (productKeywords.includes('speed') || productKeywords.includes('symmetrical') || productKeywords.includes('gbps')) ||
      keyword.includes('uptime') && (productKeywords.includes('uptime') || productKeywords.includes('sla') || productKeywords.includes('reliab')) ||
      keyword.includes('cybersecurity') && (productKeywords.includes('security') || productKeywords.includes('defense') || productKeywords.includes('threat')) ||
      keyword.includes('network') && productKeywords.includes('network') ||
      keyword.includes('dedicated') && productKeywords.includes('dedicated')
    );

    if (matches) {
      matchedWeight += need.importance;
      matched.push(need.need);
    }
  });

  return {
    score: totalWeight > 0 ? Math.round((matchedWeight / totalWeight) * 100) : 0,
    matched,
  };
}

/**
 * Calculate how well a product addresses persona's pain points
 */
function calculatePainPointMatch(product: Product, persona: CustomerPersona): { score: number; addressed: string[] } {
  const addressed: string[] = [];
  
  const productSolutions = [
    ...product.features,
    ...product.valueProps,
    ...product.competitiveAdvantages,
    ...(product.businessDifferentiators || []),
  ].join(' ').toLowerCase();

  persona.painPoints.forEach(painPoint => {
    const painKeywords = painPoint.toLowerCase();
    
    // Check if product addresses this pain point with expanded enterprise keywords
    const addresses = 
      (painKeywords.includes('downtime') && (productSolutions.includes('backup') || productSolutions.includes('uptime') || productSolutions.includes('sla'))) ||
      (painKeywords.includes('reliability') && (productSolutions.includes('reliab') || productSolutions.includes('uptime') || productSolutions.includes('sla'))) ||
      (painKeywords.includes('security') && (productSolutions.includes('security') || productSolutions.includes('threat') || productSolutions.includes('defense'))) ||
      (painKeywords.includes('cost') && productSolutions.includes('no hidden')) ||
      (painKeywords.includes('support') && productSolutions.includes('24/7')) ||
      (painKeywords.includes('speed') && (productSolutions.includes('symmetrical') || productSolutions.includes('gbps'))) ||
      (painKeywords.includes('multiple') && productSolutions.includes('location')) ||
      (painKeywords.includes('backup') && productSolutions.includes('5g backup')) ||
      (painKeywords.includes('compliance') && (productSolutions.includes('security') || productSolutions.includes('hipaa') || productSolutions.includes('pci'))) ||
      (painKeywords.includes('uptime') && (productSolutions.includes('uptime') || productSolutions.includes('sla'))) ||
      (painKeywords.includes('mission') && productSolutions.includes('mission')) ||
      (painKeywords.includes('critical') && productSolutions.includes('critical')) ||
      (painKeywords.includes('dedicated') && productSolutions.includes('dedicated')) ||
      (painKeywords.includes('private') && productSolutions.includes('private')) ||
      (painKeywords.includes('threat') && productSolutions.includes('threat')) ||
      (painKeywords.includes('cyber') && (productSolutions.includes('security') || productSolutions.includes('threat')));

    if (addresses) {
      addressed.push(painPoint);
    }
  });

  const score = persona.painPoints.length > 0 
    ? Math.round((addressed.length / persona.painPoints.length) * 100)
    : 50;

  return { score, addressed };
}

/**
 * Calculate product affinity match with security and enterprise boosts
 */
function calculateProductAffinityMatch(product: Product, persona: CustomerPersona): number {
  const affinityMap: Record<string, string[]> = {
    'internet-first': ['connectivity', '24-hour-internet'],
    'voice-centric': ['voice'],
    'wireless-heavy': ['mobility', '24-hour-internet'],
    'full-stack': ['bundle', 'all-in-one', 'connectivity', 'voice', 'mobility', 'security', 'iot'],
  };

  const preferredCategories = affinityMap[persona.productAffinity] || [];
  let score = preferredCategories.includes(product.category) ? 100 : 50;
  
  // Boost for security-first mindset or security primary need
  if (product.category === 'security' && 
      (persona.mindset === 'security-first' || persona.primaryNeed === 'security')) {
    score = Math.max(score, 85);
  }
  
  // Boost for enterprise connectivity with mission-critical positioning
  if (product.category === 'connectivity' && 
      (persona.valueTier === 'platinum' || persona.valueTier === 'gold') &&
      product.targetSegments?.includes('enterprise')) {
    score = Math.max(score, 80);
  }
  
  return score;
}

/**
 * Parse employee count string to numeric range
 */
function getEmployeeCountRange(employeeCount: string): [number, number] {
  const normalized = employeeCount.toLowerCase().replace(/,/g, '');
  
  if (normalized.includes('10000') || normalized.includes('10,000')) return [10000, 50000];
  if (normalized.includes('5000') || normalized.includes('5,000')) return [5000, 10000];
  if (normalized.includes('2000') || normalized.includes('2,000')) return [2000, 5000];
  if (normalized.includes('1000') || normalized.includes('1,000')) return [1000, 2000];
  if (normalized.includes('500-') || normalized.includes('500+')) return [500, 1999];
  if (normalized.includes('100-750') || normalized.includes('100-500')) return [100, 750];
  if (normalized.includes('50-') && !normalized.includes('500')) return [50, 199];
  if (normalized.includes('20-99') || normalized.includes('20-')) return [20, 99];
  if (normalized.includes('10-50') || normalized.includes('10-')) return [10, 50];
  if (normalized.includes('5-') || normalized.includes('2-9')) return [2, 19];
  if (normalized.includes('1-')) return [1, 9];
  
  return [1, 50]; // Default small business
}

/**
 * Check if product targets the persona's segment based on employee count
 */
function checkSegmentMatch(product: Product, persona: CustomerPersona): boolean {
  const [min, max] = getEmployeeCountRange(persona.employeeCount);
  
  return product.targetSegments.some(segment => {
    if (segment === 'small-business') return max <= 50;
    if (segment === 'mid-market') return min >= 20 && max <= 750;
    if (segment === 'enterprise') return min >= 100;
    return false;
  });
}

/**
 * Calculate budget fit based on persona value tier
 */
function calculateBudgetFit(product: Product, persona: CustomerPersona): number {
  const tierBudgetRanges: Record<string, { min: number; max: number }> = {
    'platinum': { min: 200, max: 10000 },
    'gold': { min: 100, max: 500 },
    'silver': { min: 50, max: 200 },
    'bronze': { min: 0, max: 100 },
  };

  const range = tierBudgetRanges[persona.valueTier];
  if (!range || product.monthlyPrice === 0) return 70; // Custom pricing

  if (product.monthlyPrice >= range.min && product.monthlyPrice <= range.max) {
    return 100;
  } else if (product.monthlyPrice < range.min) {
    return 80; // Underpriced is okay
  } else {
    // Over budget - calculate how much
    const overagePercent = ((product.monthlyPrice - range.max) / range.max) * 100;
    return Math.max(20, 100 - overagePercent);
  }
}

/**
 * Generate reasoning for the fit score
 */
function generateReasoning(
  product: Product,
  persona: CustomerPersona,
  needsScore: number,
  painPointScore: number,
  affinityScore: number,
  budgetScore: number,
  matchedNeeds: string[],
  addressedPainPoints: string[]
): string[] {
  const reasons: string[] = [];

  // Needs alignment
  if (needsScore >= 70) {
    reasons.push(`Strong alignment with ${persona.name}'s top priorities: ${matchedNeeds.slice(0, 2).join(', ')}`);
  } else if (needsScore >= 40) {
    reasons.push(`Partial alignment with priorities - addresses ${matchedNeeds.length} of ${persona.topNeeds.length} key needs`);
  } else {
    reasons.push(`Limited alignment with ${persona.name}'s stated priorities`);
  }

  // Pain points
  if (addressedPainPoints.length > 0) {
    reasons.push(`Addresses pain points: ${addressedPainPoints.slice(0, 2).join(', ')}`);
  }

  // Product affinity
  if (affinityScore === 100) {
    reasons.push(`${product.category} category matches ${persona.name}'s buying preference`);
  }

  // Budget
  if (budgetScore >= 90) {
    reasons.push(`Price point fits ${persona.valueTier} tier budget expectations`);
  } else if (budgetScore < 50) {
    reasons.push(`Price may exceed typical ${persona.valueTier} tier budget`);
  }

  // Segment match with improved range checking
  const matchesSegment = checkSegmentMatch(product, persona);
  if (matchesSegment) {
    reasons.push(`Product designed for ${persona.segmentName} segment`);
  }

  return reasons;
}

/**
 * Calculate overall persona fit score for a product
 */
export function calculatePersonaFit(product: Product, persona: CustomerPersona): PersonaFitScore {
  const { score: needsScore, matched: matchedNeeds } = calculateNeedsAlignment(product, persona);
  const { score: painPointScore, addressed: addressedPainPoints } = calculatePainPointMatch(product, persona);
  const affinityScore = calculateProductAffinityMatch(product, persona);
  const budgetScore = calculateBudgetFit(product, persona);

  // Weighted average
  const overallScore = Math.round(
    needsScore * 0.35 +
    painPointScore * 0.30 +
    affinityScore * 0.20 +
    budgetScore * 0.15
  );

  const reasoning = generateReasoning(
    product,
    persona,
    needsScore,
    painPointScore,
    affinityScore,
    budgetScore,
    matchedNeeds,
    addressedPainPoints
  );

  return {
    persona,
    overallScore,
    needsAlignment: needsScore,
    painPointMatch: painPointScore,
    productAffinityMatch: affinityScore,
    budgetFit: budgetScore,
    reasoning,
    matchedNeeds,
    addressedPainPoints,
  };
}

/**
 * Get fit level category from score
 */
export function getFitLevel(score: number): FitLevel {
  if (score >= 70) return 'strong';
  if (score >= 45) return 'moderate';
  return 'weak';
}

/**
 * Calculate fit scores for all personas against a product
 */
export function calculateAllPersonaFits(product: Product): PersonaFitScore[] {
  return customerPersonas.map(persona => calculatePersonaFit(product, persona));
}

/**
 * Calculate fit scores for all personas against a bundle of products
 */
export function calculateBundleFits(productIds: string[]): PersonaFitScore[] {
  const bundleProducts = productIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as Product[];

  if (bundleProducts.length === 0) return [];

  return customerPersonas.map(persona => {
    // Calculate fit for each product and average
    const productFits = bundleProducts.map(product => calculatePersonaFit(product, persona));
    
    const avgScore = Math.round(
      productFits.reduce((sum, fit) => sum + fit.overallScore, 0) / productFits.length
    );

    // Combine all matched needs and addressed pain points
    const allMatchedNeeds = [...new Set(productFits.flatMap(f => f.matchedNeeds))];
    const allAddressedPainPoints = [...new Set(productFits.flatMap(f => f.addressedPainPoints))];
    const allReasons = [...new Set(productFits.flatMap(f => f.reasoning))];

    return {
      persona,
      overallScore: avgScore,
      needsAlignment: Math.round(productFits.reduce((s, f) => s + f.needsAlignment, 0) / productFits.length),
      painPointMatch: Math.round(productFits.reduce((s, f) => s + f.painPointMatch, 0) / productFits.length),
      productAffinityMatch: Math.round(productFits.reduce((s, f) => s + f.productAffinityMatch, 0) / productFits.length),
      budgetFit: Math.round(productFits.reduce((s, f) => s + f.budgetFit, 0) / productFits.length),
      reasoning: allReasons.slice(0, 4),
      matchedNeeds: allMatchedNeeds,
      addressedPainPoints: allAddressedPainPoints,
    };
  });
}

/**
 * Get top matching personas for a product
 */
export function getTopPersonasForProduct(product: Product, limit: number = 3): PersonaFitScore[] {
  return calculateAllPersonaFits(product)
    .sort((a, b) => b.overallScore - a.overallScore)
    .slice(0, limit);
}

/**
 * Get top matching products for a persona
 */
export function getTopProductsForPersona(persona: CustomerPersona, limit: number = 3): { product: Product; score: PersonaFitScore }[] {
  return products
    .map(product => ({
      product,
      score: calculatePersonaFit(product, persona),
    }))
    .sort((a, b) => b.score.overallScore - a.score.overallScore)
    .slice(0, limit);
}

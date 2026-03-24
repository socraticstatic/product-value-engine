import { products } from '@/data/products';
import { 
  competitiveDifferentiation, 
  generalDifferentiators, 
  getProductDifferentiators 
} from '@/data/competitiveDifferentiation';

export interface BundleVulnerability {
  competitor: string;
  vulnerability: string;
  mitigation?: string;
}

export interface BundlePositioning {
  primaryStatement: string;
  keyPoints: string[];
  notApplesToApples: { situation: string; response: string }[];
}

export interface BundleComparison {
  attBundle: {
    billing: string;
    support: string;
    accountability: string;
  };
  competitorMix: {
    billing: string;
    support: string;
    accountability: string;
  };
  integrationBenefit?: string;
}

/**
 * Get aggregated competitive advantages for a multi-product solution
 */
export function getBundleCompetitiveAdvantages(productIds: string[]): string[] {
  const advantages = new Set<string>();
  
  // Always add multi-product advantages when more than 1 product
  if (productIds.length > 1) {
    generalDifferentiators.bundleStrategy.advantages.forEach(adv => advantages.add(adv));
    
    // Add AT&T Guarantee message for multi-product solutions
    advantages.add('AT&T Guarantee covers the entire solution - one commitment for all services');
  }
  
  // Collect unique selling points from each product
  productIds.forEach(id => {
    const diff = getProductDifferentiators(id);
    if (diff) {
      // Add top 2 USPs from each product
      diff.uniqueSellingPoints.slice(0, 2).forEach(usp => advantages.add(usp));
      
      // Add bundle-specific advantages if present
      diff.bundleAdvantages?.forEach(ba => advantages.add(ba));
    }
  });
  
  // Check for specific synergies
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
  
  if (hasConnectivity && hasVoice) {
    advantages.add('Unified network infrastructure for voice and data - no integration headaches');
  }
  
  if (hasConnectivity && hasMobility) {
    advantages.add('Built-in 5G backup provides automatic failover for business continuity');
  }
  
  if (hasVoice && hasMobility) {
    advantages.add('Seamless voice experience across desk phones and mobile devices');
  }
  
  if (hasConnectivity && hasVoice && hasMobility) {
    advantages.add('Complete communications stack from a single provider - no finger-pointing');
  }
  
  return Array.from(advantages).slice(0, 8);
}

/**
 * Identify competitive vulnerabilities for a bundle
 */
export function identifyBundleVulnerabilities(productIds: string[]): BundleVulnerability[] {
  const vulnerabilities: BundleVulnerability[] = [];
  
  // Collect vulnerabilities from each product's competitor comparisons
  productIds.forEach(id => {
    const diff = getProductDifferentiators(id);
    if (diff) {
      diff.competitorComparisons.forEach(comp => {
        // Parse nuance for potential vulnerabilities
        if (comp.nuance.toLowerCase().includes('competitive') || 
            comp.nuance.toLowerCase().includes('attractive') ||
            comp.nuance.toLowerCase().includes('cheaper') ||
            comp.nuance.toLowerCase().includes('excels')) {
          vulnerabilities.push({
            competitor: comp.competitor,
            vulnerability: comp.nuance,
            mitigation: comp.winningStatement.slice(0, 100) + (comp.winningStatement.length > 100 ? '...' : '')
          });
        }
      });
    }
  });
  
  // Add bundle-specific vulnerabilities
  if (productIds.length > 1) {
    const hasVoice = productIds.some(id => id === 'business-voice');
    if (hasVoice) {
      vulnerabilities.push({
        competitor: 'RingCentral / Zoom',
        vulnerability: 'Cloud UCaaS platforms offer richer collaboration features (video, messaging, integrations)',
        mitigation: 'AT&T Business Voice provides carrier-grade reliability and utility certification that UCaaS cannot match'
      });
    }
    
    const hasFiber = productIds.some(id => id.includes('fiber'));
    if (hasFiber) {
      vulnerabilities.push({
        competitor: 'T-Mobile 5G',
        vulnerability: 'May offer lower monthly pricing for fixed wireless as a fiber alternative',
        mitigation: 'Fixed wireless is shared spectrum; fiber delivers dedicated, consistent bandwidth'
      });
    }
  }
  
  // Deduplicate by competitor
  const uniqueVulns = new Map<string, BundleVulnerability>();
  vulnerabilities.forEach(v => {
    if (!uniqueVulns.has(v.competitor)) {
      uniqueVulns.set(v.competitor, v);
    }
  });
  
  return Array.from(uniqueVulns.values()).slice(0, 4);
}

/**
 * Generate positioning strategy for a bundle
 */
export function generateBundlePositioningStrategy(productIds: string[]): BundlePositioning {
  const productNames = productIds
    .map(id => products.find(p => p.id === id)?.name)
    .filter(Boolean)
    .map(name => name!.split(' ').slice(-2).join(' '));
  
  const productCount = productIds.length;
  
  // Collect not-apples-to-apples scenarios from products
  const scenarios: { situation: string; response: string }[] = [];
  productIds.forEach(id => {
    const diff = getProductDifferentiators(id);
    if (diff) {
      diff.notApplesToApples.slice(0, 1).forEach(nata => {
        scenarios.push({
          situation: nata.scenario,
          response: nata.howToPosition
        });
      });
    }
  });
  
  // Add bundle-level scenario
  if (productCount > 1) {
    scenarios.unshift({
      situation: 'Customer compares individual services from different providers',
      response: 'When services come from different providers, who do you call when something breaks? With AT&T, one call solves everything - no blame game between vendors.'
    });
  }
  
  // Generate key points
  const keyPoints: string[] = [];
  if (productCount > 1) {
    keyPoints.push('Single vendor accountability');
    keyPoints.push('One bill, one contact');
    keyPoints.push('AT&T Guarantee coverage');
  }
  
  // Add product-specific key points
  productIds.forEach(id => {
    const diff = getProductDifferentiators(id);
    if (diff && diff.uniqueSellingPoints[0]) {
      const shortPoint = diff.uniqueSellingPoints[0].split(' - ')[0].split(' ').slice(0, 4).join(' ');
      keyPoints.push(shortPoint);
    }
  });
  
  // Generate primary statement
  let primaryStatement = '';
  if (productCount === 1) {
    const diff = getProductDifferentiators(productIds[0]);
    primaryStatement = diff?.competitorComparisons[0]?.winningStatement || 
      'AT&T delivers business-grade reliability with the backing of America\'s largest network.';
  } else {
    primaryStatement = `This ${productNames.join(' + ')} bundle delivers complete business communications from a single provider. ` +
      `Competitors would require ${productCount}+ separate vendors, creating billing complexity, integration challenges, and no single point of accountability. ` +
      `With AT&T, one relationship handles everything - backed by the AT&T Guarantee.`;
  }
  
  return {
    primaryStatement,
    keyPoints: keyPoints.slice(0, 6),
    notApplesToApples: scenarios.slice(0, 3)
  };
}

/**
 * Get comparison data for AT&T bundle vs competitor mix
 */
export function getBundleVsCompetitorMix(productIds: string[]): BundleComparison {
  const productCount = productIds.length;
  
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
  
  let integrationBenefit: string | undefined;
  if (hasConnectivity && hasMobility) {
    integrationBenefit = 'Built-in 5G failover automatically activates during fiber outages - competitors would require separate configuration and additional fees.';
  } else if (hasConnectivity && hasVoice) {
    integrationBenefit = 'Voice quality is optimized over AT&T fiber - no integration complexity between internet and phone providers.';
  } else if (productCount > 1) {
    integrationBenefit = 'All services managed through a single portal with unified support.';
  }
  
  return {
    attBundle: {
      billing: '1 unified bill',
      support: '1 support contact',
      accountability: 'Single vendor SLA'
    },
    competitorMix: {
      billing: `${productCount}+ separate bills`,
      support: `${productCount}+ support contacts`,
      accountability: 'Finger-pointing risk'
    },
    integrationBenefit
  };
}

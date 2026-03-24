import { products, type Product } from '@/data/products';
import { messagingPillars, type CustomerUseCase } from '@/data/messagingPillars';
import type { CustomerPersona } from '@/data/personas';

// Map product names to product IDs
const productNameToId: Record<string, string> = {
  'AT&T Business Fiber': 'business-fiber-1g',
  'AT&T High Speed Internet': 'business-fiber-300m',
  'AT&T Business Voice': 'business-voice',
  'Basic Network Security': 'network-security',
  'Network Security': 'network-security',
  'VPN': 'vpn-solutions',
  'AT&T Business Mobility': 'business-mobility',
  'VoIP': 'voip-solutions',
  'IoT': 'iot-solutions',
  'IoT Solutions': 'iot-solutions',
  'FWA': 'internet-air-business',
  'SD-WAN': 'sd-wan',
  'Dedicated Internet': 'dedicated-internet',
  'Toll-Free Voice': 'toll-free-voice',
  'Cybersecurity': 'cybersecurity-suite',
  'SIP Trunking': 'sip-trunking',
  'Private 5G': 'private-5g',
  'Cloud Interconnect': 'cloud-interconnect',
  'Switched Ethernet': 'switched-ethernet',
  'Network Edge': 'network-edge',
  'MDM': 'mdm-solutions',
};

// Get full product details from product name
export function getProductFromName(productName: string): Product | undefined {
  const productId = productNameToId[productName];
  if (productId) {
    return products.find(p => p.id === productId);
  }
  // Fallback: search by name directly
  return products.find(p => 
    p.name.toLowerCase().includes(productName.toLowerCase()) ||
    productName.toLowerCase().includes(p.name.toLowerCase())
  );
}

// Get multiple products from names
export function getProductsFromNames(productNames: string[]): Product[] {
  return productNames
    .map(name => getProductFromName(name))
    .filter((p): p is Product => p !== undefined)
    .slice(0, 4); // Limit to 4 products
}

// Industry matching map for finding relevant stories
const industryToStoryIndustry: Record<string, string[]> = {
  'Health & Wellness': ['Healthcare'],
  'Healthcare': ['Healthcare'],
  'Automotive Services': ['Manufacturing', 'Retail'],
  'Food & Beverage': ['Retail', 'Logistics'],
  'Legal Services': ['Legal Services', 'Financial Services'],
  'Manufacturing': ['Manufacturing', 'Logistics'],
  'Technology Services': ['Financial Services', 'Media & Entertainment'],
  'Retail': ['Retail'],
  'Construction': ['Construction'],
  'Financial Services': ['Financial Services'],
  'Government/Defense': ['Government/Defense'],
  'Agriculture': ['Agriculture'],
  'Media & Entertainment': ['Media & Entertainment'],
  'Logistics': ['Logistics'],
};

// Get relevant customer stories based on persona's industry
export function getRelevantStories(persona: CustomerPersona): CustomerUseCase[] {
  const matchingIndustries = industryToStoryIndustry[persona.industry] || [persona.industry];
  
  const stories: CustomerUseCase[] = [];
  
  for (const pillar of messagingPillars) {
    for (const useCase of pillar.useCases) {
      if (matchingIndustries.some(ind => 
        useCase.industry.toLowerCase() === ind.toLowerCase()
      )) {
        stories.push(useCase);
      }
    }
  }
  
  // If no direct match, return stories from related business sizes
  if (stories.length === 0) {
    // Get first available story as fallback
    return messagingPillars[0]?.useCases.slice(0, 1) || [];
  }
  
  return stories.slice(0, 3); // Limit to 3 stories
}

// Map pain points to product benefits
export function mapPainPointsToSolutions(persona: CustomerPersona, products: Product[]): Array<{ painPoint: string; solution: string; productName: string }> {
  const mappings: Array<{ painPoint: string; solution: string; productName: string }> = [];
  
  for (const painPoint of persona.painPoints) {
    for (const product of products) {
      // Look for relevant talking points or features
      const relevantFeature = product.features.find(f => 
        f.toLowerCase().includes('reliable') && painPoint.toLowerCase().includes('reliable') ||
        f.toLowerCase().includes('security') && painPoint.toLowerCase().includes('security') ||
        f.toLowerCase().includes('support') && painPoint.toLowerCase().includes('support') ||
        f.toLowerCase().includes('backup') && painPoint.toLowerCase().includes('downtime')
      );
      
      const relevantTalkingPoint = product.talkingPoints.find(tp =>
        tp.toLowerCase().includes('reliable') && painPoint.toLowerCase().includes('reliable') ||
        tp.toLowerCase().includes('security') && painPoint.toLowerCase().includes('security') ||
        tp.toLowerCase().includes('support') && painPoint.toLowerCase().includes('support')
      );
      
      if (relevantFeature || relevantTalkingPoint) {
        mappings.push({
          painPoint,
          solution: relevantTalkingPoint || relevantFeature || '',
          productName: product.name
        });
        break;
      }
    }
  }
  
  return mappings.slice(0, 3);
}

// Get expected outcomes based on persona's top needs
export function getExpectedOutcomes(persona: CustomerPersona): string[] {
  return persona.topNeeds.slice(0, 3).map(need => {
    switch (need.need.toLowerCase()) {
      case 'price':
        return 'Predictable costs with transparent billing';
      case 'coverage/reliability':
        return 'Consistent connectivity that keeps business running';
      case 'network security':
        return 'Protected data and peace of mind';
      case 'customer support':
        return '24/7 business-priority support when you need it';
      case 'clear contracts & billing':
        return 'Simple, easy-to-understand monthly statements';
      case 'integrated solutions':
        return 'One provider handling all technology needs';
      case 'innovation':
        return 'Access to cutting-edge technology solutions';
      case 'understands my business':
        return 'A partner who knows your industry challenges';
      default:
        return `Improved ${need.need.toLowerCase()}`;
    }
  });
}

// Get all unique industries from personas
export function getAllIndustriesFromPersonas(personas: CustomerPersona[]): string[] {
  const industries = new Set<string>();
  personas.forEach(p => industries.add(p.industry));
  return Array.from(industries).sort();
}

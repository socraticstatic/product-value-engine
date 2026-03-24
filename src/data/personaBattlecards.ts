import { CustomerProfile } from '@/types/customer';
import { CustomerPersona, customerPersonas } from './personas';

export interface PersonaBattlecard {
  persona: CustomerPersona;
  customerProfile: CustomerProfile;
  recommendedProductIds: string[];
}

// Map persona tech sophistication to budget
const mapBudget = (sophistication: 'low' | 'medium' | 'high'): CustomerProfile['budget'] => {
  switch (sophistication) {
    case 'low': return 'cost-conscious';
    case 'medium': return 'balanced';
    case 'high': return 'performance-focused';
  }
};

// Map persona segment to customer type
const mapSegmentToType = (segmentId: number): CustomerProfile['type'] => {
  if (segmentId <= 2) return 'small-business';
  if (segmentId <= 5) return 'mid-market';
  return 'enterprise';
};

// Map employee count string to enum
const mapEmployeeCount = (count: string): CustomerProfile['employeeCount'] => {
  if (count.includes('1-5') || count.includes('5-15')) return '1-10';
  if (count.includes('15-40') || count.includes('50-100')) return '11-50';
  if (count.includes('100-250') || count.includes('200-400')) return '51-200';
  if (count.includes('500-1500')) return '500+';
  return '11-50';
};

// Map locations string to enum
const mapLocations = (locations: string): CustomerProfile['locations'] => {
  if (locations.includes('1') && !locations.includes('10') && !locations.includes('12')) return '1';
  if (locations.includes('2') || locations.includes('3-5') || locations.includes('5-10')) return '2-5';
  if (locations.includes('12-25')) return '6-20';
  return '1';
};

// Map product names to IDs
const productNameToId: Record<string, string> = {
  'AT&T Business Fiber': 'business-fiber-1g',
  'AT&T High Speed Internet': 'business-fiber-300m',
  'AT&T Business Voice': 'business-voice',
  'AT&T Business Mobility': 'business-fiber-1g',
  'Network Security': 'business-fiber-1g', // bundled with fiber
  'VPN': 'business-fiber-1g',
  'SD-WAN': 'business-fiber-1g', // SD-WAN needs robust connectivity foundation
  'IoT': 'business-fiber-1g',
  'IoT Solutions': 'business-fiber-1g',
  'FWA': 'internet-air-business',
  'Dedicated Internet': 'dedicated-internet',
  'VoIP': 'business-voice',
  'Cybersecurity': 'dynamic-defense',
  'Private 5G': 'business-fiber-5g',
  'Cloud Interconnect': 'business-fiber-5g', // High bandwidth needs for cloud
  'SIP Trunking': 'business-voice',
  'Basic Network Security': 'business-fiber-300m',
};

const mapProductsToIds = (products: string[]): string[] => {
  const ids = new Set<string>();
  products.forEach(product => {
    const id = productNameToId[product];
    if (id) ids.add(id);
  });
  // Always include at least business fiber
  if (ids.size === 0) ids.add('business-fiber-1g');
  return Array.from(ids).slice(0, 4);
};

export const personaBattlecards: PersonaBattlecard[] = customerPersonas.map(persona => ({
  persona,
  customerProfile: {
    type: mapSegmentToType(persona.segmentId),
    industry: persona.industry.toLowerCase().replace(/[^a-z]/g, '-'),
    employeeCount: mapEmployeeCount(persona.employeeCount),
    locations: mapLocations(persona.locations),
    budget: mapBudget(persona.techSophistication),
    priorities: persona.topNeeds.slice(0, 3).map(n => n.need.toLowerCase().replace(/ /g, '-')),
    currentProvider: [persona.currentProvider],
    painPoints: persona.painPoints.slice(0, 3),
    existingServices: persona.currentProvider.toLowerCase().includes('consumer') 
      ? ['cable-internet'] 
      : ['fiber-internet'],
  },
  recommendedProductIds: mapProductsToIds(persona.leadProducts),
}));

export const getPersonaBattlecardById = (personaId: string): PersonaBattlecard | undefined => {
  return personaBattlecards.find(bc => bc.persona.id === personaId);
};

export const getPersonaBattlecardsBySegment = (segmentId: number): PersonaBattlecard[] => {
  return personaBattlecards.filter(bc => bc.persona.segmentId === segmentId);
};

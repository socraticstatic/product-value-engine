import { BusinessProfile } from './types';

export interface MockPersona {
  id: string;
  name: string;
  icon: string;
  profile: BusinessProfile;
  marketType: 'smb' | 'enterprise';
}

// SMB Personas (existing)
export const SMB_PERSONAS: MockPersona[] = [
  {
    id: 'dental-practice',
    name: 'Dental Practice',
    icon: '🦷',
    marketType: 'smb',
    profile: {
      companyName: 'Bright Smile Dental',
      industry: 'healthcare',
      businessSize: '11-50',
      locations: '1',
      painPoints: ['downtime', 'slow-speeds', 'security-concerns'],
      priorities: ['reliability', 'security', 'cost-savings'],
      additionalContext: 'Multi-chair dental practice using cloud-based imaging software and electronic health records.'
    }
  },
  {
    id: 'retail-boutique',
    name: 'Retail Boutique',
    icon: '🛍️',
    marketType: 'smb',
    profile: {
      companyName: 'Urban Style Collective',
      industry: 'retail',
      businessSize: '1-10',
      locations: '2-5',
      painPoints: ['downtime', 'multi-vendor', 'high-costs'],
      priorities: ['reliability', 'cost-savings', 'scalability'],
      additionalContext: 'Multi-location boutique retail chain with POS systems, inventory management, and customer WiFi.'
    }
  },
  {
    id: 'law-firm',
    name: 'Law Firm',
    icon: '⚖️',
    marketType: 'smb',
    profile: {
      companyName: 'Morrison & Associates',
      industry: 'professional_services',
      businessSize: '11-50',
      locations: '1',
      painPoints: ['security-concerns', 'slow-speeds', 'poor-support'],
      priorities: ['security', 'reliability', 'support'],
      additionalContext: 'Mid-size law firm handling sensitive client data with heavy video conferencing usage.'
    }
  },
  {
    id: 'restaurant-group',
    name: 'Restaurant Group',
    icon: '🍽️',
    marketType: 'smb',
    profile: {
      companyName: 'Harbor Fresh Restaurants',
      industry: 'hospitality',
      businessSize: '51-200',
      locations: '6-20',
      painPoints: ['downtime', 'multi-vendor', 'high-costs'],
      priorities: ['reliability', 'cost-savings', 'scalability'],
      additionalContext: 'Multi-location restaurant group with POS systems and online ordering integration.'
    }
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing Facility',
    icon: '🏭',
    marketType: 'smb',
    profile: {
      companyName: 'Precision Parts Inc.',
      industry: 'manufacturing',
      businessSize: '51-200',
      locations: '1',
      painPoints: ['downtime', 'slow-speeds', 'legacy-systems'],
      priorities: ['reliability', 'speed', 'scalability'],
      additionalContext: 'Manufacturing facility with IoT-connected equipment and real-time production monitoring.'
    }
  },
  {
    id: 'construction-company',
    name: 'Construction Company',
    icon: '🏗️',
    marketType: 'smb',
    profile: {
      companyName: 'BuildRight Construction',
      industry: 'construction',
      businessSize: '11-50',
      locations: '2-5',
      painPoints: ['slow-speeds', 'multi-vendor', 'no-backup'],
      priorities: ['reliability', 'scalability', 'cost-savings'],
      additionalContext: 'Construction company with main office and multiple active job sites.'
    }
  },
  {
    id: 'accounting-firm',
    name: 'Accounting Firm',
    icon: '📊',
    marketType: 'smb',
    profile: {
      companyName: 'Summit Financial Services',
      industry: 'finance',
      businessSize: '11-50',
      locations: '1',
      painPoints: ['security-concerns', 'slow-speeds', 'poor-support'],
      priorities: ['security', 'reliability', 'support'],
      additionalContext: 'Accounting firm handling sensitive financial data with tax season peaks.'
    }
  },
  {
    id: 'medical-clinic',
    name: 'Medical Clinic',
    icon: '🏥',
    marketType: 'smb',
    profile: {
      companyName: 'Community Health Partners',
      industry: 'healthcare',
      businessSize: '51-200',
      locations: '2-5',
      painPoints: ['downtime', 'security-concerns', 'slow-speeds'],
      priorities: ['reliability', 'security', 'speed'],
      additionalContext: 'Multi-location medical clinic with EHR systems and telehealth services.'
    }
  },
  {
    id: 'logistics-company',
    name: 'Logistics Company',
    icon: '🚚',
    marketType: 'smb',
    profile: {
      companyName: 'Swift Freight Solutions',
      industry: 'transportation',
      businessSize: '201-500',
      locations: '6-20',
      painPoints: ['downtime', 'multi-vendor', 'no-backup'],
      priorities: ['reliability', 'scalability', 'backup-failover'],
      additionalContext: 'Logistics company with fleet tracking, warehouse management, and dispatch systems.'
    }
  },
  {
    id: 'school-district',
    name: 'K-12 School District',
    icon: '🏫',
    marketType: 'smb',
    profile: {
      companyName: 'Riverside Unified Schools',
      industry: 'education',
      businessSize: '201-500',
      locations: '6-20',
      painPoints: ['slow-speeds', 'security-concerns', 'legacy-systems'],
      priorities: ['reliability', 'security', 'cost-savings'],
      additionalContext: 'School district with 1:1 device programs and online learning platforms.'
    }
  }
];

// Enterprise Personas (NEW - from Enterprise Marketplace Segmentation)
export const ENTERPRISE_PERSONAS: MockPersona[] = [
  {
    id: 'enterprise-hospital-system',
    name: 'Regional Hospital System',
    icon: '🏥',
    marketType: 'enterprise',
    profile: {
      companyName: 'Mercy Regional Health System',
      industry: 'healthcare',
      businessSize: '5000-10000',
      locations: '21-50',
      painPoints: ['downtime', 'security-concerns', 'regulatory-compliance', 'multi-cloud'],
      priorities: ['reliability', 'security', '24x7-support', 'backup-failover'],
      additionalContext: 'Multi-hospital system with acute care, outpatient facilities, and telehealth services. HIPAA compliance critical. 50+ IT FTEs managing complex IoMT environment.',
      marketType: 'enterprise',
      enterpriseGrouping: 'healthcare'
    }
  },
  {
    id: 'enterprise-hotel-chain',
    name: 'National Hotel Chain',
    icon: '🏨',
    marketType: 'enterprise',
    profile: {
      companyName: 'Grandview Hospitality Group',
      industry: 'hospitality',
      businessSize: '5000-10000',
      locations: '100-500',
      painPoints: ['multi-vendor', 'global-connectivity', 'it-complexity', 'high-costs'],
      priorities: ['reliability', 'unified-management', 'scalability', 'proactive-monitoring'],
      additionalContext: 'National hotel chain with 200+ properties across 40 states. Guest WiFi, property management systems, and reservation platforms require 24/7 uptime.',
      marketType: 'enterprise',
      enterpriseGrouping: 'hospitality'
    }
  },
  {
    id: 'enterprise-manufacturing',
    name: 'Manufacturing Conglomerate',
    icon: '🏭',
    marketType: 'enterprise',
    profile: {
      companyName: 'Pacific Manufacturing Group',
      industry: 'manufacturing',
      businessSize: '2000-5000',
      locations: '6-20',
      painPoints: ['downtime', 'legacy-systems', 'it-complexity', 'vendor-consolidation'],
      priorities: ['reliability', 'network-modernization', 'scalability', 'digital-transformation'],
      additionalContext: 'Multi-plant manufacturing operation with OT/IT convergence needs. IoT sensors, SCADA systems, and real-time production analytics across 12 facilities.',
      marketType: 'enterprise',
      enterpriseGrouping: 'industrials'
    }
  },
  {
    id: 'enterprise-financial-services',
    name: 'Financial Services Enterprise',
    icon: '🏦',
    marketType: 'enterprise',
    profile: {
      companyName: 'Pinnacle Financial Corporation',
      industry: 'finance',
      businessSize: '2000-5000',
      locations: '51-100',
      painPoints: ['security-concerns', 'regulatory-compliance', 'multi-cloud', 'global-connectivity'],
      priorities: ['security', '24x7-support', 'reliability', 'backup-failover'],
      additionalContext: 'Regional bank with 75 branches and growing digital banking platform. SOC 2 and PCI-DSS compliance mandatory. Zero tolerance for security incidents.',
      marketType: 'enterprise',
      enterpriseGrouping: 'professional-services'
    }
  },
  {
    id: 'enterprise-retail-chain',
    name: 'National Retail Chain',
    icon: '🏬',
    marketType: 'enterprise',
    profile: {
      companyName: 'ValueMart Stores',
      industry: 'retail',
      businessSize: '10000+',
      locations: '500+',
      painPoints: ['downtime', 'multi-vendor', 'it-complexity', 'vendor-consolidation'],
      priorities: ['reliability', 'unified-management', 'cost-savings', 'scalability'],
      additionalContext: 'National retail chain with 500+ stores. POS reliability is mission-critical. Inventory management, supply chain, and omnichannel fulfillment require consistent connectivity.',
      marketType: 'enterprise',
      enterpriseGrouping: 'retail'
    }
  },
  {
    id: 'enterprise-tech-company',
    name: 'Software Development Company',
    icon: '💻',
    marketType: 'enterprise',
    profile: {
      companyName: 'Nexus Software Solutions',
      industry: 'technology',
      businessSize: '2000-5000',
      locations: '6-20',
      painPoints: ['slow-speeds', 'global-connectivity', 'multi-cloud', 'it-complexity'],
      priorities: ['speed', 'scalability', 'digital-transformation', 'global-reach'],
      additionalContext: 'Enterprise software company with distributed engineering teams across 8 global offices. Cloud-native infrastructure with multi-cloud strategy. Developer productivity depends on low-latency connectivity.',
      marketType: 'enterprise',
      enterpriseGrouping: 'technology'
    }
  }
];

// Combined personas
export const MOCK_PERSONAS: MockPersona[] = [...SMB_PERSONAS, ...ENTERPRISE_PERSONAS];

// Helper to get personas sorted by ROI for a given product selection
export function getPersonasByIndustry(industryKey: string): MockPersona[] {
  return MOCK_PERSONAS.filter(p => p.profile.industry === industryKey);
}

// Get unique industries from personas
export function getUniqueIndustries(): string[] {
  return [...new Set(MOCK_PERSONAS.map(p => p.profile.industry))];
}

// Get personas by market type
export function getPersonasByMarketType(marketType: 'smb' | 'enterprise' | 'all'): MockPersona[] {
  if (marketType === 'all') return MOCK_PERSONAS;
  return MOCK_PERSONAS.filter(p => p.marketType === marketType);
}

// Get personas by enterprise grouping
export function getPersonasByEnterpriseGrouping(grouping: string): MockPersona[] {
  return ENTERPRISE_PERSONAS.filter(p => p.profile.enterpriseGrouping === grouping);
}

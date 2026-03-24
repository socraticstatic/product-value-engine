export interface CustomerProfile {
  type: 'small-business' | 'mid-market' | 'enterprise';
  marketType?: 'smb' | 'enterprise';
  industry: string;
  businessDescription?: string; // e.g., "donut shop", "dental practice", "auto body shop"
  employeeCount: '1-10' | '11-50' | '51-200' | '201-500' | '500+' | '2000-5000' | '5000-10000' | '10000+';
  locations: '1' | '2-5' | '6-20' | '20+' | '50+' | '100+' | '500+';
  budget: 'cost-conscious' | 'balanced' | 'performance-focused';
  priorities: string[];
  currentProvider: string[];
  painPoints: string[];
  existingServices: string[];
  customChallenge?: string;
  customPriority?: string;
  enterpriseGrouping?: string;
}

export const industryOptions = [
  { id: 'retail', label: 'Retail' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'finance', label: 'Financial Services' },
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'professional-services', label: 'Professional Services' },
  { id: 'hospitality', label: 'Hospitality' },
  { id: 'construction', label: 'Construction' },
  { id: 'transportation', label: 'Transportation & Logistics' },
  { id: 'education', label: 'Education' },
  { id: 'government', label: 'Government' },
  { id: 'real-estate', label: 'Real Estate' },
  { id: 'technology', label: 'Technology' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'agriculture', label: 'Agriculture' },
  { id: 'utilities', label: 'Utilities/Energy' },
  { id: 'other', label: 'Other' },
];

export const priorityOptions = [
  { id: 'reliability', label: 'Keep Operations Running', technicalLabel: 'Network Reliability' },
  { id: 'security', label: 'Protect My Business & Customers', technicalLabel: 'Security & Compliance' },
  { id: 'speed', label: 'Move Faster, No Waiting', technicalLabel: 'Fast Speeds' },
  { id: 'scalability', label: 'Grow Without Limits', technicalLabel: 'Scalability' },
  { id: 'cost-savings', label: 'Lower My Monthly Bills', technicalLabel: 'Cost Reduction' },
  { id: 'remote-work', label: 'Work From Anywhere', technicalLabel: 'Remote Workforce' },
  { id: 'unified-comms', label: 'Connect My Team Seamlessly', technicalLabel: 'Unified Communications' },
  { id: 'iot', label: 'Connect All My Devices', technicalLabel: 'IoT/Connected Devices' },
  { id: 'backup-failover', label: 'Never Go Offline', technicalLabel: 'Backup & Failover' },
  { id: 'mobility', label: 'Stay Connected On-the-Go', technicalLabel: 'Mobile Workforce' },
  { id: 'always-on', label: 'Always-On Connectivity', technicalLabel: 'Always-On Connectivity' },
  // Enterprise-specific priorities
  { id: '24x7-support', label: 'Round-the-Clock Expert Support', technicalLabel: '24/7 Dedicated Support', marketType: 'enterprise' },
  { id: 'digital-transformation', label: 'Enable AI & Automation', technicalLabel: 'Digital Transformation', marketType: 'enterprise' },
  { id: 'network-modernization', label: 'Modernize Our Network', technicalLabel: 'SD-WAN/SASE', marketType: 'enterprise' },
  { id: 'global-reach', label: 'Consistent Global Experience', technicalLabel: 'Global Connectivity', marketType: 'enterprise' },
];

export const painPointOptions = [
  { id: 'slow-speeds', label: 'My team is waiting, not working', technicalLabel: 'Slow Internet Speeds' },
  { id: 'downtime', label: "Can't afford for systems to go down", technicalLabel: 'Network Downtime' },
  { id: 'security-concerns', label: 'Worried about data breaches', technicalLabel: 'Security Vulnerabilities' },
  { id: 'high-costs', label: 'Paying too much for connectivity', technicalLabel: 'High Telecom Costs' },
  { id: 'multiple-vendors', label: 'Juggling too many technology vendors', technicalLabel: 'Vendor Complexity' },
  { id: 'poor-support', label: "Can't get help when I need it", technicalLabel: 'Poor Customer Support' },
  { id: 'legacy-systems', label: 'Falling behind competitors', technicalLabel: 'Outdated Legacy Systems' },
  { id: 'compliance', label: 'Compliance keeps me up at night', technicalLabel: 'Compliance Challenges' },
  { id: 'scalability-limits', label: "Can't grow without infrastructure headaches", technicalLabel: 'Limited Scalability' },
  { id: 'no-backup', label: 'One outage away from disaster', technicalLabel: 'No Backup Connectivity' },
  // Enterprise-specific pain points
  { id: 'multi-cloud', label: 'Struggling with multi-cloud complexity', technicalLabel: 'Multi-Cloud Management', marketType: 'enterprise' },
  { id: 'global-connectivity', label: 'Inconsistent experience across regions', technicalLabel: 'Global Connectivity Gaps', marketType: 'enterprise' },
  { id: 'it-complexity', label: 'IT environment too complex to manage', technicalLabel: 'Infrastructure Complexity', marketType: 'enterprise' },
];

export const existingServiceOptions = [
  { id: 'landline', label: 'Traditional Landlines' },
  { id: 'voip', label: 'VoIP Phone System' },
  { id: 'cable-internet', label: 'Cable Internet' },
  { id: 'fiber-internet', label: 'Fiber Internet' },
  { id: 'wireless', label: 'Business Wireless' },
  { id: 'dsl', label: 'DSL Internet' },
  { id: 'pbx', label: 'PBX System' },
  { id: 'sd-wan', label: 'SD-WAN' },
  { id: 'mpls', label: 'MPLS Network' },
  { id: 'private-5g', label: 'Private 5G' },
  { id: 'none', label: 'None/Greenfield' },
];

export const competitorOptions = [
  'Verizon Business',
  'T-Mobile for Business',
  'Comcast Business',
  'Spectrum Enterprise',
  'Lumen/CenturyLink',
  'Frontier Business',
  'Cox Business',
  'Regional Provider',
  'Multiple Providers',
  'None/New Business',
];

// Helper to get market type from employee count
export function getMarketTypeFromEmployeeCount(employeeCount: string): 'smb' | 'enterprise' {
  const enterpriseSizes = ['2000-5000', '5000-10000', '10000+'];
  return enterpriseSizes.includes(employeeCount) ? 'enterprise' : 'smb';
}

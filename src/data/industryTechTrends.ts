// Industry-specific tech trends, emerging technology relevance, and market/competitive shifts

export interface TechTrend {
  trend: string;
  impact: 'high' | 'medium' | 'low';
  category: 'industry' | 'emerging' | 'competitive';
  relevantPriorities?: string[];
}

export interface IndustryTrends {
  industryTrends: TechTrend[];
  emergingTech: TechTrend[];
  competitiveShifts: TechTrend[];
  headline: string;
}

export const industryTechTrends: Record<string, IndustryTrends> = {
  'healthcare': {
    headline: 'Digital health transformation accelerating across all provider sizes',
    industryTrends: [
      { trend: 'Telehealth adoption now permanent — 38% of visits remain virtual', impact: 'high', category: 'industry', relevantPriorities: ['reliability', 'speed'] },
      { trend: 'IoT-enabled remote patient monitoring growing 29% YoY', impact: 'high', category: 'industry', relevantPriorities: ['iot', 'security'] },
      { trend: 'HIPAA-compliant cloud migration accelerating for EHR systems', impact: 'medium', category: 'industry', relevantPriorities: ['security', 'compliance'] },
      { trend: 'AI-assisted diagnostics requiring low-latency edge compute', impact: 'medium', category: 'industry', relevantPriorities: ['speed', 'reliability'] },
    ],
    emergingTech: [
      { trend: '5G-enabled ambulance connectivity for real-time telemetry', impact: 'high', category: 'emerging', relevantPriorities: ['mobility', 'reliability'] },
      { trend: 'Network slicing for guaranteed bandwidth on critical care apps', impact: 'high', category: 'emerging', relevantPriorities: ['reliability', 'security'] },
      { trend: 'Edge computing for on-premise AI imaging analysis', impact: 'medium', category: 'emerging', relevantPriorities: ['speed'] },
    ],
    competitiveShifts: [
      { trend: 'Competitors bundling UCaaS with basic connectivity — missing compliance', impact: 'high', category: 'competitive' },
      { trend: 'Regional providers can\'t match nationwide telehealth coverage needs', impact: 'medium', category: 'competitive' },
      { trend: 'Cable providers lack dedicated healthcare security certifications', impact: 'medium', category: 'competitive' },
    ],
  },
  'retail': {
    headline: 'Omnichannel retail demands seamless, secure connectivity at every touchpoint',
    industryTrends: [
      { trend: 'Unified commerce requires real-time inventory sync across all channels', impact: 'high', category: 'industry', relevantPriorities: ['reliability', 'speed'] },
      { trend: 'Contactless payments and mobile POS growing 45% annually', impact: 'high', category: 'industry', relevantPriorities: ['security', 'mobility'] },
      { trend: 'In-store analytics and foot traffic AI need always-on WiFi', impact: 'medium', category: 'industry', relevantPriorities: ['speed', 'iot'] },
      { trend: 'Supply chain visibility tools demanding real-time data feeds', impact: 'medium', category: 'industry', relevantPriorities: ['reliability'] },
    ],
    emergingTech: [
      { trend: 'Private 5G for large-format stores enabling AR customer experiences', impact: 'medium', category: 'emerging', relevantPriorities: ['speed', 'scalability'] },
      { trend: 'Edge compute for real-time pricing and personalization engines', impact: 'medium', category: 'emerging', relevantPriorities: ['speed'] },
      { trend: 'Computer vision loss prevention requiring dedicated bandwidth', impact: 'high', category: 'emerging', relevantPriorities: ['security', 'speed'] },
    ],
    competitiveShifts: [
      { trend: 'Cable providers struggle with multi-site consistency across regions', impact: 'high', category: 'competitive' },
      { trend: 'Competitors offering "good enough" connectivity miss PCI compliance depth', impact: 'medium', category: 'competitive' },
      { trend: 'SD-WAN bundling becoming table stakes — differentiation is in security', impact: 'high', category: 'competitive' },
    ],
  },
  'finance': {
    headline: 'Zero-trust security and real-time processing are non-negotiable',
    industryTrends: [
      { trend: 'Real-time fraud detection requiring sub-10ms latency', impact: 'high', category: 'industry', relevantPriorities: ['speed', 'security'] },
      { trend: 'Open banking APIs expanding attack surface — security spend up 34%', impact: 'high', category: 'industry', relevantPriorities: ['security', 'compliance'] },
      { trend: 'Hybrid workforce in financial services needs secure remote access', impact: 'medium', category: 'industry', relevantPriorities: ['remote-work', 'security'] },
      { trend: 'Regulatory compliance (SOX, PCI-DSS) tightening for cloud workloads', impact: 'high', category: 'industry', relevantPriorities: ['compliance', 'security'] },
    ],
    emergingTech: [
      { trend: 'AI-powered algorithmic trading needs deterministic low-latency networks', impact: 'high', category: 'emerging', relevantPriorities: ['speed', 'reliability'] },
      { trend: 'Blockchain settlement networks requiring dedicated high-throughput links', impact: 'medium', category: 'emerging', relevantPriorities: ['speed'] },
      { trend: 'Zero-trust network architecture replacing legacy VPN models', impact: 'high', category: 'emerging', relevantPriorities: ['security'] },
    ],
    competitiveShifts: [
      { trend: 'Competitors lack financial-grade SLAs with guaranteed uptime', impact: 'high', category: 'competitive' },
      { trend: 'Regional telcos can\'t provide cross-market redundancy for branch networks', impact: 'medium', category: 'competitive' },
      { trend: 'Cloud-first security providers don\'t own the network layer', impact: 'medium', category: 'competitive' },
    ],
  },
  'manufacturing': {
    headline: 'Industry 4.0 demands converged IT/OT networks with zero downtime',
    industryTrends: [
      { trend: 'Smart factory IoT sensors generating 2.5TB/day per facility', impact: 'high', category: 'industry', relevantPriorities: ['iot', 'speed'] },
      { trend: 'Predictive maintenance reducing unplanned downtime by 35%', impact: 'high', category: 'industry', relevantPriorities: ['reliability', 'iot'] },
      { trend: 'IT/OT convergence requiring network segmentation for safety', impact: 'medium', category: 'industry', relevantPriorities: ['security', 'reliability'] },
      { trend: 'Digital twin simulations requiring symmetrical high-bandwidth uploads', impact: 'medium', category: 'industry', relevantPriorities: ['speed', 'scalability'] },
    ],
    emergingTech: [
      { trend: 'Private 5G replacing WiFi on factory floors for deterministic latency', impact: 'high', category: 'emerging', relevantPriorities: ['reliability', 'mobility'] },
      { trend: 'Edge AI for real-time quality inspection at production line speed', impact: 'high', category: 'emerging', relevantPriorities: ['speed', 'iot'] },
      { trend: 'Autonomous mobile robots (AMRs) needing guaranteed wireless coverage', impact: 'medium', category: 'emerging', relevantPriorities: ['mobility', 'reliability'] },
    ],
    competitiveShifts: [
      { trend: 'Cable infrastructure can\'t reach industrial parks — fiber is essential', impact: 'high', category: 'competitive' },
      { trend: 'Competitors lack OT-aware network segmentation capabilities', impact: 'medium', category: 'competitive' },
      { trend: 'Multi-site manufacturers need single-provider WAN consistency', impact: 'high', category: 'competitive' },
    ],
  },
  'professional-services': {
    headline: 'Hybrid work and client collaboration define connectivity requirements',
    industryTrends: [
      { trend: 'Video conferencing consuming 60%+ of office bandwidth', impact: 'high', category: 'industry', relevantPriorities: ['speed', 'unified-comms'] },
      { trend: 'Cloud-based practice management requiring always-on access', impact: 'high', category: 'industry', relevantPriorities: ['reliability', 'speed'] },
      { trend: 'Client data protection driving zero-trust adoption in law/accounting', impact: 'medium', category: 'industry', relevantPriorities: ['security'] },
      { trend: 'Hybrid work models permanent — 72% of firms have formal policies', impact: 'high', category: 'industry', relevantPriorities: ['remote-work', 'unified-comms'] },
    ],
    emergingTech: [
      { trend: 'AI copilots for legal/financial research requiring cloud GPU access', impact: 'medium', category: 'emerging', relevantPriorities: ['speed'] },
      { trend: 'Immersive client presentations via AR/VR demanding symmetric bandwidth', impact: 'low', category: 'emerging', relevantPriorities: ['speed'] },
      { trend: 'AI-powered document analysis driving need for secure cloud pipelines', impact: 'medium', category: 'emerging', relevantPriorities: ['security', 'speed'] },
    ],
    competitiveShifts: [
      { trend: 'Competitors bundle basic VoIP but lack enterprise-grade UCaaS features', impact: 'high', category: 'competitive' },
      { trend: 'Regional ISPs can\'t support multi-office firms across geographies', impact: 'medium', category: 'competitive' },
      { trend: 'AT&T symmetrical fiber speeds differentiate for large file transfers', impact: 'high', category: 'competitive' },
    ],
  },
  'hospitality': {
    headline: 'Guest experience and operational efficiency drive technology investment',
    industryTrends: [
      { trend: 'Guest WiFi now #1 amenity expectation — 89% rate it essential', impact: 'high', category: 'industry', relevantPriorities: ['speed', 'reliability'] },
      { trend: 'Mobile check-in/keyless entry requiring robust on-property networks', impact: 'high', category: 'industry', relevantPriorities: ['mobility', 'reliability'] },
      { trend: 'IoT smart room controls (lighting, HVAC, entertainment) expanding', impact: 'medium', category: 'industry', relevantPriorities: ['iot', 'scalability'] },
      { trend: 'Multi-property management platforms need site-to-site connectivity', impact: 'medium', category: 'industry', relevantPriorities: ['reliability'] },
    ],
    emergingTech: [
      { trend: 'AI concierge chatbots handling 40% of guest service requests', impact: 'medium', category: 'emerging', relevantPriorities: ['speed'] },
      { trend: 'In-room streaming casting requiring per-room bandwidth guarantees', impact: 'medium', category: 'emerging', relevantPriorities: ['speed', 'scalability'] },
      { trend: 'Facial recognition for VIP guest identification at check-in', impact: 'low', category: 'emerging', relevantPriorities: ['security', 'speed'] },
    ],
    competitiveShifts: [
      { trend: 'Cable providers can\'t scale WiFi density for high-occupancy events', impact: 'high', category: 'competitive' },
      { trend: 'Competitors offer connectivity but not integrated guest analytics', impact: 'medium', category: 'competitive' },
      { trend: 'Multi-property chains need single-throat-to-choke provider', impact: 'high', category: 'competitive' },
    ],
  },
  'construction': {
    headline: 'Job site connectivity and safety tech drive mobile-first strategies',
    industryTrends: [
      { trend: 'BIM collaboration requiring real-time cloud access from job sites', impact: 'high', category: 'industry', relevantPriorities: ['mobility', 'speed'] },
      { trend: 'Drone site surveys generating large datasets needing fast upload', impact: 'medium', category: 'industry', relevantPriorities: ['speed', 'mobility'] },
      { trend: 'Safety compliance monitoring via connected wearables expanding', impact: 'high', category: 'industry', relevantPriorities: ['iot', 'reliability'] },
      { trend: 'Project management going fully cloud — no tolerance for offline gaps', impact: 'high', category: 'industry', relevantPriorities: ['reliability', 'backup-failover'] },
    ],
    emergingTech: [
      { trend: '5G fixed wireless for temporary high-bandwidth job site connectivity', impact: 'high', category: 'emerging', relevantPriorities: ['mobility', 'speed'] },
      { trend: 'AR/MR headsets for remote expert guidance on complex installations', impact: 'medium', category: 'emerging', relevantPriorities: ['speed', 'mobility'] },
      { trend: 'Autonomous equipment requiring ultra-reliable low-latency networks', impact: 'medium', category: 'emerging', relevantPriorities: ['reliability'] },
    ],
    competitiveShifts: [
      { trend: 'Wireline-only providers can\'t serve temporary or remote job sites', impact: 'high', category: 'competitive' },
      { trend: 'AT&T\'s FirstNet advantage for public safety adjacent construction', impact: 'medium', category: 'competitive' },
      { trend: 'Competitors lack flexible contract terms for project-based work', impact: 'medium', category: 'competitive' },
    ],
  },
  'transportation': {
    headline: 'Real-time fleet visibility and IoT logistics reshape the industry',
    industryTrends: [
      { trend: 'ELD mandate driving fleet connectivity to 100% — no exceptions', impact: 'high', category: 'industry', relevantPriorities: ['mobility', 'compliance'] },
      { trend: 'Real-time route optimization saving 15-20% on fuel costs', impact: 'high', category: 'industry', relevantPriorities: ['iot', 'speed'] },
      { trend: 'Cold chain monitoring IoT sensors for pharmaceutical/food transport', impact: 'high', category: 'industry', relevantPriorities: ['iot', 'reliability'] },
      { trend: 'Driver safety cameras and telematics requiring always-on cellular', impact: 'medium', category: 'industry', relevantPriorities: ['mobility', 'reliability'] },
    ],
    emergingTech: [
      { trend: 'V2X (vehicle-to-everything) communication for fleet safety', impact: 'medium', category: 'emerging', relevantPriorities: ['mobility'] },
      { trend: 'Platooning and semi-autonomous trucking needing deterministic latency', impact: 'low', category: 'emerging', relevantPriorities: ['reliability', 'speed'] },
      { trend: 'Predictive maintenance for fleet vehicles via edge AI', impact: 'high', category: 'emerging', relevantPriorities: ['iot', 'reliability'] },
    ],
    competitiveShifts: [
      { trend: 'AT&T\'s nationwide coverage critical for coast-to-coast fleet ops', impact: 'high', category: 'competitive' },
      { trend: 'Competitors can\'t match IoT SIM management at enterprise fleet scale', impact: 'medium', category: 'competitive' },
      { trend: 'Regional carriers have coverage gaps on rural interstate corridors', impact: 'high', category: 'competitive' },
    ],
  },
  'education': {
    headline: 'Digital equity and hybrid learning demand scalable, secure networks',
    industryTrends: [
      { trend: '1:1 device programs making per-student bandwidth planning critical', impact: 'high', category: 'industry', relevantPriorities: ['speed', 'scalability'] },
      { trend: 'Hybrid/HyFlex learning models now permanent in 65% of institutions', impact: 'high', category: 'industry', relevantPriorities: ['reliability', 'unified-comms'] },
      { trend: 'Student data privacy regulations (FERPA, COPPA) tightening', impact: 'high', category: 'industry', relevantPriorities: ['security', 'compliance'] },
      { trend: 'E-Rate funding cycles driving predictable upgrade windows', impact: 'medium', category: 'industry', relevantPriorities: ['cost-savings'] },
    ],
    emergingTech: [
      { trend: 'AI tutoring platforms requiring low-latency cloud access per student', impact: 'medium', category: 'emerging', relevantPriorities: ['speed'] },
      { trend: 'VR/AR labs for STEM education needing dedicated high-bandwidth', impact: 'medium', category: 'emerging', relevantPriorities: ['speed', 'scalability'] },
      { trend: 'Campus IoT (smart building, security cameras) expanding rapidly', impact: 'medium', category: 'emerging', relevantPriorities: ['iot', 'security'] },
    ],
    competitiveShifts: [
      { trend: 'E-Rate eligible providers have procurement advantage — AT&T qualifies', impact: 'high', category: 'competitive' },
      { trend: 'Cable providers lack campus-wide managed WiFi capabilities', impact: 'medium', category: 'competitive' },
      { trend: 'Competitors can\'t scale content filtering across district-wide deployments', impact: 'medium', category: 'competitive' },
    ],
  },
  'government': {
    headline: 'Modernization mandates and cybersecurity executive orders reshape IT',
    industryTrends: [
      { trend: 'Zero-trust mandates (EO 14028) requiring network-level enforcement', impact: 'high', category: 'industry', relevantPriorities: ['security', 'compliance'] },
      { trend: 'Citizen-facing digital services requiring 99.99% availability', impact: 'high', category: 'industry', relevantPriorities: ['reliability'] },
      { trend: 'FedRAMP/StateRAMP cloud requirements for all new deployments', impact: 'high', category: 'industry', relevantPriorities: ['compliance', 'security'] },
      { trend: 'Legacy system modernization budgets increasing 25% annually', impact: 'medium', category: 'industry', relevantPriorities: ['scalability'] },
    ],
    emergingTech: [
      { trend: 'FirstNet priority and preemption for public safety operations', impact: 'high', category: 'emerging', relevantPriorities: ['reliability', 'mobility'] },
      { trend: 'Smart city IoT (traffic, utilities, public safety sensors) expanding', impact: 'high', category: 'emerging', relevantPriorities: ['iot', 'scalability'] },
      { trend: 'AI for citizen service automation and fraud detection', impact: 'medium', category: 'emerging', relevantPriorities: ['speed', 'security'] },
    ],
    competitiveShifts: [
      { trend: 'AT&T\'s FirstNet gives unique public safety sector advantage', impact: 'high', category: 'competitive' },
      { trend: 'Competitors lack government-grade security certifications', impact: 'high', category: 'competitive' },
      { trend: 'Regional providers can\'t meet multi-jurisdiction deployment requirements', impact: 'medium', category: 'competitive' },
    ],
  },
  'real-estate': {
    headline: 'Smart building tech and tenant connectivity are competitive differentiators',
    industryTrends: [
      { trend: 'Smart building management systems reducing operating costs 20-30%', impact: 'high', category: 'industry', relevantPriorities: ['iot', 'cost-savings'] },
      { trend: 'Tenant connectivity now a top-3 factor in commercial lease decisions', impact: 'high', category: 'industry', relevantPriorities: ['speed', 'reliability'] },
      { trend: 'Virtual tours and remote property management going mainstream', impact: 'medium', category: 'industry', relevantPriorities: ['speed', 'mobility'] },
      { trend: 'ESG reporting requiring building energy/utilization data collection', impact: 'medium', category: 'industry', relevantPriorities: ['iot'] },
    ],
    emergingTech: [
      { trend: 'Digital twin building models for predictive maintenance', impact: 'medium', category: 'emerging', relevantPriorities: ['iot', 'speed'] },
      { trend: 'In-building 5G/CBRS for premium tenant connectivity', impact: 'high', category: 'emerging', relevantPriorities: ['speed', 'scalability'] },
      { trend: 'AI-powered property valuation and market analysis tools', impact: 'low', category: 'emerging', relevantPriorities: ['speed'] },
    ],
    competitiveShifts: [
      { trend: 'Property managers want single provider for building + tenant connectivity', impact: 'high', category: 'competitive' },
      { trend: 'Competitors lack in-building DAS/small cell deployment expertise', impact: 'medium', category: 'competitive' },
      { trend: 'AT&T fiber availability in commercial zones is a key differentiator', impact: 'high', category: 'competitive' },
    ],
  },
};

// Normalize industry keys for lookup
function normalizeIndustryKey(industry: string): string {
  const normalized = industry.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const keyMap: Record<string, string> = {
    'healthcare': 'healthcare', 'health-care': 'healthcare', 'medical': 'healthcare',
    'retail': 'retail', 'e-commerce': 'retail', 'ecommerce': 'retail',
    'finance': 'finance', 'financial': 'finance', 'financial-services': 'finance', 'banking': 'finance',
    'manufacturing': 'manufacturing', 'industrial': 'manufacturing',
    'professional-services': 'professional-services', 'legal': 'professional-services', 'accounting': 'professional-services', 'consulting': 'professional-services',
    'hospitality': 'hospitality', 'hotel': 'hospitality', 'hotels': 'hospitality', 'restaurant': 'hospitality', 'restaurants': 'hospitality',
    'construction': 'construction',
    'transportation': 'transportation', 'logistics': 'transportation', 'transport': 'transportation', 'transportation-logistics': 'transportation',
    'education': 'education', 'k-12': 'education', 'higher-education': 'education',
    'government': 'government', 'public-sector': 'government',
    'real-estate': 'real-estate', 'property': 'real-estate', 'property-management': 'real-estate',
  };
  return keyMap[normalized] || normalized;
}

export function getIndustryTrends(industry: string): IndustryTrends | null {
  const key = normalizeIndustryKey(industry);
  return industryTechTrends[key] || null;
}

export function getTopTrends(industry: string, count: number = 3): TechTrend[] {
  const data = getIndustryTrends(industry);
  if (!data) return [];
  const all = [...data.industryTrends, ...data.emergingTech, ...data.competitiveShifts];
  return all.filter(t => t.impact === 'high').slice(0, count);
}

export function getTrendsRelevantToPersona(industry: string, priorities?: string[]): TechTrend[] {
  const data = getIndustryTrends(industry);
  if (!data) return [];
  if (!priorities || priorities.length === 0) {
    return getTopTrends(industry, 4);
  }
  const all = [...data.industryTrends, ...data.emergingTech, ...data.competitiveShifts];
  const relevant = all.filter(t => 
    t.relevantPriorities?.some(p => priorities.includes(p))
  );
  // If not enough relevant, pad with high-impact ones
  if (relevant.length < 2) {
    const highImpact = all.filter(t => t.impact === 'high' && !relevant.includes(t));
    return [...relevant, ...highImpact].slice(0, 4);
  }
  return relevant.slice(0, 6);
}

export function getTrendsByCategory(industry: string): { industry: TechTrend[]; emerging: TechTrend[]; competitive: TechTrend[] } {
  const data = getIndustryTrends(industry);
  if (!data) return { industry: [], emerging: [], competitive: [] };
  return {
    industry: data.industryTrends,
    emerging: data.emergingTech,
    competitive: data.competitiveShifts,
  };
}

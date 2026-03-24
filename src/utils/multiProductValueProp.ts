import { products, Product } from '@/data/products';
import { getProductDifferentiators, generalDifferentiators } from '@/data/competitiveDifferentiation';
import { CustomerProfile } from '@/types/customer';

// ── Types ──────────────────────────────────────────────────────

export interface MultiProductValueProp {
  /** Unified narrative weaving all products into one story */
  combinedNarrative: string;
  /** Per-product value propositions */
  perProduct: PerProductProp[];
  /** Why AT&T multi-product beats mixing vendors */
  competitivePositioning: CompetitivePositioning;
  /** Customer-outcome mapping */
  outcomes: OutcomeMapping[];
  /** Industry-specific insights (only when profile provided) */
  industryInsights: string[];
  /** Synergies between the selected products */
  synergies: string[];
  /** One-liner elevator pitch */
  elevatorPitch: string;
}

export interface PerProductProp {
  product: Product;
  keyBenefit: string;
  differentiator: string;
  roleInSolution: string;
}

export interface CompetitivePositioning {
  primaryMessage: string;
  vendorComplexityRisk: string;
  attAdvantages: string[];
  competitorWeaknesses: string[];
}

export interface OutcomeMapping {
  outcome: string;
  howDelivered: string;
  productsInvolved: string[];
}

// ── Industry-specific insight templates ────────────────────────

const industryInsightTemplates: Record<string, (productCategories: string[]) => string[]> = {
  retail: (cats) => {
    const insights = ['POS systems and e-commerce platforms require consistent, low-latency connectivity during peak shopping periods'];
    if (cats.includes('voice')) insights.push('Customer-facing phone lines directly impact sales conversion — missed calls mean missed revenue');
    if (cats.includes('security')) insights.push('PCI compliance for payment processing demands network-level security');
    return insights;
  },
  healthcare: (cats) => {
    const insights = ['HIPAA compliance requires end-to-end encrypted connectivity with audit trails'];
    if (cats.includes('connectivity')) insights.push('EHR systems and telehealth platforms need symmetrical bandwidth for real-time data exchange');
    if (cats.includes('mobility')) insights.push('Clinical staff need secure mobile access to patient records across facilities');
    return insights;
  },
  manufacturing: (cats) => {
    const insights = ['Production line IoT sensors and automation systems require ultra-reliable, low-latency connections'];
    if (cats.includes('connectivity')) insights.push('Cloud-connected MES and ERP systems need consistent bandwidth to prevent production data gaps');
    if (cats.includes('voice')) insights.push('Plant floor communications and supply chain coordination depend on reliable voice quality');
    return insights;
  },
  finance: (cats) => {
    const insights = ['Financial transactions and compliance systems demand zero-downtime connectivity'];
    if (cats.includes('security')) insights.push('SOX and PCI-DSS compliance require network-embedded security with real-time threat monitoring');
    if (cats.includes('connectivity')) insights.push('High-frequency trading and real-time market data feeds depend on symmetrical, low-latency fiber');
    return insights;
  },
  hospitality: (cats) => {
    const insights = ['Guest experience directly correlates with network reliability — one bad review about WiFi impacts bookings'];
    if (cats.includes('voice')) insights.push('Reservation systems and concierge lines need crystal-clear voice quality');
    if (cats.includes('connectivity')) insights.push('Property management systems, keycard access, and in-room streaming all compete for bandwidth');
    return insights;
  },
  'professional-services': (cats) => {
    const insights = ['Client-facing video conferencing and cloud collaboration tools are the backbone of billable work'];
    if (cats.includes('connectivity')) insights.push('Large file transfers for legal, accounting, and design work demand symmetrical upload speeds');
    if (cats.includes('mobility')) insights.push('Mobile workforce needs seamless connectivity between office, home, and client sites');
    return insights;
  },
  construction: (cats) => {
    const insights = ['Job site connectivity directly impacts project timelines — delays waiting for plans or approvals cost thousands per day'];
    if (cats.includes('mobility')) insights.push('Field crews need reliable mobile connectivity for blueprints, safety compliance, and real-time communication');
    return insights;
  },
  transportation: (cats) => {
    const insights = ['Fleet tracking and logistics optimization require always-on connectivity across fixed and mobile assets'];
    if (cats.includes('connectivity')) insights.push('Warehouse management systems and dispatch operations need reliable, low-latency connections');
    return insights;
  },
  education: (cats) => {
    const insights = ['1:1 device programs and virtual learning platforms require consistent bandwidth across all classrooms'];
    if (cats.includes('security')) insights.push('Student data protection under FERPA/COPPA requires network-level content filtering and security');
    return insights;
  },
  government: (cats) => {
    const insights = ['Citizen services and emergency management systems demand carrier-grade reliability and security'];
    if (cats.includes('security')) insights.push('FedRAMP and CJIS compliance require vetted, certified network infrastructure');
    return insights;
  },
};

// ── Synergy detection ──────────────────────────────────────────

function detectSynergies(selectedProducts: Product[]): string[] {
  const synergies: string[] = [];
  const categories = new Set(selectedProducts.map(p => p.category));

  if (categories.has('connectivity') && categories.has('voice')) {
    synergies.push('Voice quality is optimized over AT&T fiber — no integration complexity between internet and phone providers');
  }
  if (categories.has('connectivity') && (categories.has('mobility') || categories.has('24-hour-internet'))) {
    synergies.push('Built-in 5G backup provides automatic failover during fiber outages — competitors charge extra and require separate configuration');
  }
  if (categories.has('voice') && categories.has('mobility')) {
    synergies.push('Seamless voice experience across desk phones and mobile devices with unified call routing');
  }
  if (categories.has('connectivity') && categories.has('security')) {
    synergies.push('Network-embedded security means threats are blocked at the network layer before reaching your devices');
  }
  if (selectedProducts.length > 1) {
    synergies.push('Single vendor SLA covers the entire solution — no blame game between providers when issues arise');
    synergies.push('One bill, one support contact, one account team for all services');
  }
  if (selectedProducts.length >= 3) {
    synergies.push('Comprehensive communications stack reduces IT management overhead by consolidating vendors');
  }

  return synergies;
}

// ── Outcome mapping ────────────────────────────────────────────

function mapOutcomes(selectedProducts: Product[], profile?: Partial<CustomerProfile>): OutcomeMapping[] {
  const outcomes: OutcomeMapping[] = [];
  const categories = new Set(selectedProducts.map(p => p.category));

  if (categories.has('connectivity')) {
    outcomes.push({
      outcome: 'Your team works without waiting — cloud apps, video calls, and file transfers happen instantly',
      howDelivered: 'Symmetrical fiber speeds ensure uploads match downloads for real-time collaboration',
      productsInvolved: selectedProducts.filter(p => p.category === 'connectivity').map(p => p.name),
    });
  }
  if (categories.has('voice')) {
    outcomes.push({
      outcome: 'Every customer call connects clearly — no dropped calls, no voicemail surprises',
      howDelivered: 'Carrier-grade voice reliability with 99.9% uptime and crystal-clear call quality',
      productsInvolved: selectedProducts.filter(p => p.category === 'voice').map(p => p.name),
    });
  }
  if (categories.has('mobility') || categories.has('24-hour-internet')) {
    outcomes.push({
      outcome: 'Your business stays connected everywhere — office, field, and on the road',
      howDelivered: 'America\'s most reliable 5G network with AT&T Guarantee performance commitment',
      productsInvolved: selectedProducts.filter(p => ['mobility', '24-hour-internet'].includes(p.category)).map(p => p.name),
    });
  }
  if (categories.has('security')) {
    outcomes.push({
      outcome: 'Threats are stopped before they reach your business — proactive, not reactive security',
      howDelivered: 'Network-embedded threat intelligence blocks attacks at the network layer',
      productsInvolved: selectedProducts.filter(p => p.category === 'security').map(p => p.name),
    });
  }
  if (selectedProducts.length > 1) {
    outcomes.push({
      outcome: 'One relationship handles everything — no vendor juggling, no finger-pointing',
      howDelivered: 'Single vendor accountability with the AT&T Guarantee covering all services',
      productsInvolved: selectedProducts.map(p => p.name),
    });
  }

  // Add industry-specific outcome if profile provided
  if (profile?.industry) {
    const industryOutcomes: Record<string, OutcomeMapping> = {
      retail: { outcome: 'Keep your POS running and customers transacting — even during peak hours', howDelivered: 'Dedicated fiber bandwidth prevents slowdowns during high-traffic periods', productsInvolved: [] },
      healthcare: { outcome: 'Patient data flows securely between systems — supporting care, not slowing it down', howDelivered: 'HIPAA-ready connectivity with built-in encryption and redundancy', productsInvolved: [] },
      manufacturing: { outcome: 'Production lines stay connected to cloud systems — no data gaps, no downtime', howDelivered: 'Ultra-reliable connectivity with automatic failover for continuous operations', productsInvolved: [] },
    };
    const io = industryOutcomes[profile.industry];
    if (io) {
      io.productsInvolved = selectedProducts.map(p => p.name);
      outcomes.push(io);
    }
  }

  return outcomes;
}

// ── Competitive positioning ────────────────────────────────────

function buildCompetitivePositioning(selectedProducts: Product[]): CompetitivePositioning {
  const count = selectedProducts.length;
  const advantages: string[] = [];
  const weaknesses: string[] = [];

  // Collect from differentiation data
  selectedProducts.forEach(p => {
    const diff = getProductDifferentiators(p.id);
    if (diff) {
      diff.uniqueSellingPoints.slice(0, 1).forEach(usp => advantages.push(usp));
      diff.competitorComparisons.slice(0, 1).forEach(cc => {
        weaknesses.push(`${cc.competitor}: ${cc.nuance}`);
      });
    }
  });

  // Add bundle-level advantages
  if (count > 1) {
    generalDifferentiators.bundleStrategy.advantages.forEach(a => advantages.push(a));
    generalDifferentiators.attGuarantee.components.forEach(c => advantages.push(c));
  }

  return {
    primaryMessage: count > 1
      ? `This ${count}-product AT&T solution replaces what would require ${count}+ separate vendors, eliminating billing complexity, integration headaches, and the finger-pointing that happens when things break.`
      : `AT&T delivers this solution backed by the AT&T Guarantee — a commitment no other provider matches.`,
    vendorComplexityRisk: count > 1
      ? `With ${count} separate vendors, your team manages ${count} bills, ${count} support contacts, and zero accountability when services don't work together. AT&T eliminates this entirely.`
      : 'Even for a single service, AT&T provides dedicated business support and SLA guarantees that consumer or regional providers cannot match.',
    attAdvantages: [...new Set(advantages)].slice(0, 8),
    competitorWeaknesses: [...new Set(weaknesses)].slice(0, 4),
  };
}

// ── Per-product props ──────────────────────────────────────────

function buildPerProductProps(selectedProducts: Product[]): PerProductProp[] {
  const categoryRoles: Record<string, string> = {
    connectivity: 'Foundation — provides the bandwidth backbone for all cloud, voice, and data operations',
    voice: 'Communication layer — ensures every customer and team interaction is clear and reliable',
    mobility: 'Mobile extension — keeps your workforce connected beyond the four walls',
    '24-hour-internet': 'Rapid deployment — gets your business online immediately while fiber is installed',
    security: 'Protection layer — secures data and operations at the network level',
    iot: 'Intelligence layer — connects devices and sensors for operational visibility',
    bundle: 'Complete solution — combines multiple services into a unified package',
    'all-in-one': 'Unified platform — single solution covering connectivity, voice, and collaboration',
  };

  return selectedProducts.map(product => ({
    product,
    keyBenefit: product.valuePropositionStatement.keyBenefit,
    differentiator: product.valuePropositionStatement.differentiation,
    roleInSolution: categoryRoles[product.category] || 'Supporting component in the overall solution',
  }));
}

// ── Combined narrative ─────────────────────────────────────────

function generateCombinedNarrative(selectedProducts: Product[], profile?: Partial<CustomerProfile>): string {
  const names = selectedProducts.map(p => p.name);
  const categories = [...new Set(selectedProducts.map(p => p.category))];
  const count = selectedProducts.length;

  // Industry opener
  let industryContext = '';
  if (profile?.industry) {
    const industryLabels: Record<string, string> = {
      retail: 'In retail, every second of downtime is a missed sale.',
      healthcare: 'In healthcare, connectivity isn\'t convenience — it\'s patient care.',
      manufacturing: 'On the production floor, a disconnected system means a stopped line.',
      finance: 'In financial services, milliseconds matter and security is non-negotiable.',
      hospitality: 'In hospitality, guest experience starts with the network.',
      'professional-services': 'For professional services, your network is your office.',
      construction: 'On the job site, connectivity keeps projects on schedule.',
      transportation: 'In logistics, real-time visibility keeps everything moving.',
      education: 'In education, connectivity is the foundation of modern learning.',
      government: 'For government agencies, reliability and security are mission-critical.',
    };
    industryContext = industryLabels[profile.industry] || '';
  }

  // Category descriptions
  const categoryDescriptions: string[] = [];
  if (categories.includes('connectivity')) categoryDescriptions.push('reliable high-speed fiber');
  if (categories.includes('voice')) categoryDescriptions.push('carrier-grade voice');
  if (categories.includes('mobility') || categories.includes('24-hour-internet')) categoryDescriptions.push('mobile connectivity');
  if (categories.includes('security')) categoryDescriptions.push('network-embedded security');

  const solutionPhrase = categoryDescriptions.length > 0
    ? categoryDescriptions.join(', ').replace(/, ([^,]*)$/, ', and $1')
    : 'comprehensive business communications';

  // Build the narrative
  const opener = industryContext
    ? `${industryContext} `
    : '';

  if (count === 1) {
    return `${opener}${names[0]} delivers ${selectedProducts[0].valuePropositionStatement.customerOutcome}. ${selectedProducts[0].valuePropositionStatement.keyDifferentiator}. Unlike ${selectedProducts[0].valuePropositionStatement.unlike}, AT&T provides ${selectedProducts[0].valuePropositionStatement.differentiation}.`;
  }

  const synergySentence = count >= 3
    ? 'Together, these services create a unified communications stack where each component strengthens the others — and one provider stands behind all of it.'
    : 'Together, these services work as a unified solution — one provider, one bill, one team standing behind everything.';

  return `${opener}This solution combines ${solutionPhrase} into a single AT&T relationship. ${names.join(' and ')} work together to ensure your operations run without interruption. ${synergySentence} No vendor juggling, no finger-pointing — just the AT&T Guarantee covering your entire solution.`;
}

// ── Elevator pitch ─────────────────────────────────────────────

function generateElevatorPitch(selectedProducts: Product[]): string {
  const count = selectedProducts.length;
  if (count === 1) {
    return `${selectedProducts[0].name}: ${selectedProducts[0].valuePropositionStatement.customerOutcome}.`;
  }
  const categories = [...new Set(selectedProducts.map(p => p.category))];
  const categoryLabels: string[] = [];
  if (categories.includes('connectivity')) categoryLabels.push('connectivity');
  if (categories.includes('voice')) categoryLabels.push('voice');
  if (categories.includes('mobility') || categories.includes('24-hour-internet')) categoryLabels.push('mobility');
  if (categories.includes('security')) categoryLabels.push('security');

  return `Complete ${categoryLabels.join(' + ')} from one provider — backed by the AT&T Guarantee. One bill, one team, zero finger-pointing.`;
}

// ── Main export ────────────────────────────────────────────────

/**
 * Generates a comprehensive multi-product value proposition.
 * Works in broad mode (no profile) or tailored mode (with profile).
 */
export function generateMultiProductValueProp(
  productIds: string[],
  profile?: Partial<CustomerProfile>
): MultiProductValueProp {
  const selectedProducts = productIds
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => Boolean(p));

  if (selectedProducts.length === 0) {
    return {
      combinedNarrative: '',
      perProduct: [],
      competitivePositioning: { primaryMessage: '', vendorComplexityRisk: '', attAdvantages: [], competitorWeaknesses: [] },
      outcomes: [],
      industryInsights: [],
      synergies: [],
      elevatorPitch: '',
    };
  }

  // Industry insights
  const productCategories = [...new Set(selectedProducts.map(p => p.category))];
  let industryInsights: string[] = [];
  if (profile?.industry) {
    const templateFn = industryInsightTemplates[profile.industry];
    if (templateFn) {
      industryInsights = templateFn(productCategories);
    }
  }

  return {
    combinedNarrative: generateCombinedNarrative(selectedProducts, profile),
    perProduct: buildPerProductProps(selectedProducts),
    competitivePositioning: buildCompetitivePositioning(selectedProducts),
    outcomes: mapOutcomes(selectedProducts, profile),
    industryInsights,
    synergies: detectSynergies(selectedProducts),
    elevatorPitch: generateElevatorPitch(selectedProducts),
  };
}

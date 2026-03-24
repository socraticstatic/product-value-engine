import { CustomerProfile } from '@/types/customer';

// ============= PUNCTUATION AND GRAMMAR HELPERS =============

// Ensure proper sentence ending with single period
function ensureProperEnding(text: string): string {
  if (!text) return '';
  const trimmed = text.trim();
  // If already ends with terminal punctuation, return as-is
  if (/[.!?]$/.test(trimmed)) {
    return trimmed;
  }
  return trimmed + '.';
}

// Safely lowercase first character, respecting proper nouns and acronyms
function safelyLowerFirst(text: string): string {
  if (!text) return '';
  const trimmed = text.trim();
  // Don't lowercase if starts with proper noun patterns or acronyms
  const properNounPatterns = /^(AT&T|API|SLA|PCI|HIPAA|IT|IoT|MES|EHR|EDI|POS|WiFi|5G|4G|LTE|Your|You|We|They|The|A|An|One|Every|Each|All)/;
  if (properNounPatterns.test(trimmed)) {
    return trimmed;
  }
  return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
}

// Clean and normalize text - remove double spaces, fix common issues
function cleanText(text: string): string {
  if (!text) return '';
  return text
    .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
    .replace(/\s+\./g, '.') // Remove spaces before periods
    .replace(/\.+/g, '.')   // Replace multiple periods with single period
    .trim();
}

// ============= INDUSTRY NORMALIZATION HELPER =============
// Maps various industry strings to standardized keys for context lookup
const normalizeIndustryKey = (industry: string): string => {
  const normalized = industry.toLowerCase().replace(/[^a-z]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  
  // Map common variations to standard keys
  const industryMappings: Record<string, string> = {
    // Direct matches
    'manufacturing': 'manufacturing',
    'healthcare': 'healthcare',
    'retail': 'retail',
    'finance': 'finance',
    'hospitality': 'hospitality',
    'professional-services': 'professional-services',
    'construction': 'construction',
    'transportation': 'transportation',
    
    // Variations that should map to standard keys
    'retail-e-commerce': 'retail',
    'e-commerce': 'retail',
    'food-beverage': 'hospitality',
    'restaurants': 'hospitality',
    'hotels': 'hospitality',
    'legal-services': 'professional-services',
    'legal': 'professional-services',
    'accounting': 'professional-services',
    'consulting': 'professional-services',
    'financial-services': 'finance',
    'banking': 'finance',
    'insurance': 'finance',
    'automotive-services': 'manufacturing',
    'automotive': 'manufacturing',
    'technology-services': 'professional-services',
    'technology': 'professional-services',
    'it-services': 'professional-services',
    'health-wellness': 'healthcare',
    'medical': 'healthcare',
    'logistics': 'transportation',
    'shipping': 'transportation',
    'trucking': 'transportation',
    'real-estate': 'real-estate',
    'education': 'education',
    'government': 'government',
  };
  
  // First check for exact match
  if (industryMappings[normalized]) {
    return industryMappings[normalized];
  }
  
  // Check if normalized string contains any key
  for (const [key, value] of Object.entries(industryMappings)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return value;
    }
  }
  
  // Return normalized string as fallback
  return normalized;
};

// ============= QUANTIFIED IMPACT DATA =============
// Paint vivid pictures with specific numbers and scenarios

const quantifiedImpacts: Record<string, Record<string, Record<string, string>>> = {
  'slow-speeds': {
    'healthcare': {
      'small-business': "Right now, your staff is waiting 30 seconds for patient records to load — multiply that across 50 patients a day, and that's real time back in their day to focus on care",
      'mid-market': "Across your locations, slow systems add up to hours of lost productivity every week — time your staff could spend with patients",
      'enterprise': "At your scale, even 10 seconds of lag per transaction compounds into thousands of wasted hours annually"
    },
    'retail': {
      'small-business': "Every 5-second delay at checkout is a customer reconsidering if they really need that item",
      'mid-market': "Slow card processing during rush hour means customers walking out — and they might not come back",
      'enterprise': "A 3-second slowdown at every register across all locations? That's real revenue walking out the door"
    },
    'finance': {
      'small-business': "When a client is waiting to see their portfolio load, every second feels like an hour to them",
      'mid-market': "Delayed transactions mean delayed decisions — and in finance, timing is everything",
      'enterprise': "At your volume, milliseconds matter. Slow systems cost real money"
    },
    'manufacturing': {
      'small-business': "When production data takes 20 seconds to refresh, you're making decisions on information that's already old",
      'mid-market': "Slow data feeds across the floor mean operators aren't seeing issues until they've already become problems",
      'enterprise': "At your scale, a 5-second delay in machine data across hundreds of units adds up to hours of blind spots daily"
    },
    'hospitality': {
      'small-business': "A guest standing at your desk watching a loading spinner is a guest forming an opinion about your business",
      'mid-market': "Slow check-ins during peak hours create lobby congestion and frustrated guests before they even reach their rooms",
      'enterprise': "When systems lag at check-in across properties, you're losing the first impression battle at scale"
    },
    'professional-services': {
      'small-business': "That file taking 2 minutes to upload? That's billable time disappearing",
      'mid-market': "When multiple staff are waiting on uploads, you're burning team hours that should be client-facing",
      'enterprise': "Slow systems across offices mean thousands of billable hours lost to waiting each year"
    },
    'default': {
      'small-business': "Every second your team waits is a second they're not serving customers or moving the business forward",
      'mid-market': "Slow systems don't just frustrate your team — they're quietly costing you money every day",
      'enterprise': "At your scale, even small delays multiply into significant productivity losses"
    }
  },
  'downtime': {
    'healthcare': {
      'small-business': "One outage during clinic hours and you're rescheduling patients, losing revenue, and damaging trust you worked hard to build",
      'mid-market': "An hour of downtime across your locations means dozens of patients affected and thousands in lost billing",
      'enterprise': "When systems go down, patient care stops — and at your scale, that's lives affected"
    },
    'retail': {
      'small-business': "Your busiest Saturday going down for an hour could cost you a week's worth of profit",
      'mid-market': "Register outages during peak hours don't just lose sales — they lose customers to competitors",
      'enterprise': "One hour of system-wide outage at your transaction volume? That's a board-level conversation"
    },
    'finance': {
      'small-business': "When clients can't access their accounts, they don't just get frustrated — they start looking for alternatives",
      'mid-market': "Even 15 minutes of outage can cost clients real money on time-sensitive trades",
      'enterprise': "Market hours wait for no one. Downtime during trading means real losses for real clients"
    },
    'manufacturing': {
      'small-business': "Every hour your line is down is product not made and deadlines at risk",
      'mid-market': "Production stoppages ripple through your whole operation — and your customers' supply chains",
      'enterprise': "At your volume, an hour of downtime translates to hundreds of thousands in lost production"
    },
    'default': {
      'small-business': "When you go offline, your revenue goes with it — and for a small business, that math hurts",
      'mid-market': "Every minute of downtime impacts customers, staff, and your bottom line across every location",
      'enterprise': "At enterprise scale, even brief outages have six-figure impacts"
    }
  },
  'security-concerns': {
    'healthcare': {
      'small-business': "One breach and you're not just paying fines — you're explaining to patients why their most private information is exposed",
      'mid-market': "A HIPAA violation affects every patient in your system. The financial and reputational damage compounds fast",
      'enterprise': "At your scale, a breach makes headlines. The cost isn't just financial — it's institutional trust"
    },
    'retail': {
      'small-business': "Lose customer card data once and you lose those customers forever. The breach costs less than the lost trust",
      'mid-market': "PCI violations don't just cost fines — they can cost you the ability to accept cards at all",
      'enterprise': "With millions of transactions, you're a target. One successful breach could define your company's reputation for years"
    },
    'finance': {
      'small-business': "Your clients trust you with their financial lives. One breach ends relationships built over decades",
      'mid-market': "A security incident in finance doesn't stay quiet. Regulators, press, and clients all come knocking",
      'enterprise': "You're handling billions in assets. Bad actors know that, and they're sophisticated"
    },
    'default': {
      'small-business': "Small businesses are targets because attackers assume you're not protected. They're often right",
      'mid-market': "Growing companies are prime targets — big enough to be worth attacking, sometimes not big enough to have enterprise security",
      'enterprise': "At your size, you're not if you'll be attacked, but when — and whether you're ready"
    }
  },
  'high-costs': {
    'retail': {
      'small-business': "If your telecom bill is eating 3% of revenue, that might be the margin on every fifth sale",
      'mid-market': "When you're operating on thin margins, overpaying for connectivity directly impacts what you can pay your people",
      'enterprise': "At your scale, even a 10% reduction in telecom costs frees up budget for things that actually grow revenue"
    },
    'healthcare': {
      'small-business': "Every dollar going to network overhead is a dollar not going to patient care — or your take-home",
      'mid-market': "Healthcare margins are tight. Technology costs should be predictable, not a monthly surprise",
      'enterprise': "At enterprise scale, optimizing connectivity costs can fund new equipment or expanded services"
    },
    'default': {
      'small-business': "When you're counting every dollar, unpredictable or inflated telecom bills throw off your whole budget",
      'mid-market': "You're big enough to need enterprise features but shouldn't have to pay enterprise premiums",
      'enterprise': "At scale, smart cost management on infrastructure frees up capital for growth"
    }
  },
  'poor-support': {
    'retail': {
      'small-business': "You're on hold for 45 minutes while customers pile up at your counter. That hold music is costing you sales",
      'mid-market': "When support can't help quickly, you're paying your people to wait instead of work",
      'enterprise': "Support that doesn't know your account means re-explaining everything every time something breaks"
    },
    'healthcare': {
      'small-business': "Patients don't care that you're waiting on tech support — they care that they can't be seen",
      'mid-market': "When patient care is interrupted by tech issues, you need instant escalation, not a ticket queue",
      'enterprise': "With lives on the line, 'we'll get back to you' isn't an acceptable answer"
    },
    'default': {
      'small-business': "You don't have an IT department. When something breaks, you need a real person who can actually help",
      'mid-market': "Your business moves fast. Support that moves slow costs more than just frustration",
      'enterprise': "At your scale, you need a team that knows your environment, not agents reading scripts"
    }
  }
};

// ============= SIZE EMOTIONAL MODIFIERS =============
// Add emotional weight and stakes based on business size

const sizeEmotionalModifiers: Record<string, { situation: string; stakes: string; investment: string }> = {
  'small-business': {
    situation: "As a lean team, every minute matters",
    stakes: "you can't afford to have someone troubleshooting when they should be serving customers",
    investment: "Every dollar you put into technology should work hard for you"
  },
  'mid-market': {
    situation: "At your stage, consistency across your growing operation is what separates scaling smoothly from scaling painfully",
    stakes: "one bad system day impacts every location, every team, every customer",
    investment: "You need enterprise capability without the enterprise complexity"
  },
  'enterprise': {
    situation: "At your scale, a small improvement across every location adds up to meaningful impact on your bottom line",
    stakes: "the ripple effect of any issue touches hundreds of employees and thousands of customers",
    investment: "The ROI isn't just in cost savings — it's in risk avoided and growth enabled"
  }
};

// ============= INDUSTRY-AWARE SIZE STAKES =============
// Industry-specific stakes language that replaces generic "serving customers"

const industrySizeStakes: Record<string, Record<string, string>> = {
  'education': {
    'small-business': "you can't afford to have someone troubleshooting when they should be teaching",
    'mid-market': "one network issue impacts every classroom, every teacher, every student",
    'enterprise': "the ripple effect of any issue touches thousands of students and hundreds of staff"
  },
  'healthcare': {
    'small-business': "you can't afford to have someone troubleshooting when they should be caring for patients",
    'mid-market': "one system issue impacts every exam room, every provider, every patient",
    'enterprise': "the ripple effect of any issue touches thousands of patients and hundreds of caregivers"
  },
  'government': {
    'small-business': "you can't afford to have someone troubleshooting when they should be serving citizens",
    'mid-market': "one system issue impacts every department, every employee, every citizen interaction",
    'enterprise': "the ripple effect of any issue touches thousands of citizens and hundreds of public servants"
  },
  'hospitality': {
    'small-business': "you can't afford to have someone troubleshooting when they should be attending to guests",
    'mid-market': "one system issue impacts every front desk, every room, every guest experience",
    'enterprise': "the ripple effect of any issue touches thousands of guests across all your properties"
  },
  'transportation': {
    'small-business': "you can't afford to have someone troubleshooting when they should be coordinating deliveries",
    'mid-market': "one connectivity issue impacts every driver, every route, every delivery",
    'enterprise': "the ripple effect of any issue touches hundreds of drivers and thousands of shipments"
  },
  'real-estate': {
    'small-business': "you can't afford to have someone troubleshooting when they should be closing deals",
    'mid-market': "one system issue impacts every agent, every listing, every client relationship",
    'enterprise': "the ripple effect of any issue touches hundreds of agents and thousands of transactions"
  },
  'retail': {
    'small-business': "you can't afford to have someone troubleshooting when they should be helping customers",
    'mid-market': "one system issue impacts every register, every associate, every sale",
    'enterprise': "the ripple effect of any issue touches hundreds of stores and thousands of transactions"
  },
  'finance': {
    'small-business': "you can't afford to have someone troubleshooting when they should be advising clients",
    'mid-market': "one system issue impacts every advisor, every transaction, every client relationship",
    'enterprise': "the ripple effect of any issue touches hundreds of employees and thousands of client accounts"
  },
  'manufacturing': {
    'small-business': "you can't afford to have someone troubleshooting when they should be running production",
    'mid-market': "one connectivity issue impacts every line, every operator, every shipment deadline",
    'enterprise': "the ripple effect of any issue touches hundreds of workers and thousands of units of output"
  },
  'professional-services': {
    'small-business': "you can't afford to have someone troubleshooting when they should be billing clients",
    'mid-market': "one system issue impacts every team member, every project, every client deadline",
    'enterprise': "the ripple effect of any issue touches hundreds of professionals and thousands of billable hours"
  },
  'construction': {
    'small-business': "you can't afford to have someone troubleshooting when they should be managing the job site",
    'mid-market': "one connectivity issue impacts every crew, every subcontractor, every project timeline",
    'enterprise': "the ripple effect of any issue touches hundreds of workers across dozens of job sites"
  }
};

// Helper function to get industry-aware stakes
function getIndustryAwareStakes(industry: string, size: string): string {
  const normalizedIndustry = normalizeIndustryKey(industry);
  const industryStakes = industrySizeStakes[normalizedIndustry];
  if (industryStakes && industryStakes[size]) {
    return industryStakes[size];
  }
  // Fallback to generic
  return sizeEmotionalModifiers[size]?.stakes || "you can't afford technology issues slowing you down";
}

// ============= INDUSTRY TRANSFORMATIONS =============
// Describe what specifically changes with the solution

const industryTransformations: Record<string, Record<string, string>> = {
  'healthcare': {
    'slow-speeds': "delivers patient records the moment your staff needs them — no waiting, no workarounds",
    'downtime': "keeps your care systems running so your team never has to tell a patient 'the system is down'",
    'security-concerns': "protects patient data with HIPAA-grade security so you can focus on care, not compliance",
    'high-costs': "gives you predictable monthly costs so you can budget for care, not telecom surprises",
    'poor-support': "connects you with support that picks up immediately — because patient care can't wait"
  },
  'retail': {
    'slow-speeds': "processes every transaction instantly, even on your busiest day — customers check out happy",
    'downtime': "keeps registers ringing so you never lose a sale to a network issue",
    'security-concerns': "protects every customer transaction so your reputation stays intact",
    'high-costs': "puts more money back in your margin with straightforward, predictable pricing",
    'poor-support': "gets you back up and running fast — because every minute down is money lost"
  },
  'finance': {
    'slow-speeds': "executes transactions in real-time — no lag, no missed opportunities",
    'downtime': "maintains market access with built-in redundancy your clients can count on",
    'security-concerns': "secures client assets with bank-grade protection and compliance built in",
    'high-costs': "delivers business-grade performance at costs that make financial sense",
    'poor-support': "provides dedicated support that knows your business and responds immediately"
  },
  'manufacturing': {
    'slow-speeds': "keeps production data flowing in real-time so you're never making decisions on old information",
    'downtime': "keeps your lines running with automatic failover — because downtime is lost production",
    'security-concerns': "protects your proprietary processes and intellectual property from threats",
    'high-costs': "reduces per-unit costs with efficient, scalable connectivity",
    'poor-support': "resolves issues fast with support that understands manufacturing environments"
  },
  'hospitality': {
    'slow-speeds': "makes check-in smooth and fast — guests start happy instead of frustrated",
    'downtime': "keeps reservations, payments, and guest services running without interruption",
    'security-concerns': "protects guest data and payment information across every touchpoint",
    'high-costs': "gives you hotel-grade connectivity without the premium price tag",
    'poor-support': "provides support that responds quickly — because guest experience can't wait"
  },
  'professional-services': {
    'slow-speeds': "lets your team work without waiting — uploads, downloads, video calls all flow smoothly",
    'downtime': "keeps your billable hours billable, not wasted on connection issues",
    'security-concerns': "protects client confidentiality with enterprise security",
    'high-costs': "maximizes your overhead efficiency with right-sized connectivity",
    'poor-support': "minimizes disruption with responsive support that values your time"
  },
  'construction': {
    'slow-speeds': "gets plans and updates to job sites instantly — no more waiting for large files",
    'downtime': "keeps crews connected even in remote locations with built-in backup",
    'security-concerns': "protects bid information and project data from competitors and threats",
    'high-costs': "provides job site connectivity that fits the project budget",
    'poor-support': "supports you in the field with responsive help when you need it"
  },
  'education': {
    'slow-speeds': "delivers the bandwidth every classroom needs for seamless digital learning",
    'downtime': "provides the reliable connectivity that keeps students learning all day, every day",
    'security-concerns': "protects student data with built-in security that meets FERPA requirements",
    'high-costs': "fits school budgets with predictable pricing and no surprise fees",
    'poor-support': "provides responsive support that gets teachers back to teaching fast"
  },
  'transportation': {
    'slow-speeds': "keeps your fleet connected with real-time dispatch and routing updates",
    'downtime': "provides reliable connectivity with built-in backup for drivers on the road",
    'security-concerns': "protects cargo and route data with business-grade security",
    'high-costs': "delivers predictable costs that fit your per-mile operating model",
    'poor-support': "provides responsive support that keeps your drivers moving"
  },
  'government': {
    'slow-speeds': "delivers the bandwidth citizen services require for efficient processing",
    'downtime': "provides the reliable connectivity public services depend on",
    'security-concerns': "protects constituent data with compliance-grade security",
    'high-costs': "fits taxpayer-funded budgets with transparent, predictable pricing",
    'poor-support': "provides responsive support that keeps critical services running"
  },
  'real-estate': {
    'slow-speeds': "enables instant virtual tours and fast property file access",
    'downtime': "keeps you connected for showings, closings, and client communications",
    'security-concerns': "protects transaction documents and client financial information",
    'high-costs': "delivers predictable costs that protect your commission margins",
    'poor-support': "provides the responsive support time-sensitive deals require"
  },
  'default': {
    'slow-speeds': "eliminates the waiting so your team can focus on what matters",
    'downtime': "keeps you running with reliable connectivity and automatic backup",
    'security-concerns': "protects your business and customer data with built-in security",
    'high-costs': "delivers business-grade connectivity at a price that makes sense",
    'poor-support': "provides real support from real people who actually help"
  }
};

// Size-specific modifiers for business impact language
const sizeModifiers: Record<string, { prefix: string; context: string }> = {
  'small-business': { 
    prefix: 'For a business your size', 
    context: 'every dollar and minute counts' 
  },
  'mid-market': { 
    prefix: 'As you scale', 
    context: 'consistency across your growing operation is critical' 
  },
  'enterprise': { 
    prefix: 'At your scale', 
    context: 'even small issues have enterprise-wide impact' 
  }
};

// Employee count impacts
const employeeImpacts: Record<string, string> = {
  '1-10': 'your small team',
  '11-50': 'your growing team',
  '51-200': 'across your departments',
  '201-500': 'across your organization',
  '500+': 'enterprise-wide'
};

// Location-based language
const locationModifiers: Record<string, string> = {
  '1': 'at your location',
  '2-5': 'across all your locations',
  '6-20': 'across your multi-site operation',
  '20+': 'across your entire footprint'
};

// Budget-sensitive language
const budgetLanguage: Record<string, { focus: string; benefit: string }> = {
  'cost-conscious': { 
    focus: 'without breaking the budget', 
    benefit: 'maximizing every dollar you invest' 
  },
  'balanced': { 
    focus: 'with the right value-to-performance ratio', 
    benefit: 'balancing cost with capability' 
  },
  'performance-focused': { 
    focus: 'with business-grade capability', 
    benefit: 'getting the best performance available' 
  }
};
export const businessImpacts: Record<string, Record<string, string>> = {
  'slow-speeds': {
    'retail': "Customers walking out when checkout is slow",
    'healthcare': "Staff stuck waiting for patient records to load",
    'finance': "Trades delayed, costing clients money",
    'manufacturing': "Production data not updating in real-time",
    'professional-services': "Billable hours lost waiting for files to upload",
    'hospitality': "Guests frustrated with slow reservations and payments",
    'construction': "Project plans taking forever to download on-site",
    'transportation': "Delayed dispatch and tracking updates",
    'education': "Students unable to access online learning materials",
    'government': "Citizens waiting longer at service counters",
    'real-estate': "Listings and virtual tours loading too slowly",
    'default': "Your team waiting instead of working"
  },
  'downtime': {
    'retail': "Lost sales when registers can't process transactions",
    'healthcare': "Patient care at risk when critical systems go offline",
    'finance': "Unable to process client transactions or access accounts",
    'manufacturing': "Production lines stopped, costing thousands per hour",
    'professional-services': "Missing client deadlines when systems are down",
    'hospitality': "Guests unable to check in or make payments",
    'construction': "Crews idle when they can't access project systems",
    'transportation': "Deliveries delayed, schedules thrown off",
    'education': "Classes disrupted, students unable to learn",
    'government': "Citizens unable to access essential services",
    'real-estate': "Missing out on time-sensitive deals",
    'default': "Business operations halted until connectivity returns"
  },
  'security-concerns': {
    'retail': "Customer payment data at risk of being stolen",
    'healthcare': "Patient privacy compromised, HIPAA violations risked",
    'finance': "Client assets and data vulnerable to threats",
    'manufacturing': "Proprietary designs and processes exposed",
    'professional-services': "Confidential client information at risk",
    'hospitality': "Guest personal and payment data unprotected",
    'construction': "Bid information and contracts vulnerable",
    'transportation': "Shipment data and logistics exposed",
    'education': "Student records and sensitive data at risk",
    'government': "Citizen data vulnerable to breaches",
    'real-estate': "Transaction details and client data exposed",
    'default': "Your business and customer data at risk"
  },
  'high-costs': {
    'retail': "Eating into already thin margins",
    'healthcare': "Taking budget away from patient care",
    'finance': "Reducing returns you can offer clients",
    'manufacturing': "Adding to cost-per-unit production",
    'professional-services': "Overhead cutting into profitability",
    'hospitality': "Eating into revenue during competitive pricing",
    'construction': "Squeezing already tight project budgets",
    'transportation': "Adding to per-mile operating costs",
    'education': "Taking funds from educational programs",
    'government': "Straining taxpayer resources",
    'real-estate': "Cutting into commission earnings",
    'default': "Money going to vendors instead of growing your business"
  },
  'multiple-vendors': {
    'retail': "Finger-pointing when something goes wrong at checkout",
    'healthcare': "No clear accountability when patient systems fail",
    'finance': "Complicated compliance when data crosses vendors",
    'manufacturing': "Integration headaches slowing operations",
    'professional-services': "Multiple bills and support calls to manage",
    'hospitality': "Guest experience suffering from disconnected systems",
    'construction': "Coordination nightmares across job sites",
    'transportation': "Tracking gaps between different systems",
    'education': "Teachers struggling with disconnected tools",
    'government': "Bureaucratic complexity multiplied",
    'real-estate': "No single point of contact when issues arise",
    'default': "Wasting time managing vendors instead of serving customers"
  },
  'poor-support': {
    'retail': "Hours on hold while customers wait at checkout",
    'healthcare': "Patient care delayed waiting for tech support",
    'finance': "Clients frustrated while you're stuck on hold",
    'manufacturing': "Production stopped while waiting for callbacks",
    'professional-services': "Billable time lost navigating support queues",
    'hospitality': "Guests complaining while you wait for help",
    'construction': "Crews standing idle waiting for tech fixes",
    'transportation': "Drivers delayed, deliveries late",
    'education': "Classes disrupted waiting for IT resolution",
    'government': "Citizens waiting while you wait for support",
    'real-estate': "Deals at risk while systems are down",
    'default': "Your problems not getting resolved fast enough"
  },
  'legacy-systems': {
    'retail': "Unable to offer modern shopping experiences customers expect",
    'healthcare': "Old systems can't integrate with modern care tools",
    'finance': "Missing out on digital services clients want",
    'manufacturing': "Can't connect to modern supply chain systems",
    'professional-services': "Competitors offering better client experiences",
    'hospitality': "Guests expecting amenities you can't provide",
    'construction': "Unable to use modern project management tools",
    'transportation': "Can't offer real-time tracking customers expect",
    'education': "Students missing out on modern learning tools",
    'government': "Citizens expecting digital services you can't deliver",
    'real-estate': "Losing listings to tech-savvy competitors",
    'default': "Falling behind while competitors modernize"
  },
  'compliance': {
    'retail': "PCI violations risking your ability to accept cards",
    'healthcare': "HIPAA fines threatening your practice",
    'finance': "Regulatory penalties impacting your license",
    'manufacturing': "Industry certifications at risk",
    'professional-services': "Client trust damaged by compliance gaps",
    'hospitality': "Payment compliance putting guests at risk",
    'construction': "Safety and documentation requirements unmet",
    'transportation': "DOT and logistics regulations not addressed",
    'education': "Student data privacy regulations unmet",
    'government': "Failing to meet strict public sector requirements",
    'real-estate': "Transaction compliance putting deals at risk",
    'default': "Regulatory risk hanging over your business"
  },
  'scalability-limits': {
    'retail': "Can't handle holiday rush or sales spikes",
    'healthcare': "Unable to add new providers or locations",
    'finance': "Can't onboard new clients without infrastructure delays",
    'manufacturing': "Growth limited by network capacity",
    'professional-services': "Turning away business you can't support",
    'hospitality': "Can't expand to new properties smoothly",
    'construction': "Unable to take on bigger projects",
    'transportation': "Route expansion limited by connectivity",
    'education': "Can't grow enrollment without IT investment",
    'government': "Citizen services limited by infrastructure",
    'real-estate': "Growth constrained by system limitations",
    'default': "Your growth held back by infrastructure limits"
  },
  'no-backup': {
    'retail': "One outage away from a lost sales day",
    'healthcare': "Patient care vulnerable to any connectivity issue",
    'finance': "Client access at risk from single point of failure",
    'manufacturing': "Entire production dependent on one connection",
    'professional-services': "One cut fiber away from missing deadlines",
    'hospitality': "Guest services vulnerable to any disruption",
    'construction': "Job sites offline with no fallback",
    'transportation': "Fleet going dark with no backup connectivity",
    'education': "Learning stops when primary connection fails",
    'government': "Citizen services down with no redundancy",
    'real-estate': "Deals at risk with no backup plan",
    'default': "Your entire operation depending on a single connection"
  }
};

// Customer-centric solutions (outcome-focused, not feature-focused)
export const customerCentricSolutions: Record<string, Record<string, string>> = {
  'slow-speeds': {
    'retail': "Keep checkout lines moving and customers happy",
    'healthcare': "Get staff to patient records instantly",
    'finance': "Execute transactions without delay",
    'manufacturing': "Real-time production data, no waiting",
    'default': "Your team works, not waits"
  },
  'downtime': {
    'retail': "Keep registers ringing, never miss a sale",
    'healthcare': "Ensure patient care is never interrupted",
    'finance': "Your clients can always access their accounts",
    'manufacturing': "Production lines keep running, period",
    'default': "Your business stays open when it matters most"
  },
  'security-concerns': {
    'retail': "Protect every customer transaction",
    'healthcare': "Keep patient data safe and HIPAA compliant",
    'finance': "Safeguard client assets and trust",
    'default': "Sleep better knowing your business is protected"
  },
  'high-costs': {
    'retail': "More margin in every transaction",
    'healthcare': "More budget for what matters - patient care",
    'finance': "Better returns for you and your clients",
    'default': "Keep more money in your business"
  },
  'multiple-vendors': {
    'retail': "One call fixes everything",
    'healthcare': "Single point of accountability for all systems",
    'finance': "Simplified compliance, one vendor relationship",
    'default': "One partner who owns your success"
  },
  'poor-support': {
    'retail': "Get help fast, get back to selling",
    'healthcare': "Issues resolved before they impact patient care",
    'finance': "Priority support keeps your clients happy",
    'default': "Problems solved, not shuffled around"
  },
  'legacy-systems': {
    'retail': "Offer the modern experience customers expect",
    'healthcare': "Integrate with the latest care technologies",
    'finance': "Deliver the digital services clients want",
    'default': "Modernize without the headaches"
  },
  'compliance': {
    'retail': "PCI compliance built-in, not bolted on",
    'healthcare': "HIPAA compliance that keeps you protected",
    'finance': "Meet every regulatory requirement confidently",
    'default': "Compliance handled, so you can focus on business"
  },
  'scalability-limits': {
    'retail': "Handle your biggest sales day with ease",
    'healthcare': "Grow your practice without infrastructure limits",
    'finance': "Onboard clients without capacity worries",
    'default': "Grow without limits"
  },
  'no-backup': {
    'retail': "Never lose a sales day to an outage",
    'healthcare': "Patient care protected by automatic failover",
    'finance': "Client access guaranteed, always",
    'default': "Automatic backup means business as usual"
  }
};

// ============= CONTEXT-SPECIFIC BENEFIT STATEMENTS =============
// Punchy, memorable statements for speed/performance and reliability/uptime
// organized by industry, size, and use case

export const contextSpecificBenefits: Record<string, Record<string, Record<string, string[]>>> = {
  'speed-performance': {
    'retail': {
      'small-business': [
        "Card transactions clear in seconds, not awkward silence",
        "Checkout lines move at the speed customers expect",
        "No more 'the system is being slow today' apologies",
        "Tap, approve, done — that's how every sale should feel"
      ],
      'mid-market': [
        "Peak-hour transactions process without the peak-hour slowdown",
        "Every register runs at full speed, even on your busiest Saturday",
        "Rush hour doesn't mean slow hour for your systems",
        "Black Friday speed, every Friday"
      ],
      'enterprise': [
        "Millions of transactions, milliseconds each",
        "Every location, every lane, same fast experience",
        "Scale doesn't mean sacrifice — full speed across your footprint"
      ]
    },
    'healthcare': {
      'small-business': [
        "Patient records load the moment you need them",
        "No more patients watching you wait for their chart",
        "Click, and it's there — not click and wait",
        "Imaging files open instantly, not 'give it a minute'"
      ],
      'mid-market': [
        "Records load fast across every exam room",
        "Staff pulls charts instantly, patients see efficiency",
        "Imaging, labs, notes — all at your fingertips, immediately"
      ],
      'enterprise': [
        "Enterprise-scale data at small-practice speed",
        "Every provider, every location, instant access",
        "Millions of records, millisecond response"
      ]
    },
    'finance': {
      'small-business': [
        "Clients see their portfolio load, not a loading spinner",
        "Every number updates in real-time, not 'refresh and pray'",
        "Transactions execute while you're still on the call"
      ],
      'mid-market': [
        "Market data flows in real-time to every desk",
        "Client transactions execute at the speed of opportunity",
        "Fast enough that timing is never the excuse"
      ],
      'enterprise': [
        "Milliseconds matter when millions are on the line",
        "High-frequency capable, latency eliminated",
        "Speed that meets market demands"
      ]
    },
    'manufacturing': {
      'small-business': [
        "Production data refreshes in real-time, not 'let me check'",
        "Machine status updates the moment something changes",
        "No more decisions made on stale data"
      ],
      'mid-market': [
        "Every line, every machine, real-time visibility",
        "Data flows as fast as your production moves",
        "Quality alerts arrive when you can still fix the problem"
      ],
      'enterprise': [
        "Plant-wide data in the palm of your hand, instantly",
        "IoT at scale without the lag",
        "Global visibility, local speed"
      ]
    },
    'hospitality': {
      'small-business': [
        "Check-in happens in smiles, not loading screens",
        "Reservations pop up instantly — guests feel welcome",
        "Payment processing faster than your 'thank you'"
      ],
      'mid-market': [
        "Peak check-in times feel as smooth as midweek mornings",
        "Every front desk runs at concierge speed",
        "Guest requests processed before they finish asking"
      ],
      'enterprise': [
        "Thousands of guests, seamless experiences each",
        "Property-wide speed, guest-first impression"
      ]
    },
    'professional-services': {
      'small-business': [
        "Files upload while you're still on the call",
        "Video calls that don't buffer mid-sentence",
        "Large documents? No problem. Client waiting? No longer"
      ],
      'mid-market': [
        "Team collaboration that happens in real-time",
        "Client portals load instantly, professionalism intact",
        "Screen shares that actually share, presentations that flow"
      ],
      'enterprise': [
        "Enterprise file sizes, startup loading times",
        "Global collaboration without the global lag"
      ]
    },
    'construction': {
      'small-business': [
        "Plans download to the job site while the truck's still running",
        "Updates sync faster than you can walk to the next task",
        "Large drawings? Ready. Remote site? No problem"
      ],
      'mid-market': [
        "Every crew, every site, real-time project access",
        "Changes sync immediately across locations",
        "Field and office on the same page, literally"
      ]
    },
    'default': {
      'small-business': [
        "Your team moves at the speed of business, not at the speed of loading screens",
        "Fast enough that waiting isn't part of the workflow",
        "Technology that keeps up, not holds you back"
      ],
      'mid-market': [
        "Performance that scales with your ambition",
        "Speed across every location, every department",
        "Fast for your team, fast for your customers"
      ],
      'enterprise': [
        "Enterprise scale, startup speed",
        "Performance that never compromises, at any size"
      ]
    }
  },
  'reliability-uptime': {
    'retail': {
      'small-business': [
        "Your busiest day stays your best day, not your worst",
        "Registers keep ringing even when the unexpected happens",
        "Never tell a customer 'sorry, our system is down'",
        "Sales don't stop, even if the power flickers"
      ],
      'mid-market': [
        "Every location stays open for business, every hour",
        "Peak season without the peak anxiety",
        "Outages elsewhere? Your customers won't know"
      ],
      'enterprise': [
        "Across every store, every register — it just works",
        "99.9% isn't a promise, it's the floor",
        "Reliability at scale, no excuses"
      ]
    },
    'healthcare': {
      'small-business': [
        "Patient care never stops for a network issue",
        "Your staff never has to tell a patient 'the system is down'",
        "When it matters most, your systems are there",
        "EHR access — always, without exception"
      ],
      'mid-market': [
        "Every clinic, every hour, systems running",
        "Patients see consistency, staff sees reliability",
        "Care coordination that never misses a beat"
      ],
      'enterprise': [
        "Hospital-wide reliability, life-critical standards",
        "Networks built for when failure isn't an option"
      ]
    },
    'finance': {
      'small-business': [
        "Clients access their accounts whenever they need to",
        "Market hours never catch you offline",
        "Your reputation for reliability stays intact"
      ],
      'mid-market': [
        "Trading floors that never go dark",
        "Client trust built on always-on access",
        "When markets move fast, you're moving with them"
      ],
      'enterprise': [
        "Zero tolerance for downtime, because that's your reality",
        "Built for the moments when billions are on the line"
      ]
    },
    'manufacturing': {
      'small-business': [
        "Production keeps moving when everything else is chaos",
        "Lines don't stop for network problems",
        "Deadlines met because systems stayed up"
      ],
      'mid-market': [
        "Every shift, every line, continuous operation",
        "Supply chain visibility that never blinks",
        "Production data when you need it, without fail"
      ],
      'enterprise': [
        "Plant-wide connectivity, zero unplanned stops",
        "Reliability that matches your SLAs to your customers"
      ]
    },
    'hospitality': {
      'small-business': [
        "Guests never wait because your system didn't",
        "Check-ins happen, payments process, experiences stay positive",
        "Reputation built on smooth operations, every visit"
      ],
      'mid-market': [
        "Every property, every guest, seamless experience",
        "Peak season reliability, off-season or on"
      ]
    },
    'professional-services': {
      'small-business': [
        "Client calls connect, every time",
        "Billable hours stay billable, not lost to tech problems",
        "Deadlines met because you were never offline"
      ],
      'mid-market': [
        "Team productivity uninterrupted, client work delivered",
        "Video conferences that don't drop mid-presentation"
      ]
    },
    'default': {
      'small-business': [
        "Your business runs when you need it to, period",
        "Technology that just works — no IT degree required",
        "When you're open, you're connected"
      ],
      'mid-market': [
        "Growth without growing pains in your infrastructure",
        "Reliability across every location, every team"
      ],
      'enterprise': [
        "Business-grade uptime, because you can't afford less",
        "Built for businesses where downtime isn't an option"
      ]
    }
  }
};

// Get a context-specific benefit statement
export function getContextSpecificBenefit(
  category: 'speed-performance' | 'reliability-uptime',
  profile: CustomerProfile,
  useCase?: string
): string {
  const normalizedIndustry = normalizeIndustryKey(profile.industry);
  const size = profile.type;
  
  // Try to get industry + size specific
  const categoryData = contextSpecificBenefits[category];
  const industryData = categoryData?.[normalizedIndustry] || categoryData?.['default'];
  const sizeData = industryData?.[size] || industryData?.['small-business'];
  
  if (sizeData && sizeData.length > 0) {
    // Return a deterministic selection based on profile attributes
    const index = Math.abs(
      (profile.industry.length + profile.employeeCount.length + (profile.locations || '1').length) % sizeData.length
    );
    return sizeData[index];
  }
  
  // Ultimate fallback
  return category === 'speed-performance' 
    ? "Your team works at the speed of business"
    : "Your systems stay up when it matters most";
}

// Get multiple context-specific benefits for display
export function getContextSpecificBenefits(
  category: 'speed-performance' | 'reliability-uptime',
  profile: CustomerProfile,
  count: number = 2
): string[] {
  const normalizedIndustry = normalizeIndustryKey(profile.industry);
  const size = profile.type;
  
  const categoryData = contextSpecificBenefits[category];
  const industryData = categoryData?.[normalizedIndustry] || categoryData?.['default'];
  const sizeData = industryData?.[size] || industryData?.['small-business'] || [];
  
  return sizeData.slice(0, count);
}

// Technical feature to business impact translations - now using context-specific language
export const featureToImpactMap: Record<string, Record<string, { feature: string; impact: string }>> = {
  'retail': {
    'uptime': { feature: '99.9% Uptime SLA', impact: 'Your busiest day stays your best day, registers never stop' },
    'speed': { feature: 'Fiber-Fast Speeds', impact: 'Card transactions clear in seconds, not awkward silence' },
    'security': { feature: 'Enterprise Security', impact: 'Customer payment data protected from breaches' },
    'backup': { feature: 'Automatic Failover', impact: 'Sales don\'t stop, even if the power flickers' },
    'support': { feature: '24/7 Priority Support', impact: 'Issues fixed before they impact customers' },
    'scalability': { feature: 'Scalable Bandwidth', impact: 'Black Friday speed, every Friday' },
  },
  'healthcare': {
    'uptime': { feature: '99.9% Uptime SLA', impact: 'Your staff never has to tell a patient "the system is down"' },
    'speed': { feature: 'Fiber-Fast Speeds', impact: 'Patient records load the moment you need them' },
    'security': { feature: 'HIPAA-Compliant Security', impact: 'Patient data protected, compliance maintained' },
    'backup': { feature: 'Automatic Failover', impact: 'Patient care never stops for a network issue' },
    'support': { feature: '24/7 Priority Support', impact: 'Technical issues resolved before impacting patients' },
    'scalability': { feature: 'Scalable Bandwidth', impact: 'Add new providers and locations seamlessly' },
  },
  'finance': {
    'uptime': { feature: '99.9% Uptime SLA', impact: 'Market hours never catch you offline' },
    'speed': { feature: 'Low-Latency Connectivity', impact: 'Transactions execute while you\'re still on the call' },
    'security': { feature: 'Bank-Grade Security', impact: 'Client assets and data fully protected' },
    'backup': { feature: 'Automatic Failover', impact: 'Client access guaranteed, always' },
    'support': { feature: '24/7 Priority Support', impact: 'Issues escalated and resolved immediately' },
    'scalability': { feature: 'Scalable Infrastructure', impact: 'Onboard new clients without delays' },
  },
  'manufacturing': {
    'uptime': { feature: '99.9% Uptime SLA', impact: 'Lines don\'t stop for network problems' },
    'speed': { feature: 'High-Bandwidth Connectivity', impact: 'Production data refreshes in real-time, not "let me check"' },
    'security': { feature: 'Industrial-Grade Security', impact: 'Protect proprietary processes and designs' },
    'backup': { feature: 'Automatic Failover', impact: 'Production keeps moving when everything else is chaos' },
    'support': { feature: '24/7 Priority Support', impact: 'Minimize downtime with fast resolution' },
    'scalability': { feature: 'Scalable Bandwidth', impact: 'Expand operations without infrastructure limits' },
  },
  'hospitality': {
    'uptime': { feature: '99.9% Uptime SLA', impact: 'Guests never wait because your system didn\'t' },
    'speed': { feature: 'High-Speed Connectivity', impact: 'Check-in happens in smiles, not loading screens' },
    'security': { feature: 'Enterprise Security', impact: 'Guest data and payment information protected' },
    'backup': { feature: 'Automatic Failover', impact: 'Check-ins happen, payments process, experiences stay positive' },
    'support': { feature: '24/7 Priority Support', impact: 'Guest experience never interrupted by tech issues' },
    'scalability': { feature: 'Scalable Solutions', impact: 'Peak season without the peak anxiety' },
  },
  'professional-services': {
    'uptime': { feature: '99.9% Uptime SLA', impact: 'Billable hours stay billable, not lost to tech problems' },
    'speed': { feature: 'Fiber-Fast Speeds', impact: 'Files upload while you\'re still on the call' },
    'security': { feature: 'Enterprise Security', impact: 'Client confidentiality protected' },
    'backup': { feature: 'Automatic Failover', impact: 'Client calls connect, every time' },
    'support': { feature: '24/7 Priority Support', impact: 'Minimize disruption with responsive support' },
    'scalability': { feature: 'Scalable Bandwidth', impact: 'Team collaboration that happens in real-time' },
  },
  'construction': {
    'uptime': { feature: '99.9% Uptime SLA', impact: 'Every crew, every site, continuous connection' },
    'speed': { feature: 'High-Speed Connectivity', impact: 'Plans download to the job site while the truck\'s still running' },
    'security': { feature: 'Enterprise Security', impact: 'Bid information and project data protected' },
    'backup': { feature: 'Automatic Failover', impact: 'Field and office on the same page, always' },
    'support': { feature: '24/7 Priority Support', impact: 'Support you in the field when you need it' },
    'scalability': { feature: 'Scalable Solutions', impact: 'Scale connectivity as projects grow' },
  },
  'default': {
    'uptime': { feature: '99.9% Uptime SLA', impact: 'Your business runs when you need it to, period' },
    'speed': { feature: 'Fast, Reliable Speeds', impact: 'Your team moves at the speed of business' },
    'security': { feature: 'Enterprise Security', impact: 'Your data and customers are protected' },
    'backup': { feature: 'Automatic Failover', impact: 'Technology that just works — no IT degree required' },
    'support': { feature: '24/7 Priority Support', impact: 'Problems solved quickly' },
    'scalability': { feature: 'Scalable Solutions', impact: 'Grow without infrastructure constraints' },
  }
};

// Get feature-to-impact translation for industry
export function getFeatureImpact(featureKey: string, industry: string): { feature: string; impact: string } {
  const industryMap = featureToImpactMap[industry] || featureToImpactMap['default'];
  return industryMap[featureKey] || featureToImpactMap['default'][featureKey] || { 
    feature: featureKey, 
    impact: 'Improves your business operations' 
  };
}

// Map product features to business impacts
export function mapFeaturesToBusinessImpacts(features: string[], industry: string): Array<{ feature: string; impact: string }> {
  const results: Array<{ feature: string; impact: string }> = [];
  
  for (const feature of features) {
    const lower = feature.toLowerCase();
    let matched = false;
    
    if (lower.includes('uptime') || lower.includes('99.9') || lower.includes('sla') || lower.includes('reliable')) {
      results.push(getFeatureImpact('uptime', industry));
      matched = true;
    }
    if (lower.includes('speed') || lower.includes('fiber') || lower.includes('bandwidth') || lower.includes('gbps') || lower.includes('fast')) {
      results.push(getFeatureImpact('speed', industry));
      matched = true;
    }
    if (lower.includes('security') || lower.includes('encrypt') || lower.includes('protect') || lower.includes('firewall')) {
      results.push(getFeatureImpact('security', industry));
      matched = true;
    }
    if (lower.includes('backup') || lower.includes('failover') || lower.includes('redundant')) {
      results.push(getFeatureImpact('backup', industry));
      matched = true;
    }
    if (lower.includes('support') || lower.includes('24/7') || lower.includes('dedicated')) {
      results.push(getFeatureImpact('support', industry));
      matched = true;
    }
    if (lower.includes('scale') || lower.includes('grow') || lower.includes('expand') || lower.includes('flexible')) {
      results.push(getFeatureImpact('scalability', industry));
      matched = true;
    }
  }
  
  // Remove duplicates
  const seen = new Set<string>();
  return results.filter(r => {
    if (seen.has(r.feature)) return false;
    seen.add(r.feature);
    return true;
  });
}

// Customer-centric priority labels with industry-specific outcomes
export const customerCentricPriorities: Record<string, { 
  label: string; 
  outcome: string;
  industryOutcomes?: Record<string, string>;
}> = {
  'reliability': { 
    label: "Dependable Connectivity", 
    outcome: "You focus on customers while we keep your systems running",
    industryOutcomes: {
      'retail': "Checkout stays fast, customers stay happy, sales keep coming",
      'healthcare': "Patient records load instantly — no workarounds, no delays in care",
      'finance': "Client transactions process without a hiccup, every single time",
      'manufacturing': "Production data flows in real-time, machines keep running",
      'hospitality': "Guests check in smoothly, reservations work, and payments process",
      'construction': "Job sites stay connected so crews can access what they need"
    }
  },
  'security': { 
    label: "Peace of Mind", 
    outcome: "Your customers' trust stays intact, your reputation protected",
    industryOutcomes: {
      'retail': "Customer card data stays protected — PCI compliance handled",
      'healthcare': "Patient privacy protected, HIPAA boxes checked",
      'finance': "Client assets secured with bank-grade protection",
      'manufacturing': "Your proprietary processes stay proprietary"
    }
  },
  'speed': { 
    label: "No More Waiting", 
    outcome: "Your team actually gets to work instead of staring at loading screens",
    industryOutcomes: {
      'retail': "Transactions fly through, lines move, customers leave happy",
      'healthcare': "Pull up patient records instantly, not in 'just a moment'",
      'finance': "Execute trades in real-time, not 'please wait'",
      'professional-services': "Files upload while you're still on the call"
    }
  },
  'scalability': { 
    label: "Room to Grow", 
    outcome: "When opportunity knocks, your network is ready",
    industryOutcomes: {
      'retail': "Black Friday traffic? Handled. New store opening? Ready to go",
      'healthcare': "Add providers, open locations — your network keeps up",
      'mid-market': "Scale up without the infrastructure drama that slows everything down"
    }
  },
  'cost-savings': { 
    label: "Money Where It Matters", 
    outcome: "Stop paying for what you don't need, invest in what moves the needle",
    industryOutcomes: {
      'retail': "More margin per transaction instead of feeding the telecom budget",
      'healthcare': "Budget goes to patient care, not network overhead",
      'small-business': "Every dollar you're not spending on IT is a dollar growing your business"
    }
  },
  'remote-work': { 
    label: "Work from Anywhere", 
    outcome: "Your team stays productive whether they're at HQ or the kitchen table",
    industryOutcomes: {
      'professional-services': "Bill hours from anywhere, client files always at your fingertips",
      'finance': "Secure client access from home office or headquarters"
    }
  },
  'unified-comms': { 
    label: "One Place for Everything", 
    outcome: "Voice, video, messages — all working together instead of against each other",
    industryOutcomes: {
      'professional-services': "Client calls, team huddles, and quick questions all in one place",
      'healthcare': "Coordinate care without the communication runaround"
    }
  },
  'iot': { 
    label: "Everything Connected", 
    outcome: "Sensors, cameras, devices — all talking to each other and to you",
    industryOutcomes: {
      'manufacturing': "Machines report status automatically, problems caught early",
      'retail': "Inventory sensors, security cameras, smart displays — all in sync"
    }
  },
  'backup-failover': { 
    label: "Always Online", 
    outcome: "Connection drops? You won't even notice because backup kicks in automatically",
    industryOutcomes: {
      'retail': "Primary goes down, registers keep ringing — customers never know",
      'healthcare': "Patient care continues uninterrupted, always",
      'finance': "Market access maintained, period"
    }
  },
  'mobility': { 
    label: "Business On the Move", 
    outcome: "Your people stay connected wherever the job takes them",
    industryOutcomes: {
      'construction': "Field crews access plans, update progress, stay in the loop",
      'transportation': "Drivers, dispatchers, everyone connected in real-time"
    }
  },
  'always-on': { 
    label: "Connected from Day One", 
    outcome: "Get online fast, stay online always — no waiting, no worrying",
    industryOutcomes: {
      'retail': "New location? You're selling in 24 hours, not waiting weeks for fiber",
      'small-business': "Get started now with our quick-deploy device while fiber comes in"
    }
  }
};

// Conversational situation acknowledgments by pain point and industry
const situationAcknowledgments: Record<string, Record<string, string>> = {
  'slow-speeds': {
    'retail': "When the card reader spins and spins, customers don't wait — they pull out their phones and check Amazon",
    'healthcare': "Every second your staff spends waiting for records to load is a second they're not with patients",
    'finance': "In your world, a few seconds of lag can mean the difference between a good trade and a missed opportunity",
    'manufacturing': "If production data isn't updating in real-time, you're making decisions on old information",
    'professional-services': "Waiting on uploads and downloads isn't just annoying — it's eating your billable hours",
    'hospitality': "Guests can tell when your systems are struggling. That hesitation at the front desk sets the tone for their whole stay",
    'default': "Your team's time is too valuable to spend watching loading bars"
  },
  'downtime': {
    'retail': "When your system goes down, so does your revenue. Every minute offline is money walking out the door",
    'healthcare': "Outages don't just inconvenience your staff — they put patient care at risk",
    'finance': "Your clients expect to access their accounts 24/7. One outage can cost you years of trust",
    'manufacturing': "A downed line isn't just an IT problem — it's thousands per hour in lost production",
    'hospitality': "Guests stranded at check-in because systems are down? That's a Yelp review writing itself",
    'construction': "When crews can't access project systems, they're standing around on your dime",
    'default': "Connectivity issues don't just slow you down — they stop you cold"
  },
  'security-concerns': {
    'retail': "One breach and you're not just dealing with fines — you're dealing with customers who'll never come back",
    'healthcare': "Patient data is sacred. A HIPAA violation isn't just a fine; it's your reputation",
    'finance': "Your clients trust you with their financial lives. That trust is everything",
    'professional-services': "Confidential client information leaking out doesn't just end contracts — it ends careers",
    'default': "Security isn't about if something happens — it's about being ready when someone tries"
  },
  'high-costs': {
    'retail': "Margins are tight enough without your telecom bill eating into every transaction",
    'healthcare': "Every dollar going to network overhead is a dollar not going to patient care",
    'small-business': "When you're watching every penny, an unpredictable telecom bill can throw off your whole month",
    'default': "You shouldn't need a finance degree to understand your connectivity costs"
  },
  'multiple-vendors': {
    'retail': "When checkout goes down, you don't want to play referee between your ISP and your phone company",
    'healthcare': "Patients don't care whose fault the system failure is — they care that it's fixed",
    'default': "When something breaks, the last thing you need is vendors pointing fingers at each other"
  },
  'poor-support': {
    'retail': "Your customers are waiting. You can't afford to be on hold with tech support",
    'healthcare': "When systems go down, you need someone who picks up immediately — not a phone tree",
    'small-business': "You're not asking for VIP treatment. You just want someone to actually help",
    'default': "Calling support should solve problems, not create new frustrations"
  },
  'legacy-systems': {
    'retail': "Customers expect tap-to-pay, mobile checkout, modern experiences. Old infrastructure can't keep up",
    'healthcare': "Newer care tools, telehealth, modern EHRs — they need modern connectivity to work right",
    'default': "Your competitors are modernizing. Standing still is falling behind"
  },
  'no-backup': {
    'retail': "One cut fiber and your busiest Saturday becomes your worst",
    'healthcare': "Patient care can't wait for the repair truck to show up",
    'finance': "Markets don't close because your connection went down",
    'default': "Your entire operation shouldn't depend on a single point of failure"
  }
};

// Get business impact for a specific pain point and industry (simple version)
export function getBusinessImpact(painPoint: string, industry: string): string {
  const impacts = businessImpacts[painPoint];
  if (!impacts) return businessImpacts['downtime']?.default || "Impacting your bottom line";
  return impacts[industry] || impacts.default || "Impacting your bottom line";
}

// Get NUANCED business impact based on full customer profile
export function getNuancedBusinessImpact(painPoint: string, profile: CustomerProfile): string {
  const normalizedIndustry = normalizeIndustryKey(profile.industry);
  const baseImpact = getBusinessImpact(painPoint, normalizedIndustry);
  const sizeInfo = sizeModifiers[profile.type] || sizeModifiers['small-business'];
  const locationContext = locationModifiers[profile.locations] || '';
  
  // Add size/location context to certain pain points
  if (painPoint === 'downtime') {
    if (profile.locations !== '1') {
      return `${baseImpact} ${locationContext}`;
    }
    return baseImpact;
  }
  
  if (painPoint === 'high-costs') {
    const budgetInfo = budgetLanguage[profile.budget];
    if (profile.type === 'small-business') {
      return `${baseImpact} — and for a small business, that money should be growing your business`;
    }
    return baseImpact;
  }
  
  if (painPoint === 'scalability-limits' && profile.type === 'mid-market') {
    return `${baseImpact} — exactly when you need to be nimble`;
  }
  
  return baseImpact;
}

// Get customer-centric solution for a pain point (simple version)
export function getCustomerCentricSolution(painPoint: string, industry: string): string {
  const solutions = customerCentricSolutions[painPoint];
  if (!solutions) return "We can help with that";
  return solutions[industry] || solutions.default || "We can help with that";
}

// Get NUANCED customer-centric solution based on full customer profile
export function getNuancedSolution(painPoint: string, profile: CustomerProfile): string {
  const normalizedIndustry = normalizeIndustryKey(profile.industry);
  const baseSolution = getCustomerCentricSolution(painPoint, normalizedIndustry);
  const budgetInfo = budgetLanguage[profile.budget];
  const employeeContext = employeeImpacts[profile.employeeCount] || 'your team';
  const locationContext = locationModifiers[profile.locations] || '';
  
  // Customize based on size and budget
  if (painPoint === 'downtime') {
    if (profile.type === 'enterprise') {
      return `${baseSolution} ${locationContext}, with business-grade redundancy built in`;
    }
    if (profile.type === 'small-business') {
      return `${baseSolution} — because one bad day shouldn't define your business`;
    }
    return baseSolution;
  }
  
  if (painPoint === 'high-costs') {
    if (profile.budget === 'cost-conscious') {
      return `${baseSolution}, with predictable monthly costs you can actually budget for`;
    }
    return baseSolution;
  }
  
  if (painPoint === 'multiple-vendors' && profile.locations !== '1') {
    return `${baseSolution} — one relationship, one bill, one call when you need help ${locationContext}`;
  }
  
  if (painPoint === 'poor-support') {
    if (profile.type === 'small-business') {
      return `Real support from real people who pick up when you call`;
    }
    if (profile.type === 'enterprise') {
      return `A dedicated team that already knows ${employeeContext} and your environment`;
    }
    return baseSolution;
  }
  
  return baseSolution;
}

// Get NUANCED customer-centric priority based on full customer profile
export function getNuancedPriority(priority: string, profile: CustomerProfile): { label: string; outcome: string } {
  const baseInfo = customerCentricPriorities[priority] || { 
    label: priority.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    outcome: "We can help with that"
  };
  
  const normalizedIndustry = normalizeIndustryKey(profile.industry);
  const employeeContext = employeeImpacts[profile.employeeCount] || 'your team';
  const locationContext = locationModifiers[profile.locations] || '';
  
  // Check for industry-specific outcome first
  const industryOutcome = baseInfo.industryOutcomes?.[normalizedIndustry];
  if (industryOutcome) {
    return { label: baseInfo.label, outcome: industryOutcome };
  }
  
  // Check for size-specific outcomes
  const sizeOutcome = baseInfo.industryOutcomes?.[profile.type];
  if (sizeOutcome) {
    return { label: baseInfo.label, outcome: sizeOutcome };
  }
  
  // Customize outcomes based on profile
  if (priority === 'reliability') {
    if (profile.type === 'enterprise') {
      return { ...baseInfo, outcome: `Your operations stay rock-solid ${locationContext} — that's non-negotiable` };
    }
    if (profile.type === 'small-business') {
      return { ...baseInfo, outcome: `You stay open, customers stay happy, revenue keeps flowing` };
    }
  }
  
  if (priority === 'scalability') {
    if (profile.type === 'mid-market') {
      return { ...baseInfo, outcome: `Grow first, figure out the infrastructure later — not the other way around` };
    }
    if (profile.type === 'small-business') {
      return { ...baseInfo, outcome: `Start with what you need, add more when it makes sense for you` };
    }
  }
  
  if (priority === 'cost-savings') {
    if (profile.budget === 'cost-conscious') {
      return { ...baseInfo, outcome: `Business-grade quality without the enterprise sticker shock` };
    }
    return { ...baseInfo, outcome: `Put your money into growing your business, not feeding your telecom provider` };
  }
  
  if (priority === 'remote-work') {
    if (profile.employeeCount === '1-10') {
      return { ...baseInfo, outcome: `Your ${employeeContext.replace('your ', '')} collaborates seamlessly whether they're together or apart` };
    }
    return { ...baseInfo, outcome: `${employeeContext.charAt(0).toUpperCase() + employeeContext.slice(1)} stays connected and productive from anywhere they work` };
  }
  
  if (priority === 'always-on') {
    if (profile.type === 'small-business') {
      return { 
        label: "Up and Running Fast", 
        outcome: "Our quick-deploy device gets you online tomorrow, not next month — and automatic backup means you stay online" 
      };
    }
    if (profile.locations !== '1') {
      return { 
        label: "Always-On, Everywhere", 
        outcome: `New sites go live fast with our rapid-deploy option ${locationContext}, with automatic failover protecting every location` 
      };
    }
    return { 
      label: "Connected Without the Wait", 
      outcome: "Get online quickly while permanent fiber is installed, and stay online with automatic failover — no more choosing between fast and reliable" 
    };
  }
  
  return baseInfo;
}

// Get customer-centric priority info (simple version - for backwards compatibility)
export function getCustomerCentricPriority(priority: string): { label: string; outcome: string } {
  const info = customerCentricPriorities[priority];
  if (!info) {
    return { 
      label: priority.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      outcome: "We can help with that"
    };
  }
  return { label: info.label, outcome: info.outcome };
}

// Helper function to get business-specific phrase
function getBusinessPhrase(profile: CustomerProfile): string | null {
  if (!profile.businessDescription?.trim()) return null;
  const desc = profile.businessDescription.trim().toLowerCase();
  // Clean up common prefixes
  const cleaned = desc.replace(/^(a |an |the |our |my |your )/i, '');
  return cleaned;
}

// Helper function to generate business-specific opener for value proposition
function getBusinessSpecificOpener(businessPhrase: string, profile: CustomerProfile, primaryPain: string | undefined): string {
  // Map common business types to their key operational moments
  const businessContexts: Record<string, { peakMoment: string; keyStaff: string; customerMoment: string }> = {
    // Food & Beverage
    'donut shop': { peakMoment: 'morning rush', keyStaff: 'counter staff', customerMoment: 'waiting in line for their coffee' },
    'coffee shop': { peakMoment: 'morning rush', keyStaff: 'baristas', customerMoment: 'waiting for their order' },
    'bakery': { peakMoment: 'morning rush', keyStaff: 'counter team', customerMoment: 'choosing their pastries' },
    'restaurant': { peakMoment: 'dinner rush', keyStaff: 'servers', customerMoment: 'ready to order' },
    'pizzeria': { peakMoment: 'Friday night', keyStaff: 'kitchen team', customerMoment: 'calling in orders' },
    'bar': { peakMoment: 'happy hour', keyStaff: 'bartenders', customerMoment: 'waiting to pay their tab' },
    'food truck': { peakMoment: 'lunch rush', keyStaff: 'crew', customerMoment: 'standing in line' },
    
    // Healthcare
    'dental practice': { peakMoment: 'morning appointments', keyStaff: 'front desk', customerMoment: 'checking in' },
    'dental office': { peakMoment: 'morning appointments', keyStaff: 'hygienists', customerMoment: 'arriving for their appointment' },
    'medical practice': { peakMoment: 'morning rush', keyStaff: 'nurses', customerMoment: 'waiting to be seen' },
    'clinic': { peakMoment: 'peak hours', keyStaff: 'medical staff', customerMoment: 'waiting for results' },
    'pharmacy': { peakMoment: 'evening rush', keyStaff: 'pharmacists', customerMoment: 'picking up prescriptions' },
    'veterinary clinic': { peakMoment: 'afternoon appointments', keyStaff: 'vet techs', customerMoment: 'worried about their pet' },
    
    // Auto & Services
    'auto body shop': { peakMoment: 'Monday mornings', keyStaff: 'technicians', customerMoment: 'dropping off their car' },
    'auto shop': { peakMoment: 'morning drop-offs', keyStaff: 'mechanics', customerMoment: 'asking about their repair' },
    'car dealership': { peakMoment: 'Saturday afternoons', keyStaff: 'sales team', customerMoment: 'test driving' },
    'car wash': { peakMoment: 'weekend rush', keyStaff: 'attendants', customerMoment: 'waiting for their car' },
    
    // Retail
    'boutique': { peakMoment: 'Saturday afternoons', keyStaff: 'sales associates', customerMoment: 'ready to checkout' },
    'gift shop': { peakMoment: 'holiday season', keyStaff: 'staff', customerMoment: 'browsing for gifts' },
    'hardware store': { peakMoment: 'weekend mornings', keyStaff: 'floor staff', customerMoment: 'asking for help' },
    'grocery store': { peakMoment: 'evening rush', keyStaff: 'cashiers', customerMoment: 'checking out' },
    'convenience store': { peakMoment: 'commute hours', keyStaff: 'clerks', customerMoment: 'grabbing items quickly' },
    
    // Professional Services
    'law firm': { peakMoment: 'court filing deadlines', keyStaff: 'paralegals', customerMoment: 'waiting on documents' },
    'accounting firm': { peakMoment: 'tax season', keyStaff: 'accountants', customerMoment: 'needing their returns' },
    'real estate office': { peakMoment: 'closing day', keyStaff: 'agents', customerMoment: 'signing documents' },
    'insurance agency': { peakMoment: 'renewal season', keyStaff: 'agents', customerMoment: 'reviewing their policy' },
    
    // Fitness & Wellness  
    'gym': { peakMoment: 'after work', keyStaff: 'trainers', customerMoment: 'checking in' },
    'fitness center': { peakMoment: 'peak hours', keyStaff: 'staff', customerMoment: 'scanning their membership' },
    'salon': { peakMoment: 'weekend appointments', keyStaff: 'stylists', customerMoment: 'waiting for their appointment' },
    'spa': { peakMoment: 'weekends', keyStaff: 'therapists', customerMoment: 'arriving for their treatment' },
    'yoga studio': { peakMoment: 'evening classes', keyStaff: 'instructors', customerMoment: 'signing up for class' },
  };

  // Find a matching context or create a generic one
  const lowerBusiness = businessPhrase.toLowerCase();
  let context = businessContexts[lowerBusiness];
  
  // Try partial matches if no exact match
  if (!context) {
    for (const [key, value] of Object.entries(businessContexts)) {
      if (lowerBusiness.includes(key) || key.includes(lowerBusiness)) {
        context = value;
        break;
      }
    }
  }
  
  // Generate opener based on pain point and business context
  if (context) {
    if (primaryPain === 'slow-speeds') {
      return `Running a ${businessPhrase}, you know the ${context.peakMoment} is everything. When the line is out the door and your system freezes, your ${context.keyStaff} are stuck apologizing instead of serving customers.`;
    }
    if (primaryPain === 'downtime') {
      return `At your ${businessPhrase}, when systems go down during the ${context.peakMoment}, you're not just losing transactions — you're losing customers who might not come back.`;
    }
    if (primaryPain === 'poor-support') {
      return `When something breaks at your ${businessPhrase} during the ${context.peakMoment}, you need someone who picks up the phone — not a callback request.`;
    }
    // Default with context
    return `Running a ${businessPhrase}, your ${context.keyStaff} shouldn't be troubleshooting technology when customers are ${context.customerMoment}.`;
  }
  
  // Generic business-specific opener
  if (primaryPain === 'slow-speeds') {
    return `At your ${businessPhrase}, every second of waiting is a second your team isn't serving customers.`;
  }
  if (primaryPain === 'downtime') {
    return `For a ${businessPhrase} like yours, going offline doesn't just mean inconvenience — it means lost revenue and frustrated customers.`;
  }
  if (primaryPain === 'security-concerns') {
    return `Running a ${businessPhrase}, your customers trust you with their information. That trust is everything.`;
  }
  if (primaryPain === 'high-costs') {
    return `Every dollar your ${businessPhrase} spends on telecom is a dollar that could go toward growing your business.`;
  }
  
  return `Running a ${businessPhrase} means you need technology that just works — so you can focus on what you do best.`;
}

// Generate conversational empathetic opener based on pain point and full profile
export function getEmpatheticOpener(painPoint: string, profile: CustomerProfile): string {
  const normalizedIndustry = normalizeIndustryKey(profile.industry);
  const businessPhrase = getBusinessPhrase(profile);
  
  // If we have a specific business description, use it for more personalized openers
  if (businessPhrase) {
    const businessOpeners: Record<string, string> = {
      'slow-speeds': `Running a ${businessPhrase}, you know every second counts when customers are waiting`,
      'downtime': `At your ${businessPhrase}, going offline means customers walking out and revenue lost`,
      'security-concerns': `For a ${businessPhrase} like yours, protecting customer data isn't just IT — it's trust`,
      'high-costs': `In a ${businessPhrase}, every dollar matters — you need value, not just a bill`,
      'multiple-vendors': `Managing a ${businessPhrase} is hard enough without juggling multiple vendors`,
      'poor-support': `When something goes wrong at your ${businessPhrase}, you need help now — not tomorrow`,
      'legacy-systems': `Your ${businessPhrase} can't afford to fall behind while competitors modernize`,
      'compliance': `For your ${businessPhrase}, compliance isn't optional — it's what keeps you in business`,
      'scalability-limits': `As your ${businessPhrase} grows, your connectivity should grow with you`,
      'no-backup': `One outage at your ${businessPhrase} and customers might not come back`,
    };
    
    if (businessOpeners[painPoint]) {
      return businessOpeners[painPoint];
    }
  }
  
  // Fall back to industry/situation-specific acknowledgment
  const situations = situationAcknowledgments[painPoint];
  if (situations) {
    const industrySpecific = situations[normalizedIndustry];
    if (industrySpecific) {
      return industrySpecific;
    }
    
    // Try size-specific
    const sizeSpecific = situations[profile.type];
    if (sizeSpecific) {
      return sizeSpecific;
    }
    
    // Use default for this pain point
    if (situations.default) {
      return situations.default;
    }
  }
  
  // Fallback to a natural acknowledgment
  const impact = getNuancedBusinessImpact(painPoint, profile);
  return `That situation — ${impact.toLowerCase()} — that's exactly what you shouldn't have to deal with.`;
}

// Generate empathetic opener for priorities
export function getPriorityOpener(priority: string, profile: CustomerProfile): string {
  const priorityInfo = getNuancedPriority(priority, profile);
  const sizeInfo = sizeModifiers[profile.type];
  
  // More conversational priority acknowledgments
  const priorityOpeners: Record<string, string> = {
    'reliability': "You've got enough to worry about without wondering if your network will hold up",
    'security': "You've worked too hard to build this business to have it compromised",
    'speed': "Your team's time is money — literally. Waiting on technology is wasting both",
    'cost-savings': "Smart businesses don't overpay for connectivity. You want value, not just a bill",
    'scalability': "Growth is the goal. Your technology should be ready when opportunity shows up",
    'remote-work': "Where work happens has changed. Your connectivity should work everywhere your people do"
  };
  
  return priorityOpeners[priority] || `${priorityInfo.label} — that's a smart priority for ${sizeInfo.context}`;
}

// Generate a conversational value statement (Acknowledge → Enable → Outcome)
export function getConversationalValueStatement(
  product: { name: string; valuePropositionStatement: { keyBenefit: string } },
  profile: CustomerProfile
): string {
  const industryLabel = profile.industry.replace(/-/g, ' ');
  const primaryPain = profile.painPoints[0];
  const primaryPriority = profile.priorities[0];
  
  // Get the enable statement
  const enable = product.valuePropositionStatement.keyBenefit;
  
  // Get the outcome
  let outcome = '';
  if (primaryPriority) {
    const priorityInfo = getNuancedPriority(primaryPriority, profile);
    outcome = priorityInfo.outcome;
  } else if (primaryPain) {
    outcome = getNuancedSolution(primaryPain, profile);
  }
  
  // Build natural statement
  if (primaryPain && outcome) {
    return `${enable}. That means ${outcome.charAt(0).toLowerCase() + outcome.slice(1)}.`;
  }
  
  return enable;
}

// Get situation acknowledgment for pain point
export function getSituationAcknowledgment(painPoint: string, profile: CustomerProfile): string | null {
  const normalizedIndustry = normalizeIndustryKey(profile.industry);
  const situations = situationAcknowledgments[painPoint];
  if (!situations) return null;
  
  return situations[normalizedIndustry] || situations[profile.type] || situations.default || null;
}

// ============= INDUSTRY OPERATIONAL CONTEXT =============
// Deep, nuanced understanding of industry-specific operational realities

interface IndustryOperationalContext {
  criticalMoments: Record<string, string>; // When connectivity issues hurt most
  stakeholderPains: Record<string, string>; // Who feels it most and how
  ecosystemPressures: string[]; // Suppliers, customers, regulators
  competitiveContext: string; // How issues affect positioning
  downstreamConsequences: Record<string, string>; // Ripple effects beyond immediate problem
  dailyFrustrations: string[]; // Everyday operational headaches
}

const industryOperationalContext: Record<string, IndustryOperationalContext> = {
  'manufacturing': {
    criticalMoments: {
      'slow-speeds': "During shift handoffs when production data needs to sync instantly across the floor",
      'downtime': "When your JIT delivery window closes and the line goes cold",
      'security-concerns': "When proprietary specs are being transmitted to suppliers or partners",
      'poor-support': "At 2 AM when the night shift hits a system issue and nobody answers",
      'high-costs': "During quarterly budget reviews when leadership questions every overhead line item"
    },
    stakeholderPains: {
      'floor-supervisor': "Your floor supervisor loses 15 minutes per shift waiting for MES updates — that's production they're accountable for",
      'quality-manager': "Your quality manager can't trust real-time SPC data when the network lags, so they over-inspect and slow the line",
      'maintenance-lead': "When predictive maintenance sensors can't report fast enough, your maintenance lead finds out about problems after they become emergencies",
      'operations-director': "Your ops director sees the gap between scheduled and actual throughput — and knows connectivity is part of that gap"
    },
    ecosystemPressures: [
      "Your tier-1 customers expect real-time inventory visibility and EDI confirmations within minutes",
      "Suppliers are integrating their systems with yours — and blaming your connection when orders drop",
      "ISO auditors expect documentation that proves continuous process monitoring",
      "Insurance underwriters want proof your connected safety systems never go dark"
    ],
    competitiveContext: "Your competitors are investing in smart manufacturing — every day you're running on unreliable connectivity is a day you fall further behind on Industry 4.0",
    downstreamConsequences: {
      'slow-speeds': "That 30-second lag on machine data means your operators are reacting to problems that started 30 seconds ago — multiply that across 100 machines",
      'downtime': "One hour of line stoppage doesn't just cost production — it cascades into overtime, expedited shipping, and your best customer questioning if you can deliver"
    },
    dailyFrustrations: [
      "Operators walking to stations to check status because the dashboard won't refresh",
      "Engineers downloading yesterday's data to a USB because the network won't transfer files fast enough",
      "Production meetings starting with 'the system was down again' explanations"
    ]
  },
  'healthcare': {
    criticalMoments: {
      'slow-speeds': "When a nurse needs that patient history now — not in 45 seconds — because the patient is waiting anxiously",
      'downtime': "During that 7 AM rush when every exam room needs to pull up charts simultaneously",
      'security-concerns': "When sending patient records to specialists and knowing a breach means your name in the news",
      'poor-support': "When telehealth appointments are dropping and patients think it's your competence, not your connection",
      'high-costs': "When reimbursements are shrinking and every operational cost gets scrutinized"
    },
    stakeholderPains: {
      'front-desk': "Your front desk staff apologizes to patients a dozen times a day for slow check-in — that's not the first impression you want",
      'nursing-staff': "Your nurses are documenting at the end of their shifts because the system was too slow to use in real-time — that's burnout waiting to happen",
      'physician': "Your providers lose 20+ minutes daily to system waits — time they could spend actually seeing patients",
      'practice-manager': "Your practice manager sees no-shows spike after patients waited too long for appointments to load"
    },
    ecosystemPressures: [
      "Patients compare you to their last healthcare experience — and their bar keeps rising",
      "Insurers are watching quality metrics that depend on timely documentation",
      "Referring physicians expect instant access to shared records",
      "State boards audit HIPAA compliance with no tolerance for 'the system was down' excuses"
    ],
    competitiveContext: "The health system down the street just upgraded their patient portal. When your patients experience slow, frustrating technology, they wonder if it reflects your care quality",
    downstreamConsequences: {
      'slow-speeds': "Slow EHR access means your staff documents after hours, your coding gets delayed, your claims get denied, and your cash flow suffers — all from waiting on records",
      'downtime': "One outage during clinic hours means rescheduling patients, losing that revenue, and knowing some won't bother to reschedule"
    },
    dailyFrustrations: [
      "Staff carrying paper backup forms because they've learned not to trust the system",
      "Patients asking why they have to fill out the same forms they already submitted online",
      "Providers apologizing that they can't pull up imaging results during the appointment"
    ]
  },
  'retail': {
    criticalMoments: {
      'slow-speeds': "When the line is six deep at the register during lunch rush and the card reader is spinning",
      'downtime': "On Black Friday when every transaction matters and the system chooses that moment to fail",
      'security-concerns': "When your POS system handles a thousand card swipes and one breach ends your business",
      'poor-support': "On your busiest Saturday when you need help now and get 'ticket submitted'",
      'high-costs': "When margins are 3% and your telecom bill is eating into what you can pay staff"
    },
    stakeholderPains: {
      'store-manager': "Your store manager watches customers abandon full carts when the line doesn't move — and has to explain those numbers to corporate",
      'cashier': "Your cashiers take the frustration from customers who blame them for slow systems — that's turnover waiting to happen",
      'loss-prevention': "Your LP team can't monitor cameras in real-time when bandwidth dips — they're finding incidents on review, not prevention",
      'district-manager': "Your district manager sees wide variance in checkout times across stores and knows it's not just training"
    },
    ecosystemPressures: [
      "Customers compare every checkout to Amazon's one-click — and their patience has disappeared",
      "Your POS vendor blames the network, your network provider blames the POS — you're stuck in the middle",
      "Credit card companies audit PCI compliance and don't care about your infrastructure challenges",
      "Delivery apps expect inventory to sync in real-time or they stop featuring your store"
    ],
    competitiveContext: "The chain down the street has tap-to-pay, inventory lookup, and endless aisles. Every slow transaction at your register is a customer wondering if they should shop there instead",
    downstreamConsequences: {
      'slow-speeds': "A 5-second delay per transaction doesn't sound like much — until you calculate 500 transactions a day across 10 registers. That's hours of lost productivity and customers who won't come back",
      'downtime': "One hour of register downtime doesn't just lose those sales — those customers tell their friends, leave reviews, and form permanent impressions"
    },
    dailyFrustrations: [
      "Staff manually keying in loyalty numbers because the lookup is too slow",
      "Customers asking 'is your system always this slow?' in front of other customers",
      "Morning inventory counts that should take 30 minutes stretching to two hours because the scanner won't sync"
    ]
  },
  'finance': {
    criticalMoments: {
      'slow-speeds': "When a client calls about a market move and you can't pull their portfolio fast enough to advise",
      'downtime': "During market hours when clients are trying to execute trades and your system is dark",
      'security-concerns': "When wire transfer instructions are transmitted and one interception could be devastating",
      'poor-support': "When compliance needs documentation yesterday and your provider can't tell you what happened",
      'high-costs': "When clients question your fee and you're paying more than you should for infrastructure"
    },
    stakeholderPains: {
      'advisor': "Your advisors feel unprofessional when they can't answer a simple client question without waiting for data to load",
      'operations': "Your ops team processes client requests manually when systems lag — that's cost and error risk built in",
      'compliance': "Your compliance officer can't sleep when they don't know if every transmission was encrypted",
      'client-service': "Your client service team spends calls apologizing for the portal instead of solving problems"
    },
    ecosystemPressures: [
      "Clients expect instant access because their bank app works instantly — they don't separate experiences",
      "Custodians require secure transmission protocols with zero tolerance for exceptions",
      "Regulators audit technology controls and document every incident you've ever had",
      "Fintech competitors are eating your lunch with faster, smoother digital experiences"
    ],
    competitiveContext: "The robo-advisor doesn't have connection issues. The online broker loads instantly. Every slow login, every delay pulling reports, every 'please hold' makes clients wonder if your technology matches your fee",
    downstreamConsequences: {
      'slow-speeds': "That momentary delay pulling up a client's holdings? It erodes confidence in your competence. Wealth is emotional — and so is the experience of managing it",
      'downtime': "One outage during trading hours doesn't just miss a trade — it creates a client story that gets told at dinner parties and golf courses"
    },
    dailyFrustrations: [
      "Advisors logging in twice because the first session timed out during a client call",
      "Compliance chasing down connection logs for audits because the reporting is incomplete",
      "Client meetings derailed by 'let me try refreshing this' moments"
    ]
  },
  'hospitality': {
    criticalMoments: {
      'slow-speeds': "When a tour bus arrives and 40 guests need to check in before dinner",
      'downtime': "During a wedding weekend when the bride's family can't access their reservations",
      'security-concerns': "When 200 credit cards are processed through your front desk every day",
      'poor-support': "When the weekend night auditor hits an issue and there's no one to call",
      'high-costs': "When RevPAR is tight and every operational cost needs to earn its keep"
    },
    stakeholderPains: {
      'front-desk': "Your front desk agents smile through the frustration, but they're forming opinions about whether this is a place they want to work",
      'housekeeping': "Your housekeeping supervisor can't track room status in real-time, so they're walking floors instead of managing turnover",
      'gm': "Your GM sees TripAdvisor reviews mention wait times and knows it's not a training issue — it's infrastructure",
      'revenue-manager': "Your revenue manager can't adjust rates fast enough when the system lags — that's money left on the table"
    },
    ecosystemPressures: [
      "Guests compare your check-in to their last hotel stay — and Marriott's app works flawlessly",
      "OTAs expect instant inventory updates or they oversell your rooms (or undersell)",
      "Group bookers judge your tech capability as a proxy for event execution capability",
      "Wedding planners recommend (or don't) based on how smoothly things run technologically"
    ],
    competitiveContext: "The boutique hotel down the block offers mobile check-in and instant room service ordering. When your front desk is apologizing for slow systems, guests are deciding where to stay next time",
    downstreamConsequences: {
      'slow-speeds': "That slow check-in doesn't just delay their room — it starts their stay with an apology. The entire experience is colored by that first impression",
      'downtime': "One system failure during a wedding or conference doesn't just disrupt the event — it becomes the story they tell, and the review they leave"
    },
    dailyFrustrations: [
      "Guests asking for WiFi passwords because the captive portal never loaded right",
      "Front desk running cards twice because they're not sure if the first one went through",
      "Conference organizers calling because their attendees can't connect in the ballroom"
    ]
  },
  'professional-services': {
    criticalMoments: {
      'slow-speeds': "When you're screen-sharing with a client and the presentation won't load",
      'downtime': "During a filing deadline when every minute of system access matters",
      'security-concerns': "When client confidential documents are moving between offices and opposing counsel",
      'poor-support': "When a partner is on the road and can't access the document management system",
      'high-costs': "When per-partner profitability is scrutinized and overhead needs justification"
    },
    stakeholderPains: {
      'partner': "Your partners feel embarrassed when technology issues interrupt client meetings — it doesn't match the brand you're trying to project",
      'associate': "Your associates lose billable hours to connection issues that aren't their fault — but show up in their utilization numbers",
      'it-admin': "Your IT person (if you have one) is constantly apologizing for problems they can't control",
      'office-manager': "Your office manager fields complaints about technology daily and has no good answers"
    },
    ecosystemPressures: [
      "Clients expect secure portals that work, video calls that don't freeze, and documents that transfer instantly",
      "Opposing parties notice when your team has technical difficulties — and they remember",
      "Courts and regulators have filing deadlines that don't care about your internet issues",
      "Referral partners judge your capability partly by your technology sophistication"
    ],
    competitiveContext: "The BigLaw firm has redundant everything. The boutique competitor invested in infrastructure last year. When clients experience your technology friction, they wonder if it reflects your firm's overall investment in serving them",
    downstreamConsequences: {
      'slow-speeds': "That video call that froze during the key moment of your presentation? The client remembers the technology failure, not your brilliant insight",
      'downtime': "One missed deadline due to system issues doesn't just mean a malpractice conversation — it means a reputation hit that follows you"
    },
    dailyFrustrations: [
      "Associates working from home with better internet than the office, questioning why they come in",
      "Client calls starting with 'can you hear me?' troubleshooting instead of substance",
      "Partners carrying USB drives because cloud sync is too unpredictable"
    ]
  },
  'construction': {
    criticalMoments: {
      'slow-speeds': "When the concrete truck is on site and the pour approval is stuck in download",
      'downtime': "During an RFI response window when access to submittals determines if you get the change order",
      'security-concerns': "When bid documents are transmitted and one leak means losing the job to a competitor",
      'poor-support': "When a trailer loses connectivity on a remote site and the help desk has never heard of job site internet",
      'high-costs': "When every project is bid to the penny and overhead determines win or loss"
    },
    stakeholderPains: {
      'project-manager': "Your PM spends hours driving between sites because they can't trust the document versions on the server",
      'superintendent': "Your superintendent makes calls instead of using the app because they've learned the app doesn't work reliably on site",
      'estimator': "Your estimators miss detail in plan sets because downloading high-res drawings takes too long, so they zoom on compressed versions",
      'safety-manager': "Your safety manager can't upload incident reports from the field — everything has to wait until they're back in the office"
    },
    ecosystemPressures: [
      "GCs expect instant RFI responses and ASI acknowledgments — delays cost them money and they remember who caused them",
      "Subs are integrating their schedules with yours — and blaming your connectivity when updates don't sync",
      "Owners want real-time project dashboards that actually reflect real-time data",
      "Insurance requires timestamped safety documentation that proves compliance"
    ],
    competitiveContext: "The GC down the street runs connected job sites with real-time coordination. When your crews are waiting for plans or your PMs can't access submittals, you look like the company that's behind the times",
    downstreamConsequences: {
      'slow-speeds': "That plan revision that took an hour to download? Your crew worked off the old version. Now you're tearing out and reinstalling on your dime",
      'downtime': "One day without access to project management means a day of decisions made without documentation — and disputes that follow"
    },
    dailyFrustrations: [
      "PMs printing plans because downloading to a tablet takes forever",
      "Daily logs completed on paper and entered later because the app times out",
      "Punch lists walked twice — once to identify, once to photograph — because photos won't upload in real-time"
    ]
  },
  'education': {
    criticalMoments: {
      'slow-speeds': "When students are taking standardized tests online and the network slows to a crawl",
      'downtime': "During state testing week when every connection matters for student scores",
      'security-concerns': "When student records, grades, and personal information move across your network daily",
      'poor-support': "When a teacher's smartboard won't connect and 30 students are waiting",
      'high-costs': "When the board reviews IT spending and questions every line item"
    },
    stakeholderPains: {
      'teacher': "Teachers spending class time troubleshooting instead of teaching, watching student engagement evaporate",
      'principal': "Principals fielding parent complaints about online assignments that won't load at home or school",
      'it-director': "IT directors juggling hundreds of devices with tools built for a dozen",
      'superintendent': "Superintendents explaining to the board why test scores were impacted by network issues"
    },
    ecosystemPressures: [
      "Parents expect the same digital experience they have at work — and blame the school when it falls short",
      "State testing platforms require stable connections with zero tolerance for dropped sessions",
      "EdTech vendors assume bandwidth that many schools don't have",
      "Students compare their school's technology to what they see on social media and at home"
    ],
    competitiveContext: "Private schools and charter schools advertise their technology infrastructure. When your network fails during state testing, parents question whether their children are getting equal opportunity",
    downstreamConsequences: {
      'slow-speeds': "Slow connections during standardized tests mean anxious students, invalid test sessions, and scores that don't reflect what students actually know",
      'downtime': "Network outages during school hours mean classroom time lost, lesson plans disrupted, and teachers scrambling to fill unexpected gaps"
    },
    dailyFrustrations: [
      "Teachers asking students to put away devices because 'the network is too slow today'",
      "IT staff spending mornings rebooting access points instead of supporting instruction",
      "Students complaining they couldn't submit homework because the portal was down"
    ]
  },
  'transportation': {
    criticalMoments: {
      'slow-speeds': "When dispatch is trying to reroute a driver around an accident and the update won't push",
      'downtime': "During the morning dispatch window when every truck needs its route and manifest",
      'security-concerns': "When shipment data includes customer inventory levels and delivery patterns worth money to competitors",
      'poor-support': "At 4 AM when drivers can't log into ELD systems and you need someone who understands FMCSA",
      'high-costs': "When fuel optimization depends on real-time data but the data isn't real-time"
    },
    stakeholderPains: {
      'dispatcher': "Your dispatchers are calling drivers manually for updates because the GPS refresh is too slow — that's time they could spend optimizing routes",
      'driver': "Your drivers sit in trucks waiting for paperwork to download because the app won't sync — that's HOS time burning",
      'fleet-manager': "Your fleet manager makes decisions on stale data because real-time tracking isn't actually real-time",
      'customer-service': "Your CS team tells customers 'the driver should be there soon' because they can't see actual location"
    },
    ecosystemPressures: [
      "Customers expect Amazon-style tracking — they don't care that you're a B2B carrier",
      "Brokers judge reliability partly on how fast you update load status — slow updates mean lower scores",
      "FMCSA requires ELD data that doesn't have connectivity gaps — violations follow you",
      "Shippers are integrating TMS systems that expect your data to be as good as theirs"
    ],
    competitiveContext: "The carrier bidding against you has real-time visibility and automated customer updates. When your dispatcher has to call drivers for location updates, you look like you're running operations from the last decade",
    downstreamConsequences: {
      'slow-speeds': "That 10-minute delay in route optimization? Your truck burned an extra gallon of diesel finding out about the traffic after they hit it",
      'downtime': "One morning of dispatch system failure doesn't just delay loads — it creates detention fees, missed appointments, and relationship damage with your best customers"
    },
    dailyFrustrations: [
      "Drivers calling dispatch because their ELD lost connection and they need to log",
      "Customer service refreshing the same screen hoping the GPS will update",
      "Fleet manager running reports that are always 'as of this morning' instead of 'right now'"
    ]
  }
};

// Get industry operational context
export function getIndustryOperationalContext(industry: string): IndustryOperationalContext | null {
  return industryOperationalContext[industry] || null;
}

// Get critical moment language for a pain point and industry
export function getCriticalMoment(painPoint: string, industry: string): string | null {
  const context = industryOperationalContext[industry];
  if (!context) return null;
  return context.criticalMoments[painPoint] || null;
}

// Get stakeholder-specific pain language
export function getStakeholderPain(industry: string, stakeholder?: string): string | null {
  const context = industryOperationalContext[industry];
  if (!context) return null;
  const pains = context.stakeholderPains;
  if (stakeholder && pains[stakeholder]) {
    return pains[stakeholder];
  }
  // Return first stakeholder pain as default
  const firstKey = Object.keys(pains)[0];
  return pains[firstKey] || null;
}

// Get ecosystem pressure statement
export function getEcosystemPressure(industry: string): string | null {
  const context = industryOperationalContext[industry];
  if (!context || !context.ecosystemPressures.length) return null;
  // Return a random ecosystem pressure for variety
  const pressures = context.ecosystemPressures;
  return pressures[Math.floor(Math.random() * pressures.length)];
}

// Get daily frustration examples
export function getDailyFrustration(industry: string): string | null {
  const context = industryOperationalContext[industry];
  if (!context || !context.dailyFrustrations.length) return null;
  const frustrations = context.dailyFrustrations;
  return frustrations[Math.floor(Math.random() * frustrations.length)];
}

// Get downstream consequence for a pain point
export function getDownstreamConsequence(painPoint: string, industry: string): string | null {
  const context = industryOperationalContext[industry];
  if (!context) return null;
  return context.downstreamConsequences[painPoint] || null;
}

// Get competitive context statement
export function getCompetitiveContext(industry: string): string | null {
  const context = industryOperationalContext[industry];
  return context?.competitiveContext || null;
}

// ============= FULL VALUE PROPOSITION GENERATOR =============
// Weaves all nuanced elements into a cohesive, narrative-driven value statement

// Location context for multi-site messaging
const locationContextPhrases: Record<string, Record<string, string>> = {
  'small-business': {
    '1': 'for your single location',
    '2-5': 'across your growing footprint',
    '6-20': 'across your expanding network of locations',
    '20+': 'enterprise-wide'
  },
  'mid-market': {
    '1': 'at your hub location',
    '2-5': 'seamlessly connecting your multiple sites',
    '6-20': 'unifying your regional presence',
    '20+': 'standardizing operations across your portfolio'
  },
  'enterprise': {
    '1': 'for your flagship operation',
    '2-5': 'with consistent performance across key sites',
    '6-20': 'with business-grade consistency across your network',
    '20+': 'delivering unified, reliable connectivity across all locations'
  }
};

// Employee-aware complexity statements
const employeeComplexityPhrases: Record<string, string> = {
  '1-10': 'With a lean team, every connection matters',
  '11-50': 'As your team grows, reliable connectivity becomes the foundation of productivity',
  '51-200': 'At your scale, network performance directly impacts dozens of concurrent users',
  '201-500': 'Supporting hundreds of team members requires enterprise-caliber infrastructure',
  '500+': 'At enterprise scale, your network is mission-critical infrastructure'
};

// Budget-aligned value framing
const budgetValueFrames: Record<string, string> = {
  'cost-conscious': 'delivering maximum value without overpaying',
  'balanced': 'balancing performance with cost-effectiveness',
  'performance-focused': 'investing in the performance your business demands'
};

// Migration benefit statements by competitor type
const migrationBenefits: Record<string, string> = {
  'consumer': 'Moving from consumer-grade to business-grade means predictable performance when it matters most',
  'cable': 'Switching from cable means dedicated bandwidth that does not slow down at peak hours',
  'telco': 'With AT&T, you get a partner invested in your success, not just a vendor',
  'regional': 'With AT&T, you gain national scale and local accountability',
  'default': 'With AT&T Business, you get a true partner in your connectivity'
};

// Get migration benefit based on current provider
function getMigrationBenefit(currentProvider: string): string {
  const providerLower = currentProvider.toLowerCase();
  if (providerLower.includes('consumer') || providerLower.includes('residential')) {
    return migrationBenefits['consumer'];
  }
  if (providerLower.includes('comcast') || providerLower.includes('spectrum') || providerLower.includes('cable') || providerLower.includes('cox')) {
    return migrationBenefits['cable'];
  }
  if (providerLower.includes('verizon') || providerLower.includes('t-mobile') || providerLower.includes('lumen') || providerLower.includes('centurylink')) {
    return migrationBenefits['telco'];
  }
  if (providerLower.includes('local') || providerLower.includes('regional')) {
    return migrationBenefits['regional'];
  }
  return migrationBenefits['default'];
}

export function getFullValueProposition(
  product: { name: string; valuePropositionStatement: { customerOutcome?: string; riskMitigated?: string; keyDifferentiator?: string; keyBenefit: string; differentiation: string } },
  profile: CustomerProfile
): string {
  const primaryPain = profile.painPoints[0];
  const secondaryPain = profile.painPoints[1];
  const primaryPriority = profile.priorities[0];
  
  // Normalize industry key for lookups (handles variations like "Retail / E-Commerce" -> "retail")
  const normalizedIndustry = normalizeIndustryKey(profile.industry);
  const industryLabel = profile.industry.replace(/[-/]/g, ' ').replace(/\s+/g, ' ').trim();
  const operationalContext = industryOperationalContext[normalizedIndustry];
  const businessPhrase = getBusinessPhrase(profile);
  
  const parts: string[] = [];
  
  // 1. BUSINESS-SPECIFIC OR INDUSTRY-SPECIFIC OPENER
  if (businessPhrase) {
    // Use specific business description for more personalized opener
    const businessOpener = getBusinessSpecificOpener(businessPhrase, profile, primaryPain);
    parts.push(businessOpener);
  } else if (operationalContext) {
    const stakeholderPains = Object.values(operationalContext.stakeholderPains);
    if (stakeholderPains.length > 0) {
      // Pick a stakeholder pain that resonates with this size
      const painIndex = profile.type === 'enterprise' ? 3 : profile.type === 'mid-market' ? 1 : 0;
      const selectedPain = stakeholderPains[Math.min(painIndex, stakeholderPains.length - 1)];
      parts.push(ensureProperEnding(cleanText(selectedPain)));
    }
  } else {
    // Fallback to size + employee context
    const locationPhrase = locationContextPhrases[profile.type]?.[profile.locations] || '';
    const employeePhrase = employeeComplexityPhrases[profile.employeeCount] || '';
    
    if (employeePhrase && locationPhrase) {
      parts.push(ensureProperEnding(cleanText(`${employeePhrase}, especially ${locationPhrase}`)));
    } else if (employeePhrase) {
      parts.push(ensureProperEnding(cleanText(employeePhrase)));
    } else {
      const sizeModifier = sizeEmotionalModifiers[profile.type];
      if (sizeModifier) {
        parts.push(ensureProperEnding(cleanText(sizeModifier.situation)));
      }
    }
  }
  
  // 2. CRITICAL MOMENT - When it hurts most
  if (operationalContext && primaryPain) {
    const criticalMoment = operationalContext.criticalMoments[primaryPain];
    if (criticalMoment) {
      parts.push(ensureProperEnding(cleanText(`It's worst ${safelyLowerFirst(criticalMoment)}`)));
    }
  }
  
  // 3. DOWNSTREAM CONSEQUENCE - The ripple effect
  if (operationalContext && primaryPain) {
    const downstream = operationalContext.downstreamConsequences[primaryPain];
    if (downstream) {
      parts.push(ensureProperEnding(cleanText(downstream)));
    }
  } else if (primaryPain) {
    // Fallback to quantified impacts
    const painImpacts = quantifiedImpacts[primaryPain];
    if (painImpacts) {
      const industryImpacts = painImpacts[normalizedIndustry] || painImpacts['default'];
      if (industryImpacts) {
        const sizeImpact = industryImpacts[profile.type] || industryImpacts['small-business'];
        if (sizeImpact) {
          parts.push(ensureProperEnding(cleanText(sizeImpact)));
        }
      }
    }
  }
  
  // 4. ECOSYSTEM PRESSURE - External forces that make this urgent
  if (operationalContext && operationalContext.ecosystemPressures.length > 0) {
    // Select a relevant ecosystem pressure
    const pressure = operationalContext.ecosystemPressures[0];
    parts.push(ensureProperEnding(cleanText(pressure)));
  }
  
  // 4.5. CUSTOM CHALLENGE - Acknowledge user-specified unique challenge
  if (profile.customChallenge && profile.customChallenge.trim()) {
    const sanitizedChallenge = profile.customChallenge.trim().slice(0, 200);
    parts.push(`We understand you're also dealing with ${sanitizedChallenge.toLowerCase().replace(/^we |^our |^i /i, '').replace(/\.$/, '')} — and that's exactly the kind of challenge where the right connectivity partner makes a difference.`);
  }
  
  // 5. CUSTOMER OUTCOME - Lead with what changes for them (NEW OUTCOME-FIRST APPROACH)
  const vps = product.valuePropositionStatement;
  if (vps.customerOutcome) {
    parts.push(ensureProperEnding(cleanText(`With ${product.name}, ${safelyLowerFirst(vps.customerOutcome)}`)));
  } else {
    // Fallback to industry transformation or legacy approach
    let transformation = '';
    if (primaryPain) {
      const industryTrans = industryTransformations[normalizedIndustry] || industryTransformations['default'];
      transformation = industryTrans[primaryPain] || '';
    }
    
    if (transformation) {
      parts.push(ensureProperEnding(cleanText(`${product.name} ${transformation}`)));
    } else {
      let outcomeStatement = '';
      if (primaryPriority) {
        const priorityInfo = getNuancedPriority(primaryPriority, profile);
        outcomeStatement = priorityInfo.outcome;
      } else if (primaryPain) {
        outcomeStatement = getNuancedSolution(primaryPain, profile);
      }
      
      if (outcomeStatement) {
        parts.push(ensureProperEnding(cleanText(`${product.name} means ${safelyLowerFirst(outcomeStatement)}`)));
      } else {
        parts.push(ensureProperEnding(cleanText(`${product.name} ${vps.keyBenefit.replace(/^that /, '')}`)));
      }
    }
  }
  
  // 6. RISK MITIGATED - What they avoid (NEW)
  if (vps.riskMitigated) {
    parts.push(ensureProperEnding(cleanText(vps.riskMitigated)));
  }
  
  // 7. KEY DIFFERENTIATOR - Why AT&T (NEW)
  if (vps.keyDifferentiator) {
    parts.push(ensureProperEnding(cleanText(`That's ${safelyLowerFirst(vps.keyDifferentiator)}`)));
  } else if (operationalContext && operationalContext.competitiveContext) {
    parts.push(`With the right connectivity, you're the ${industryLabel} operation others benchmark against.`);
  }
  
  // 7. PRIORITY ALIGNMENT - Connect to what they care about most
  if (primaryPriority && primaryPriority !== 'reliability' && primaryPriority !== 'speed') {
    const priorityInfo = getNuancedPriority(primaryPriority, profile);
    if (priorityInfo.outcome) {
      parts.push(ensureProperEnding(cleanText(`For your operation, that means ${safelyLowerFirst(priorityInfo.outcome)}`)));
    }
  }
  
  // 7.5. CUSTOM PRIORITY - Acknowledge user-specified unique priority
  if (profile.customPriority && profile.customPriority.trim()) {
    const sanitizedPriority = profile.customPriority.trim().slice(0, 200);
    parts.push(`Since ${sanitizedPriority.toLowerCase().replace(/^we need |^we want |^i need |^i want /i, '').replace(/\.$/, '')} matters to you, we'll make sure our solution supports that goal.`);
  }
  
  // 8. BUDGET-ALIGNED VALUE STATEMENT - Frame ROI appropriately
  const budgetFrame = budgetValueFrames[profile.budget];
  if (budgetFrame) {
    parts.push(`All while ${budgetFrame}.`);
  }
  
  // 9. MIGRATION BENEFIT - If switching from a competitor
  if (profile.currentProvider && profile.currentProvider.length > 0 && !profile.currentProvider.includes('None') && !profile.currentProvider.includes('AT&T') && !profile.currentProvider.includes('None/New Business')) {
    const migrationBenefit = getMigrationBenefit(profile.currentProvider[0]);
    parts.push(ensureProperEnding(cleanText(migrationBenefit)));
  }
  
  return cleanText(parts.join(' '));
}

// Get just the quantified impact for a pain point (for use in other components)
export function getQuantifiedImpact(painPoint: string, profile: CustomerProfile): string | null {
  const painImpacts = quantifiedImpacts[painPoint];
  if (!painImpacts) return null;
  
  const normalizedIndustry = normalizeIndustryKey(profile.industry);
  const industryImpacts = painImpacts[normalizedIndustry] || painImpacts['default'];
  if (!industryImpacts) return null;
  
  return industryImpacts[profile.type] || industryImpacts['small-business'] || null;
}

// Get the industry transformation statement
export function getIndustryTransformation(painPoint: string, industry: string): string | null {
  const normalizedIndustry = normalizeIndustryKey(industry);
  const industryTrans = industryTransformations[normalizedIndustry] || industryTransformations['default'];
  return industryTrans[painPoint] || null;
}

// Get size emotional modifier
export function getSizeEmotionalModifier(type: string): { situation: string; stakes: string; investment: string } | null {
  return sizeEmotionalModifiers[type] || null;
}

// ============= CUSTOMER-CENTRIC VALUE PROPOSITION GENERATOR =============
// Generates value props starting from customer pain, not product features

interface CustomerCentricValuePropInput {
  industry: string;
  businessDescription?: string;
  painPoints: string[];
  priorities: string[];
  employeeCount: string;
  locations: string;
  type: 'small-business' | 'mid-market' | 'enterprise';
}

export function generateCustomerCentricValueProp(
  profile: CustomerCentricValuePropInput,
  product: { name: string; valuePropositionStatement: { keyBenefit: string; differentiation: string } }
): string {
  const normalizedIndustry = normalizeIndustryKey(profile.industry);
  const primaryPain = profile.painPoints[0] || 'downtime';
  const secondaryPain = profile.painPoints[1];
  const businessPhrase = profile.businessDescription?.toLowerCase().trim();
  
  const parts: string[] = [];
  
  // 1. EMPATHETIC OPENER - Acknowledge their reality
  if (businessPhrase) {
    // Industry-aware business context openers
    const industryBusinessContextOpeners: Record<string, Record<string, string>> = {
      'education': {
        'downtime': `Running a ${businessPhrase}, you know that every minute your network is down is a minute students aren't learning`,
        'slow-speeds': `In a ${businessPhrase}, you can feel the frustration when lessons stall because the network can't keep up`,
        'security-concerns': `Managing a ${businessPhrase}, protecting student data isn't just compliance — it's the trust parents place in you`,
        'high-costs': `Operating a ${businessPhrase}, every dollar spent on technology is a dollar that could go to educational programs`,
        'poor-support': `When you're running a ${businessPhrase}, the last thing you need is IT issues interrupting class time`,
        'default': `Running a ${businessPhrase}, you need technology that supports learning, not interrupts it`
      },
      'healthcare': {
        'downtime': `Running a ${businessPhrase}, you know that every minute your systems are down is a minute patients are waiting`,
        'slow-speeds': `In a ${businessPhrase}, slow systems mean staff frustration and patients waiting longer for care`,
        'security-concerns': `Managing a ${businessPhrase}, protecting patient data isn't just HIPAA compliance — it's the sacred trust patients place in you`,
        'high-costs': `Operating a ${businessPhrase}, every dollar on overhead is a dollar that could go to patient care`,
        'poor-support': `When you're running a ${businessPhrase}, you can't have IT issues delaying patient appointments`,
        'default': `Running a ${businessPhrase}, you need technology that supports care, not gets in the way`
      },
      'government': {
        'downtime': `Running a ${businessPhrase}, you know that every minute your systems are down is a minute citizens can't access essential services`,
        'slow-speeds': `In a ${businessPhrase}, slow systems mean longer wait times and growing citizen frustration`,
        'security-concerns': `Managing a ${businessPhrase}, protecting constituent data is a public trust obligation`,
        'high-costs': `Operating a ${businessPhrase}, every technology dollar is taxpayer money that must be spent wisely`,
        'poor-support': `When you're running a ${businessPhrase}, IT issues directly impact public service delivery`,
        'default': `Running a ${businessPhrase}, you need technology that serves the public efficiently`
      },
      'hospitality': {
        'downtime': `Running a ${businessPhrase}, you know that every minute your systems are down is a minute guests are frustrated`,
        'slow-speeds': `In a ${businessPhrase}, slow check-in means guests forming negative impressions before they even reach their room`,
        'security-concerns': `Managing a ${businessPhrase}, protecting guest data is essential to the trust they place in you`,
        'high-costs': `Operating a ${businessPhrase}, technology costs directly impact what you can invest in guest experience`,
        'poor-support': `When you're running a ${businessPhrase}, you can't have IT issues ruining the guest experience`,
        'default': `Running a ${businessPhrase}, you need technology that enhances the guest experience`
      },
      'transportation': {
        'downtime': `Running a ${businessPhrase}, you know that every minute your tracking is down is a minute drivers are flying blind`,
        'slow-speeds': `In a ${businessPhrase}, delayed updates mean drivers making decisions on outdated information`,
        'security-concerns': `Managing a ${businessPhrase}, protecting route and cargo data keeps your competitive edge safe`,
        'high-costs': `Operating a ${businessPhrase}, unpredictable technology costs make per-mile profitability hard to optimize`,
        'poor-support': `When you're running a ${businessPhrase}, stranded drivers with system issues need help fast`,
        'default': `Running a ${businessPhrase}, you need connectivity that keeps your fleet coordinated`
      },
      'real-estate': {
        'downtime': `Running a ${businessPhrase}, you know that losing MLS access during a showing makes you look unprepared`,
        'slow-speeds': `In a ${businessPhrase}, slow-loading virtual tours mean interested buyers moving to the next listing`,
        'security-concerns': `Managing a ${businessPhrase}, transaction document security directly impacts client trust`,
        'high-costs': `Operating a ${businessPhrase}, every overhead dollar cuts into your commission earnings`,
        'poor-support': `When you're running a ${businessPhrase}, deal-critical system failures need immediate resolution`,
        'default': `Running a ${businessPhrase}, your technology is part of your professional image`
      },
      'retail': {
        'downtime': `Running a ${businessPhrase}, you know that every minute registers are down is revenue walking out the door`,
        'slow-speeds': `In a ${businessPhrase}, checkout delays mean customers reconsidering their purchases`,
        'security-concerns': `Managing a ${businessPhrase}, a payment data breach would devastate customer trust`,
        'high-costs': `Operating a ${businessPhrase}, technology costs directly squeeze your margins`,
        'poor-support': `When you're running a ${businessPhrase}, you can't wait on hold while customers pile up`,
        'default': `Running a ${businessPhrase}, your technology should move as fast as your customers expect`
      },
      'finance': {
        'downtime': `Running a ${businessPhrase}, you know that every minute of system downtime costs clients real money`,
        'slow-speeds': `In a ${businessPhrase}, transaction delays mean missed opportunities for your clients`,
        'security-concerns': `Managing a ${businessPhrase}, your clients trust you with their financial lives — a breach ends that trust`,
        'high-costs': `Operating a ${businessPhrase}, technology costs must make financial sense for your bottom line`,
        'poor-support': `When you're running a ${businessPhrase}, client-facing system issues need immediate resolution`,
        'default': `Running a ${businessPhrase}, reliability and security aren't optional — they're everything`
      },
      'manufacturing': {
        'downtime': `Running a ${businessPhrase}, you know that every minute the line is down is production not made`,
        'slow-speeds': `In a ${businessPhrase}, slow data feeds mean operators making decisions on old information`,
        'security-concerns': `Managing a ${businessPhrase}, protecting proprietary processes is protecting your competitive edge`,
        'high-costs': `Operating a ${businessPhrase}, unpredictable technology costs make per-unit margins harder to optimize`,
        'poor-support': `When you're running a ${businessPhrase}, production issues need fast resolution, not ticket queues`,
        'default': `Running a ${businessPhrase}, your network is as critical as your equipment`
      },
      'professional-services': {
        'downtime': `Running a ${businessPhrase}, you know that connectivity issues waste billable time`,
        'slow-speeds': `In a ${businessPhrase}, slow file transfers mean your team is waiting instead of billing`,
        'security-concerns': `Managing a ${businessPhrase}, client confidentiality is your professional obligation`,
        'high-costs': `Operating a ${businessPhrase}, overhead efficiency directly impacts your competitive rates`,
        'poor-support': `When you're running a ${businessPhrase}, you need help that values your time as much as you do`,
        'default': `Running a ${businessPhrase}, your time is literally money`
      },
      'construction': {
        'downtime': `Running a ${businessPhrase}, you know that connectivity issues delay job site decisions`,
        'slow-speeds': `In a ${businessPhrase}, slow plan downloads mean crews waiting instead of working`,
        'security-concerns': `Managing a ${businessPhrase}, bid document security protects your competitive position`,
        'high-costs': `Operating a ${businessPhrase}, technology costs directly impact project profitability`,
        'poor-support': `When you're running a ${businessPhrase}, field issues need fast resolution to keep projects on track`,
        'default': `Running a ${businessPhrase}, connectivity keeps your crews coordinated`
      },
      'default': {
        'downtime': `Running a ${businessPhrase}, you know that every minute your systems are down is a minute you're not serving customers`,
        'slow-speeds': `In a ${businessPhrase}, you can feel the frustration when your team is stuck waiting for things to load`,
        'security-concerns': `Managing a ${businessPhrase}, a data breach would put your reputation and customer trust on the line`,
        'high-costs': `Operating a ${businessPhrase}, unpredictable technology costs make it hard to plan`,
        'poor-support': `When you're running a ${businessPhrase}, the last thing you need is being stuck on hold`,
        'multiple-vendors': `With a ${businessPhrase} to manage, juggling multiple technology vendors means nobody owns your problems`,
        'scaling': `As your ${businessPhrase} grows, you need technology that grows with you`,
        'outdated-tech': `Your ${businessPhrase} deserves better than outdated technology`,
        'default': `Running a ${businessPhrase}, you need technology that works as hard as you do`
      }
    };
    
    const industryOpeners = industryBusinessContextOpeners[normalizedIndustry] || industryBusinessContextOpeners['default'];
    const opener = industryOpeners[primaryPain] || industryOpeners['default'] || industryBusinessContextOpeners['default']['default'];
    parts.push(ensureProperEnding(opener));
  } else {
    // Use industry-based opener
    const industryOpeners: Record<string, Record<string, string>> = {
      'healthcare': {
        'downtime': "In healthcare, when your systems go down, patient care doesn't wait. Every minute offline is care delayed and trust eroded",
        'security-concerns': "Patient data is sacred. A single breach doesn't just cost fines — it costs the trust patients placed in you",
        'default': "In healthcare, connectivity isn't just IT — it's the foundation of patient care"
      },
      'retail': {
        'downtime': "In retail, downtime means customers walk out — and they don't always come back",
        'slow-speeds': "When checkout lines slow down, customers start reconsidering their purchases",
        'default': "In retail, your technology should move as fast as your customers expect"
      },
      'finance': {
        'security-concerns': "In finance, your clients trust you with their financial lives. Security isn't optional — it's everything",
        'downtime': "When clients can't access their accounts, they start looking for alternatives",
        'default': "In financial services, reliability and security aren't features — they're requirements"
      },
      'manufacturing': {
        'downtime': "On the production floor, downtime means lost output, missed deadlines, and ripple effects through your supply chain",
        'slow-speeds': "When production data lags, you're making decisions on information that's already old",
        'default': "In manufacturing, your network is as critical as your equipment"
      },
      'hospitality': {
        'downtime': "Guests remember the check-in experience. Systems down means frustration before they even reach their room",
        'default': "In hospitality, guest experience starts with seamless technology"
      },
      'professional-services': {
        'slow-speeds': "When files take forever to upload, that's billable time evaporating",
        'downtime': "Client deadlines don't care about your connectivity issues",
        'default': "In professional services, your time is literally money"
      },
      'education': {
        'downtime': "When the network goes down during state testing, students' scores suffer and parents lose confidence",
        'slow-speeds': "When students can't load their assignments, learning stops and classroom management becomes chaos",
        'security-concerns': "Student records contain some of the most sensitive data. A breach doesn't just mean fines — it means parents questioning your commitment to their children's safety",
        'default': "In education, reliable technology isn't a nice-to-have — it's essential for learning to happen"
      },
      'transportation': {
        'downtime': "When your fleet tracking goes dark, drivers lose guidance and customers lose visibility on their shipments",
        'slow-speeds': "When dispatch updates lag, drivers are making route decisions on outdated information",
        'security-concerns': "Cargo and route data exposure doesn't just risk shipments — it hands competitors your operational intelligence",
        'default': "In transportation, connectivity is the nervous system that keeps your fleet coordinated"
      },
      'government': {
        'downtime': "When government systems go down, citizens can't access essential services — and public trust erodes with every minute",
        'slow-speeds': "Slow permit processing and application systems mean citizens waiting and taxpayer frustration growing",
        'security-concerns': "Constituent data breaches make headlines and undermine the public's faith in government institutions",
        'default': "In government, reliable technology is a public service obligation"
      },
      'real-estate': {
        'downtime': "When your MLS access drops during a showing, you look unprepared and buyers question your professionalism",
        'slow-speeds': "Virtual tours that buffer and documents that won't load mean interested buyers moving to the next listing",
        'security-concerns': "Transaction documents contain sensitive financial data — a breach can cost you clients and your reputation",
        'default': "In real estate, your connectivity is part of your client experience"
      },
      'default': {
        'downtime': "When your systems go down, your business goes with them. Every minute offline costs money and trust",
        'slow-speeds': "Your team shouldn't spend their day waiting for technology. That's productivity lost",
        'security-concerns': "In today's world, a security breach can define your company's reputation for years",
        'high-costs': "Unpredictable technology costs make it hard to plan and invest in growth",
        'default': "Your technology should enable your business, not hold it back"
      }
    };
    
    const industryOpener = industryOpeners[normalizedIndustry] || industryOpeners['default'];
    parts.push(ensureProperEnding(industryOpener[primaryPain] || industryOpener['default'] || industryOpeners['default']['default']));
  }
  
  // 2. CONNECT PAIN TO BUSINESS IMPACT - Make the stakes clear
  const sizeContext = sizeEmotionalModifiers[profile.type];
  
  // Industry-specific secondary pain messaging
  const industrySecondaryPainMessages: Record<string, Record<string, string>> = {
    'healthcare': {
      'slow-speeds': "Combined with slow EHR access, your staff frustration compounds and patient wait times grow",
      'downtime': "When system outages are also a concern, patient care becomes unpredictable",
      'security-concerns': "Add HIPAA compliance worries, and your risk exposure multiplies",
      'high-costs': "Factor in unpredictable billing, and budgeting for patient care becomes guesswork",
      'poor-support': "When you can't get quick help, every minute your systems are down is a patient not seen"
    },
    'education': {
      'slow-speeds': "Combined with slow network access during class, students disengage and teachers lose valuable instruction time",
      'downtime': "When connectivity drops during testing or online learning, the entire school day is disrupted",
      'security-concerns': "Add student data privacy concerns, and your FERPA compliance risk multiplies",
      'high-costs': "Factor in tight district budgets, and every dollar not spent on technology is a dollar taken from educational programs",
      'poor-support': "When IT issues interrupt class and support is slow, teachers are left troubleshooting instead of teaching"
    },
    'retail': {
      'slow-speeds': "Add checkout lag to the mix, and customers start abandoning their carts",
      'downtime': "When registers also go down, that's revenue walking out the door",
      'security-concerns': "Combine that with PCI compliance concerns, and the stakes get even higher",
      'high-costs': "Factor in rising costs, and your margins get squeezed from both sides",
      'poor-support': "When support is slow, every minute of downtime costs you sales"
    },
    'finance': {
      'slow-speeds': "Add transaction delays, and clients start questioning your platform",
      'downtime': "When system access is also uncertain, client trust erodes fast",
      'security-concerns': "Compound that with security vulnerabilities, and regulatory exposure skyrockets",
      'high-costs': "Factor in unpredictable costs, and forecasting becomes a challenge",
      'poor-support': "When you can't get immediate help, client relationships are on the line"
    },
    'manufacturing': {
      'slow-speeds': "Combined with slow data feeds, operators are flying blind on the production floor",
      'downtime': "Add line stoppages to that, and your whole supply chain feels the ripple",
      'security-concerns': "Factor in IP protection concerns, and your competitive advantage is at risk",
      'high-costs': "When costs are unpredictable, per-unit margins become harder to optimize",
      'poor-support': "When production is down and support is slow, every minute is lost output"
    },
    'hospitality': {
      'slow-speeds': "Add slow check-in systems, and guest frustration starts before they reach their room",
      'downtime': "When reservation systems also falter, you risk losing bookings",
      'security-concerns': "Factor in guest data protection, and your reputation is on the line",
      'high-costs': "Combine that with fluctuating costs, and seasonal planning becomes challenging",
      'poor-support': "When front desk systems need help fast, slow support means unhappy guests"
    },
    'professional-services': {
      'slow-speeds': "Add slow file transfers, and billable time evaporates waiting for uploads",
      'downtime': "When client access is disrupted, deadlines slip and trust erodes",
      'security-concerns': "Factor in confidentiality concerns, and client relationships are at stake",
      'high-costs': "Combine that with overhead creep, and your competitive rates suffer",
      'poor-support': "When you need help during client work, waiting isn't an option"
    },
    'construction': {
      'slow-speeds': "Combined with slow plan downloads, job site decisions get delayed",
      'downtime': "Add connectivity gaps at remote sites, and crew coordination suffers",
      'security-concerns': "Factor in bid security concerns, and competitive intelligence is at risk",
      'high-costs': "When project costs fluctuate, job profitability becomes uncertain",
      'poor-support': "When field issues need fast resolution, slow support costs project time"
    },
    'transportation': {
      'slow-speeds': "Combined with delayed dispatch updates, drivers are making decisions on outdated information",
      'downtime': "When your tracking system goes dark, customers have no visibility and drivers lose routing guidance",
      'security-concerns': "Add cargo tracking data exposure concerns, and your competitive intelligence is at risk",
      'high-costs': "Factor in unpredictable per-mile costs, and route profitability becomes impossible to optimize",
      'poor-support': "When a driver is stranded with a system issue and support is slow, deliveries are at stake"
    },
    'government': {
      'slow-speeds': "Combined with slow application processing, citizens wait longer and frustration grows",
      'downtime': "When systems go down, essential citizen services halt and public trust erodes",
      'security-concerns': "Add sensitive constituent data exposure concerns, and compliance violations loom",
      'high-costs': "Factor in tight taxpayer-funded budgets, and every wasted dollar faces public scrutiny",
      'poor-support': "When critical systems need help and support is slow, citizen services suffer"
    },
    'real-estate': {
      'slow-speeds': "Combined with slow virtual tour loading, interested buyers move on to the next listing",
      'downtime': "When your MLS access goes down during a showing, you look unprepared to clients",
      'security-concerns': "Add transaction document exposure concerns, and client trust is at stake",
      'high-costs': "Factor in commissions being squeezed, and every overhead dollar cuts into your earnings",
      'poor-support': "When deal-critical systems fail and support is slow, closings are at risk"
    }
  };
  
  // Get industry-aware stakes
  const industryStakes = getIndustryAwareStakes(profile.industry, profile.type);
  
  if (secondaryPain && sizeContext) {
    const industryMessages = industrySecondaryPainMessages[normalizedIndustry];
    const specificMessage = industryMessages?.[secondaryPain];
    if (specificMessage) {
      parts.push(ensureProperEnding(`${specificMessage} — and ${industryStakes}`));
    } else {
      parts.push(ensureProperEnding(`When you add ${getPainLabel(secondaryPain)} to the mix, ${industryStakes}`));
    }
  } else if (sizeContext) {
    parts.push(ensureProperEnding(`${sizeContext.situation} — and ${industryStakes}`));
  }

  // 3. INTRODUCE SOLUTION NATURALLY - Not as a sales pitch, but as the answer
  const transformation = industryTransformations[normalizedIndustry]?.[primaryPain] || industryTransformations['default']?.[primaryPain];
  
  // Get industry-appropriate business type descriptor
  const industryBusinessTypes: Record<string, string> = {
    'education': 'school',
    'healthcare': 'practice',
    'government': 'organization',
    'hospitality': 'property',
    'transportation': 'operation',
    'real-estate': 'brokerage',
    'retail': 'business',
    'finance': 'firm',
    'manufacturing': 'operation',
    'professional-services': 'firm',
    'construction': 'business'
  };
  const businessType = industryBusinessTypes[normalizedIndustry] || 'business';
  
  if (transformation) {
    parts.push(ensureProperEnding(`That's exactly why ${product.name} makes sense for a ${businessType} like yours — it ${transformation}`));
  } else {
    parts.push(ensureProperEnding(`${product.name} was designed for exactly this situation — ${product.valuePropositionStatement.keyBenefit.replace(/^that /, '')}`));
  }

  // 3.5 SINGLE-PROVIDER ADVANTAGE - Add if multiple-vendors is a pain point
  if (profile.painPoints.includes('multiple-vendors')) {
    const singleProviderBenefit = "Because AT&T handles internet, voice, and security together, you get one number to call, one bill to pay, and one team that's accountable when something needs attention.";
    parts.push(singleProviderBenefit);
  }

  // 4. BRIDGE TO THEIR PRIORITIES - Connect to what matters most (now supports multiple)
  const industryPriorityBridges: Record<string, Record<string, Record<string, string>>> = {
    'healthcare': {
      'reliability': {
        'small-business': "So your patients never hear 'the system is down' during their visit",
        'mid-market': "Delivering the uptime your clinical workflows demand across every location",
        'enterprise': "Meeting the five-nines availability your hospital systems require"
      },
      'speed': {
        'small-business': "Your patient records load the moment you need them",
        'mid-market': "Lab results, imaging, and EHR sync in real-time across your clinics",
        'enterprise': "Enterprise-wide data flows without bottlenecks, even at peak hours"
      },
      'security': {
        'small-business': "HIPAA-grade protection without needing an IT department",
        'mid-market': "Compliance built in, so audits are a formality, not a fire drill",
        'enterprise': "Security that satisfies your compliance team and protects patient trust"
      },
      'cost-savings': {
        'small-business': "Predictable monthly costs so you can budget for care, not surprises",
        'mid-market': "Right-sized pricing that grows with your practice, not ahead of it",
        'enterprise': "Enterprise value without enterprise complexity in your billing"
      }
    },
    'retail': {
      'reliability': {
        'small-business': "Your registers keep ringing, even when the unexpected happens",
        'mid-market': "Peak season runs smooth across every store in your chain",
        'enterprise': "Black Friday uptime you can count on, nationwide"
      },
      'speed': {
        'small-business': "Card transactions clear in seconds, not awkward silence",
        'mid-market': "Checkout speed that keeps lines moving during your busiest hours",
        'enterprise': "Transaction processing at the scale and speed your volume demands"
      },
      'security': {
        'small-business': "PCI protection without the complexity of managing it yourself",
        'mid-market': "Security that protects customer data across every storefront",
        'enterprise': "Business-grade protection for millions of transactions"
      },
      'cost-savings': {
        'small-business': "More margin in your pocket with straightforward pricing",
        'mid-market': "Predictable costs that make multi-location budgeting simple",
        'enterprise': "Scale economics that improve your bottom line across every store"
      }
    },
    'finance': {
      'reliability': {
        'small-business': "Your clients access their accounts without interruption",
        'mid-market': "Trading hours run seamlessly across your advisor network",
        'enterprise': "Market-hours availability that your clients' portfolios depend on"
      },
      'speed': {
        'small-business': "Transactions execute the moment your clients click",
        'mid-market': "Real-time data flows for time-sensitive financial decisions",
        'enterprise': "Millisecond performance for high-frequency operations"
      },
      'security': {
        'small-business': "Bank-grade protection for your clients' financial lives",
        'mid-market': "Security that satisfies regulators and protects client trust",
        'enterprise': "Defense-in-depth security for billion-dollar asset protection"
      }
    },
    'manufacturing': {
      'reliability': {
        'small-business': "Your production line keeps running without network-caused stops",
        'mid-market': "Plant-wide connectivity that won't interrupt your shifts",
        'enterprise': "Factory-floor uptime that matches your equipment SLAs"
      },
      'speed': {
        'small-business': "Real-time production data so you're never making decisions on old information",
        'mid-market': "Instant data sync across your facilities for coordinated operations",
        'enterprise': "IoT and MES data flowing at the speed your automation requires"
      },
      'security': {
        'small-business': "Protection for your proprietary processes without IT overhead",
        'mid-market': "Industrial-grade security across every facility",
        'enterprise': "IP protection that guards your competitive advantage"
      }
    },
    'hospitality': {
      'reliability': {
        'small-business': "Check-ins flow smoothly, even on your busiest weekends",
        'mid-market': "Every property stays connected, every reservation accessible",
        'enterprise': "Brand-wide uptime that protects your guest experience standards"
      },
      'speed': {
        'small-business': "Guest WiFi that earns compliments, not complaints",
        'mid-market': "Fast connectivity across lobbies, rooms, and back-office",
        'enterprise': "Network performance that matches your five-star service"
      },
      'security': {
        'small-business': "Guest payment data protected without dedicated IT",
        'mid-market': "PCI compliance simplified across your properties",
        'enterprise': "Enterprise security that protects guest trust at scale"
      }
    },
    'professional-services': {
      'reliability': {
        'small-business': "Client calls and file access work when you need them",
        'mid-market': "Billable hours stay billable, not wasted on connection issues",
        'enterprise': "Office-wide reliability that supports your demanding workflows"
      },
      'speed': {
        'small-business': "Large files upload in minutes, not frustrating waits",
        'mid-market': "Seamless video conferencing and cloud access across your team",
        'enterprise': "Performance that matches the pace of your high-value work"
      },
      'security': {
        'small-business': "Client confidentiality protected without complexity",
        'mid-market': "Security posture that satisfies your clients' requirements",
        'enterprise': "Business-grade protection for sensitive client matters"
      }
    },
    'construction': {
      'reliability': {
        'small-business': "Job site connectivity that doesn't disappear when you need it",
        'mid-market': "Remote locations stay connected for crew coordination",
        'enterprise': "Enterprise-wide connectivity from office to every active site"
      },
      'speed': {
        'small-business': "Plans and updates reach the field without delays",
        'mid-market': "Real-time coordination between office and multiple sites",
        'enterprise': "Instant data flow across your entire project portfolio"
      },
      'security': {
        'small-business': "Bid information stays confidential without IT overhead",
        'mid-market': "Project data protection across every job site",
        'enterprise': "Enterprise security for competitive bid protection"
      }
    },
    'education': {
      'reliability': {
        'small-business': "So students never face 'the network is down' during an important test",
        'mid-market': "Delivering campus-wide connectivity that keeps every classroom connected",
        'enterprise': "District-wide uptime that supports thousands of students and staff simultaneously"
      },
      'speed': {
        'small-business': "Learning apps and videos load instantly, keeping students engaged",
        'mid-market': "1:1 device programs work seamlessly across your campus",
        'enterprise': "High-bandwidth support for district-wide digital learning initiatives"
      },
      'security': {
        'small-business': "FERPA-compliant protection without needing dedicated IT staff",
        'mid-market': "Student data security that satisfies parent concerns and compliance requirements",
        'enterprise': "District-wide security posture that protects every student record"
      },
      'cost-savings': {
        'small-business': "Predictable costs that fit within limited school budgets",
        'mid-market': "Right-sized pricing that lets you invest more in educational programs",
        'enterprise': "Consolidated billing that simplifies district-wide budgeting"
      },
      'scalability': {
        'small-business': "Technology that grows with enrollment without major upgrades",
        'mid-market': "Ready for back-to-school surges and new program rollouts",
        'enterprise': "Infrastructure that supports new schools and programs as your district expands"
      }
    },
    'transportation': {
      'reliability': {
        'small-business': "Your fleet stays connected so every delivery arrives on time",
        'mid-market': "Route-wide connectivity that keeps dispatchers and drivers in sync",
        'enterprise': "Network-wide uptime that supports hundreds of vehicles simultaneously"
      },
      'speed': {
        'small-business': "Dispatch updates reach drivers instantly, not minutes later",
        'mid-market': "Real-time routing adjustments that respond to traffic and conditions",
        'enterprise': "High-speed data flow for fleet-wide logistics optimization"
      },
      'security': {
        'small-business': "Cargo and route data protected without complex IT overhead",
        'mid-market': "Fleet-wide security that protects customer shipment information",
        'enterprise': "Business-grade protection for sensitive logistics data"
      },
      'cost-savings': {
        'small-business': "Predictable costs that fit your per-mile operating model",
        'mid-market': "Right-sized pricing that scales with your fleet size",
        'enterprise': "Consolidated billing that simplifies multi-route budgeting"
      },
      'mobility': {
        'small-business': "Drivers stay connected whether on highways or rural routes",
        'mid-market': "Coverage that works across your entire service territory",
        'enterprise': "Nationwide connectivity for coast-to-coast operations"
      }
    },
    'government': {
      'reliability': {
        'small-business': "Citizen services stay available without interruption",
        'mid-market': "Department-wide connectivity that keeps public services running",
        'enterprise': "Agency-wide uptime that citizens depend on daily"
      },
      'speed': {
        'small-business': "Applications and permits process without network delays",
        'mid-market': "Fast system access that reduces citizen wait times",
        'enterprise': "High-performance connectivity for data-intensive public programs"
      },
      'security': {
        'small-business': "Constituent data protected to meet compliance requirements",
        'mid-market': "Security that satisfies auditors and protects public trust",
        'enterprise': "FedRAMP-grade protection for sensitive government data"
      },
      'cost-savings': {
        'small-business': "Predictable costs that fit within budget constraints",
        'mid-market': "Transparent pricing that simplifies fiscal year planning",
        'enterprise': "Consolidated contracts that reduce administrative overhead"
      },
      'scalability': {
        'small-business': "Technology that adapts to changing service demands",
        'mid-market': "Infrastructure ready for new programs and initiatives",
        'enterprise': "Capacity that expands with growing constituent populations"
      }
    },
    'real-estate': {
      'reliability': {
        'small-business': "Listings and client communications stay accessible 24/7",
        'mid-market': "Office-wide connectivity that supports your entire team",
        'enterprise': "Multi-office uptime that keeps every agent productive"
      },
      'speed': {
        'small-business': "Virtual tours load instantly, keeping buyers engaged",
        'mid-market': "Fast uploads and downloads for large property files",
        'enterprise': "High-bandwidth support for multimedia marketing across all offices"
      },
      'security': {
        'small-business': "Transaction documents protected without IT complexity",
        'mid-market': "Client financial data secured across your brokerage",
        'enterprise': "Business-grade protection for high-value deal documentation"
      },
      'mobility': {
        'small-business': "Stay connected from open houses, showings, and on the road",
        'mid-market': "Team connectivity that works wherever properties are",
        'enterprise': "Nationwide coverage for agents across every market"
      },
      'cost-savings': {
        'small-business': "Predictable costs that protect your commission earnings",
        'mid-market': "Right-sized pricing for growing brokerages",
        'enterprise': "Consolidated billing across all locations and agents"
      }
    }
  };
  
  // Generic fallback priority bridges - industry-aware when possible
  const getGenericPriorityBridge = (priority: string, industry: string): string => {
    const industryStakeholders: Record<string, string> = {
      'education': 'students',
      'healthcare': 'patients',
      'government': 'citizens',
      'hospitality': 'guests',
      'transportation': 'customers and drivers',
      'real-estate': 'clients',
      'retail': 'customers',
      'finance': 'clients',
      'manufacturing': 'operations',
      'professional-services': 'clients',
      'construction': 'projects'
    };
    
    const stakeholder = industryStakeholders[normalizeIndustryKey(industry)] || 'customers';
    
    const bridges: Record<string, string> = {
      'reliability': `so you can count on your systems being there when your ${stakeholder} need you`,
      'speed': "giving your team the performance they need to work without waiting",
      'security': "with protection built in, so security doesn't become another thing to manage",
      'cost-savings': "all with predictable costs that let you plan and invest with confidence",
      'scalability': "built to grow with you, so your technology never holds you back",
      'support': "with real support from people who pick up the phone and actually help"
    };
    
    return bridges[priority] || '';
  };
  
  // Get primary priority (first in array)
  const primaryPriority = profile.priorities[0];
  const secondaryPriority = profile.priorities[1];
  
  if (primaryPriority) {
    const industryBridges = industryPriorityBridges[normalizedIndustry];
    const priorityBridges = industryBridges?.[primaryPriority];
    const specificBridge = priorityBridges?.[profile.type];
    
    if (specificBridge) {
      parts.push(ensureProperEnding(specificBridge));
    } else {
      const genericBridge = getGenericPriorityBridge(primaryPriority, profile.industry);
      if (genericBridge) {
        // Capitalize the first letter for sentence start
        parts.push(ensureProperEnding(genericBridge.charAt(0).toUpperCase() + genericBridge.slice(1)));
      }
    }
  }
  
  // Add secondary priority if different and meaningful
  if (secondaryPriority && secondaryPriority !== primaryPriority) {
    const secondaryBridge = getGenericPriorityBridge(secondaryPriority, profile.industry);
    if (secondaryBridge) {
      parts.push(ensureProperEnding(`Plus, ${secondaryBridge}`));
    }
  }
  
  // 5. CALL TO VALUE - The bottom line, tied to their reality
  const valueClosers: Record<string, string> = {
    'healthcare': "The bottom line: your practice stays connected, your patients stay served, and your team focuses on care instead of connectivity",
    'retail': "The bottom line: your registers keep ringing, your customers stay happy, and you focus on sales instead of tech problems",
    'finance': "The bottom line: your clients stay connected, your transactions stay secure, and you protect the trust they've placed in you",
    'manufacturing': "The bottom line: your lines keep running, your data stays current, and you make decisions with confidence",
    'hospitality': "The bottom line: your guests have a seamless experience from check-in to checkout",
    'professional-services': "The bottom line: your team stays productive, your clients stay served, and you bill for work instead of waiting",
    'education': "The bottom line: your students stay connected, your teachers stay focused on teaching, and technology supports learning instead of interrupting it",
    'transportation': "The bottom line: your fleet stays connected, your deliveries stay on schedule, and you focus on logistics instead of connectivity issues",
    'government': "The bottom line: your citizens stay served, your systems stay compliant, and you focus on public service instead of technology problems",
    'real-estate': "The bottom line: your listings stay accessible, your closings stay on track, and you focus on clients instead of connectivity",
    'default': "The bottom line: you focus on running your business while your technology just works"
  };
  
  parts.push(ensureProperEnding(valueClosers[normalizedIndustry] || valueClosers['default']));
  
  return parts.join(' ');
}

function getPainLabel(painPoint: string): string {
  const labels: Record<string, string> = {
    'slow-speeds': 'slow internet speeds',
    'downtime': 'downtime concerns',
    'security-concerns': 'security worries',
    'high-costs': 'unpredictable costs',
    'poor-support': 'poor vendor support',
    'multiple-vendors': 'managing multiple vendors',
    'scaling': 'scaling challenges',
    'outdated-tech': 'outdated technology'
  };
  return labels[painPoint] || painPoint;
}

// Single-provider advantage messaging for multiple-vendors pain point
export function getSingleProviderAdvantageMessage(profile: CustomerCentricValuePropInput): string {
  const industryMessages: Record<string, string> = {
    'healthcare': "When patient systems need attention, you need one partner who owns the outcome — not a committee of vendors pointing fingers.",
    'retail': "One provider means one call when the registers need help — no hold music, no transfers, no 'that's not our department.'",
    'construction': "Job sites don't have time for vendor coordination. One provider simplifies field operations and gets issues resolved faster.",
    'finance': "In finance, accountability matters. One provider means one team responsible for keeping your operations running.",
    'manufacturing': "On the production floor, you can't wait for vendors to figure out whose problem it is. One provider owns the fix.",
    'hospitality': "Guest experience suffers when tech issues get bounced between vendors. One provider means faster resolution.",
    'default': "Instead of calling three different companies when something goes wrong, you have one number and one team who owns the fix."
  };
  
  const normalizedIndustry = profile.industry.toLowerCase().replace(/[^a-z]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  return industryMessages[normalizedIndustry] || industryMessages['default'];
}

// ============= STRUCTURED VALUE PROPOSITION =============
// Returns structured value prop with Customer Outcome, Risk Mitigated, and Key Differentiator

export interface StructuredValueProp {
  customerOutcome: string;
  riskMitigated: string;
  keyDifferentiator: string;
  bottomLine: string;
  overallStatement: string;
}

export function generateStructuredValueProp(
  profile: CustomerCentricValuePropInput,
  product: { name: string; valuePropositionStatement?: { keyBenefit?: string; differentiation?: string; keyDifferentiator?: string } }
): StructuredValueProp {
  const normalizedIndustry = normalizeIndustryKey(profile.industry);
  const primaryPain = profile.painPoints[0] || 'downtime';
  const primaryPriority = profile.priorities[0] || 'reliability';
  
  // Industry stakeholder terminology
  const industryStakeholders: Record<string, string> = {
    'education': 'students',
    'healthcare': 'patients',
    'government': 'citizens',
    'hospitality': 'guests',
    'transportation': 'customers',
    'real-estate': 'clients',
    'retail': 'customers',
    'finance': 'clients',
    'manufacturing': 'production',
    'professional-services': 'clients',
    'construction': 'projects'
  };
  
  const stakeholder = industryStakeholders[normalizedIndustry] || 'customers';
  
  // ===== CUSTOMER OUTCOME =====
  const customerOutcomes: Record<string, Record<string, string>> = {
    'healthcare': {
      'reliability': `Your care systems stay available 24/7, ensuring ${stakeholder} receive uninterrupted care`,
      'speed': `Staff access patient records instantly, spending more time on care and less time waiting`,
      'security': `Patient data remains protected with healthcare-grade security, maintaining trust and compliance`,
      'cost-savings': `Predictable technology costs that let you invest more in patient care`,
      'default': `Seamless connectivity that keeps your practice running smoothly for every patient`
    },
    'retail': {
      'reliability': `Your registers and systems stay operational during peak hours, maximizing every sales opportunity`,
      'speed': `Checkout flows smoothly without delays, keeping customers satisfied and lines moving`,
      'security': `Payment data stays protected, maintaining customer trust and PCI compliance`,
      'cost-savings': `Lower operational costs that preserve your margins without sacrificing performance`,
      'default': `Technology that moves as fast as your customers expect`
    },
    'finance': {
      'reliability': `Client-facing systems stay accessible when they need to access accounts or make trades`,
      'speed': `Transactions process quickly, ensuring clients never miss time-sensitive opportunities`,
      'security': `Client financial data is protected with bank-grade security measures`,
      'cost-savings': `Optimized technology spend that improves your operational efficiency`,
      'default': `Reliable, secure connectivity that protects client relationships`
    },
    'manufacturing': {
      'reliability': `Production lines stay connected and operational, minimizing unplanned downtime`,
      'speed': `Real-time data flows keep operators informed and decisions timely`,
      'security': `Proprietary processes and operational data remain protected`,
      'cost-savings': `Predictable costs that make per-unit profitability easier to manage`,
      'default': `Connected operations that keep your production on schedule`
    },
    'education': {
      'reliability': `Learning continues uninterrupted with networks that support every classroom`,
      'speed': `Educational platforms load quickly, keeping students engaged and on task`,
      'security': `Student records and data stay protected, maintaining parent trust`,
      'cost-savings': `Budget-friendly solutions that free up funds for educational programs`,
      'default': `Technology that supports learning instead of interrupting it`
    },
    'hospitality': {
      'reliability': `Guest-facing systems work flawlessly from check-in to checkout`,
      'speed': `Fast, responsive systems create positive first impressions at every touchpoint`,
      'security': `Guest payment and personal data stays secured`,
      'cost-savings': `Optimized costs that let you invest more in the guest experience`,
      'default': `Seamless technology that enhances every guest interaction`
    },
    'professional-services': {
      'reliability': `Your team stays productive with systems that are always available`,
      'speed': `Files upload and sync quickly, maximizing billable hours`,
      'security': `Client confidential information remains protected`,
      'cost-savings': `Efficient overhead that keeps your rates competitive`,
      'default': `Connectivity that values your time as much as you do`
    },
    'construction': {
      'reliability': `Job sites stay connected for real-time coordination and updates`,
      'speed': `Plans and documents load quickly, keeping crews productive`,
      'security': `Bid documents and project data remain confidential`,
      'cost-savings': `Predictable costs that protect project margins`,
      'default': `Field connectivity that keeps projects on schedule`
    },
    'transportation': {
      'reliability': `Your fleet stays connected for real-time tracking and coordination`,
      'speed': `Dispatch updates reach drivers instantly for optimal routing`,
      'security': `Cargo and route data stays protected from competitors`,
      'cost-savings': `Scalable costs that fit your per-mile operating model`,
      'default': `Connected operations that keep deliveries on schedule`
    },
    'government': {
      'reliability': `Citizen services remain accessible without interruption`,
      'speed': `Applications and requests process efficiently, reducing wait times`,
      'security': `Constituent data stays protected to meet compliance requirements`,
      'cost-savings': `Efficient use of taxpayer dollars with predictable costs`,
      'default': `Technology that serves the public reliably`
    },
    'real-estate': {
      'reliability': `Listings and client communications stay accessible 24/7`,
      'speed': `Virtual tours and property files load instantly for engaged buyers`,
      'security': `Transaction documents stay protected throughout the closing process`,
      'cost-savings': `Efficient costs that protect your commission earnings`,
      'default': `Professional connectivity that reflects your brand`
    }
  };
  
  const industryOutcomes = customerOutcomes[normalizedIndustry] || customerOutcomes['retail'];
  const customerOutcome = industryOutcomes[primaryPriority] || industryOutcomes['default'] || `Your team works without technology barriers, focusing on what matters most`;
  
  // ===== RISK MITIGATED =====
  const risksMitigated: Record<string, Record<string, string>> = {
    'healthcare': {
      'downtime': `Eliminates the risk of system outages disrupting patient care and appointments`,
      'slow-speeds': `Prevents staff frustration and patient delays caused by slow-loading records`,
      'security-concerns': `Protects against HIPAA violations and the devastating breach of patient trust`,
      'high-costs': `Avoids unpredictable billing that strains tight healthcare budgets`,
      'poor-support': `Ensures rapid resolution so IT issues never delay patient appointments`,
      'default': `Protects your practice from technology failures that impact patient care`
    },
    'retail': {
      'downtime': `Eliminates lost sales from register or system outages during peak hours`,
      'slow-speeds': `Prevents customer walkouts caused by slow checkout experiences`,
      'security-concerns': `Protects against payment data breaches that destroy customer trust`,
      'high-costs': `Avoids surprise bills that squeeze already-thin retail margins`,
      'poor-support': `Ensures issues are resolved before they impact the sales floor`,
      'default': `Protects your revenue from technology-related losses`
    },
    'finance': {
      'downtime': `Eliminates account access issues that erode client confidence`,
      'slow-speeds': `Prevents missed opportunities from transaction delays`,
      'security-concerns': `Protects against breaches that would end client relationships`,
      'high-costs': `Avoids technology overhead that impacts operational efficiency`,
      'poor-support': `Ensures immediate resolution for client-facing system issues`,
      'default': `Protects client relationships from technology disruptions`
    },
    'manufacturing': {
      'downtime': `Eliminates unplanned production stoppages that cascade through your supply chain`,
      'slow-speeds': `Prevents decision delays caused by lagging production data`,
      'security-concerns': `Protects proprietary processes from industrial espionage`,
      'high-costs': `Avoids unpredictable costs that impact per-unit profitability`,
      'poor-support': `Ensures production issues get resolved without waiting in ticket queues`,
      'default': `Protects your production schedule from technology failures`
    },
    'education': {
      'downtime': `Eliminates network outages that disrupt learning and testing`,
      'slow-speeds': `Prevents student disengagement caused by slow-loading content`,
      'security-concerns': `Protects student data and maintains parent trust`,
      'high-costs': `Avoids budget overruns that take funds from educational programs`,
      'poor-support': `Ensures classroom technology issues are resolved quickly`,
      'default': `Protects the learning environment from technology interruptions`
    },
    'hospitality': {
      'downtime': `Eliminates check-in delays that create negative first impressions`,
      'slow-speeds': `Prevents guest frustration from slow lobby and room systems`,
      'security-concerns': `Protects guest payment and personal data`,
      'high-costs': `Avoids overhead costs that reduce guest experience investments`,
      'poor-support': `Ensures rapid resolution so guests never wait on tech issues`,
      'default': `Protects the guest experience from technology failures`
    },
    'professional-services': {
      'downtime': `Eliminates billable hour losses from connectivity issues`,
      'slow-speeds': `Prevents team productivity losses from slow file handling`,
      'security-concerns': `Protects client confidentiality and professional reputation`,
      'high-costs': `Avoids overhead inefficiencies that impact competitive rates`,
      'poor-support': `Ensures deadline-critical issues get immediate attention`,
      'default': `Protects your billable time from technology disruptions`
    },
    'construction': {
      'downtime': `Eliminates job site coordination delays from connectivity issues`,
      'slow-speeds': `Prevents crew downtime waiting for plans and documents`,
      'security-concerns': `Protects bid documents and competitive positioning`,
      'high-costs': `Avoids technology costs that erode project margins`,
      'poor-support': `Ensures field issues are resolved to keep projects on track`,
      'default': `Protects project timelines from technology delays`
    },
    'transportation': {
      'downtime': `Eliminates fleet visibility gaps that disrupt delivery schedules`,
      'slow-speeds': `Prevents routing delays from lagging dispatch updates`,
      'security-concerns': `Protects cargo and route data from competitors`,
      'high-costs': `Avoids unpredictable costs that impact per-mile profitability`,
      'poor-support': `Ensures stranded drivers get rapid assistance`,
      'default': `Protects your fleet operations from connectivity gaps`
    },
    'government': {
      'downtime': `Eliminates service interruptions that frustrate citizens`,
      'slow-speeds': `Prevents processing delays that increase wait times`,
      'security-concerns': `Protects constituent data and meets compliance requirements`,
      'high-costs': `Ensures responsible use of taxpayer-funded technology budgets`,
      'poor-support': `Ensures public service issues are resolved promptly`,
      'default': `Protects public services from technology failures`
    },
    'real-estate': {
      'downtime': `Eliminates MLS access issues during critical showings and negotiations`,
      'slow-speeds': `Prevents lost buyer interest from slow-loading virtual tours`,
      'security-concerns': `Protects transaction documents throughout the closing process`,
      'high-costs': `Avoids overhead costs that cut into commission earnings`,
      'poor-support': `Ensures deal-critical issues get immediate resolution`,
      'default': `Protects your professional reputation from technology failures`
    }
  };
  
  const industryRisks = risksMitigated[normalizedIndustry] || risksMitigated['retail'];
  const riskMitigated = industryRisks[primaryPain] || industryRisks['default'] || `Reduces the risk of technology issues impacting your business operations`;
  
  // ===== KEY DIFFERENTIATOR =====
  // Use product's key differentiator if available, otherwise generate industry-aware version
  const productDifferentiator = product.valuePropositionStatement?.keyDifferentiator || 
                                 product.valuePropositionStatement?.differentiation;
  
  const industryDifferentiators: Record<string, string> = {
    'healthcare': `AT&T brings America's largest and most reliable network to healthcare, backed by dedicated support that understands patient care can't wait`,
    'retail': `AT&T's nationwide network means consistent performance across all your locations, with support that knows retail can't stop for tech issues`,
    'finance': `AT&T delivers bank-grade network security and reliability, with the scale to support even the largest financial operations`,
    'manufacturing': `AT&T provides industrial-strength connectivity backed by America's largest network, keeping production lines connected and data flowing`,
    'education': `AT&T supports learning with reliable, high-performance networks and dedicated education specialists who understand your unique challenges`,
    'hospitality': `AT&T ensures guest experiences stay seamless with reliable connectivity and responsive support across all your properties`,
    'professional-services': `AT&T delivers the reliable, secure connectivity that professional reputations depend on`,
    'construction': `AT&T brings reliable field connectivity that keeps crews connected and projects on schedule`,
    'transportation': `AT&T's nationwide network keeps your entire fleet connected with the coverage and reliability logistics demand`,
    'government': `AT&T brings proven government experience with compliant, secure solutions backed by dedicated public sector support`,
    'real-estate': `AT&T provides reliable connectivity that supports your professional image from the office to every showing`,
    'default': `AT&T backs your business with America's largest and most reliable network, plus dedicated support when you need it`
  };
  
  const keyDifferentiator = productDifferentiator || industryDifferentiators[normalizedIndustry] || industryDifferentiators['default'];
  
  // Generate the overall statement using the existing function
  const overallStatement = generateCustomerCentricValueProp(profile, product as any);
  
  // Generate a concise bottom-line summary
  const bottomLineTemplates: Record<string, string> = {
    'reliability': `Stop worrying about connectivity—AT&T keeps your ${stakeholder} operations running.`,
    'speed': `Move faster with the performance your ${stakeholder} operations demand.`,
    'security': `Protect what matters with security embedded in the network—not bolted on top.`,
    'cost-savings': `Get predictable costs without sacrificing performance or reliability.`,
    'scalability': `Grow confidently—your network scales with your business.`,
    'support': `Get the responsive, expert support your business deserves.`,
    'default': `AT&T delivers the connectivity your ${stakeholder} operations depend on.`
  };
  
  const bottomLine = bottomLineTemplates[primaryPriority] || bottomLineTemplates['default'];
  
  return {
    customerOutcome: ensureProperEnding(customerOutcome),
    riskMitigated: ensureProperEnding(riskMitigated),
    keyDifferentiator: ensureProperEnding(keyDifferentiator),
    bottomLine: ensureProperEnding(bottomLine),
    overallStatement
  };
}

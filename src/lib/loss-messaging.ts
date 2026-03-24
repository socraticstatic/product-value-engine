// Industry-specific "Price of Silence" loss narratives
// These messages help sales reps articulate the cost of inaction

export interface LossNarrative {
  industry: string;
  headline: string;
  hourlyImpact: string;
  dailyImpact: string;
  monthlyImpact: string;
  yearlyImpact: string;
  criticalMoments: string[];
  stakeholderPains: {
    role: string;
    pain: string;
  }[];
  competitorRisk: string;
  complianceRisk: string;
  reputationRisk: string;
}

export const lossNarratives: Record<string, LossNarrative> = {
  healthcare: {
    industry: 'Healthcare',
    headline: 'When connectivity fails, patient care suffers',
    hourlyImpact: 'A 1-hour outage can delay 12 patient appointments and trigger HIPAA notification requirements',
    dailyImpact: 'One day of degraded connectivity means delayed lab results, missed referrals, and billing backlogs',
    monthlyImpact: 'Network issues create audit flags, delayed reimbursements, and staff overtime',
    yearlyImpact: 'Annual network problems cost practices $748,200 in lost productivity and compliance risk',
    criticalMoments: [
      'During patient intake when EHR access is critical',
      'Lab result transmission delays affecting treatment decisions',
      'Telehealth appointments dropping mid-session',
      'Insurance verification failures at check-in',
      'HIPAA audit periods requiring full system access'
    ],
    stakeholderPains: [
      { role: 'Practice Manager', pain: 'Staff overtime and patient complaints about wait times' },
      { role: 'Physician', pain: 'Cannot access patient records or order labs efficiently' },
      { role: 'Billing Specialist', pain: 'Claims rejected due to connectivity issues during submission' },
      { role: 'IT Administrator', pain: 'Constant firefighting instead of strategic projects' }
    ],
    competitorRisk: 'Patients will switch to practices with reliable telehealth and quick check-in',
    complianceRisk: 'HIPAA violations average $1.5M per breach, with potential criminal liability',
    reputationRisk: 'Online reviews mentioning long waits and scheduling issues damage new patient acquisition'
  },
  retail: {
    industry: 'Retail',
    headline: 'Every minute of downtime is a customer walking out the door',
    hourlyImpact: 'A 1-hour POS outage costs $5,600 in lost sales during peak hours',
    dailyImpact: 'Full-day connectivity issues mean cash-only sales, inventory errors, and frustrated customers',
    monthlyImpact: 'Recurring network problems create inventory discrepancies and missed online order syncs',
    yearlyImpact: 'Annual connectivity issues cost retailers $532,000 in lost revenue and operational overhead',
    criticalMoments: [
      'Holiday shopping rush when every transaction counts',
      'Flash sale events with time-sensitive inventory',
      'End-of-day reconciliation and bank deposits',
      'Omnichannel order fulfillment (BOPIS)',
      'Real-time inventory sync across locations'
    ],
    stakeholderPains: [
      { role: 'Store Manager', pain: 'Staff manually processing transactions and customer complaints' },
      { role: 'Regional Director', pain: 'Inconsistent sales data making planning impossible' },
      { role: 'Loss Prevention', pain: 'Increased theft risk during POS outages' },
      { role: 'E-commerce Lead', pain: 'Online orders showing wrong inventory availability' }
    ],
    competitorRisk: 'Amazon and big-box competitors with seamless checkout capture frustrated customers',
    complianceRisk: 'PCI-DSS violations from workaround payment processing average $100K per incident',
    reputationRisk: 'Social media complaints about checkout issues spread quickly during peak seasons'
  },
  finance: {
    industry: 'Financial Services',
    headline: 'In finance, seconds of downtime translate to dollars lost and trust eroded',
    hourlyImpact: 'One hour of system unavailability costs $12,500 in transactions and customer trust',
    dailyImpact: 'A day without connectivity means missed trade windows, failed transfers, and regulatory flags',
    monthlyImpact: 'Recurring issues trigger compliance reviews and customer account closures',
    yearlyImpact: 'Annual connectivity problems cost financial firms $650,000 in lost business and compliance penalties',
    criticalMoments: [
      'Market opening and closing windows',
      'End-of-month and quarter close periods',
      'Wire transfer cutoff times',
      'Audit and examination periods',
      'Client onboarding and KYC verification'
    ],
    stakeholderPains: [
      { role: 'Branch Manager', pain: 'Customer complaints and manual transaction processing' },
      { role: 'Compliance Officer', pain: 'Audit findings and regulatory scrutiny' },
      { role: 'Financial Advisor', pain: 'Cannot execute time-sensitive client requests' },
      { role: 'Operations Manager', pain: 'Reconciliation nightmares and extended hours' }
    ],
    competitorRisk: 'High-net-worth clients will move to firms with better digital experience',
    complianceRisk: 'SOX and FINRA violations can result in $4.35M fines and license revocation',
    reputationRisk: 'Financial stability perception directly impacts client retention and referrals'
  },
  manufacturing: {
    industry: 'Manufacturing',
    headline: 'When the network stops, so does the production line',
    hourlyImpact: 'One hour of production downtime costs $9,800 in delayed output and labor',
    dailyImpact: 'A day of network issues means missed shipments, expedited freight costs, and overtime',
    monthlyImpact: 'Recurring connectivity problems create supply chain penalties and quality issues',
    yearlyImpact: 'Annual network downtime costs manufacturers $1,176,000 in lost production and penalties',
    criticalMoments: [
      'Just-in-time inventory replenishment windows',
      'Quality control data transmission for lot releases',
      'Customer order deadline crunches',
      'Machine calibration and firmware updates',
      'Shift handoff and production reporting'
    ],
    stakeholderPains: [
      { role: 'Plant Manager', pain: 'Production targets missed and overtime costs' },
      { role: 'Supply Chain Lead', pain: 'Cannot track inventory or coordinate with suppliers' },
      { role: 'Quality Manager', pain: 'Manual inspection records and delayed lot releases' },
      { role: 'Maintenance Director', pain: 'Preventive maintenance schedules disrupted' }
    ],
    competitorRisk: 'Customers will shift orders to manufacturers with better on-time delivery',
    complianceRisk: 'FDA and ISO quality documentation gaps can halt production',
    reputationRisk: 'Late deliveries damage long-term customer relationships and contract renewals'
  },
  hospitality: {
    industry: 'Hospitality',
    headline: 'Guest experience starts with seamless connectivity',
    hourlyImpact: 'One hour of system downtime means manual check-ins and guest complaints worth $4,200',
    dailyImpact: 'A day without reliable WiFi triggers negative reviews and comp requests',
    monthlyImpact: 'Ongoing connectivity issues drive down booking ratings and RevPAR',
    yearlyImpact: 'Annual network problems cost hospitality businesses $327,600 in lost bookings and comps',
    criticalMoments: [
      'Check-in and check-out rushes',
      'Conference and event WiFi demands',
      'Mobile key and room automation systems',
      'Restaurant POS during dining peaks',
      'Loyalty program and payment processing'
    ],
    stakeholderPains: [
      { role: 'General Manager', pain: 'Guest complaints and negative reviews' },
      { role: 'Front Desk Manager', pain: 'Manual processes and long lines' },
      { role: 'Event Coordinator', pain: 'Conference attendees unable to work or present' },
      { role: 'Revenue Manager', pain: 'Cannot update rates or manage OTA connections' }
    ],
    competitorRisk: 'Business travelers will book competitors with reliable connectivity',
    complianceRisk: 'PCI-DSS payment issues and guest data exposure risks',
    reputationRisk: 'TripAdvisor and Google reviews mentioning WiFi issues hurt future bookings'
  },
  professional_services: {
    industry: 'Professional Services',
    headline: 'Your billable hours depend on reliable connectivity',
    hourlyImpact: 'One hour of downtime costs $7,200 in lost billable time across the team',
    dailyImpact: 'A day without access means missed deadlines, client escalations, and write-offs',
    monthlyImpact: 'Recurring issues create utilization drops and staff frustration',
    yearlyImpact: 'Annual connectivity problems cost professional firms $468,000 in lost revenue',
    criticalMoments: [
      'Client presentation and pitch meetings',
      'Filing and submission deadlines',
      'Court proceedings and depositions',
      'Year-end close and audit periods',
      'Remote client site work'
    ],
    stakeholderPains: [
      { role: 'Managing Partner', pain: 'Client complaints and profitability concerns' },
      { role: 'Senior Associate', pain: 'Cannot access case files or research databases' },
      { role: 'Office Manager', pain: 'Staff productivity and morale issues' },
      { role: 'IT Director', pain: 'Constant vendor escalations and workarounds' }
    ],
    competitorRisk: 'Clients expect 24/7 availability and will switch firms for reliability',
    complianceRisk: 'Client confidentiality exposure during workaround solutions',
    reputationRisk: 'Missed deadlines and communication gaps damage client relationships'
  },
  construction: {
    industry: 'Construction',
    headline: 'Connected job sites build on time and on budget',
    hourlyImpact: 'One hour of connectivity loss costs $6,500 in coordination delays',
    dailyImpact: 'A day without site connectivity means missed deliveries and scheduling chaos',
    monthlyImpact: 'Ongoing issues create documentation gaps and change order disputes',
    yearlyImpact: 'Annual connectivity problems cost construction firms $598,000 in project delays',
    criticalMoments: [
      'Concrete pour windows with tight timing',
      'Inspection scheduling and documentation',
      'Material delivery coordination',
      'Subcontractor schedule changes',
      'Safety incident reporting requirements'
    ],
    stakeholderPains: [
      { role: 'Project Manager', pain: 'Cannot coordinate crews or track progress' },
      { role: 'Site Superintendent', pain: 'Manual documentation and communication gaps' },
      { role: 'Safety Officer', pain: 'Delayed incident reporting and compliance issues' },
      { role: 'Estimator', pain: 'Cannot access plans or submit RFIs' }
    ],
    competitorRisk: 'GCs prefer subs with reliable communication and documentation',
    complianceRisk: 'OSHA documentation requirements and permit delays',
    reputationRisk: 'Project delays damage reputation for future bids'
  },
  transportation: {
    industry: 'Transportation & Logistics',
    headline: 'Real-time visibility keeps goods moving and customers satisfied',
    hourlyImpact: 'One hour of system downtime costs $8,200 in delayed shipments',
    dailyImpact: 'A day without connectivity means lost packages, missed deliveries, and customer complaints',
    monthlyImpact: 'Recurring issues create inventory discrepancies and carrier relationship damage',
    yearlyImpact: 'Annual connectivity problems cost logistics firms $902,000 in penalties and lost business',
    criticalMoments: [
      'Last-mile delivery windows',
      'Customs clearance and documentation',
      'Fleet dispatch and routing',
      'Temperature-sensitive cargo monitoring',
      'Driver hours-of-service compliance'
    ],
    stakeholderPains: [
      { role: 'Operations Director', pain: 'Cannot track shipments or manage exceptions' },
      { role: 'Fleet Manager', pain: 'Blind to vehicle locations and driver status' },
      { role: 'Customer Service', pain: 'Cannot provide accurate ETAs to customers' },
      { role: 'Compliance Manager', pain: 'ELD and HOS documentation gaps' }
    ],
    competitorRisk: 'Shippers will move to carriers with better tracking and communication',
    complianceRisk: 'DOT violations and FMCSA compliance penalties',
    reputationRisk: 'Late deliveries and lack of visibility damage customer relationships'
  },
  education: {
    industry: 'Education',
    headline: 'Learning cannot wait for the network to come back',
    hourlyImpact: 'One hour of downtime disrupts learning for hundreds of students ($3,800 value)',
    dailyImpact: 'A day without connectivity means cancelled online classes and administrative chaos',
    monthlyImpact: 'Recurring issues create enrollment concerns and staff frustration',
    yearlyImpact: 'Annual connectivity problems cost educational institutions $273,600 in productivity',
    criticalMoments: [
      'Standardized testing windows',
      'Course registration and enrollment periods',
      'Remote learning class sessions',
      'Financial aid and payment deadlines',
      'Parent communication and portal access'
    ],
    stakeholderPains: [
      { role: 'Principal/Dean', pain: 'Parent complaints and learning disruptions' },
      { role: 'Teacher/Professor', pain: 'Cannot deliver lessons or grade assignments' },
      { role: 'Registrar', pain: 'Enrollment and records processing delayed' },
      { role: 'IT Director', pain: 'Overloaded with tickets and workarounds' }
    ],
    competitorRisk: 'Families will choose schools with better technology infrastructure',
    complianceRisk: 'FERPA violations and testing invalidations',
    reputationRisk: 'Social media complaints from parents damage enrollment'
  },
  government: {
    industry: 'Government',
    headline: 'Citizens depend on connected government services',
    hourlyImpact: 'One hour of downtime affects hundreds of citizen transactions ($5,500 cost)',
    dailyImpact: 'A day without connectivity creates permit backlogs and constituent complaints',
    monthlyImpact: 'Recurring issues delay projects and create budget concerns',
    yearlyImpact: 'Annual connectivity problems cost agencies $319,000 in productivity and citizen trust',
    criticalMoments: [
      'Permit and license processing deadlines',
      'Emergency dispatch and communication',
      'Tax and fee collection periods',
      'Public meeting and hearing broadcasts',
      'Inter-agency data sharing requirements'
    ],
    stakeholderPains: [
      { role: 'Department Head', pain: 'Citizen complaints and political pressure' },
      { role: 'Front Counter Staff', pain: 'Cannot process transactions or access records' },
      { role: 'City/County Manager', pain: 'Service delivery failures and budget impacts' },
      { role: 'Emergency Services', pain: 'Critical communication gaps' }
    ],
    competitorRisk: 'Citizens compare experiences with private sector digital services',
    complianceRisk: 'FISMA, FedRAMP, and CJIS compliance requirements',
    reputationRisk: 'Public trust erodes with service failures'
  },
  real_estate: {
    industry: 'Real Estate',
    headline: 'In real estate, responsiveness wins deals',
    hourlyImpact: 'One hour of downtime can cost a deal worth thousands ($4,800 average)',
    dailyImpact: 'A day without connectivity means missed showings and contract delays',
    monthlyImpact: 'Recurring issues create listing management problems and client frustration',
    yearlyImpact: 'Annual connectivity problems cost brokerages $345,600 in lost commissions',
    criticalMoments: [
      'Offer submission deadlines',
      'Virtual showing and tour scheduling',
      'Escrow and closing coordination',
      'MLS listing updates and new listings',
      'Client communication during negotiations'
    ],
    stakeholderPains: [
      { role: 'Broker/Owner', pain: 'Agent productivity and client complaints' },
      { role: 'Agent', pain: 'Cannot respond to leads or update listings' },
      { role: 'Transaction Coordinator', pain: 'Document delays and closing issues' },
      { role: 'Marketing Manager', pain: 'Cannot launch campaigns or update websites' }
    ],
    competitorRisk: 'Tech-savvy competitors with better tools capture market share',
    complianceRisk: 'Fair housing documentation and disclosure requirements',
    reputationRisk: 'Missed communications damage agent reputation and referrals'
  },
  other: {
    industry: 'Other Industries',
    headline: 'Your business runs on connectivity',
    hourlyImpact: 'Every hour of downtime costs $5,000 in lost productivity and revenue',
    dailyImpact: 'A day without reliable connectivity creates operational chaos',
    monthlyImpact: 'Recurring issues affect employee morale and customer relationships',
    yearlyImpact: 'Annual connectivity problems cost businesses $400,000 in hidden costs',
    criticalMoments: [
      'Customer-facing transactions and communications',
      'Internal coordination and collaboration',
      'Order processing and fulfillment',
      'Financial reporting and closing',
      'Remote work and collaboration'
    ],
    stakeholderPains: [
      { role: 'Business Owner', pain: 'Lost revenue and customer complaints' },
      { role: 'Operations Manager', pain: 'Cannot coordinate teams or processes' },
      { role: 'Sales Team', pain: 'Cannot access CRM or respond to customers' },
      { role: 'IT Staff', pain: 'Constant firefighting instead of improvements' }
    ],
    competitorRisk: 'Competitors with better infrastructure win business',
    complianceRisk: 'Industry-specific compliance requirements',
    reputationRisk: 'Customer experience issues damage brand reputation'
  }
};

// Get loss narrative for an industry
export function getLossNarrative(industryKey: string): LossNarrative {
  const normalizedKey = industryKey.toLowerCase().replace(/\s+/g, '_').replace(/-/g, '_');
  return lossNarratives[normalizedKey] || lossNarratives.other;
}

// Calculate cumulative loss over time
export interface CumulativeLoss {
  year: number;
  cumulativeLoss: number;
  yearlyLoss: number;
}

export function calculateCumulativeLoss(
  annualLoss: number,
  years: number = 5,
  growthRate: number = 0.05
): CumulativeLoss[] {
  const losses: CumulativeLoss[] = [];
  let cumulative = 0;
  let currentLoss = annualLoss;

  for (let year = 1; year <= years; year++) {
    cumulative += currentLoss;
    losses.push({
      year,
      cumulativeLoss: Math.round(cumulative),
      yearlyLoss: Math.round(currentLoss)
    });
    currentLoss *= (1 + growthRate); // Increase each year
  }

  return losses;
}

// Generate "what could you do with this savings" messaging
export function generateSavingsAlternatives(annualSavings: number): string[] {
  const alternatives: string[] = [];

  if (annualSavings >= 500000) {
    alternatives.push(`Hire ${Math.floor(annualSavings / 80000)} additional team members`);
    alternatives.push(`Open ${Math.floor(annualSavings / 150000)} new locations`);
    alternatives.push(`Fund a major technology modernization project`);
  } else if (annualSavings >= 100000) {
    alternatives.push(`Hire ${Math.floor(annualSavings / 60000)} additional team members`);
    alternatives.push(`Invest in marketing to grow your customer base by ${Math.floor(annualSavings / 10000)}%`);
    alternatives.push(`Upgrade equipment and technology across all locations`);
  } else if (annualSavings >= 50000) {
    alternatives.push(`Add ${Math.floor(annualSavings / 15000)} contractor resources for key projects`);
    alternatives.push(`Invest in employee training and development`);
    alternatives.push(`Upgrade critical business systems`);
  } else if (annualSavings >= 10000) {
    alternatives.push(`Fund a significant equipment upgrade`);
    alternatives.push(`Invest in marketing and customer acquisition`);
    alternatives.push(`Improve employee benefits and retention`);
  } else {
    alternatives.push(`Reinvest in business growth opportunities`);
    alternatives.push(`Build a technology improvement fund`);
    alternatives.push(`Reduce financial stress during slower periods`);
  }

  return alternatives;
}

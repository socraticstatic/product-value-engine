export interface CustomerUseCase {
  id: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  outcome: string;
  quote?: string;
  metrics?: string[];
}

export interface MessagingPillar {
  id: string;
  name: string;
  tagline: string;
  description: string;
  competitiveEdge: string;
  useCases: CustomerUseCase[];
}

export const messagingPillars: MessagingPillar[] = [
  {
    id: 'connectivity',
    name: 'Faster, more reliable internet in more places',
    tagline: 'Largest physical footprint in the U.S. by hundreds of square miles',
    description: 'Our 5G fixed wireless crushes T-Mobile\'s 150 Mbps FWA offer and is highly competitive with virtually every cable provider.',
    competitiveEdge: 'No one else can match our combined fiber + 5G FWA coverage. Period.',
    useCases: [
      {
        id: 'retail-chain',
        title: 'Retail Chain with 200 Stores',
        industry: 'Retail',
        challenge: 'A retail company with 200 stores was paying 6 different internet companies. Their cash registers kept going offline during busy times, and stores in small towns had terrible internet.',
        solution: 'AT&T put all 200 stores on one internet plan. Stores with access to our fiber lines got super-fast wired internet. Rural stores got our 5G wireless internet instead.',
        outcome: 'No more cash register outages for a full year. IT problems dropped by 40%. One simple bill instead of six.',
        quote: 'We went from juggling six companies to one partner who covers every store, even our locations in small towns.',
        metrics: ['200 stores on one plan', 'No outages in 12 months', '40% fewer tech problems']
      },
      {
        id: 'construction-company',
        title: 'Construction Company Job Sites',
        industry: 'Construction',
        challenge: 'A construction company needed internet at their temporary job sites for project software and security cameras. Getting cable internet installed took months.',
        solution: 'AT&T set up 5G wireless internet at each site. Fast speeds let them do video calls and run security cameras 24/7 without waiting for cable installation.',
        outcome: 'Sites had internet in 2 days instead of 2 months. Projects stayed on schedule.',
        quote: 'We used to lose weeks waiting for cable. Now we are connected before the foundation is poured.',
        metrics: ['Internet in 2 days', 'Fast enough for video calls', '12 job sites connected']
      },
      {
        id: 'healthcare-clinics',
        title: 'Rural Health Clinics',
        industry: 'Healthcare',
        challenge: 'A hospital system wanted to open 15 clinics in rural areas. Cable companies said it would take 6 months, or they could not serve those areas at all.',
        solution: 'AT&T 5G wireless internet got all 15 clinics online fast with speeds better than cable. Secure enough for patient records.',
        outcome: 'All 15 clinics opened in 3 months, bringing healthcare to 50,000 people in rural areas.',
        quote: 'T-Mobile offered us slow speeds. AT&T gave us faster internet that actually works for video doctor visits.',
        metrics: ['15 clinics in 3 months', 'Faster than cable', '50,000 new patients served']
      },
      {
        id: 'logistics-warehouse',
        title: 'Warehouse with Robots',
        industry: 'Logistics',
        challenge: 'A shipping company opened a huge warehouse with 200 robots that move packages. They needed internet fast enough to keep all the robots running smoothly.',
        outcome: 'The warehouse now ships 40% more packages every day with zero robot problems caused by internet issues.',
        solution: 'AT&T installed super-fast fiber internet plus wireless coverage throughout the building so the robots never lose connection.',
        quote: 'Our robots cannot wait for slow internet. AT&T keeps 200 robots moving without any hiccups.',
        metrics: ['Super-fast internet', '200 robots connected', '40% more packages shipped']
      }
    ]
  },
  {
    id: 'ai-cloud',
    name: 'AI access from anywhere to the cloud',
    tagline: 'Others sell you internet. AT&T delivers the on-ramp that makes your AI actually work.',
    description: 'Competitors like Zayo, Lumen, or Cogent are strong in the middle mile, but they stop at the building or the data-center wall. T-Mobile and Verizon have the last mile, but they don\'t have the fiber depth or the hyperscaler on-ramps we do. Cable companies have neither.',
    competitiveEdge: 'From anywhere to the cloud, at scale, with autonomy built in.',
    useCases: [
      {
        id: 'manufacturing-ai',
        title: 'Factory Using AI to Check Product Quality',
        industry: 'Manufacturing',
        challenge: 'A car parts factory wanted to use smart cameras to spot defects on their assembly line. Their current internet was too slow — by the time the computer analyzed a part, it had already moved down the line.',
        solution: 'AT&T fiber gave them a direct fast lane to the cloud where the AI runs. Response time went from "too slow" to instant.',
        outcome: 'Now they catch 94% of defective parts before shipping. Saved $2.3 million in the first year from fewer product recalls.',
        quote: 'Other companies got us part of the way there. AT&T got us all the way to where our AI actually works.',
        metrics: ['Instant response time', '94% of defects caught', '$2.3M saved in year one']
      },
      {
        id: 'financial-services-ml',
        title: 'Bank Stopping Fraud in Real Time',
        industry: 'Financial Services',
        challenge: 'A bank needed to check every credit card transaction for fraud instantly. Their internet was not fast enough to analyze purchases before customers got frustrated waiting.',
        solution: 'AT&T connected them directly to their cloud computers with no middlemen or slowdowns. Every transaction now gets checked in a split second.',
        outcome: 'They now check 15,000 transactions per second. False alarms dropped by 60%, so fewer legitimate purchases get blocked.',
        quote: 'Other providers got us partway there but could not promise what happens after their network ends. AT&T owns the whole path.',
        metrics: ['15,000 checks per second', 'Split-second response', '60% fewer false alarms']
      },
      {
        id: 'media-generative-ai',
        title: 'Marketing Agency Using AI for Videos',
        industry: 'Media & Entertainment',
        challenge: 'A marketing agency started using AI to create videos, but uploading files to the cloud took hours. Their cable internet uploaded at a crawl, creating a huge bottleneck.',
        solution: 'AT&T fiber uploads just as fast as it downloads. Files that took hours now take minutes. Direct connection to Google Cloud speeds up the AI processing.',
        outcome: 'Projects that took 5 days now take 8 hours. The agency doubled the number of clients they can handle.',
        quote: 'Cable gave us slow uploads. We were literally watching progress bars all day. AT&T fiber changed everything.',
        metrics: ['Fast uploads', '5 days down to 8 hours', 'Doubled client capacity']
      },
      {
        id: 'agriculture-iot',
        title: 'Smart Farming Across 50,000 Acres',
        industry: 'Agriculture',
        challenge: 'A group of farmers wanted to use AI to manage watering and predict crop yields across 50,000 acres. Rural areas had no cable internet, and satellite was too slow.',
        solution: 'AT&T 5G wireless connected sensors in the fields to cloud AI. Reliable signal even in remote farm areas.',
        outcome: 'Water usage dropped 30% while crops grew 12% better. The AI processes over 1 million sensor readings daily.',
        quote: 'Verizon does not have towers where our fields are. T-Mobile was not fast enough. AT&T delivered both coverage and speed.',
        metrics: ['50,000 acres connected', '30% less water used', '12% better crop yields']
      }
    ]
  },
  {
    id: 'security',
    name: 'Security embedded in the network, not on top of it',
    tagline: 'You literally cannot secure a network you don\'t own.',
    description: 'Competitors push over-the-top solutions like Zscaler or Palo Alto. We secure what we control — the entire converged footprint.',
    competitiveEdge: 'Security isn\'t an add-on. It\'s built into every layer of infrastructure we own and operate.',
    useCases: [
      {
        id: 'law-firm-security',
        title: 'Law Firm Protecting Client Secrets',
        industry: 'Legal Services',
        challenge: 'A large law firm with 500 lawyers was worried about hackers stealing confidential client information. Their previous security system sent all their data through a third-party company for inspection, which felt risky.',
        solution: 'AT&T built security directly into the network. Client data never leaves AT&T-protected systems, so there is no chance of exposure to outside companies.',
        outcome: 'Blocked 340,000 hacking attempts in the first year with zero data breaches. Everything runs faster too.',
        quote: 'Other companies wanted to inspect our traffic in their cloud. Why would I send private client data outside AT&T network?',
        metrics: ['340,000 threats blocked', 'Zero data breaches', 'Faster performance']
      },
      {
        id: 'hospital-ransomware',
        title: 'Hospital Stopping Ransomware Attacks',
        industry: 'Healthcare',
        challenge: 'After hearing about a nearby hospital paying $15 million to hackers, a health system needed to protect 12 hospitals and 40,000 medical devices. The problem: you cannot install security software on old medical equipment.',
        solution: 'AT&T protects devices at the network level instead of on each device. If something gets infected, it gets isolated immediately before spreading — no software installation needed.',
        outcome: 'Stopped 3 ransomware attacks in 6 months. All medical devices are protected, even the old ones that cannot run modern software.',
        quote: 'Our MRI machines run old software. We cannot install security apps on them. AT&T protects them through the network itself.',
        metrics: ['40,000 devices protected', '3 attacks stopped', '12 hospitals secured']
      },
      {
        id: 'government-contractor',
        title: 'Defense Company Passing Security Audits',
        industry: 'Government/Defense',
        challenge: 'A company working on military contracts needed to pass strict government security checks. Using multiple internet and security vendors created gaps that auditors would flag.',
        solution: 'AT&T handles everything end-to-end — no handoffs between different companies means no security gaps for auditors to question.',
        outcome: 'Passed the security certification in 4 months instead of the usual 12 months. Won a $45 million contract because of their strong security.',
        quote: 'The auditor asked who secures our network handoffs. I said there are none — AT&T owns it end to end. Audit passed.',
        metrics: ['Certified in 4 months', '$45M contract won', 'No security gaps']
      },
      {
        id: 'financial-ddos',
        title: 'Trading Platform Stopping Cyber Attacks',
        industry: 'Financial Services',
        challenge: 'A stock trading website was getting attacked by hackers every month trying to knock them offline. Their cloud security company could not stop attacks fast enough — damage was done before protection kicked in.',
        solution: 'AT&T stops attacks at the edge of the network before they ever reach the customer. Threats are blocked at the source, not after they arrive.',
        outcome: 'Zero successful attacks in 18 months. The platform stayed online through 47 attack attempts with 99.999% uptime.',
        quote: 'Other security companies try to clean up attacks after they hit you. AT&T stops them before they reach our door.',
        metrics: ['47 attacks blocked', '99.999% uptime', '18 months attack-free']
      }
    ]
  }
];

// Import Business Grade pillars for unified messaging
import { businessGradeCore, businessGradePillars } from './businessGradePillars';

export const coreMessage = {
  statement: businessGradeCore.statement,
  tagline: businessGradeCore.tagline,
  pillars: messagingPillars.map(p => ({ id: p.id, name: p.name, tagline: p.tagline })),
  businessGradePillars: businessGradePillars.map(p => ({ 
    id: p.id, 
    name: p.name, 
    customerVoice: p.customerVoice 
  }))
};

export function getUseCasesByPillar(pillarId: string): CustomerUseCase[] {
  const pillar = messagingPillars.find(p => p.id === pillarId);
  return pillar?.useCases || [];
}

export function getUseCasesByIndustry(industry: string): CustomerUseCase[] {
  return messagingPillars.flatMap(p => 
    p.useCases.filter(uc => uc.industry.toLowerCase() === industry.toLowerCase())
  );
}

export function getAllIndustries(): string[] {
  const industries = new Set<string>();
  messagingPillars.forEach(p => p.useCases.forEach(uc => industries.add(uc.industry)));
  return Array.from(industries).sort();
}

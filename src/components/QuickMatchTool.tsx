import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  ChevronRight, 
  ChevronLeft,
  Building2,
  Users,
  Brain,
  Target,
  DollarSign,
  ShoppingCart,
  CheckCircle2,
  Lightbulb,
  Play,
  User,
  ArrowRight
} from 'lucide-react';
import { customerPersonas, groupingMetadata, type CustomerPersona } from '@/data/personas';

interface QuickMatchToolProps {
  onSelectPersona: (persona: CustomerPersona) => void;
  onPracticePitch: (persona: CustomerPersona) => void;
  onClose: () => void;
}

interface ProspectAnswers {
  companySize: string;
  industry: string;
  techLevel: string;
  primaryNeed: string;
  decisionStyle: string;
  budgetIndicator: string;
}

const questions = [
  {
    id: 'companySize',
    title: 'Company Size',
    subtitle: 'How many employees does the prospect have?',
    icon: Building2,
    options: [
      { value: 'micro', label: '1-15 employees', description: 'Home-based or micro business' },
      { value: 'small', label: '15-100 employees', description: 'Small business, 1-2 locations' },
      { value: 'medium', label: '100-500 employees', description: 'Mid-market, multiple locations' },
      { value: 'large', label: '500+ employees', description: 'Large enterprise, many sites' },
    ]
  },
  {
    id: 'industry',
    title: 'Industry',
    subtitle: 'What industry is the prospect in?',
    icon: Users,
    options: [
      { value: 'professional', label: 'Professional Services', description: 'Legal, consulting, finance' },
      { value: 'healthcare', label: 'Healthcare', description: 'Medical, senior care, clinics' },
      { value: 'retail', label: 'Retail / Hospitality', description: 'Stores, restaurants, e-commerce' },
      { value: 'manufacturing', label: 'Manufacturing / Industrial', description: 'Production, logistics, construction' },
      { value: 'technology', label: 'Technology / Digital', description: 'Tech services, SaaS, digital-first' },
      { value: 'other', label: 'Other Services', description: 'Auto, wellness, personal services' },
    ]
  },
  {
    id: 'techLevel',
    title: 'Tech Sophistication',
    subtitle: 'How tech-savvy is the prospect?',
    icon: Brain,
    options: [
      { value: 'low', label: 'Low', description: 'Prefers simple solutions, avoids complexity' },
      { value: 'medium', label: 'Medium', description: 'Comfortable with tech, needs some guidance' },
      { value: 'high', label: 'High', description: 'Tech-forward, evaluates advanced solutions' },
    ]
  },
  {
    id: 'primaryNeed',
    title: 'Primary Need',
    subtitle: 'What is the prospect most concerned about?',
    icon: Target,
    options: [
      { value: 'connectivity', label: 'Reliable Connectivity', description: 'Uptime, speed, coverage' },
      { value: 'security', label: 'Security & Compliance', description: 'Data protection, regulations' },
      { value: 'mobility', label: 'Mobility & Remote Work', description: 'Wireless, remote access' },
      { value: 'integration', label: 'Integration & Simplification', description: 'Unified solutions, consolidation' },
      { value: 'innovation', label: 'Innovation & Growth', description: 'New tech, competitive edge' },
    ]
  },
  {
    id: 'decisionStyle',
    title: 'Decision Style',
    subtitle: 'How do they typically make buying decisions?',
    icon: ShoppingCart,
    options: [
      { value: 'owner-operator', label: 'Owner/Operator', description: 'Single decision maker, fast process' },
      { value: 'it-led', label: 'IT-Led', description: 'Technical team drives evaluation' },
      { value: 'committee', label: 'Committee / RFP', description: 'Multiple stakeholders, formal process' },
      { value: 'c-suite', label: 'Executive-Led', description: 'C-level makes final decision' },
    ]
  },
  {
    id: 'budgetIndicator',
    title: 'Budget Indicator',
    subtitle: 'What signals have you seen about their budget?',
    icon: DollarSign,
    options: [
      { value: 'price-sensitive', label: 'Price-Sensitive', description: 'Looking for the best deal' },
      { value: 'value-focused', label: 'Value-Focused', description: 'Willing to pay for quality' },
      { value: 'enterprise', label: 'Enterprise Budget', description: 'Cost is secondary to capabilities' },
    ]
  },
];

function calculateMatch(persona: CustomerPersona, answers: ProspectAnswers): number {
  let score = 0;
  let maxScore = 0;
  
  // Company size matching (weight: 25)
  maxScore += 25;
  const sizeMap: Record<string, string[]> = {
    'micro': ['1-5', '5-15'],
    'small': ['15-40', '25-75', '50-100'],
    'medium': ['100-250', '200-400'],
    'large': ['500-1500'],
  };
  if (sizeMap[answers.companySize]?.some(s => persona.employeeCount.includes(s.split('-')[0]))) {
    score += 25;
  } else if (
    (answers.companySize === 'micro' && parseInt(persona.employeeCount) < 20) ||
    (answers.companySize === 'small' && parseInt(persona.employeeCount) >= 15 && parseInt(persona.employeeCount) <= 100) ||
    (answers.companySize === 'medium' && parseInt(persona.employeeCount) >= 100 && parseInt(persona.employeeCount) <= 500) ||
    (answers.companySize === 'large' && parseInt(persona.employeeCount) >= 500)
  ) {
    score += 20;
  }
  
  // Tech level matching (weight: 20)
  maxScore += 20;
  if (persona.techSophistication === answers.techLevel) {
    score += 20;
  } else if (
    (persona.techSophistication === 'medium' && answers.techLevel !== 'medium') ||
    (answers.techLevel === 'medium' && persona.techSophistication !== 'medium')
  ) {
    score += 10; // partial match for adjacent levels
  }
  
  // Primary need matching (weight: 20)
  maxScore += 20;
  if (persona.primaryNeed === answers.primaryNeed) {
    score += 20;
  } else {
    // Check if the need appears in top needs
    const needsMap: Record<string, string[]> = {
      'connectivity': ['Coverage/Reliability', 'Price'],
      'security': ['Network Security', 'Compliance'],
      'mobility': ['Mobility', 'Remote', 'Wireless'],
      'integration': ['Integrated Solutions', 'Consolidation'],
      'innovation': ['Innovation', 'Growth'],
    };
    const relevantNeeds = needsMap[answers.primaryNeed] || [];
    if (persona.topNeeds.some(n => relevantNeeds.some(r => n.need.includes(r)))) {
      score += 12;
    }
  }
  
  // Decision style matching (weight: 15)
  maxScore += 15;
  if (persona.decisionStyle === answers.decisionStyle) {
    score += 15;
  } else if (
    (persona.decisionStyle === 'committee' && answers.decisionStyle === 'rfp-driven') ||
    (persona.decisionStyle === 'c-suite' && answers.decisionStyle === 'it-led')
  ) {
    score += 8; // partial match
  }
  
  // Budget indicator matching (weight: 15)
  maxScore += 15;
  const budgetMap: Record<string, string[]> = {
    'price-sensitive': ['bronze', 'silver'],
    'value-focused': ['silver', 'gold'],
    'enterprise': ['gold', 'platinum'],
  };
  if (budgetMap[answers.budgetIndicator]?.includes(persona.valueTier)) {
    score += 15;
  }
  
  // Industry matching (weight: 5 - bonus)
  maxScore += 5;
  const industryMap: Record<string, string[]> = {
    'professional': ['Legal Services', 'Financial', 'Consulting'],
    'healthcare': ['Healthcare', 'Medical', 'Senior Care'],
    'retail': ['Retail', 'E-Commerce', 'Food & Beverage', 'Hospitality'],
    'manufacturing': ['Manufacturing', 'Construction', 'Industrial', 'Logistics'],
    'technology': ['Technology Services', 'Software', 'Digital'],
    'other': ['Health & Wellness', 'Automotive Services', 'Personal Services'],
  };
  if (industryMap[answers.industry]?.some(i => persona.industry.includes(i) || i.includes(persona.industry))) {
    score += 5;
  }
  
  return Math.round((score / maxScore) * 100);
}

function getMatchedPersonas(answers: ProspectAnswers): { persona: CustomerPersona; score: number }[] {
  const matches = customerPersonas.map(persona => ({
    persona,
    score: calculateMatch(persona, answers),
  }));
  
  return matches.sort((a, b) => b.score - a.score);
}

export function QuickMatchTool({ onSelectPersona, onPracticePitch, onClose }: QuickMatchToolProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<ProspectAnswers>({
    companySize: '',
    industry: '',
    techLevel: '',
    primaryNeed: '',
    decisionStyle: '',
    budgetIndicator: '',
  });
  const [showResults, setShowResults] = useState(false);
  
  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const allAnswered = Object.values(answers).every(a => a !== '');
  
  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };
  
  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (allAnswered) {
      setShowResults(true);
    }
  };
  
  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({
      companySize: '',
      industry: '',
      techLevel: '',
      primaryNeed: '',
      decisionStyle: '',
      budgetIndicator: '',
    });
    setShowResults(false);
  };
  
  const matchedPersonas = showResults ? getMatchedPersonas(answers) : [];
  const topMatch = matchedPersonas[0];
  const runnerUps = matchedPersonas.slice(1, 4);
  
  if (showResults && topMatch) {
    const metadata = groupingMetadata;
    
    return (
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Zap className="w-5 h-5 text-primary" />
              Match Results
            </CardTitle>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={handleReset}>
                Start Over
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={onClose}>
                ✕
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Top Match */}
          <div className="bg-primary/10 rounded-xl p-6 border-2 border-primary/30">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="font-semibold text-primary">Best Match</span>
              <Badge className="bg-primary text-primary-foreground ml-auto">
                {topMatch.score}% Match
              </Badge>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="text-5xl">{topMatch.persona.avatar}</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground">{topMatch.persona.name}</h3>
                <p className="text-muted-foreground">{topMatch.persona.title}</p>
                <p className="text-sm text-primary">{topMatch.persona.company}</p>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline" className={metadata.valueTier.options[topMatch.persona.valueTier].color}>
                    💎 {metadata.valueTier.options[topMatch.persona.valueTier].label}
                  </Badge>
                  <Badge variant="outline" className={metadata.primaryNeed.options[topMatch.persona.primaryNeed].color}>
                    🎯 {metadata.primaryNeed.options[topMatch.persona.primaryNeed].label}
                  </Badge>
                  <Badge variant="outline" className={metadata.buyingBehavior.options[topMatch.persona.buyingBehavior].color}>
                    🛒 {metadata.buyingBehavior.options[topMatch.persona.buyingBehavior].label}
                  </Badge>
                </div>
              </div>
            </div>
            
            {/* Tailored Recommendations */}
            <div className="mt-6 space-y-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Tailored Recommendations for This Prospect
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card rounded-lg p-4 border border-border">
                  <h5 className="text-sm font-medium text-emerald-400 mb-2">Lead Products</h5>
                  <div className="flex flex-wrap gap-1">
                    {topMatch.persona.leadProducts.slice(0, 4).map((prod, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                        {prod}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="bg-card rounded-lg p-4 border border-border">
                  <h5 className="text-sm font-medium text-amber-400 mb-2">Expected Value</h5>
                  <p className="text-lg font-bold text-foreground">{topMatch.persona.estimatedAnnualValue}</p>
                  <p className="text-xs text-muted-foreground">Annual opportunity</p>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-4 border border-border">
                <h5 className="text-sm font-medium text-blue-400 mb-2">Sales Approach</h5>
                <p className="text-sm text-foreground">{topMatch.persona.salesApproach}</p>
              </div>
              
              <div className="bg-card rounded-lg p-4 border border-border">
                <h5 className="text-sm font-medium text-purple-400 mb-2">Key Talking Points</h5>
                <ul className="space-y-2">
                  {topMatch.persona.keyTalkingPoints.slice(0, 3).map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
                <h5 className="text-sm font-medium text-amber-400 mb-2">Based on Their {metadata.buyingBehavior.label}</h5>
                <p className="text-sm text-foreground">
                  {metadata.buyingBehavior.salesTips[topMatch.persona.buyingBehavior]}
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button 
                type="button"
                onClick={() => onSelectPersona(topMatch.persona)}
                className="flex-1 gap-2"
              >
                <User className="w-4 h-4" />
                View Full Profile
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={() => onPracticePitch(topMatch.persona)}
                className="flex-1 gap-2"
              >
                <Play className="w-4 h-4" />
                Practice Pitch
              </Button>
            </div>
          </div>
          
          {/* Runner Ups */}
          {runnerUps.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Other Possible Matches</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {runnerUps.map(({ persona, score }) => (
                  <button
                    key={persona.id}
                    onClick={() => onSelectPersona(persona)}
                    className="text-left p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{persona.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-foreground text-sm">{persona.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {score}%
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{persona.title}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
  
  const Icon = currentQuestion.icon;
  const selectedAnswer = answers[currentQuestion.id as keyof ProspectAnswers];
  
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Zap className="w-5 h-5 text-primary" />
            Quick Match
          </CardTitle>
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Question {currentStep + 1} of {questions.length}</span>
            <span className="text-primary">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">{currentQuestion.title}</h3>
          <p className="text-muted-foreground">{currentQuestion.subtitle}</p>
        </div>
        
        <div className="grid gap-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAnswer === option.value
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-muted/50 hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{option.label}</p>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
                {selectedAnswer === option.value && (
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                )}
              </div>
            </button>
          ))}
        </div>
        
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          
          <Button
            type="button"
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="gap-2"
          >
            {currentStep === questions.length - 1 ? 'See Results' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

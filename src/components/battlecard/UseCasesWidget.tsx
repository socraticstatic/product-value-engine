import { useState } from 'react';
import { BattlecardWidget } from './BattlecardWidget';
import { Briefcase, Building2, Quote, TrendingUp, ChevronDown, ChevronUp, Target } from 'lucide-react';
import { messagingPillars, CustomerUseCase, MessagingPillar } from '@/data/messagingPillars';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { DemoBlur } from '@/components/ui/DemoBlur';

interface UseCasesWidgetProps {
  customerIndustry?: string;
}

function UseCaseCard({ useCase }: { useCase: CustomerUseCase }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <CollapsibleTrigger asChild>
          <Button 
            type="button"
            variant="ghost" 
            className="w-full p-4 h-auto flex items-start justify-between text-left hover:bg-secondary/50"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="w-4 h-4 text-primary" />
                <Badge variant="outline" className="text-xs">{useCase.industry}</Badge>
              </div>
              <h4 className="font-semibold text-foreground">{useCase.title}</h4>
            </div>
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="px-4 pb-4 space-y-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Challenge</p>
              <p className="text-sm text-foreground"><DemoBlur>{useCase.challenge}</DemoBlur></p>
            </div>
            
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase mb-1">AT&T Solution</p>
              <p className="text-sm text-foreground"><DemoBlur>{useCase.solution}</DemoBlur></p>
            </div>
            
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Outcome</p>
              <p className="text-sm text-foreground"><DemoBlur>{useCase.outcome}</DemoBlur></p>
            </div>

            {useCase.metrics && (
              <div className="flex flex-wrap gap-2">
                {useCase.metrics.map((metric, idx) => (
                  <Badge key={idx} className="bg-primary/10 text-primary border-primary/20">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    <DemoBlur>{metric}</DemoBlur>
                  </Badge>
                ))}
              </div>
            )}

            {useCase.quote && (
              <div className="bg-secondary/50 rounded-lg p-3 border-l-4 border-primary">
                <div className="flex gap-2">
                  <Quote className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm italic text-foreground">"<DemoBlur>{useCase.quote}</DemoBlur>"</p>
                </div>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

function PillarSection({ pillar }: { pillar: MessagingPillar }) {
  return (
    <div className="space-y-4">
      <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium text-foreground"><DemoBlur>{pillar.tagline}</DemoBlur></p>
            <p className="text-sm text-muted-foreground mt-1"><DemoBlur>{pillar.competitiveEdge}</DemoBlur></p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {pillar.useCases.map(useCase => (
          <UseCaseCard key={useCase.id} useCase={useCase} />
        ))}
      </div>
    </div>
  );
}

export function UseCasesWidget({ customerIndustry }: UseCasesWidgetProps) {
  const [activeTab, setActiveTab] = useState(messagingPillars[0].id);

  // Get relevant use cases if industry is specified
  const getRelevantUseCases = () => {
    if (!customerIndustry) return null;
    
    const relevant: { pillar: MessagingPillar; useCases: CustomerUseCase[] }[] = [];
    
    messagingPillars.forEach(pillar => {
      const matches = pillar.useCases.filter(
        uc => uc.industry.toLowerCase() === customerIndustry.toLowerCase()
      );
      if (matches.length > 0) {
        relevant.push({ pillar, useCases: matches });
      }
    });
    
    return relevant.length > 0 ? relevant : null;
  };

  const relevantUseCases = getRelevantUseCases();

  return (
    <BattlecardWidget title="Customer Use Cases by Messaging Pillar" icon={Briefcase} iconColor="text-primary">
      {relevantUseCases && (
        <div className="mb-4 p-3 bg-success/10 rounded-lg border border-success/20">
          <p className="text-sm font-medium text-success">
            {relevantUseCases.reduce((acc, r) => acc + r.useCases.length, 0)} use case(s) match customer industry: {customerIndustry}
          </p>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3 mb-4">
          <TabsTrigger value="connectivity" className="text-xs px-2">
            Connectivity
          </TabsTrigger>
          <TabsTrigger value="ai-cloud" className="text-xs px-2">
            AI & Cloud
          </TabsTrigger>
          <TabsTrigger value="security" className="text-xs px-2">
            Security
          </TabsTrigger>
        </TabsList>

        {messagingPillars.map(pillar => (
          <TabsContent key={pillar.id} value={pillar.id} className="mt-0">
            <PillarSection pillar={pillar} />
          </TabsContent>
        ))}
      </Tabs>
    </BattlecardWidget>
  );
}

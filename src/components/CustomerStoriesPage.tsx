import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Quote, TrendingUp, Wifi, Cloud, Shield } from 'lucide-react';
import { messagingPillars, getAllIndustries, CustomerUseCase } from '@/data/messagingPillars';

const pillarIcons: Record<string, React.ReactNode> = {
  connectivity: <Wifi className="w-5 h-5" />,
  'ai-cloud': <Cloud className="w-5 h-5" />,
  security: <Shield className="w-5 h-5" />,
};

interface UseCaseCardProps {
  useCase: CustomerUseCase;
  isHighlighted?: boolean;
}

function UseCaseCard({ useCase, isHighlighted }: UseCaseCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className={`transition-all ${isHighlighted ? 'ring-2 ring-primary shadow-lg' : ''}`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {useCase.industry}
                  </Badge>
                  {isHighlighted && (
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      Matches Profile
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg font-semibold">{useCase.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {useCase.challenge}
                </p>
              </div>
              <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">Challenge</h4>
              <p className="text-sm text-muted-foreground">{useCase.challenge}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">Solution</h4>
              <p className="text-sm text-muted-foreground">{useCase.solution}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">Outcome</h4>
              <p className="text-sm text-muted-foreground">{useCase.outcome}</p>
            </div>
            {useCase.metrics && useCase.metrics.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> Key Metrics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {useCase.metrics.map((metric, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {metric}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {useCase.quote && (
              <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
                <Quote className="w-4 h-4 text-primary mb-2" />
                <p className="text-sm italic text-foreground">"{useCase.quote}"</p>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

export function CustomerStoriesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const industries = getAllIndustries();

  const filterUseCases = (useCases: CustomerUseCase[]) => {
    if (selectedIndustry === 'all') return useCases;
    return useCases.filter(uc => uc.industry.toLowerCase() === selectedIndustry.toLowerCase());
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-foreground mb-2">
          Customer Use Cases
        </h2>
        <p className="text-lg text-primary font-medium mb-2">
          AT&T is "THE" Provider of Business-Grade Solutions
        </p>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse real customer use cases organized by our core messaging pillars
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="w-64">
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry.toLowerCase()}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="connectivity" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          {messagingPillars.map((pillar) => (
            <TabsTrigger key={pillar.id} value={pillar.id} className="flex items-center gap-2">
              {pillarIcons[pillar.id]}
              <span className="hidden sm:inline">{pillar.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {messagingPillars.map((pillar) => {
          const filteredUseCases = filterUseCases(pillar.useCases);
          
          return (
            <TabsContent key={pillar.id} value={pillar.id} className="space-y-6">
              <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/20 text-primary">
                      {pillarIcons[pillar.id]}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{pillar.tagline}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{pillar.description}</p>
                      <p className="text-sm text-primary font-medium mt-2">
                        Competitive Edge: {pillar.competitiveEdge}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {filteredUseCases.length > 0 ? (
                <div className="grid gap-4">
                  {filteredUseCases.map((useCase, idx) => (
                    <UseCaseCard key={idx} useCase={useCase} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No use cases found for {selectedIndustry}. Try selecting a different industry.
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}

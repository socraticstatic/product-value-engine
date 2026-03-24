import { PersonaFitScore, getFitLevel } from '@/utils/personaFitScoring';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CheckCircle2, AlertCircle, XCircle, ChevronRight, Users } from 'lucide-react';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { DemoBlur } from '@/components/ui/DemoBlur';
import { cn } from '@/lib/utils';

interface PersonaFitGridProps {
  fitScores: PersonaFitScore[];
  onPersonaSelect?: (persona: PersonaFitScore) => void;
}

const fitLevelConfig = {
  strong: {
    label: 'Strong Fit',
    color: 'bg-success/10 text-success border-success/30',
    icon: CheckCircle2,
    iconColor: 'text-success',
  },
  moderate: {
    label: 'Moderate Fit',
    color: 'bg-warning/10 text-warning border-warning/30',
    icon: AlertCircle,
    iconColor: 'text-warning',
  },
  weak: {
    label: 'Weak Fit',
    color: 'bg-destructive/10 text-destructive border-destructive/30',
    icon: XCircle,
    iconColor: 'text-destructive',
  },
};

export function PersonaFitGrid({ fitScores, onPersonaSelect }: PersonaFitGridProps) {
  const { isDemoMode } = useDemoMode();
  
  // Sort by score descending
  const sortedScores = [...fitScores].sort((a, b) => b.overallScore - a.overallScore);

  // Remove demo mode early return - render real UI with blur applied

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {sortedScores.map((fit) => {
        const level = getFitLevel(fit.overallScore);
        const config = fitLevelConfig[level];
        const Icon = config.icon;

        return (
          <Dialog key={fit.persona.id}>
            <DialogTrigger asChild>
              <Card 
                className="cursor-pointer hover:shadow-md transition-all group"
                onClick={() => onPersonaSelect?.(fit)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{fit.persona.avatar}</span>
                      <div>
                        <CardTitle className="text-sm group-hover:text-primary transition-colors">
                          {fit.persona.name}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground truncate max-w-[120px]">
                          {fit.persona.title}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={`text-xs ${config.color}`}>
                      <Icon className={`w-3 h-3 mr-1 ${config.iconColor}`} />
                      {config.label}
                    </Badge>
                    <span className="text-lg font-bold">{fit.overallScore}%</span>
                  </div>
                  <Progress value={fit.overallScore} className="h-2" />
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    <DemoBlur>{fit.reasoning[0]}</DemoBlur>
                  </p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span className="text-2xl">{fit.persona.avatar}</span>
                  {fit.persona.name} - Fit Analysis
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={`${config.color}`}>
                    <Icon className={`w-3 h-3 mr-1 ${config.iconColor}`} />
                    {config.label}
                  </Badge>
                  <span className="text-2xl font-bold">{fit.overallScore}%</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="text-xs text-muted-foreground mb-1">Needs Alignment</div>
                    <div className="flex items-center gap-2">
                      <Progress value={fit.needsAlignment} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{fit.needsAlignment}%</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="text-xs text-muted-foreground mb-1">Pain Point Match</div>
                    <div className="flex items-center gap-2">
                      <Progress value={fit.painPointMatch} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{fit.painPointMatch}%</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="text-xs text-muted-foreground mb-1">Product Affinity</div>
                    <div className="flex items-center gap-2">
                      <Progress value={fit.productAffinityMatch} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{fit.productAffinityMatch}%</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="text-xs text-muted-foreground mb-1">Budget Fit</div>
                    <div className="flex items-center gap-2">
                      <Progress value={fit.budgetFit} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{fit.budgetFit}%</span>
                    </div>
                  </div>
                </div>

                {fit.matchedNeeds.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Matched Needs</h4>
                    <div className="flex flex-wrap gap-1">
                      {fit.matchedNeeds.map((need, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-success/5 text-success border-success/20">
                          {need}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {fit.addressedPainPoints.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Addressed Pain Points</h4>
                    <div className="flex flex-wrap gap-1">
                      {fit.addressedPainPoints.map((point, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
                          {point}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium mb-2">Reasoning</h4>
                  <ul className="space-y-1">
                    {fit.reasoning.map((reason, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <DemoBlur>{reason}</DemoBlur>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Industry:</span>
                      <span className="ml-2">{fit.persona.industry}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Company:</span>
                      <span className="ml-2">{fit.persona.company}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Employees:</span>
                      <span className="ml-2">{fit.persona.employeeCount}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Value Tier:</span>
                      <span className="ml-2 capitalize">{fit.persona.valueTier}</span>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
}

import { CustomerPersona } from '@/data/personas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Target, AlertTriangle, Lightbulb, Building2, Users, DollarSign } from 'lucide-react';

interface PersonaProfileSnapshotProps {
  persona: CustomerPersona | undefined;
}

export function PersonaProfileSnapshot({ persona }: PersonaProfileSnapshotProps) {
  if (!persona) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full text-center py-12">
          <div>
            <Users className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              Select a persona to see their profile
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 border-b shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{persona.avatar}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">{persona.name}</CardTitle>
              <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/30 shrink-0">
                Seg {persona.segmentId}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{persona.title}</p>
            <p className="text-xs text-muted-foreground/80">{persona.industry}</p>
          </div>
        </div>
      </CardHeader>
      <ScrollArea className="flex-1">
        <CardContent className="p-4 space-y-5">
          {/* Company Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Building2 className="w-4 h-4" />
              Company Profile
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-muted/50 rounded p-2">
                <span className="text-muted-foreground text-xs">Company</span>
                <p className="font-medium truncate">{persona.company}</p>
              </div>
              <div className="bg-muted/50 rounded p-2">
                <span className="text-muted-foreground text-xs">Industry</span>
                <p className="font-medium">{persona.industry}</p>
              </div>
              {persona.employeeCount && (
                <div className="bg-muted/50 rounded p-2">
                  <span className="text-muted-foreground text-xs">Employees</span>
                  <p className="font-medium">{persona.employeeCount}</p>
                </div>
              )}
              {persona.locations && (
                <div className="bg-muted/50 rounded p-2">
                  <span className="text-muted-foreground text-xs">Locations</span>
                  <p className="font-medium">{persona.locations}</p>
                </div>
              )}
            </div>
          </div>

          {/* Budget & Tech */}
          {(persona.techBudget || persona.techSophistication) && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <DollarSign className="w-4 h-4" />
                Budget & Tech
              </div>
              <div className="flex flex-wrap gap-2">
                {persona.techBudget && (
                  <Badge variant="secondary" className="text-xs">
                    Budget: {persona.techBudget}
                  </Badge>
                )}
                {persona.techSophistication && (
                  <Badge variant="outline" className="text-xs capitalize">
                    Tech: {persona.techSophistication}
                  </Badge>
                )}
                {persona.valueTier && (
                  <Badge variant="outline" className="text-xs">
                    {persona.valueTier} Value
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Top Needs */}
          {persona.topNeeds && persona.topNeeds.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Target className="w-4 h-4" />
                Top Priorities
              </div>
              <div className="space-y-1.5">
                {persona.topNeeds.slice(0, 4).map((need, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="flex-1 text-sm">{need.need}</div>
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${need.importance}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8">{need.importance}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pain Points */}
          {persona.painPoints && persona.painPoints.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <AlertTriangle className="w-4 h-4" />
                Pain Points
              </div>
              <ul className="space-y-1">
                {persona.painPoints.slice(0, 3).map((point, i) => (
                  <li key={i} className="text-sm flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quote / Mindset */}
          {persona.quote && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Lightbulb className="w-4 h-4" />
                Mindset
              </div>
              <blockquote className="text-sm italic text-muted-foreground border-l-2 border-primary/50 pl-3">
                "{persona.quote}"
              </blockquote>
            </div>
          )}

          {/* Buying Behavior */}
          {persona.buyingBehavior && (
            <div className="text-xs text-muted-foreground bg-muted/50 rounded p-2">
              <span className="font-medium">Buying Behavior:</span> {persona.buyingBehavior}
            </div>
          )}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}

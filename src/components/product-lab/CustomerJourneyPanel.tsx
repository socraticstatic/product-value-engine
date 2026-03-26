import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { DemoBlur } from '@/components/ui/DemoBlur';
import { cn } from '@/lib/utils';
import {
  getConsolidatedJourneyRequirements,
  journeyStages,
  type JourneyStage,
} from '@/utils/customerJourneyRequirements';
import {
  BookOpen, ShoppingCart, Package, Zap, CreditCard, LifeBuoy,
  AlertCircle, ArrowUpCircle, Minus, Lightbulb,
} from 'lucide-react';

interface CustomerJourneyPanelProps {
  productIds: string[];
}

const stageIcons: Record<JourneyStage, React.ElementType> = {
  learn: BookOpen,
  buy: ShoppingCart,
  get: Package,
  use: Zap,
  pay: CreditCard,
  support: LifeBuoy,
};

const priorityConfig = {
  critical: { label: 'Critical', className: 'bg-destructive/10 text-destructive border-destructive/20' },
  high: { label: 'High', className: 'bg-warning/10 text-warning border-warning/20' },
  medium: { label: 'Medium', className: 'bg-muted text-muted-foreground border-border' },
};

export function CustomerJourneyPanel({ productIds }: CustomerJourneyPanelProps) {
  const journey = useMemo(() => getConsolidatedJourneyRequirements(productIds), [productIds]);

  if (productIds.length === 0) return null;

  const totalCritical = Object.values(journey.stages).reduce((s, st) => s + st.criticalCount, 0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <ArrowUpCircle className="w-4 h-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">Customer Experience Journey (LBGUPS)</CardTitle>
              <CardDescription className="text-xs">
                End-to-end CX requirements: Learn → Buy → Get → Use → Pay → Support
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {totalCritical} critical requirements
          </Badge>
        </div>

        {/* Journey stage pills */}
        <div className="flex gap-1.5 mt-3 overflow-x-auto pb-1">
          {journeyStages.map((stage) => {
            const Icon = stageIcons[stage.id];
            const data = journey.stages[stage.id];
            return (
              <div
                key={stage.id}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border shrink-0',
                  data.criticalCount > 0
                    ? 'bg-destructive/5 border-destructive/20 text-destructive'
                    : 'bg-muted border-border text-muted-foreground'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {stage.label}
                {data.criticalCount > 0 && (
                  <span className="ml-0.5 bg-destructive/15 px-1.5 rounded-full text-[10px]">
                    {data.criticalCount}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Accordion type="multiple" defaultValue={['learn', 'use']}>
          {journeyStages.map((stage) => {
            const Icon = stageIcons[stage.id];
            const data = journey.stages[stage.id];

            return (
              <AccordionItem key={stage.id} value={stage.id}>
                <AccordionTrigger className="text-sm hover:no-underline py-3">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="font-medium">{stage.label}</span>
                    <span className="text-xs text-muted-foreground">— {stage.description}</span>
                    <Badge variant="secondary" className="text-[10px] ml-1">
                      {data.requirements.length}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pl-6">
                    {data.requirements.map((req, i) => {
                      const pc = priorityConfig[req.priority];
                      return (
                        <div key={i} className="flex items-start gap-3 py-1.5">
                          <div className="mt-0.5">
                            {req.priority === 'critical' ? (
                              <AlertCircle className="w-3.5 h-3.5 text-destructive" />
                            ) : req.priority === 'high' ? (
                              <ArrowUpCircle className="w-3.5 h-3.5 text-warning" />
                            ) : (
                              <Minus className="w-3.5 h-3.5 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">
                              <DemoBlur>{req.requirement}</DemoBlur>
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className={cn('text-[10px] px-1.5 py-0', pc.className)}>
                                {pc.label}
                              </Badge>
                              <span className="text-[10px] text-muted-foreground">Owner: {req.owner}</span>
                              {req.sources.length > 1 && (
                                <span className="text-[10px] text-muted-foreground">
                                  • {req.sources.length} products
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        {/* Multi-product insights */}
        {journey.multiProductInsights.length > 0 && (
          <>
            <Separator className="my-4" />
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase text-muted-foreground flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                Multi-Product CX Insights
              </h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {journey.multiProductInsights.map((insight, i) => (
                  <div key={i} className="text-xs text-muted-foreground bg-muted/50 rounded-md px-3 py-2 border border-border">
                    <DemoBlur>{insight}</DemoBlur>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  ShoppingCart, 
  CheckCircle2, 
  TrendingUp, 
  BookOpen,
  ChevronDown,
  ChevronRight,
  DollarSign,
  Sparkles,
  Play,
  ExternalLink
} from 'lucide-react';
import type { CustomerPersona } from '@/data/personas';
import type { Product } from '@/data/products';
import type { CustomerUseCase } from '@/data/messagingPillars';
import { getExpectedOutcomes } from '@/utils/personaProductMapping';

interface PersonaBuyingCardProps {
  persona: CustomerPersona;
  products: Product[];
  relevantStories: CustomerUseCase[];
  onViewFullProfile: (persona: CustomerPersona) => void;
  onPracticePitch: (persona: CustomerPersona) => void;
}

export function PersonaBuyingCard({ 
  persona, 
  products, 
  relevantStories,
  onViewFullProfile,
  onPracticePitch
}: PersonaBuyingCardProps) {
  const [expanded, setExpanded] = useState(false);
  const outcomes = getExpectedOutcomes(persona);
  const mainStory = relevantStories[0];

  const getTechSophColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'medium': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'high': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="p-4 bg-card border-border hover:border-primary/30 transition-all">
      {/* Compact Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="text-3xl">{persona.avatar}</div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-foreground text-sm truncate">{persona.name}</h3>
            <p className="text-xs text-muted-foreground truncate">{persona.title}</p>
            <p className="text-xs text-muted-foreground truncate">{persona.company}</p>
          </div>
        </div>
      </div>
      
      {/* Compact Badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-[10px] px-1.5 py-0">
          Seg {persona.segmentId}
        </Badge>
        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
          {persona.industry}
        </Badge>
        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getTechSophColor(persona.techSophistication)}`}>
          {persona.techSophistication} tech
        </Badge>
      </div>

      {/* Key Pain Point - Always Visible */}
      <div className="mb-3">
        <div className="flex items-center gap-1.5 mb-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          <span className="font-medium text-xs text-muted-foreground uppercase tracking-wide">Key Need</span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">{persona.painPoints[0]}</p>
      </div>

      {/* Expandable Details */}
      <Collapsible open={expanded} onOpenChange={setExpanded}>
        {!expanded && (
          <CollapsibleTrigger className="w-full mb-3">
            <div className="flex items-center justify-center gap-1 py-1.5 rounded-md bg-muted/50 hover:bg-muted transition-colors text-xs text-muted-foreground">
              Show more
              <ChevronDown className="w-3 h-3" />
            </div>
          </CollapsibleTrigger>
        )}
        
        <CollapsibleContent className="space-y-3 mb-3">
          {/* All Pain Points */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span className="font-medium text-xs text-muted-foreground uppercase tracking-wide">Problems Solved</span>
            </div>
            <ul className="space-y-1">
              {persona.painPoints.slice(0, 3).map((point, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-xs">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outcomes */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <TrendingUp className="w-3 h-3 text-blue-500" />
              <span className="font-medium text-xs text-muted-foreground uppercase tracking-wide">Outcomes</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {outcomes.map((outcome, idx) => (
                <Badge key={idx} variant="outline" className="text-[10px] px-1.5 py-0 bg-blue-500/10 text-blue-400 border-blue-500/30">
                  {outcome}
                </Badge>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <ShoppingCart className="w-3 h-3 text-primary" />
              <span className="font-medium text-xs text-muted-foreground uppercase tracking-wide">Customers Like This Tend to Buy...</span>
            </div>
            <div className="space-y-1.5">
              {products.slice(0, 3).map((product) => (
                <div 
                  key={product.id}
                  className="p-2 rounded-md bg-muted/50 border border-border"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground text-xs truncate">{product.name}</span>
                    <span className="text-primary font-semibold text-xs flex items-center shrink-0">
                      <DollarSign className="w-3 h-3" />
                      {product.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Success Story Preview */}
          {mainStory && (
            <div className="p-3 rounded-md bg-primary/5 border border-primary/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3 text-primary" />
                  <span className="font-medium text-xs text-foreground">Success Story</span>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button type="button" variant="ghost" size="sm" className="h-6 px-2 text-[10px] text-primary hover:bg-primary/10">
                      Read More <ExternalLink className="w-2.5 h-2.5 ml-1" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4 bg-popover border-border" side="top" align="end">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <Badge variant="outline" className="text-xs">{mainStory.industry}</Badge>
                      </div>
                      <h4 className="font-semibold text-foreground text-sm">{mainStory.title}</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-amber-500 font-medium">Challenge: </span>
                          <span className="text-muted-foreground">{mainStory.challenge}</span>
                        </p>
                        <p>
                          <span className="text-blue-500 font-medium">Solution: </span>
                          <span className="text-muted-foreground">{mainStory.solution}</span>
                        </p>
                        <p>
                          <span className="text-emerald-500 font-medium">Outcome: </span>
                          <span className="text-muted-foreground">{mainStory.outcome}</span>
                        </p>
                      </div>
                      {mainStory.metrics && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
                          {mainStory.metrics.map((metric, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {metric}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <h5 className="font-medium text-foreground text-xs mb-1">{mainStory.title}</h5>
              <p className="text-[10px] text-muted-foreground line-clamp-2">{mainStory.outcome}</p>
            </div>
          )}
        </CollapsibleContent>

        {expanded && (
          <CollapsibleTrigger className="w-full mb-3">
            <div className="flex items-center justify-center gap-1 py-1.5 rounded-md bg-muted/50 hover:bg-muted transition-colors text-xs text-muted-foreground">
              Show less
              <ChevronDown className="w-3 h-3 rotate-180" />
            </div>
          </CollapsibleTrigger>
        )}
      </Collapsible>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2 border-t border-border mb-3">
        <Button 
          type="button"
          variant="outline" 
          size="sm"
          onClick={() => onPracticePitch(persona)}
          className="flex-1 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/10 text-xs h-8"
        >
          <Play className="w-3 h-3 mr-1" /> Practice
        </Button>
        <Button 
          type="button"
          variant="ghost" 
          size="sm"
          onClick={() => onViewFullProfile(persona)}
          className="flex-1 text-primary hover:bg-primary/10 text-xs h-8"
        >
          Profile <ChevronRight className="w-3 h-3 ml-1" />
        </Button>
      </div>

    </Card>
  );
}

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Crown, Building2 } from 'lucide-react';
import { MockPersona } from './mockPersonas';
import { ROISummary } from '@/lib/roi-calculator';

interface PersonaWithROI {
  persona: MockPersona;
  roiSummary: ROISummary;
}

interface PersonaSelectorBarProps {
  personas: PersonaWithROI[];
  selectedPersonaId: string;
  onSelectPersona: (personaId: string) => void;
}

export function PersonaSelectorBar({ 
  personas, 
  selectedPersonaId, 
  onSelectPersona 
}: PersonaSelectorBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      {/* Left scroll button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-background/80 backdrop-blur-sm shadow-sm hidden sm:flex"
        onClick={() => scroll('left')}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide py-2 px-1 sm:px-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {personas.map((item, index) => {
          const isSelected = item.persona.id === selectedPersonaId;
          const isBestFit = index === 0;
          const isEnterprise = item.persona.marketType === 'enterprise';

          return (
            <button
              key={item.persona.id}
              onClick={() => onSelectPersona(item.persona.id)}
              className={cn(
                "flex-shrink-0 flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all duration-200 min-w-[100px]",
                isSelected
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-transparent bg-muted/50 hover:bg-muted hover:border-muted-foreground/20"
              )}
            >
              {/* Icon and rank */}
              <div className="relative">
                <span className="text-2xl">{item.persona.icon}</span>
                {isBestFit && (
                  <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full p-0.5">
                    <Crown className="w-3 h-3" />
                  </div>
                )}
              </div>

              {/* Name */}
              <span className={cn(
                "text-xs font-medium text-center line-clamp-1",
                isSelected ? "text-primary" : "text-muted-foreground"
              )}>
                {item.persona.name}
              </span>

              {/* Market Type Badge */}
              {isEnterprise && (
                <Badge 
                  variant="outline" 
                  className="text-[9px] px-1 py-0 bg-purple-500/10 text-purple-400 border-purple-500/30"
                >
                  <Building2 className="w-2 h-2 mr-0.5" />
                  ENT
                </Badge>
              )}

              {/* Rank badge */}
              <Badge 
                variant={isBestFit ? "default" : "outline"} 
                className={cn(
                  "text-[10px] px-1.5 py-0",
                  isBestFit 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground"
                )}
              >
                {isBestFit ? "Best Fit" : `#${index + 1}`}
              </Badge>

              {/* ROI percentage */}
              <span className={cn(
                "text-xs font-bold",
                isSelected ? "text-primary" : "text-muted-foreground"
              )}>
                {item.roiSummary.avgROIPercentage}% ROI
              </span>
            </button>
          );
        })}
      </div>

      {/* Right scroll button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-background/80 backdrop-blur-sm shadow-sm hidden sm:flex"
        onClick={() => scroll('right')}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}

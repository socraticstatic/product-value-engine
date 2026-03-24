import { PlaceholderSection, useDemoMode } from '@/contexts/DemoModeContext';
import { Info, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlaceholderContentProps {
  section: PlaceholderSection;
  className?: string;
  variant?: 'full' | 'inline' | 'compact';
}

export function PlaceholderContent({ section, className = '', variant = 'full' }: PlaceholderContentProps) {
  const { getPlaceholder } = useDemoMode();
  const content = getPlaceholder(section);

  // Inline variant - single line with example
  if (variant === 'inline') {
    return (
      <div className={cn(
        "px-3 py-2 rounded-md border border-dashed border-primary/30 bg-primary/5",
        className
      )}>
        <div className="flex items-start gap-2">
          <Info className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1 min-w-0">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{content.title}:</span>{' '}
              {content.inlineDescription || content.description}
            </p>
            {content.example && (
              <p className="text-xs text-primary/80 italic truncate">
                Example: {content.example}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Compact variant - small box with description and example
  if (variant === 'compact') {
    return (
      <div className={cn(
        "p-3 rounded-lg border border-dashed border-primary/30 bg-primary/5",
        className
      )}>
        <div className="flex items-start gap-2 mb-2">
          <Info className="w-4 h-4 text-primary shrink-0" />
          <span className="text-xs font-semibold text-primary">
            {content.title}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mb-2">
          {content.inlineDescription || content.description}
        </p>
        {content.example && (
          <div className="flex items-start gap-1.5 p-2 rounded bg-background/50 border border-border/50">
            <Lightbulb className="w-3 h-3 text-warning shrink-0 mt-0.5" />
            <p className="text-xs text-foreground italic">
              {content.example}
            </p>
          </div>
        )}
      </div>
    );
  }

  // Full variant - detailed with bullets
  return (
    <div className={cn(
      "p-4 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5",
      className
    )}>
      <div className="flex items-center gap-2 mb-3">
        <Info className="w-4 h-4 text-primary" />
        <span className="text-xs font-semibold uppercase tracking-wide text-primary">
          Demo Mode - {content.title}
        </span>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3">
        {content.description}
      </p>
      
      <ul className="space-y-2 mb-3">
        {content.bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="text-primary shrink-0">•</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {content.example && (
        <div className="p-3 rounded-lg bg-background/50 border border-border/50 mb-3">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-warning shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-foreground mb-1">Example:</p>
              <p className="text-sm text-foreground italic">{content.example}</p>
            </div>
          </div>
        </div>
      )}
      
      {content.footer && (
        <p className="text-xs text-muted-foreground/70 pt-3 border-t border-border/50 italic">
          {content.footer}
        </p>
      )}
    </div>
  );
}

// Inline placeholder for individual items (like a single objection, talking point, etc.)
interface InlinePlaceholderProps {
  section: PlaceholderSection;
  className?: string;
  showExample?: boolean;
}

export function InlinePlaceholder({ section, className = '', showExample = true }: InlinePlaceholderProps) {
  const { getPlaceholder } = useDemoMode();
  const content = getPlaceholder(section);

  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-2 rounded-md border border-dashed border-muted-foreground/30 bg-muted/30",
      className
    )}>
      <Info className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
      <p className="text-xs text-muted-foreground">
        <span className="font-medium">{content.title}</span>
        {showExample && content.example && (
          <span className="italic text-muted-foreground/80"> — e.g., {content.example}</span>
        )}
      </p>
    </div>
  );
}

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpandableListProps {
  items: string[];
  initialCount: number;
  renderItem: (item: string, index: number) => React.ReactNode;
  itemLabel?: string;
  className?: string;
}

export function ExpandableList({ 
  items, 
  initialCount, 
  renderItem, 
  itemLabel = 'items',
  className 
}: ExpandableListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const hasMore = items.length > initialCount;
  const displayedItems = isExpanded ? items : items.slice(0, initialCount);
  const remainingCount = items.length - initialCount;

  return (
    <div className={className}>
      <ul className="space-y-2">
        {displayedItems.map((item, i) => (
          <li key={i} className="animate-fade-in" style={{ animationDelay: isExpanded && i >= initialCount ? `${(i - initialCount) * 30}ms` : '0ms' }}>
            {renderItem(item, i)}
          </li>
        ))}
      </ul>
      
      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors mt-3 pl-6",
            "hover:underline focus:outline-none focus:underline"
          )}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-3 h-3" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3" />
              +{remainingCount} more {itemLabel}
            </>
          )}
        </button>
      )}
    </div>
  );
}

interface ExpandableGridProps {
  items: string[];
  initialCount: number;
  renderItem: (item: string, index: number) => React.ReactNode;
  itemLabel?: string;
  className?: string;
  gridClassName?: string;
}

export function ExpandableGrid({ 
  items, 
  initialCount, 
  renderItem, 
  itemLabel = 'items',
  className,
  gridClassName = 'grid grid-cols-2 md:grid-cols-3 gap-3'
}: ExpandableGridProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const hasMore = items.length > initialCount;
  const displayedItems = isExpanded ? items : items.slice(0, initialCount);
  const remainingCount = items.length - initialCount;

  return (
    <div className={className}>
      <div className={gridClassName}>
        {displayedItems.map((item, i) => (
          <div 
            key={i} 
            className="animate-fade-in" 
            style={{ animationDelay: isExpanded && i >= initialCount ? `${(i - initialCount) * 30}ms` : '0ms' }}
          >
            {renderItem(item, i)}
          </div>
        ))}
      </div>
      
      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors mt-3",
            "hover:underline focus:outline-none focus:underline"
          )}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-3 h-3" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3" />
              +{remainingCount} more {itemLabel}
            </>
          )}
        </button>
      )}
    </div>
  );
}

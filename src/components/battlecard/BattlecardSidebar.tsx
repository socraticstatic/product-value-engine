import { useState } from 'react';
import { User, Lightbulb, Swords, Package, MessageSquare, Shield, Printer, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type BattlecardSection = 
  | 'overview' 
  | 'value-props' 
  | 'competitive' 
  | 'products' 
  | 'talking-points' 
  | 'objections';

interface BattlecardSidebarProps {
  activeSection: BattlecardSection;
  onSectionChange: (section: BattlecardSection) => void;
  onPrint: () => void;
  onReset: () => void;
  sectionCounts?: {
    products?: number;
    talkingPoints?: number;
    objections?: number;
  };
}

const navigationItems: { id: BattlecardSection; label: string; icon: React.ElementType; description: string }[] = [
  { id: 'overview', label: 'Customer Overview', icon: User, description: 'Profile & needs' },
  { id: 'value-props', label: 'Value Props', icon: Lightbulb, description: 'Key benefits' },
  { id: 'competitive', label: 'Competitive Intel', icon: Swords, description: 'Differentiation' },
  { id: 'products', label: 'Solutions', icon: Package, description: 'Recommended solutions' },
  { id: 'talking-points', label: 'Talking Points', icon: MessageSquare, description: 'Conversation starters' },
  { id: 'objections', label: 'Objection Handling', icon: Shield, description: 'Common responses' },
];

export function BattlecardSidebar({ 
  activeSection, 
  onSectionChange, 
  onPrint, 
  onReset,
  sectionCounts 
}: BattlecardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getCountBadge = (id: BattlecardSection) => {
    if (isCollapsed) return null;
    
    switch (id) {
      case 'products':
        return sectionCounts?.products ? (
          <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {sectionCounts.products}
          </span>
        ) : null;
      case 'talking-points':
        return sectionCounts?.talkingPoints ? (
          <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {sectionCounts.talkingPoints}
          </span>
        ) : null;
      case 'objections':
        return sectionCounts?.objections ? (
          <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {sectionCounts.objections}
          </span>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <aside 
      className={cn(
        "flex flex-col bg-sidebar border-r border-border transition-all duration-300 shrink-0",
        isCollapsed ? "w-14" : "w-56"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-3 h-12">
        {!isCollapsed && (
          <h2 className="text-sm font-semibold text-foreground truncate">
            Battlecard
          </h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-7 w-7 shrink-0", isCollapsed && "mx-auto")}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive && "bg-primary/10 text-primary font-medium border-l-2 border-primary",
                    isCollapsed && "justify-center px-2"
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className={cn(
                    "h-4 w-4 shrink-0",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )} />
                  {!isCollapsed && (
                    <>
                      <div className="flex flex-col items-start min-w-0 flex-1">
                        <span className="truncate">{item.label}</span>
                        <span className="text-[10px] text-muted-foreground truncate">
                          {item.description}
                        </span>
                      </div>
                      {getCountBadge(item.id)}
                    </>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-2">
        <div className={cn(
          "flex gap-2",
          isCollapsed ? "flex-col" : "flex-row"
        )}>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onPrint}
            className={cn("flex-1", isCollapsed && "px-2")}
            title={isCollapsed ? "Print" : undefined}
          >
            <Printer className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">Print</span>}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onReset}
            className={cn("flex-1", isCollapsed && "px-2")}
            title={isCollapsed ? "New" : undefined}
          >
            <RefreshCw className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">New</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}

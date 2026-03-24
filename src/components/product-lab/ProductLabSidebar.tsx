import { useState } from 'react';
import { Package, Layers, Target, MessageSquareText, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ProductLabSection = 'analysis' | 'bundle' | 'market' | 'feedback';

interface ProductLabSidebarProps {
  activeSection: ProductLabSection;
  onSectionChange: (section: ProductLabSection) => void;
}

const navigationItems: { id: ProductLabSection; label: string; icon: React.ElementType; description: string }[] = [
  { id: 'analysis', label: 'Analysis', icon: Package, description: 'Product fit & personas' },
  { id: 'bundle', label: 'Multi-Product Strategy', icon: Layers, description: 'Build solutions' },
  { id: 'market', label: 'Industry Position', icon: Target, description: 'Competitive intel' },
  { id: 'feedback', label: 'Feedback Studio', icon: MessageSquareText, description: 'Persona chat' },
];

export function ProductLabSidebar({ 
  activeSection, 
  onSectionChange,
}: ProductLabSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
            Product Value Lab
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
                    <div className="flex flex-col items-start min-w-0 flex-1">
                      <span className="truncate">{item.label}</span>
                      <span className="text-[10px] text-muted-foreground truncate">
                        {item.description}
                      </span>
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

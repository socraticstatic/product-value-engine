import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Zap, Users, Shield, BookOpen, Target, Sparkles, Package, Calculator, Menu, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface EngineNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home, href: '/' },
  { id: 'quick-value', label: 'Quick Value Prop', icon: Zap, href: '/?tab=quick-value' },
  { id: 'product-lab', label: 'Product Value Lab', icon: Sparkles, href: '/product-lab' },
  { id: 'personas', label: 'Personas', icon: Users, href: '/?tab=personas' },
  { id: 'claims', label: 'Claim Analysis', icon: Shield, href: '/?tab=claims' },
  { id: 'stories', label: 'Use Cases', icon: BookOpen, href: '/?tab=stories' },
  { id: 'roi-analyzer', label: 'ROI Analyzer', icon: Calculator, href: '/?tab=roi-analyzer' },
  { id: 'solutions', label: 'Solutions', icon: Package, href: '/?tab=solutions' },
  { id: 'battlecard', label: 'Battlecard', icon: Target, href: '/?tab=battlecard' },
];

export function EngineNavigation({ activeTab, onTabChange }: EngineNavigationProps) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user, signOut } = useAuth();

  const userEmail = user?.email ?? '';
  const truncatedEmail = userEmail.length > 24
    ? userEmail.slice(0, 21) + '...'
    : userEmail;
  
  // Determine active tab from props, URL, or default to 'home'
  const currentTab = activeTab || 
    (location.pathname === '/product-lab' ? 'product-lab' : 
    (searchParams.get('tab') || 'home'));

  const handleClick = (item: typeof navItems[0], e: React.MouseEvent) => {
    // If we're on the Index page and there's a callback, use it for non-route tabs
    if (onTabChange && location.pathname === '/' && item.id !== 'product-lab') {
      e.preventDefault();
      onTabChange(item.id);
    }
  };

  const activeItem = navItems.find(item => item.id === currentTab);
  const ActiveIcon = activeItem?.icon || Home;

  return (
    <nav className="flex items-center justify-between w-full gap-2">
      {/* Mobile: Dropdown menu */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <ActiveIcon className="w-4 h-4" />
              <span>{activeItem?.label || 'Menu'}</span>
              <Menu className="w-4 h-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-56">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              const Icon = item.icon;

              return (
                <DropdownMenuItem key={item.id} asChild>
                  <Link
                    to={item.href}
                    onClick={(e) => handleClick(item, e)}
                    className={cn(
                      "flex items-center gap-2 w-full cursor-pointer",
                      isActive && "bg-muted font-medium"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={signOut}
              className="flex items-center gap-2 w-full cursor-pointer text-muted-foreground"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tablet: Icons only */}
      <div className="hidden md:flex lg:hidden flex-wrap items-center justify-center gap-1 p-1 bg-muted/50 rounded-lg">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.id}
              to={item.href}
              onClick={(e) => handleClick(item, e)}
              title={item.label}
              className={cn(
                "flex items-center justify-center p-2 rounded-md transition-all",
                "hover:bg-background hover:text-foreground",
                isActive 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
            </Link>
          );
        })}
      </div>

      {/* Desktop: Full labels */}
      <div className="hidden lg:flex flex-wrap items-center justify-center gap-1 p-1 bg-muted/50 rounded-lg">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.id}
              to={item.href}
              onClick={(e) => handleClick(item, e)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all",
                "hover:bg-background hover:text-foreground",
                isActive 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Sign-out — hidden on mobile (in dropdown instead) */}
      <div className="hidden md:flex items-center gap-2 ml-auto shrink-0">
        {truncatedEmail && (
          <span className="text-xs text-muted-foreground hidden lg:inline">
            {truncatedEmail}
          </span>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          className="text-muted-foreground hover:text-foreground gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden lg:inline text-xs">Sign Out</span>
        </Button>
      </div>
    </nav>
  );
}

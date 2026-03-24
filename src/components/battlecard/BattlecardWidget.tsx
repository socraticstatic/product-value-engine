import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface BattlecardWidgetProps {
  title: string;
  icon: LucideIcon;
  iconColor?: string;
  children: ReactNode;
  className?: string;
}

export function BattlecardWidget({ 
  title, 
  icon: Icon, 
  iconColor = 'text-primary',
  children,
  className = ''
}: BattlecardWidgetProps) {
  return (
    <Card className={`p-5 shadow-card bg-card animate-slide-up hover:shadow-card-hover transition-shadow duration-200 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <h3 className="font-display font-bold text-foreground">{title}</h3>
      </div>
      {children}
    </Card>
  );
}

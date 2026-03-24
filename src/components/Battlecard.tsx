import { useState } from 'react';
import { Product } from '@/data/products';
import { CustomerProfile } from '@/types/customer';
import { ProductHighlightsWidget } from './battlecard/ProductHighlightsWidget';
import { TalkingPointsWidget } from './battlecard/TalkingPointsWidget';
import { ValuePropsWidget } from './battlecard/ValuePropsWidget';
import { ObjectionHandlingWidget } from './battlecard/ObjectionHandlingWidget';
import { CompetitiveDifferentiationWidget } from './battlecard/CompetitiveDifferentiationWidget';
import { CustomerProfileWidget } from './battlecard/CustomerProfileWidget';
import { CustomerSummaryBar } from './battlecard/CustomerSummaryBar';
import { BattlecardSidebar, BattlecardSection } from './battlecard/BattlecardSidebar';

interface BattlecardProps {
  products: Product[];
  customerProfile: CustomerProfile;
  onReset: () => void;
  onViewSolution?: (productId: string) => void;
}

export function Battlecard({ products, customerProfile, onReset, onViewSolution }: BattlecardProps) {
  const [activeSection, setActiveSection] = useState<BattlecardSection>('overview');

  const handlePrint = () => {
    window.print();
  };

  // Calculate section counts for sidebar badges
  const sectionCounts = {
    products: products.length,
    talkingPoints: 5,
    objections: products.reduce((acc, p) => acc + (p.objectionHandling?.length || 0), 0),
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-display font-bold text-foreground">Customer Overview</h2>
            <CustomerProfileWidget products={products} customerProfile={customerProfile} />
          </div>
        );
      case 'value-props':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-display font-bold text-foreground">Value Propositions</h2>
            <ValuePropsWidget products={products} customerProfile={customerProfile} />
          </div>
        );
      case 'competitive':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-display font-bold text-foreground">Competitive Intelligence</h2>
            <CompetitiveDifferentiationWidget products={products} customerProfile={customerProfile} />
          </div>
        );
      case 'products':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-display font-bold text-foreground">Recommended Solutions</h2>
            <ProductHighlightsWidget products={products} customerProfile={customerProfile} onViewSolution={onViewSolution} />
          </div>
        );
      case 'talking-points':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-display font-bold text-foreground">Talking Points</h2>
            <TalkingPointsWidget products={products} customerProfile={customerProfile} />
          </div>
        );
      case 'objections':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-display font-bold text-foreground">Objection Handling</h2>
            <ObjectionHandlingWidget products={products} customerProfile={customerProfile} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-[600px] w-full rounded-xl border border-border bg-card shadow-card overflow-hidden">
      <BattlecardSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onPrint={handlePrint}
        onReset={onReset}
        sectionCounts={sectionCounts}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center gap-2 border-b border-border px-4 py-3 bg-muted/30 h-12">
          <span className="text-sm text-muted-foreground">Business Sales Battlecard</span>
        </header>
        
        <CustomerSummaryBar customerProfile={customerProfile} />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="animate-fade-in">
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </div>
  );
}

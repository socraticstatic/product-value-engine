import { useState } from 'react';
import { SingleProductTester } from './SingleProductTester';
import { SolutionBundleBuilder } from './SolutionBundleBuilder';
import { CompetitiveAnalysis } from './CompetitiveAnalysis';
import { FeedbackStudioTab } from './FeedbackStudioTab';
import { ProductLabSidebar, ProductLabSection } from './ProductLabSidebar';

export function ProductLabDashboard() {
  const [activeMode, setActiveMode] = useState<ProductLabSection>('analysis');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [focusArea, setFocusArea] = useState<'feature-gaps' | 'value-clarity' | 'market-position' | 'overall'>('overall');
  const [competitorContext, setCompetitorContext] = useState<string>('');

  const renderActiveSection = () => {
    switch (activeMode) {
      case 'analysis':
        return (
          <SingleProductTester
            selectedProducts={selectedProducts}
            onProductsChange={setSelectedProducts}
          />
        );
      case 'bundle':
        return (
          <SolutionBundleBuilder
            selectedProducts={selectedProducts}
            onProductsChange={setSelectedProducts}
          />
        );
      case 'market':
        return (
          <CompetitiveAnalysis
            selectedProducts={selectedProducts}
            onProductsChange={setSelectedProducts}
          />
        );
      case 'feedback':
        return (
          <FeedbackStudioTab
            selectedProducts={selectedProducts}
            onProductsChange={setSelectedProducts}
            focusArea={focusArea}
            setFocusArea={setFocusArea}
            competitorContext={competitorContext}
            setCompetitorContext={setCompetitorContext}
          />
        );
      default:
        return null;
    }
  };

  const getSectionTitle = () => {
    switch (activeMode) {
      case 'analysis':
        return 'Product / Solution Analysis';
      case 'bundle':
        return 'Multi-Product Strategy';
      case 'market':
        return 'Industry Position';
      case 'feedback':
        return 'Feedback Studio';
      default:
        return 'Product Value Lab';
    }
  };

  return (
    <div className="flex min-h-[600px] w-full rounded-xl border border-border bg-card shadow-card overflow-hidden">
      <ProductLabSidebar
        activeSection={activeMode}
        onSectionChange={setActiveMode}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center gap-2 border-b border-border px-4 py-3 bg-muted/30 h-12">
          <span className="text-sm text-muted-foreground">{getSectionTitle()}</span>
        </header>
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="animate-fade-in">
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </div>
  );
}

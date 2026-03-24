import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, RefreshCw, Download, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { ModeSelector } from './ModeSelector';
import { BusinessIntakeForm } from './BusinessIntakeForm';
import { SolutionExplorerForm } from './SolutionExplorerForm';
import { PersonaROIGrid } from './PersonaROIGrid';
import { ROISummary } from './ROISummary';
import { ROIBreakdown } from './ROIBreakdown';
import { PriceOfSilenceChart } from './PriceOfSilenceChart';
import { ProductRecommendation } from './ProductRecommendation';
import { IndustryComparison } from './IndustryComparison';
import { BusinessProfile, Recommendation, AnalysisResult, INDUSTRIES } from './types';
import { calculateROISummary, ROISummary as ROISummaryType } from '@/lib/roi-calculator';
import { getScaledBenchmarks } from '@/lib/benchmarks';

type ViewState = 
  | 'mode-select' 
  | 'business-needs-form' 
  | 'business-needs-loading' 
  | 'business-needs-results'
  | 'solution-explorer-form'
  | 'solution-explorer-results';

export function ROIAnalyzerPage() {
  const [viewState, setViewState] = useState<ViewState>('mode-select');
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [roiSummary, setRoiSummary] = useState<ROISummaryType | null>(null);
  const [analysisInsights, setAnalysisInsights] = useState<{ summary: string; industryInsights: string } | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<{ id: string; name: string }[]>([]);

  const handleModeSelect = (mode: 'business-needs' | 'solution-explorer') => {
    if (mode === 'business-needs') {
      setViewState('business-needs-form');
    } else {
      setViewState('solution-explorer-form');
    }
  };

  const handleFormSubmit = async (submittedProfile: BusinessProfile) => {
    setProfile(submittedProfile);
    setViewState('business-needs-loading');

    try {
      const { data, error } = await supabase.functions.invoke('analyze-business', {
        body: { profile: submittedProfile }
      });

      if (error) {
        console.error('Edge function error:', error);
        toast.error('Failed to analyze business. Please try again.');
        setViewState('business-needs-form');
        return;
      }

      const result = data as AnalysisResult;
      setRecommendations(result.recommendations || []);
      setAnalysisInsights({
        summary: result.summary || '',
        industryInsights: result.industryInsights || ''
      });

      const productIds = result.recommendations?.map(r => ({
        id: r.productId,
        name: r.productName
      })) || [];

      const summary = calculateROISummary(
        productIds,
        submittedProfile.industry,
        submittedProfile.businessSize,
        submittedProfile.locations,
        submittedProfile.painPoints
      );
      setRoiSummary(summary);

      setViewState('business-needs-results');
      toast.success('Analysis complete!');
    } catch (err) {
      console.error('Analysis error:', err);
      toast.error('Something went wrong. Please try again.');
      setViewState('business-needs-form');
    }
  };

  const handleSolutionExplorerSubmit = (products: { id: string; name: string }[]) => {
    setSelectedProducts(products);
    setViewState('solution-explorer-results');
  };

  const handleReset = () => {
    setViewState('mode-select');
    setProfile(null);
    setRecommendations([]);
    setRoiSummary(null);
    setAnalysisInsights(null);
    setSelectedProducts([]);
  };

  const handleBackToModeSelect = () => {
    setViewState('mode-select');
  };

  const handleBackToProductSelection = () => {
    setViewState('solution-explorer-form');
  };

  const currentCosts = profile && roiSummary ? getScaledBenchmarks(
    profile.industry,
    profile.businessSize,
    profile.locations,
    profile.painPoints
  ) : null;

  const industryLabel = INDUSTRIES.find(i => i.id === profile?.industry)?.label || profile?.industry || '';

  // Determine header text based on state
  const getHeaderText = () => {
    switch (viewState) {
      case 'mode-select':
        return 'Choose how you want to analyze ROI';
      case 'business-needs-form':
        return 'Enter your business details to receive personalized ROI projections and AI-powered product recommendations.';
      case 'business-needs-loading':
        return 'Analyzing your business profile and generating recommendations...';
      case 'business-needs-results':
        return `ROI analysis for ${profile?.companyName || 'your business'}`;
      case 'solution-explorer-form':
        return 'Select one or more products to see ROI projections across different business types.';
      case 'solution-explorer-results':
        return 'ROI projections across different business types';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Calculator className="w-4 h-4" />
          Business ROI Analyzer
        </div>
        <h2 className="text-3xl font-display font-bold text-foreground mb-2">
          Quantify the Financial Impact
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {getHeaderText()}
        </p>
      </div>

      {/* Mode Selection */}
      {viewState === 'mode-select' && (
        <ModeSelector onSelectMode={handleModeSelect} />
      )}

      {/* Business Needs Form */}
      {viewState === 'business-needs-form' && (
        <div className="space-y-4">
          <div className="flex justify-center">
            <Button variant="outline" onClick={handleBackToModeSelect}>
              ← Back to Mode Selection
            </Button>
          </div>
          <BusinessIntakeForm onSubmit={handleFormSubmit} />
        </div>
      )}

      {/* Business Needs Loading State */}
      {viewState === 'business-needs-loading' && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary/30 rounded-full" />
            <div className="absolute inset-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="mt-6 text-muted-foreground">Analyzing your business profile...</p>
          <p className="text-sm text-muted-foreground mt-2">This may take a few moments</p>
        </div>
      )}

      {/* Business Needs Results */}
      {viewState === 'business-needs-results' && profile && roiSummary && (
        <div className="space-y-8">
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
            <Button variant="outline" disabled>
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" disabled>
              <FileText className="w-4 h-4 mr-2" />
              Generate Proposal
            </Button>
          </div>

          {/* AI Summary */}
          {analysisInsights?.summary && (
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Analysis Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{analysisInsights.summary}</p>
                {analysisInsights.industryInsights && (
                  <p className="text-muted-foreground mt-4 pt-4 border-t border-primary/10">
                    <strong className="text-foreground">{industryLabel} Insights:</strong> {analysisInsights.industryInsights}
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Recommended Solutions */}
          <div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-6">
              Recommended Solutions
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((rec, idx) => (
                <ProductRecommendation 
                  key={rec.productId || idx} 
                  recommendation={rec} 
                  rank={idx + 1}
                />
              ))}
            </div>
          </div>

          {/* Industry Comparison */}
          {currentCosts && (
            <IndustryComparison
              industryKey={profile.industry}
              businessSize={profile.businessSize}
              currentCosts={{
                downtime: currentCosts.annualDowntimeCost,
                productivity: currentCosts.annualProductivityLoss,
                security: currentCosts.annualSecurityRisk,
                support: currentCosts.annualSupportCost
              }}
            />
          )}

          {/* ROI Summary Cards */}
          <ROISummary summary={roiSummary} />

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <ROIBreakdown products={roiSummary.products} />
            </div>
            <div className="space-y-8">
              {currentCosts && (
                <PriceOfSilenceChart
                  annualLoss={
                    currentCosts.annualDowntimeCost + 
                    currentCosts.annualProductivityLoss + 
                    currentCosts.annualSecurityRisk
                  }
                  industryKey={profile.industry}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Solution Explorer Form */}
      {viewState === 'solution-explorer-form' && (
        <SolutionExplorerForm 
          onSubmit={handleSolutionExplorerSubmit}
          onBack={handleBackToModeSelect}
        />
      )}

      {/* Solution Explorer Results */}
      {viewState === 'solution-explorer-results' && selectedProducts.length > 0 && (
        <PersonaROIGrid
          selectedProducts={selectedProducts}
          onBack={handleBackToProductSelection}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

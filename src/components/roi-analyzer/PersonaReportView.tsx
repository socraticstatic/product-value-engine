import { MockPersona } from './mockPersonas';
import { ROISummary as ROISummaryType } from '@/lib/roi-calculator';
import { getScaledBenchmarks } from '@/lib/benchmarks';
import { PersonaProfileSummary } from './PersonaProfileSummary';
import { PersonaAdjustmentSliders } from './PersonaAdjustmentSliders';
import { ROISummary } from './ROISummary';
import { IndustryComparison } from './IndustryComparison';
import { ROIBreakdown } from './ROIBreakdown';
import { PriceOfSilenceChart } from './PriceOfSilenceChart';

interface PersonaReportViewProps {
  persona: MockPersona;
  roiSummary: ROISummaryType;
  adjustedSize?: string;
  adjustedLocations?: string;
  onSizeChange?: (size: string) => void;
  onLocationsChange?: (locations: string) => void;
}

export function PersonaReportView({ 
  persona, 
  roiSummary,
  adjustedSize,
  adjustedLocations,
  onSizeChange,
  onLocationsChange
}: PersonaReportViewProps) {
  const { profile } = persona;

  // Use adjusted values for benchmarks if available
  const effectiveSize = adjustedSize || profile.businessSize;
  const effectiveLocations = adjustedLocations || profile.locations;

  // Get scaled benchmarks for industry comparison
  const scaledBenchmarks = getScaledBenchmarks(
    profile.industry,
    effectiveSize,
    effectiveLocations,
    profile.painPoints
  );

  // Prepare current costs for industry comparison
  const currentCosts = {
    downtime: scaledBenchmarks.annualDowntimeCost,
    productivity: scaledBenchmarks.annualProductivityLoss,
    security: scaledBenchmarks.annualSecurityRisk,
    support: scaledBenchmarks.annualSupportCost
  };

  // Calculate annual loss for Price of Silence chart
  const annualLoss = roiSummary.totalAnnualSavings + roiSummary.totalRiskAvoidance;

  return (
    <div className="space-y-6">
      {/* Persona Profile Summary */}
      <PersonaProfileSummary 
        persona={persona}
        adjustedSize={adjustedSize}
        adjustedLocations={adjustedLocations}
      />

      {/* Adjustment Sliders */}
      {onSizeChange && onLocationsChange && (
        <PersonaAdjustmentSliders
          currentSize={effectiveSize}
          currentLocations={effectiveLocations}
          onSizeChange={onSizeChange}
          onLocationsChange={onLocationsChange}
          originalSize={profile.businessSize}
          originalLocations={profile.locations}
        />
      )}

      {/* ROI Summary Cards */}
      <ROISummary summary={roiSummary} />

      {/* Industry Comparison and ROI Breakdown side by side on large screens */}
      <div className="grid lg:grid-cols-2 gap-6">
        <IndustryComparison
          industryKey={profile.industry}
          businessSize={effectiveSize}
          currentCosts={currentCosts}
        />
        <ROIBreakdown products={roiSummary.products} />
      </div>

      {/* Price of Silence Chart */}
      <PriceOfSilenceChart
        annualLoss={annualLoss}
        industryKey={profile.industry}
      />
    </div>
  );
}

import { forwardRef } from 'react';
import { MultiProductValueProp } from '@/utils/multiProductValueProp';
import attGlobe from '@/assets/att-globe.png';

interface ValuePropFlyerProps {
  valueProp: MultiProductValueProp;
  industryLabel?: string;
}

export const ValuePropFlyer = forwardRef<HTMLDivElement, ValuePropFlyerProps>(
  ({ valueProp, industryLabel }, ref) => {
    const topOutcomes = valueProp.outcomes.slice(0, 5);
    const topAdvantages = valueProp.competitivePositioning.attAdvantages.slice(0, 4);

    return (
      <div
        ref={ref}
        style={{ width: 1080, height: 1536, fontFamily: "'ATT Aleck Sans', 'Inter', system-ui, sans-serif" }}
        className="relative bg-white overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsl(210 100% 97%) 0%, white 40%, hsl(210 40% 97%) 100%)' }} />
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 h-[6px]" style={{ background: 'linear-gradient(90deg, hsl(210 100% 50%), hsl(195 100% 45%))' }} />

        <div className="relative z-10 flex flex-col h-full px-[64px] py-[56px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-[32px]">
            <div className="flex items-center gap-[12px]">
              <img src={attGlobe} alt="AT&T" className="w-[40px] h-[40px] object-contain" />
              <span style={{ fontSize: 16, fontWeight: 600, color: 'hsl(210 100% 35%)' }}>AT&T Business</span>
            </div>
            {industryLabel && (
              <div style={{ fontSize: 12, fontWeight: 600, color: 'hsl(210 100% 45%)', background: 'hsl(210 100% 95%)', borderRadius: 16, padding: '4px 14px' }}>
                {industryLabel}
              </div>
            )}
          </div>

          {/* Elevator Pitch */}
          <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, color: 'hsl(210 20% 12%)', marginBottom: 12 }}>
            {valueProp.elevatorPitch}
          </h1>
          <p style={{ fontSize: 15, color: 'hsl(210 10% 45%)', lineHeight: 1.6, marginBottom: 32 }}>
            {valueProp.combinedNarrative}
          </p>

          {/* Solution Components */}
          <h2 style={{ fontSize: 14, fontWeight: 700, color: 'hsl(210 100% 40%)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12 }}>Solution Components</h2>
          <div className="flex flex-col gap-[12px] mb-[28px]">
            {valueProp.perProduct.slice(0, 5).map((pp) => (
              <div key={pp.product.id} className="flex items-start gap-[12px]" style={{ background: 'white', borderRadius: 10, padding: '14px 18px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ width: 4, height: '100%', minHeight: 40, borderRadius: 2, background: 'hsl(210 100% 50%)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'hsl(210 20% 15%)' }}>{pp.product.name}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'hsl(210 100% 45%)', marginTop: 2 }}>{pp.roleInSolution}</div>
                  <div style={{ fontSize: 11, color: 'hsl(210 10% 50%)', marginTop: 2 }}>{pp.keyBenefit}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Customer Outcomes */}
          <h2 style={{ fontSize: 14, fontWeight: 700, color: 'hsl(210 100% 40%)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12 }}>Customer Outcomes</h2>
          <div className="flex flex-col gap-[10px] mb-[28px]">
            {topOutcomes.map((outcome, i) => (
              <div key={i} className="flex items-start gap-[10px]">
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'hsl(210 100% 95%)', color: 'hsl(210 100% 45%)', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  {i + 1}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'hsl(210 20% 15%)' }}>{outcome.outcome}</div>
                  <div style={{ fontSize: 11, color: 'hsl(210 10% 50%)' }}>{outcome.howDelivered}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Why AT&T */}
          <div className="mt-auto" style={{ background: 'hsl(210 100% 97%)', borderRadius: 12, padding: '20px 24px' }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: 'hsl(210 100% 40%)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>Why AT&T</h2>
            <div className="flex flex-col gap-[8px]">
              {topAdvantages.map((adv, i) => (
                <div key={i} className="flex items-start gap-[8px]">
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'hsl(210 100% 50%)', marginTop: 6, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'hsl(210 10% 30%)' }}>{adv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ValuePropFlyer.displayName = 'ValuePropFlyer';

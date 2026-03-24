import { forwardRef } from 'react';
import { MultiProductValueProp } from '@/utils/multiProductValueProp';
import attGlobe from '@/assets/att-globe.png';

interface ValuePropSlideProps {
  valueProp: MultiProductValueProp;
  industryLabel?: string;
}

export const ValuePropSlide = forwardRef<HTMLDivElement, ValuePropSlideProps>(
  ({ valueProp, industryLabel }, ref) => {
    const topOutcomes = valueProp.outcomes.slice(0, 4);
    const topAdvantages = valueProp.competitivePositioning.attAdvantages.slice(0, 3);
    const topSynergies = valueProp.synergies.slice(0, 2);

    return (
      <div
        ref={ref}
        style={{ width: 1920, height: 1080, fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
        className="relative bg-white overflow-hidden"
      >
        {/* Background gradient accent */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(210 100% 97%) 0%, hsl(210 60% 94%) 50%, hsl(200 40% 96%) 100%)' }} />
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[6px]" style={{ background: 'linear-gradient(90deg, hsl(210 100% 50%), hsl(195 100% 45%))' }} />

        <div className="relative z-10 flex flex-col h-full px-[80px] py-[48px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-[36px]">
            <div className="flex items-center gap-[16px]">
              <img src={attGlobe} alt="AT&T" className="w-[48px] h-[48px] object-contain" />
              <span style={{ fontSize: 18, fontWeight: 600, color: 'hsl(210 100% 35%)' }}>AT&T Business</span>
            </div>
            {industryLabel && (
              <div style={{ fontSize: 14, fontWeight: 600, color: 'hsl(210 100% 45%)', background: 'hsl(210 100% 95%)', borderRadius: 20, padding: '6px 16px' }}>
                {industryLabel}
              </div>
            )}
          </div>

          {/* Elevator Pitch */}
          <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.15, color: 'hsl(210 20% 12%)', maxWidth: 1400, marginBottom: 8 }}>
            {valueProp.elevatorPitch}
          </h1>
          <p style={{ fontSize: 18, color: 'hsl(210 10% 45%)', maxWidth: 1200, lineHeight: 1.5, marginBottom: 36 }}>
            {valueProp.combinedNarrative.length > 260 ? valueProp.combinedNarrative.slice(0, 260) + '…' : valueProp.combinedNarrative}
          </p>

          {/* Main Grid: Products | Outcomes | Competitive */}
          <div className="flex gap-[32px] flex-1 min-h-0">
            {/* Column 1: Product Roles */}
            <div className="flex-1 flex flex-col gap-[16px]">
              <h2 style={{ fontSize: 16, fontWeight: 700, color: 'hsl(210 100% 40%)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>Solution Components</h2>
              {valueProp.perProduct.slice(0, 4).map((pp) => (
                <div key={pp.product.id} style={{ background: 'white', borderRadius: 12, padding: '16px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'hsl(210 20% 15%)', marginBottom: 4 }}>{pp.product.name}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'hsl(210 100% 45%)', marginBottom: 4 }}>{pp.roleInSolution}</div>
                  <div style={{ fontSize: 12, color: 'hsl(210 10% 50%)' }}>{pp.keyBenefit}</div>
                </div>
              ))}
            </div>

            {/* Column 2: Customer Outcomes */}
            <div className="flex-1 flex flex-col gap-[16px]">
              <h2 style={{ fontSize: 16, fontWeight: 700, color: 'hsl(210 100% 40%)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>Customer Outcomes</h2>
              {topOutcomes.map((outcome, i) => (
                <div key={i} style={{ background: 'white', borderRadius: 12, padding: '16px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'hsl(210 20% 15%)', marginBottom: 4 }}>{outcome.outcome}</div>
                  <div style={{ fontSize: 12, color: 'hsl(210 10% 50%)' }}>{outcome.howDelivered}</div>
                  {outcome.productsInvolved.length > 0 && (
                    <div className="flex gap-[6px] mt-[8px] flex-wrap">
                      {outcome.productsInvolved.map(name => (
                        <span key={name} style={{ fontSize: 10, fontWeight: 600, color: 'hsl(210 100% 40%)', background: 'hsl(210 100% 95%)', borderRadius: 6, padding: '2px 8px' }}>
                          {name.split(' ').slice(-2).join(' ')}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Column 3: Competitive Edge */}
            <div className="flex-1 flex flex-col gap-[16px]">
              <h2 style={{ fontSize: 16, fontWeight: 700, color: 'hsl(210 100% 40%)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>Why AT&T</h2>
              <div style={{ background: 'white', borderRadius: 12, padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', flex: 1 }}>
                <p style={{ fontSize: 14, color: 'hsl(210 20% 15%)', lineHeight: 1.6, marginBottom: 16 }}>
                  {valueProp.competitivePositioning.primaryMessage.length > 180 ? valueProp.competitivePositioning.primaryMessage.slice(0, 180) + '…' : valueProp.competitivePositioning.primaryMessage}
                </p>
                <div className="flex flex-col gap-[10px]">
                  {topAdvantages.map((adv, i) => (
                    <div key={i} className="flex items-start gap-[8px]">
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'hsl(210 100% 50%)', marginTop: 6, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: 'hsl(210 10% 35%)' }}>{adv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer: Synergies */}
          {topSynergies.length > 0 && (
            <div className="flex items-center gap-[24px] mt-[24px] pt-[20px]" style={{ borderTop: '1px solid hsl(210 20% 88%)' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'hsl(210 100% 40%)', textTransform: 'uppercase', letterSpacing: 1.2 }}>Synergies</span>
              {topSynergies.map((syn, i) => (
                <span key={i} style={{ fontSize: 13, color: 'hsl(210 10% 40%)' }}>✦ {syn}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);

ValuePropSlide.displayName = 'ValuePropSlide';

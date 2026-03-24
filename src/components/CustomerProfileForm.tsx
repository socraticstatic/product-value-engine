import { useEffect, useRef, useState } from 'react';
import { CustomerProfile } from '@/types/customer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building2, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { FormProgress } from './form/FormProgress';
import { StepBusinessInfo } from './form/StepBusinessInfo';
import { StepCurrentSituation } from './form/StepCurrentSituation';
import { StepChallengesPriorities } from './form/StepChallengesPriorities';
import { LivePreview } from './form/LivePreview';

interface CustomerProfileFormProps {
  onSubmit: (profile: CustomerProfile) => void;
}

const FORM_STEPS = [
  { title: 'Business', description: 'Customer basics' },
  { title: 'Situation', description: 'Current setup' },
  { title: 'Challenges', description: 'Pain points & priorities' },
  { title: 'Review', description: 'Generate battlecard' },
];

export function CustomerProfileForm({ onSubmit }: CustomerProfileFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const topRef = useRef<HTMLDivElement | null>(null);

  const [profile, setProfile] = useState<CustomerProfile>({
    type: 'small-business',
    industry: '',
    employeeCount: '11-50',
    locations: '1',
    budget: 'balanced',
    priorities: [],
    currentProvider: [],
    painPoints: [],
    existingServices: [],
  });

  const handleUpdate = (updates: Partial<CustomerProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  const canProceed = () => {
    // All steps are optional - users can advance freely
    return true;
  };

  useEffect(() => {
    // UX fix: when advancing steps, ensure the new step content is visible
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [currentStep]);

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, FORM_STEPS.length - 1));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const isLastStep = currentStep === FORM_STEPS.length - 1;

  const isComplete = true; // Allow generation at any time

  return (
    <Card className="p-6 shadow-card bg-card animate-fade-in">
      <div ref={topRef} />
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Building2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Create Your Battlecard</h2>
          <p className="text-sm text-muted-foreground">Build a customized battlecard for your specific customer</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormProgress 
          currentStep={currentStep} 
          totalSteps={FORM_STEPS.length} 
          steps={FORM_STEPS}
        />

        {/* Step Content */}
        <div className="min-h-[320px]">
          {currentStep === 0 && (
            <StepBusinessInfo profile={profile} onUpdate={handleUpdate} />
          )}
          {currentStep === 1 && (
            <StepCurrentSituation profile={profile} onUpdate={handleUpdate} />
          )}
          {currentStep === 2 && (
            <StepChallengesPriorities profile={profile} onUpdate={handleUpdate} />
          )}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-foreground">Ready to Generate</h3>
                <p className="text-sm text-muted-foreground">
                  Review your selections below, then click Generate to create your personalized battlecard.
                </p>
              </div>
              <LivePreview profile={profile} />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="flex items-center gap-3">
            {!isLastStep ? (
              <Button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className="gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!isComplete}
                className="gap-2"
              >
                <Zap className="w-4 h-4" />
                Generate Battlecard
              </Button>
            )}
          </div>
        </div>
      </form>
    </Card>
  );
}

import { useDemoMode } from '@/contexts/DemoModeContext';
import { cn } from '@/lib/utils';

interface DemoBlurProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
  as?: 'span' | 'div' | 'p';
}

const BLUR_PX: Record<NonNullable<DemoBlurProps['intensity']>, number> = {
  light: 3,
  medium: 4,
  heavy: 6,
};

/**
 * DemoBlur - Conditionally applies blur styling based on demo mode.
 * 
 * Usage:
 * - Wrap sensitive text (value props, talking points, objection responses) with <DemoBlur>
 * - Headlines and titles should NOT be wrapped (stay visible)
 * 
 * @param intensity - 'light' (3px), 'medium' (4px, default), 'heavy' (6px)
 * @param as - HTML element to render ('span' default, 'div', or 'p')
 */
export function DemoBlur({ 
  children, 
  className, 
  intensity = 'medium',
  as: Component = 'span'
}: DemoBlurProps) {
  const { isDemoMode } = useDemoMode();
  
  if (!isDemoMode) {
    return <>{children}</>;
  }

  // Use inline style for the blur to ensure it always takes effect (some CSS layering/setups
  // can inadvertently prevent the class-based filter from applying).
  const blurPx = BLUR_PX[intensity];
  
  return (
    <Component
      data-demo-blur="true"
      style={{ filter: `blur(${blurPx}px)` }}
      className={cn(`demo-blur-${intensity}`, className)}
    >
      {children}
    </Component>
  );
}

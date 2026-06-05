import type { ReactNode } from 'react'
import StepIndicator from './StepIndicator'
import Logo from './Logo'

interface OnboardingLayoutProps {
  children: ReactNode
  currentStep: number
  totalSteps: number
  stepLabels: string[]
  showSteps?: boolean
  wide?: boolean
}

export default function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  stepLabels,
  showSteps = true,
  wide = false,
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="px-6 py-5 flex items-center">
        <Logo />
      </header>

      {showSteps && (
        <div className="px-6 pb-4 flex flex-col items-center gap-3">
          <span className="text-sm text-brand-text-secondary">
            Step {currentStep} of {totalSteps}
          </span>
          <StepIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            labels={stepLabels}
          />
        </div>
      )}

      <main className="flex-1 flex items-start justify-center px-6 py-8">
        <div className={`w-full ${wide ? 'max-w-4xl' : 'max-w-md'}`}>{children}</div>
      </main>

      <footer className="px-6 py-4 text-center text-xs text-brand-text-secondary">
        &copy; 2026 yuzu.cx &middot; All rights reserved
      </footer>
    </div>
  )
}

import type { ReactNode } from 'react'
import StepIndicator from './StepIndicator'

interface OnboardingLayoutProps {
  children: ReactNode
  currentStep: number
  totalSteps: number
  stepLabels: string[]
  showSteps?: boolean
}

export default function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  stepLabels,
  showSteps = true,
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-brand-warm flex flex-col">
      <header className="px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-yuzu-900 flex items-center justify-center">
            <span className="text-yuzu-400 font-bold text-sm">Y</span>
          </div>
          <span className="font-semibold text-brand-text text-lg">yuzu</span>
        </div>
        {showSteps && (
          <span className="text-sm text-brand-text-secondary">
            Step {currentStep} of {totalSteps}
          </span>
        )}
      </header>

      {showSteps && (
        <div className="px-6 pb-4">
          <StepIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            labels={stepLabels}
          />
        </div>
      )}

      <main className="flex-1 flex items-start justify-center px-6 py-8">
        <div className="w-full max-w-md">{children}</div>
      </main>

      <footer className="px-6 py-4 text-center text-xs text-brand-text-secondary">
        &copy; 2026 yuzu.cx &middot; All rights reserved
      </footer>
    </div>
  )
}

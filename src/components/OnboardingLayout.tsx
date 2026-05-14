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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-yuzu-50 flex flex-col">
      <header className="px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-yuzu-400 flex items-center justify-center">
            <span className="text-white font-bold text-sm">Y</span>
          </div>
          <span className="font-semibold text-slate-900 text-lg">yuzu</span>
        </div>
        {showSteps && (
          <span className="text-sm text-slate-400">
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

      <footer className="px-6 py-4 text-center text-xs text-slate-400">
        &copy; 2026 yuzu.cx &middot; All rights reserved
      </footer>
    </div>
  )
}

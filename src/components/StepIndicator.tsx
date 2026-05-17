import { Check } from 'lucide-react'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  labels: string[]
}

export default function StepIndicator({
  currentStep,
  totalSteps,
  labels,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-1 max-w-2xl mx-auto">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1
        const isComplete = step < currentStep
        const isCurrent = step === currentStep

        return (
          <div key={step} className="flex-1 flex flex-col items-center gap-1.5">
            <div className="flex items-center w-full">
              <div
                className={`
                  w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 transition-all
                  ${isComplete ? 'bg-yuzu-900 text-white' : ''}
                  ${isCurrent ? 'bg-yuzu-400 text-yuzu-900 ring-4 ring-yuzu-100' : ''}
                  ${!isComplete && !isCurrent ? 'bg-neutral-200 text-neutral-400' : ''}
                `}
              >
                {isComplete ? <Check className="w-3.5 h-3.5" /> : step}
              </div>
              {step < totalSteps && (
                <div
                  className={`flex-1 h-0.5 mx-1 transition-all ${
                    isComplete ? 'bg-yuzu-900' : 'bg-neutral-200'
                  }`}
                />
              )}
            </div>
            <span
              className={`text-[11px] leading-tight text-center ${
                isCurrent ? 'text-brand-text font-medium' : 'text-brand-text-secondary'
              }`}
            >
              {labels[i]}
            </span>
          </div>
        )
      })}
    </div>
  )
}

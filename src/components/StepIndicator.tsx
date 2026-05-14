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
                  w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium shrink-0 transition-all
                  ${isComplete ? 'bg-yuzu-400 text-white' : ''}
                  ${isCurrent ? 'bg-yuzu-400 text-white ring-4 ring-yuzu-100' : ''}
                  ${!isComplete && !isCurrent ? 'bg-slate-200 text-slate-400' : ''}
                `}
              >
                {isComplete ? <Check className="w-3.5 h-3.5" /> : step}
              </div>
              {step < totalSteps && (
                <div
                  className={`flex-1 h-0.5 mx-1 transition-all ${
                    isComplete ? 'bg-yuzu-400' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
            <span
              className={`text-[11px] leading-tight text-center ${
                isCurrent ? 'text-slate-700 font-medium' : 'text-slate-400'
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

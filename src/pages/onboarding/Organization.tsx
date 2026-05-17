import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronLeft } from 'lucide-react'
import OnboardingLayout from '../../components/OnboardingLayout'

const STEP_LABELS = ['Email', 'Verify', 'Business', 'Organization', 'Profile', 'Plan', 'Payment', 'Workspace']

const CUSTOMER_TYPES = [
  { value: '', label: 'Choose one' },
  { value: 'b2c', label: 'Consumers (B2C)' },
  { value: 'b2b', label: 'Other businesses (B2B)' },
  { value: 'support', label: 'Clients needing support to set up yuzu' },
  { value: 'none', label: 'None of these' },
]

const USE_CASES = [
  'Lead generation & sales',
  'Booking appointments or demos',
  'Customer support',
  'Receive payment',
  'Sending bulk broadcasts',
  'Team collaboration',
  'Others',
]

export default function Organization() {
  const navigate = useNavigate()
  const [customerType, setCustomerType] = useState('')
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const toggleUseCase = (useCase: string) => {
    setSelectedUseCases((prev) =>
      prev.includes(useCase) ? prev.filter((u) => u !== useCase) : [...prev, useCase]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!customerType) newErrors.customerType = 'Please select a customer type'
    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return
    }
    navigate('/onboarding/setup-profile')
  }

  return (
    <OnboardingLayout currentStep={4} totalSteps={8} stepLabels={STEP_LABELS}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-text">
          Help us get to know your organization
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="customerType" className="block text-sm font-medium text-brand-text-secondary mb-1.5">
            Who are your main customers? <span className="text-red-500">*</span>
          </label>
          <select
            id="customerType"
            value={customerType}
            onChange={(e) => { setCustomerType(e.target.value); setErrors({}) }}
            className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-text focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition appearance-none"
          >
            {CUSTOMER_TYPES.map((ct) => (
              <option key={ct.value} value={ct.value}>{ct.label}</option>
            ))}
          </select>
          {errors.customerType && <p className="mt-1 text-sm text-red-500">{errors.customerType}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-text-secondary mb-3">
            What will you use yuzu for?
          </label>
          <div className="space-y-2.5">
            {USE_CASES.map((uc) => (
              <label key={uc} onClick={() => toggleUseCase(uc)} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  selectedUseCases.includes(uc) ? 'bg-yuzu-400 border-yuzu-400' : 'border-neutral-300 group-hover:border-neutral-400'
                }`}>
                  {selectedUseCases.includes(uc) && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-brand-text">{uc}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div>
            <p className="text-sm text-brand-text-secondary">Step 2 of 3</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/onboarding/profile')}
              className="flex items-center gap-1 text-sm text-brand-text-secondary hover:text-brand-text transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-brand-text font-medium px-6 py-2.5 rounded-lg transition-colors text-sm"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </OnboardingLayout>
  )
}

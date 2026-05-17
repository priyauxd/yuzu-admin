import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'
import OnboardingLayout from '../../components/OnboardingLayout'

const STEP_LABELS = ['Email', 'Verify', 'Setup', 'Plan', 'Done']

export default function Email() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isReturning = searchParams.get('returning') === 'true'
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid work email')
      return
    }
    navigate('/onboarding/verify-otp', { state: { email } })
  }

  return (
    <OnboardingLayout
      currentStep={1}
      totalSteps={5}
      stepLabels={STEP_LABELS}
    >
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-yuzu-50 flex items-center justify-center mx-auto mb-4 border border-yuzu-300/30">
          <Mail className="w-7 h-7 text-yuzu-900" />
        </div>
        <h1 className="text-2xl font-bold text-brand-text mb-2">
          {isReturning ? 'Welcome back' : 'Create your workspace'}
        </h1>
        <p className="text-brand-text-secondary">
          {isReturning
            ? 'Enter your email to sign in'
            : 'Enter your work email to get started'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-brand-text mb-1.5"
          >
            Work email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
            className="w-full px-4 py-3 rounded-full border border-brand-border bg-white text-brand-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition"
            autoFocus
          />
          {error && (
            <p className="mt-1.5 text-sm text-red-500">{error}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-yuzu-400 hover:bg-yuzu-300 text-white font-semibold py-3 rounded-full transition-colors shadow-[0_4px_14px_rgba(246,196,83,0.45)]"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="mt-6 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-brand-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-white text-brand-text-secondary">
            or continue with
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-brand-border bg-white hover:bg-brand-hover text-sm font-medium text-brand-text transition-colors">
          <span className="text-base">🇦🇪</span>
          UAE Pass
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-brand-border bg-white hover:bg-brand-hover text-sm font-medium text-brand-text transition-colors">
          <span className="font-bold text-blue-500">G</span>
          Google / MS
        </button>
      </div>
    </OnboardingLayout>
  )
}

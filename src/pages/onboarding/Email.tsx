import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, Mail, Smartphone } from 'lucide-react'
import OnboardingLayout from '../../components/OnboardingLayout'

const STEP_LABELS = ['Account', 'Verify', 'Setup', 'Plan', 'Done']

type LoginMethod = 'email' | 'mobile'

export default function Email() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isReturning = searchParams.get('returning') === 'true'
  const [method, setMethod] = useState<LoginMethod>('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (method === 'email') {
      if (!email.includes('@') || !email.includes('.')) {
        setError('Please enter a valid work email')
        return
      }
      navigate('/onboarding/verify-otp', { state: { email, method: 'email' } })
    } else {
      const digits = phone.replace(/\D/g, '')
      if (digits.length < 7) {
        setError('Please enter a valid mobile number')
        return
      }
      navigate('/onboarding/verify-otp', { state: { phone: `+971 ${phone}`, method: 'mobile' } })
    }
  }

  return (
    <OnboardingLayout
      currentStep={1}
      totalSteps={5}
      stepLabels={STEP_LABELS}
    >
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-yuzu-50 flex items-center justify-center mx-auto mb-4 border border-yuzu-300/30">
          {method === 'email' ? (
            <Mail className="w-7 h-7 text-yuzu-900" />
          ) : (
            <Smartphone className="w-7 h-7 text-yuzu-900" />
          )}
        </div>
        <h1 className="text-2xl font-bold text-brand-text mb-2">
          {isReturning ? 'Welcome back' : 'Create your workspace'}
        </h1>
        <p className="text-brand-text-secondary">
          {isReturning
            ? 'Sign in with your email or mobile number'
            : 'Get started with your email or mobile number'}
        </p>
      </div>

      <div className="flex bg-neutral-100 rounded-full p-1 mb-6">
        <button
          type="button"
          onClick={() => { setMethod('email'); setError('') }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-sm font-medium transition-colors ${
            method === 'email'
              ? 'bg-white text-brand-text shadow-sm'
              : 'text-brand-text-secondary hover:text-brand-text'
          }`}
        >
          <Mail className="w-4 h-4" />
          Email
        </button>
        <button
          type="button"
          onClick={() => { setMethod('mobile'); setError('') }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-sm font-medium transition-colors ${
            method === 'mobile'
              ? 'bg-white text-brand-text shadow-sm'
              : 'text-brand-text-secondary hover:text-brand-text'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          Mobile
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {method === 'email' ? (
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
              className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition"
              autoFocus
            />
          </div>
        ) : (
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-brand-text mb-1.5"
            >
              Mobile number
            </label>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-3 rounded-xl border border-brand-border bg-white text-sm text-brand-text shrink-0">
                <span>🇦🇪</span>
                <span className="text-brand-text-secondary">+971</span>
              </div>
              <input
                id="phone"
                type="tel"
                placeholder="52 892 6463"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                  setError('')
                }}
                className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition"
                autoFocus
              />
            </div>
            <p className="mt-2 text-xs text-brand-text-secondary">
              We'll send the verification code via WhatsApp
            </p>
          </div>
        )}

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

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

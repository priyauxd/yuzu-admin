import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CreditCard, Lock, AlertCircle } from 'lucide-react'
import OnboardingLayout from '../../components/OnboardingLayout'

const STEP_LABELS = ['Email', 'Verify', 'Profile', 'Plan', 'Payment', 'Workspace']

const PLAN_PRICES: Record<string, { name: string; price: number }> = {
  starter: { name: 'Starter', price: 10 },
  business: { name: 'Business', price: 20 },
  enterprise: { name: 'Enterprise', price: 25 },
}

export default function Payment() {
  const navigate = useNavigate()
  const location = useLocation()
  const planId = (location.state as { plan?: string })?.plan || 'business'
  const plan = PLAN_PRICES[planId] || PLAN_PRICES.business
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)
    setError('')
    setTimeout(() => {
      setProcessing(false)
      navigate('/onboarding/workspace-created', { state: { plan: planId } })
    }, 2000)
  }

  return (
    <OnboardingLayout
      currentStep={5}
      totalSteps={6}
      stepLabels={STEP_LABELS}
    >
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-yuzu-50 flex items-center justify-center mx-auto mb-4 border border-yuzu-300/30">
          <CreditCard className="w-7 h-7 text-yuzu-900" />
        </div>
        <h1 className="text-2xl font-bold text-brand-text mb-2">
          Payment details
        </h1>
        <p className="text-brand-text-secondary">
          {plan.name} plan &middot; ${plan.price}/user/month
        </p>
      </div>

      <div className="bg-yuzu-50 border border-yuzu-300/40 rounded-xl p-3 mb-6 flex items-start gap-2.5">
        <Lock className="w-4 h-4 text-yuzu-900 mt-0.5 shrink-0" />
        <p className="text-sm text-yuzu-900">
          Secured by Telr &middot; PCI DSS 4.0 compliant &middot; AED billing
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-red-800">Payment failed</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handlePayment} className="space-y-4">
        <div>
          <label htmlFor="cardName" className="block text-sm font-medium text-brand-text mb-1.5">
            Name on card
          </label>
          <input
            id="cardName"
            type="text"
            placeholder="Full name as on card"
            className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition"
          />
        </div>

        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-brand-text mb-1.5">
            Card number
          </label>
          <input
            id="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="expiry" className="block text-sm font-medium text-brand-text mb-1.5">
              Expiry date
            </label>
            <input
              id="expiry"
              type="text"
              placeholder="MM/YY"
              maxLength={5}
              className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition"
            />
          </div>
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-brand-text mb-1.5">
              CVV
            </label>
            <input
              id="cvv"
              type="text"
              placeholder="123"
              maxLength={4}
              className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={processing}
          className="w-full flex items-center justify-center gap-2 bg-yuzu-400 hover:bg-yuzu-300 disabled:bg-neutral-200 disabled:text-neutral-400 text-white font-semibold py-3 rounded-full shadow-[0_4px_14px_rgba(246,196,83,0.45)] transition-colors mt-2"
        >
          {processing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              Pay &amp; Create Workspace
            </>
          )}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-brand-text-secondary">
        14-day free trial. You won&apos;t be charged today.
      </p>
    </OnboardingLayout>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import OnboardingLayout from '../../components/OnboardingLayout'

const STEP_LABELS = ['Account', 'Verify', 'Setup', 'Plan', 'Done']

type Billing = 'monthly' | 'quarterly' | 'annual'

const BILLING_OPTIONS: { key: Billing; label: string; discount: number; badge?: string }[] = [
  { key: 'monthly',   label: 'Monthly',   discount: 0 },
  { key: 'quarterly', label: 'Quarterly', discount: 10, badge: '10% off' },
  { key: 'annual',    label: 'Annual',    discount: 20, badge: '20% off' },
]

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    basePrice: 0,
    description: 'Free for small teams',
    features: [
      'Up to 5 users',
      'Internal messaging only',
      'Channels & DMs',
      'Voice notes',
      'Mini tasks',
    ],
  },
  {
    id: 'team',
    name: 'Team',
    basePrice: 10,
    description: 'For small growing teams',
    features: [
      'Up to 20 members',
      'Everything in Starter',
      'WhatsApp integration',
      'Basic analytics',
      'Email support',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    basePrice: 20,
    description: 'For growing teams that need more',
    popular: true,
    features: [
      'Up to 50 members',
      'Everything in Team',
      'Priority inbox',
      'Knowledge base',
      'AI suggested replies',
      'SLA monitoring',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    basePrice: 25,
    description: 'For large organizations',
    features: [
      'Unlimited members',
      'Everything in Business',
      'UAE Pass SSO',
      'Audit logs & PDPL export',
      'Custom escalation tiers',
      'Dedicated support',
    ],
  },
]

function calcPrice(base: number, billing: Billing) {
  if (base === 0) return 0
  const discount = BILLING_OPTIONS.find(b => b.key === billing)!.discount
  return Math.round(base * (1 - discount / 100))
}

export default function Plan() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState('business')
  const [billing, setBilling] = useState<Billing>('monthly')

  const handleContinue = () => {
    const plan = PLANS.find(p => p.id === selected)!
    const price = calcPrice(plan.basePrice, billing)
    if (price === 0) {
      navigate('/onboarding/workspace-created', { state: { plan: selected, billing } })
    } else {
      navigate('/onboarding/payment', { state: { plan: selected, billing, price } })
    }
  }

  return (
    <OnboardingLayout currentStep={4} totalSteps={5} stepLabels={STEP_LABELS} wide>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-brand-text mb-2">Choose your plan</h1>
        <p className="text-brand-text-secondary text-sm">
          All plans include a 14-day free trial. Cancel anytime.
        </p>
      </div>

      {/* Billing toggle */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center bg-neutral-100 rounded-full p-1 gap-0.5">
          {BILLING_OPTIONS.map(({ key, label, badge }) => (
            <button
              key={key}
              onClick={() => setBilling(key)}
              className={`relative flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                billing === key
                  ? 'bg-white text-brand-text shadow-sm'
                  : 'text-brand-text-secondary hover:text-brand-text'
              }`}
            >
              {label}
              {badge && (
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                  billing === key ? 'bg-green-100 text-green-700' : 'bg-neutral-200 text-neutral-500'
                }`}>
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {PLANS.map((plan) => {
          const price = calcPrice(plan.basePrice, billing)
          const isSelected = selected === plan.id
          return (
            <button
              key={plan.id}
              onClick={() => setSelected(plan.id)}
              className={`text-left p-4 rounded-2xl border-2 transition-all relative flex flex-col ${
                isSelected
                  ? 'border-yuzu-400 bg-yuzu-50 shadow-sm'
                  : 'border-brand-border bg-white hover:border-neutral-300'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-2.5 right-3 bg-yuzu-900 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Popular
                </span>
              )}
              <div className="mb-2">
                <h3 className="font-semibold text-brand-text">{plan.name}</h3>
                <p className="text-xs text-brand-text-secondary leading-snug">{plan.description}</p>
              </div>
              <div className="mb-3">
                {price === 0 ? (
                  <span className="text-2xl font-bold text-brand-text">Free</span>
                ) : (
                  <>
                    <span className="text-2xl font-bold text-brand-text">${price}</span>
                    <span className="text-xs text-brand-text-secondary">/user/mo</span>
                  </>
                )}
                {plan.basePrice > 0 && billing !== 'monthly' && (
                  <p className="text-[10px] text-green-600 font-medium mt-0.5">
                    Save {BILLING_OPTIONS.find(b => b.key === billing)!.discount}% vs monthly
                  </p>
                )}
              </div>
              <ul className="space-y-1.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-1.5 text-xs text-brand-text-tertiary">
                    <Check className={`w-3 h-3 shrink-0 mt-0.5 ${isSelected ? 'text-yuzu-900' : 'text-neutral-300'}`} />
                    {f}
                  </li>
                ))}
              </ul>
            </button>
          )
        })}
      </div>

      <button
        onClick={handleContinue}
        className="w-full max-w-md mx-auto flex items-center justify-center gap-2 bg-yuzu-400 hover:bg-yuzu-300 text-white font-semibold py-3 rounded-full transition-colors shadow-[0_4px_14px_rgba(246,196,83,0.45)] mt-6"
      >
        Start Free Trial
        <ArrowRight className="w-4 h-4" />
      </button>

      <p className="mt-3 text-center text-xs text-brand-text-secondary">
        Billed {billing === 'monthly' ? 'monthly' : billing === 'quarterly' ? 'every 3 months' : 'annually'} in AED. Pro-rata for mid-cycle additions.
      </p>
    </OnboardingLayout>
  )
}

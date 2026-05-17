import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import OnboardingLayout from '../../components/OnboardingLayout'

const STEP_LABELS = ['Email', 'Verify', 'Setup', 'Plan', 'Done']

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
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
    id: 'business',
    name: 'Business',
    price: 20,
    description: 'For growing teams that need more',
    popular: true,
    features: [
      'Up to 50 members',
      'Everything in Starter',
      'Priority inbox',
      'Knowledge base',
      'AI suggested replies',
      'SLA monitoring',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 25,
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

export default function Plan() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState('business')

  const handleContinue = () => {
    navigate('/onboarding/workspace-created', { state: { plan: selected } })
  }

  return (
    <OnboardingLayout
      currentStep={4}
      totalSteps={5}
      stepLabels={STEP_LABELS}
      wide
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-brand-text mb-2">
          Choose your plan
        </h1>
        <p className="text-brand-text-secondary">
          All plans include a 14-day free trial. Cancel anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            className={`text-left p-5 rounded-2xl border-2 transition-all relative flex flex-col ${
              selected === plan.id
                ? 'border-yuzu-400 bg-yuzu-50 shadow-sm'
                : 'border-brand-border bg-white hover:border-neutral-300'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-2.5 right-4 bg-yuzu-900 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                Popular
              </span>
            )}
            <div className="mb-3">
              <h3 className="font-semibold text-brand-text text-lg">{plan.name}</h3>
              <p className="text-sm text-brand-text-secondary">{plan.description}</p>
            </div>
            <div className="mb-4">
              {plan.price === 0 ? (
                <span className="text-3xl font-bold text-brand-text">Free</span>
              ) : (
                <>
                  <span className="text-3xl font-bold text-brand-text">
                    ${plan.price}
                  </span>
                  <span className="text-sm text-brand-text-secondary">/user/mo</span>
                </>
              )}
            </div>
            <ul className="space-y-2 flex-1">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm text-brand-text-tertiary"
                >
                  <Check
                    className={`w-3.5 h-3.5 shrink-0 ${
                      selected === plan.id ? 'text-yuzu-900' : 'text-neutral-300'
                    }`}
                  />
                  {f}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      <button
        onClick={handleContinue}
        className="w-full max-w-md mx-auto flex items-center justify-center gap-2 bg-yuzu-400 hover:bg-yuzu-300 text-white font-semibold py-3 rounded-full transition-colors shadow-[0_4px_14px_rgba(246,196,83,0.45)] mt-8"
      >
        Start Free Trial
        <ArrowRight className="w-4 h-4" />
      </button>

      <p className="mt-3 text-center text-xs text-brand-text-secondary">
        Billed monthly in AED. Pro-rata for mid-cycle additions.
      </p>
    </OnboardingLayout>
  )
}

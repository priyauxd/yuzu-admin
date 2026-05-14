import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import OnboardingLayout from '../../components/OnboardingLayout'

const STEP_LABELS = ['Email', 'Verify', 'Profile', 'Plan', 'Payment', 'Workspace']

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 10,
    description: 'For small teams getting started',
    features: [
      'Up to 10 members',
      'Channels & DMs',
      'Voice notes',
      'Mini tasks',
      'Basic AI features',
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
    navigate('/onboarding/payment', { state: { plan: selected } })
  }

  return (
    <OnboardingLayout
      currentStep={4}
      totalSteps={6}
      stepLabels={STEP_LABELS}
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Choose your plan
        </h1>
        <p className="text-slate-500">
          All plans include a 14-day free trial. Cancel anytime.
        </p>
      </div>

      <div className="space-y-3">
        {PLANS.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all relative ${
              selected === plan.id
                ? 'border-yuzu-400 bg-yuzu-50/50 shadow-sm'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-2.5 right-4 bg-yuzu-400 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                Popular
              </span>
            )}
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-slate-900">{plan.name}</h3>
                <p className="text-sm text-slate-500">{plan.description}</p>
              </div>
              <div className="text-right shrink-0 ml-4">
                <span className="text-2xl font-bold text-slate-900">
                  ${plan.price}
                </span>
                <span className="text-sm text-slate-400">/user/mo</span>
              </div>
            </div>
            <ul className="mt-3 space-y-1.5">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm text-slate-600"
                >
                  <Check
                    className={`w-3.5 h-3.5 shrink-0 ${
                      selected === plan.id ? 'text-yuzu-500' : 'text-slate-300'
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
        className="w-full flex items-center justify-center gap-2 bg-yuzu-400 hover:bg-yuzu-500 text-white font-semibold py-3 rounded-xl transition-colors mt-6"
      >
        Continue to Payment
        <ArrowRight className="w-4 h-4" />
      </button>

      <p className="mt-3 text-center text-xs text-slate-400">
        Billed monthly in AED. Pro-rata for mid-cycle additions.
      </p>
    </OnboardingLayout>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronLeft, Shield } from 'lucide-react'
import OnboardingLayout from '../../components/OnboardingLayout'

const STEP_LABELS = ['Account', 'Verify', 'Business', 'Organization', 'Profile', 'Plan', 'Payment', 'Workspace']

const ROLES = [
  { value: '', label: 'Choose one' },
  { value: 'owner', label: 'Owner' },
  { value: 'cto', label: 'CTO / Tech Lead' },
  { value: 'ops', label: 'Operations Manager' },
  { value: 'sales', label: 'Sales Manager' },
  { value: 'support', label: 'Support Manager' },
  { value: 'marketing', label: 'Marketing Manager' },
  { value: 'employee', label: 'Employee' },
  { value: 'other', label: 'Other' },
]

const REFERRAL_SOURCES = [
  { value: '', label: 'Choose one' },
  { value: 'friend', label: 'Friend or colleague' },
  { value: 'google', label: 'Google search' },
  { value: 'social', label: 'Social media' },
  { value: 'review', label: 'Review site (G2, Capterra)' },
  { value: 'event', label: 'Event or conference' },
  { value: 'ad', label: 'Online ad' },
  { value: 'other', label: 'Other' },
]

export default function SetupProfile() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    role: '',
    phone: '',
    referral: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!form.role) newErrors.role = 'Please select your role'
    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return
    }
    navigate('/onboarding/plan')
  }

  return (
    <OnboardingLayout currentStep={5} totalSteps={8} stepLabels={STEP_LABELS}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-text">
          Last step, let's set up your profile
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-brand-text-secondary mb-1.5">
            What is your role at your organization? <span className="text-red-500">*</span>
          </label>
          <select
            id="role"
            value={form.role}
            onChange={(e) => update('role', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-text focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition appearance-none"
          >
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
          {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-brand-text-secondary mb-1.5">
            What is your phone number?
          </label>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-3 rounded-xl border border-brand-border bg-white text-sm text-brand-text shrink-0">
              <span>🇦🇪</span>
              <span className="text-brand-text-secondary">+971</span>
            </div>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition"
              placeholder="52 892 6463"
            />
          </div>
          <div className="mt-2 flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2">
            <Shield className="w-4 h-4 text-blue-500 shrink-0" />
            <span className="text-xs text-blue-700">We won't share your phone number with anyone.</span>
          </div>
        </div>

        <div>
          <label htmlFor="referral" className="block text-sm font-medium text-brand-text-secondary mb-1.5">
            How did you hear about us?
          </label>
          <select
            id="referral"
            value={form.referral}
            onChange={(e) => update('referral', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-text focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition appearance-none"
          >
            {REFERRAL_SOURCES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div>
            <p className="text-sm text-brand-text-secondary">Step 3 of 3</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/onboarding/organization')}
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

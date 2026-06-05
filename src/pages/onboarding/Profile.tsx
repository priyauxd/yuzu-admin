import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import OnboardingLayout from '../../components/OnboardingLayout'

const STEP_LABELS = ['Account', 'Verify', 'Setup', 'Plan', 'Done']

const INDUSTRIES = [
  { value: '', label: 'Choose one' },
  { value: 'delivery', label: 'Delivery & Logistics' },
  { value: 'sales', label: 'Sales / Real Estate' },
  { value: 'operations', label: 'Operations & Field Services' },
  { value: 'hospitality', label: 'Hospitality & F&B' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'retail', label: 'Retail & E-commerce' },
  { value: 'tech', label: 'Technology & SaaS' },
  { value: 'other', label: 'Other' },
]

const COMPANY_SIZES = ['1-10', '11-20', '21-50', '51-200', '201-1,000', 'More than 1,000']

const ROLES = [
  { value: '', label: 'Choose one' },
  { value: 'owner', label: 'Owner / Founder' },
  { value: 'cto', label: 'CTO / Tech Lead' },
  { value: 'ops', label: 'Operations Manager' },
  { value: 'sales', label: 'Sales Manager' },
  { value: 'support', label: 'Support Manager' },
  { value: 'employee', label: 'Employee' },
  { value: 'other', label: 'Other' },
]

export default function Profile() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    orgName: '',
    industry: '',
    companySize: '',
    role: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!form.orgName.trim()) newErrors.orgName = 'Organization name is required'
    if (!form.industry) newErrors.industry = 'Please select an industry'
    if (!form.companySize) newErrors.companySize = 'Please select company size'
    if (!form.role) newErrors.role = 'Please select your role'
    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return
    }
    navigate('/onboarding/plan')
  }

  return (
    <OnboardingLayout currentStep={3} totalSteps={5} stepLabels={STEP_LABELS}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-text mb-1">
          Set up your workspace
        </h1>
        <p className="text-brand-text-secondary text-sm">Tell us about you and your business to get started.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="orgName" className="block text-sm font-medium text-brand-text-secondary mb-1.5">
              Organization name <span className="text-red-500">*</span>
            </label>
            <input
              id="orgName"
              type="text"
              value={form.orgName}
              onChange={(e) => update('orgName', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition"
              placeholder="E.g. yuzu.cx"
              autoFocus
            />
            {errors.orgName && <p className="mt-1 text-sm text-red-500">{errors.orgName}</p>}
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-brand-text-secondary mb-1.5">
              Your role <span className="text-red-500">*</span>
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
        </div>

        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-brand-text-secondary mb-1.5">
            Industry <span className="text-red-500">*</span>
          </label>
          <select
            id="industry"
            value={form.industry}
            onChange={(e) => update('industry', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-text focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition appearance-none"
          >
            {INDUSTRIES.map((ind) => (
              <option key={ind.value} value={ind.value}>{ind.label}</option>
            ))}
          </select>
          {errors.industry && <p className="mt-1 text-sm text-red-500">{errors.industry}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-text-secondary mb-3">
            Company size <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {COMPANY_SIZES.map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => update('companySize', size)}
                className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  form.companySize === size
                    ? 'border-yuzu-400 bg-yuzu-50 text-yuzu-900'
                    : 'border-brand-border bg-white text-brand-text-secondary hover:border-neutral-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {errors.companySize && <p className="mt-1 text-sm text-red-500">{errors.companySize}</p>}
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-yuzu-400 hover:bg-yuzu-300 text-white font-semibold py-3 rounded-full transition-colors shadow-[0_4px_14px_rgba(246,196,83,0.45)] mt-2"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </OnboardingLayout>
  )
}

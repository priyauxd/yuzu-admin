import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import OnboardingLayout from '../../components/OnboardingLayout'

const STEP_LABELS = ['Account', 'Verify', 'Setup', 'Plan', 'Done']
const OTP_LENGTH = 6

interface LocationState {
  email?: string
  phone?: string
  method?: 'email' | 'mobile'
}

export default function VerifyOtp() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state as LocationState) || {}
  const isWhatsApp = state.method === 'mobile'
  const identifier = isWhatsApp ? state.phone || 'your number' : state.email || 'your email'

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [error, setError] = useState('')
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const next = [...otp]
    next[index] = value.slice(-1)
    setOtp(next)
    setError('')
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const code = otp.join('')
    if (code.length < OTP_LENGTH) {
      setError('Please enter the full verification code')
      return
    }
    navigate('/onboarding/profile', { state: { email: state.email, phone: state.phone, method: state.method } })
  }

  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={5}
      stepLabels={STEP_LABELS}
    >
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-yuzu-50 flex items-center justify-center mx-auto mb-4 border border-yuzu-300/30">
          <ShieldCheck className="w-7 h-7 text-yuzu-900" />
        </div>
        <h1 className="text-2xl font-bold text-brand-text mb-2">
          {isWhatsApp ? 'Check your WhatsApp' : 'Check your email'}
        </h1>
        <p className="text-brand-text-secondary">
          We sent a 6-digit code to{' '}
          <span className="font-medium text-brand-text">{identifier}</span>
          {isWhatsApp && ' via WhatsApp'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center gap-2.5">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-14 h-14 text-center text-xl font-semibold rounded-xl border border-brand-border bg-white text-brand-text focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition"
            />
          ))}
        </div>
        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-yuzu-400 hover:bg-yuzu-300 text-white font-semibold py-3 rounded-full transition-colors shadow-[0_4px_14px_rgba(246,196,83,0.45)]"
        >
          Verify &amp; Continue
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-brand-text-secondary">
        Didn&apos;t receive the code?{' '}
        <button className="text-yuzu-900 hover:text-yuzu-800 font-medium">
          Resend{isWhatsApp ? ' via WhatsApp' : ''}
        </button>
      </p>
    </OnboardingLayout>
  )
}

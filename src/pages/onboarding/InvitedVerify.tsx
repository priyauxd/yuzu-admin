import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import Logo from '../../components/Logo'

export default function InvitedVerify() {
  const navigate = useNavigate()
  const [method, setMethod] = useState<'uaepass' | 'otp' | null>(null)
  const [displayName, setDisplayName] = useState('')
  const [step, setStep] = useState<'choose' | 'name'>('choose')

  const handleVerify = (m: 'uaepass' | 'otp') => {
    setMethod(m)
    setStep('name')
  }

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    if (!displayName.trim()) return
    navigate('/invite/success', { state: { displayName, method } })
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="px-6 py-5 flex items-center">
        <Logo />
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {step === 'choose' ? (
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-yuzu-50 flex items-center justify-center mx-auto mb-4 border border-yuzu-300/30">
                  <ShieldCheck className="w-7 h-7 text-yuzu-900" />
                </div>
                <h1 className="text-2xl font-bold text-brand-text mb-2">
                  Verify your identity
                </h1>
                <p className="text-brand-text-secondary">
                  Choose how you&apos;d like to verify
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleVerify('uaepass')}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-brand-border bg-white hover:border-yuzu-400 hover:bg-yuzu-50 transition-all text-left"
                >
                  <span className="text-2xl">🇦🇪</span>
                  <div>
                    <h3 className="font-semibold text-brand-text">UAE Pass</h3>
                    <p className="text-sm text-brand-text-secondary">
                      Primary &middot; Instant verification
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handleVerify('otp')}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-brand-border bg-white hover:border-yuzu-400 hover:bg-yuzu-50 transition-all text-left"
                >
                  <span className="text-2xl">✉️</span>
                  <div>
                    <h3 className="font-semibold text-brand-text">
                      Email OTP
                    </h3>
                    <p className="text-sm text-brand-text-secondary">
                      Fallback &middot; Code sent to your email
                    </p>
                  </div>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-yuzu-50 flex items-center justify-center mx-auto mb-4 border border-yuzu-300/30">
                  <ShieldCheck className="w-7 h-7 text-yuzu-900" />
                </div>
                <h1 className="text-2xl font-bold text-brand-text mb-2">
                  Set your display name
                </h1>
                <p className="text-brand-text-secondary">
                  This is how your team will see you
                </p>
              </div>

              <form onSubmit={handleContinue} className="space-y-4">
                <div>
                  <label
                    htmlFor="displayName"
                    className="block text-sm font-medium text-brand-text mb-1.5"
                  >
                    Display name
                  </label>
                  <input
                    id="displayName"
                    type="text"
                    placeholder="Your name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-3 rounded-full border border-brand-border bg-white text-brand-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-yuzu-400 hover:bg-yuzu-300 text-white font-semibold py-3 rounded-full transition-colors shadow-[0_4px_14px_rgba(246,196,83,0.45)]"
                >
                  Join Workspace
                </button>
              </form>
            </>
          )}
        </div>
      </main>

      <footer className="px-6 py-4 text-center text-xs text-brand-text-secondary">
        &copy; 2026 yuzu.cx &middot; All rights reserved
      </footer>
    </div>
  )
}

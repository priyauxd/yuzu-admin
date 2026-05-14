import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-yuzu-50 flex flex-col">
      <header className="px-6 py-5 flex items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-yuzu-400 flex items-center justify-center">
            <span className="text-white font-bold text-sm">Y</span>
          </div>
          <span className="font-semibold text-slate-900 text-lg">yuzu</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {step === 'choose' ? (
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-7 h-7 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">
                  Verify your identity
                </h1>
                <p className="text-slate-500">
                  Choose how you&apos;d like to verify
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleVerify('uaepass')}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-slate-200 bg-white hover:border-yuzu-400 hover:bg-yuzu-50/50 transition-all text-left"
                >
                  <span className="text-2xl">🇦🇪</span>
                  <div>
                    <h3 className="font-semibold text-slate-900">UAE Pass</h3>
                    <p className="text-sm text-slate-500">
                      Primary &middot; Instant verification
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handleVerify('otp')}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-slate-200 bg-white hover:border-yuzu-400 hover:bg-yuzu-50/50 transition-all text-left"
                >
                  <span className="text-2xl">✉️</span>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Email OTP
                    </h3>
                    <p className="text-sm text-slate-500">
                      Fallback &middot; Code sent to your email
                    </p>
                  </div>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-7 h-7 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">
                  Set your display name
                </h1>
                <p className="text-slate-500">
                  This is how your team will see you
                </p>
              </div>

              <form onSubmit={handleContinue} className="space-y-4">
                <div>
                  <label
                    htmlFor="displayName"
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                  >
                    Display name
                  </label>
                  <input
                    id="displayName"
                    type="text"
                    placeholder="Your name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-yuzu-400 hover:bg-yuzu-500 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  Join Workspace
                </button>
              </form>
            </>
          )}
        </div>
      </main>

      <footer className="px-6 py-4 text-center text-xs text-slate-400">
        &copy; 2026 yuzu.cx &middot; All rights reserved
      </footer>
    </div>
  )
}

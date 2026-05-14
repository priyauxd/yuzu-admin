import { useNavigate } from 'react-router-dom'
import { ArrowRight, MessageCircle, Shield, Zap } from 'lucide-react'

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-brand-warm flex flex-col">
      <header className="px-6 py-5 flex items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-yuzu-900 flex items-center justify-center">
            <span className="text-yuzu-400 font-bold text-sm">Y</span>
          </div>
          <span className="font-semibold text-brand-text text-lg">yuzu</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <div className="inline-flex items-center gap-2 bg-yuzu-50 text-yuzu-900 text-sm font-medium px-3 py-1 rounded-full mb-6 border border-yuzu-300/40">
            <Zap className="w-3.5 h-3.5" />
            Built for UAE businesses
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-brand-text tracking-tight leading-tight mb-4">
            Team messaging,
            <br />
            <span className="text-yuzu-900">built for work.</span>
          </h1>

          <p className="text-brand-text-secondary text-lg mb-10 max-w-md mx-auto">
            Channels, voice notes, tasks, and AI — all in one workspace.
            Secure, fast, and designed for your team.
          </p>

          <button
            onClick={() => navigate('/onboarding/email')}
            className="inline-flex items-center gap-2 bg-yuzu-400 hover:bg-yuzu-300 text-white font-semibold px-8 py-3.5 rounded-full text-lg transition-colors shadow-[0_4px_14px_rgba(246,196,83,0.45)]"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="mt-4 text-sm text-brand-text-secondary">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/onboarding/email?returning=true')}
              className="text-yuzu-900 hover:text-yuzu-800 font-medium underline-offset-2 hover:underline"
            >
              Sign in
            </button>
          </p>

          <div className="mt-16 grid grid-cols-3 gap-6 text-center">
            {[
              { icon: MessageCircle, label: 'Channels & DMs' },
              { icon: Shield, label: 'UAE Pass SSO' },
              { icon: Zap, label: 'AI-powered' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-brand-border flex items-center justify-center">
                  <Icon className="w-5 h-5 text-neutral-700" />
                </div>
                <span className="text-xs text-brand-text-secondary font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="px-6 py-4 text-center text-xs text-brand-text-secondary">
        &copy; 2026 yuzu.cx &middot; All rights reserved
      </footer>
    </div>
  )
}

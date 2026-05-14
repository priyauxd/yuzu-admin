import { useNavigate } from 'react-router-dom'
import { ArrowRight, Download, Monitor, Smartphone } from 'lucide-react'
import Logo from '../../components/Logo'

export default function InvitedLanding() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-brand-warm flex flex-col">
      <header className="px-6 py-5 flex items-center">
        <Logo />
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-yuzu-50 flex items-center justify-center mx-auto mb-6 border border-yuzu-300/30">
            <Download className="w-8 h-8 text-yuzu-900" />
          </div>

          <h1 className="text-2xl font-bold text-brand-text mb-2">
            You&apos;ve been invited!
          </h1>
          <p className="text-brand-text-secondary mb-8">
            Your team is waiting for you on yuzu. Get the app to start
            collaborating.
          </p>

          <div className="space-y-3 mb-8">
            <button
              onClick={() => navigate('/invite/verify')}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-brand-border bg-white hover:border-yuzu-400 hover:bg-yuzu-50 transition-all text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                <Smartphone className="w-6 h-6 text-neutral-700" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-text">Mobile App</h3>
                <p className="text-sm text-brand-text-secondary">
                  iOS &amp; Android &middot; Voice notes, tasks &amp; more
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-neutral-400 ml-auto shrink-0" />
            </button>

            <button
              onClick={() => navigate('/invite/verify')}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-brand-border bg-white hover:border-yuzu-400 hover:bg-yuzu-50 transition-all text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                <Monitor className="w-6 h-6 text-neutral-700" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-text">Desktop App</h3>
                <p className="text-sm text-brand-text-secondary">
                  macOS &amp; Windows &middot; Full 3-column workspace
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-neutral-400 ml-auto shrink-0" />
            </button>
          </div>
        </div>
      </main>

      <footer className="px-6 py-4 text-center text-xs text-brand-text-secondary">
        &copy; 2026 yuzu.cx &middot; All rights reserved
      </footer>
    </div>
  )
}

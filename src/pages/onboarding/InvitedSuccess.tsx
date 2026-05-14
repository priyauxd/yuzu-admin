import { useLocation } from 'react-router-dom'
import { PartyPopper, MessageSquare, Mic, CheckSquare } from 'lucide-react'

export default function InvitedSuccess() {
  const location = useLocation()
  const displayName =
    (location.state as { displayName?: string })?.displayName || 'there'

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
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-yuzu-50 flex items-center justify-center mx-auto mb-6 border border-yuzu-300/30">
            <PartyPopper className="w-9 h-9 text-yuzu-900" />
          </div>

          <h1 className="text-2xl font-bold text-brand-text mb-2">
            Welcome, {displayName}!
          </h1>
          <p className="text-brand-text-secondary mb-8">
            You&apos;re now active in your workspace. Start messaging, sharing
            voice notes, and collaborating with your team.
          </p>

          <div className="bg-white rounded-xl border border-brand-border p-5 mb-8 text-left">
            <h3 className="font-semibold text-brand-text mb-3 text-sm">
              What you can do:
            </h3>
            <ul className="space-y-3">
              {[
                {
                  icon: MessageSquare,
                  text: 'Messaging, groups & channels',
                },
                { icon: Mic, text: 'Voice notes with transcription' },
                { icon: CheckSquare, text: 'Mini tasks & assignments' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-yuzu-50 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-yuzu-900" />
                  </div>
                  <span className="text-sm text-brand-text-tertiary">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <button className="w-full bg-yuzu-900 hover:bg-yuzu-800 text-white font-semibold py-3 rounded-xl transition-colors">
            Open yuzu App
          </button>
        </div>
      </main>

      <footer className="px-6 py-4 text-center text-xs text-brand-text-secondary">
        &copy; 2026 yuzu.cx &middot; All rights reserved
      </footer>
    </div>
  )
}

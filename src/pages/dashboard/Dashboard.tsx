import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  User, CreditCard, Plug, ArrowUpRight, ArrowRight,
  BookOpen, Lightbulb, Rocket, GraduationCap,
  Monitor, Smartphone, Download, X,
  Headphones, Users, Zap, Workflow, Radio,
  CheckCircle2, Circle, UserPlus, Building2, Shield, Settings,
} from 'lucide-react'
import Confetti from '../../components/Confetti'

const WELCOME_FEATURES = [
  { label: 'Voice & Calls', icon: Headphones, color: 'bg-purple-50 text-purple-600' },
  { label: 'Integrations', icon: Plug, color: 'bg-green-50 text-green-600' },
  { label: 'Workflows', icon: Workflow, color: 'bg-orange-50 text-orange-600' },
  { label: 'Team Inbox', icon: Users, color: 'bg-pink-50 text-pink-600' },
]

function WelcomeModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <Confetti />
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div
          className="bg-white rounded-2xl shadow-xl max-w-lg w-full animate-slide-in overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-6 pt-5 pb-3">
            <h2 className="text-lg font-bold text-brand-text">Welcome to yuzu!</h2>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-400 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-6 pb-5">
            <div className="bg-gradient-to-br from-yuzu-50 to-white rounded-xl border border-yuzu-300/30 p-5 mb-5">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-yuzu-900" />
                <span className="text-sm font-bold text-yuzu-900">Enjoy 14 days of full access to the Business plan!</span>
              </div>
              <p className="text-xs text-yuzu-900/70">See how yuzu helps your team collaborate, call, and close faster.</p>
            </div>

            <p className="text-sm font-semibold text-brand-text mb-3">Try these features:</p>
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {WELCOME_FEATURES.map(({ label, icon: Icon, color }) => (
                <div key={label} className="flex items-center gap-3 p-3 rounded-xl border border-neutral-100 hover:border-yuzu-400/40 hover:shadow-sm transition-all cursor-pointer">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-sm font-medium text-brand-text">{label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="w-full bg-yuzu-400 hover:bg-yuzu-300 text-white font-semibold py-3 rounded-full transition-colors shadow-[0_4px_14px_rgba(246,196,83,0.45)] text-sm"
            >
              Explore now
            </button>
          </div>

          <div className="px-6 py-3 bg-green-50 border-t border-green-100 flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center">
              <Radio className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs text-green-700">Your organization has activated trial subscription successfully.</span>
            <button onClick={onClose} className="ml-auto text-green-400 hover:text-green-600">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

const SETUP_STEPS = [
  {
    id: 'register',
    label: 'Company registered',
    description: 'Business details and workspace created',
    icon: Building2,
    complete: true,
  },
  {
    id: 'plan',
    label: 'Business plan selected',
    description: 'Business plan — 14-day free trial active',
    icon: CreditCard,
    complete: true,
  },
  {
    id: 'invite',
    label: 'Invite your team',
    description: 'Add team members to start collaborating',
    icon: UserPlus,
    complete: false,
    action: '/onboarding/invite-team',
    actionLabel: 'Invite members',
  },
]

export default function Dashboard() {
  const [showWelcome, setShowWelcome] = useState(
    () => sessionStorage.getItem('yuzu_show_welcome') !== '0'
  )

  const handleCloseWelcome = () => {
    sessionStorage.setItem('yuzu_show_welcome', '0')
    setShowWelcome(false)
  }
  const navigate = useNavigate()

  const completedSteps = SETUP_STEPS.filter((s) => s.complete).length
  const progressPercent = Math.round((completedSteps / SETUP_STEPS.length) * 100)

  return (
    <div>
      {showWelcome && <WelcomeModal onClose={handleCloseWelcome} />}

      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-text">Hello, Priya 👋</h1>
        <p className="text-sm text-brand-text-secondary mt-1">Welcome to your admin panel. Let's get your workspace ready.</p>
      </div>

      {/* Setup Progress + Account Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 mb-6">
        {/* Setup Checklist */}
        <div className="bg-white rounded-2xl border border-brand-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-brand-text">Setup checklist</h2>
              <p className="text-xs text-brand-text-secondary mt-0.5">{completedSteps} of {SETUP_STEPS.length} steps completed</p>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-24 h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yuzu-400 rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-brand-text">{progressPercent}%</span>
            </div>
          </div>

          <div className="space-y-3">
            {SETUP_STEPS.map((step) => (
              <div
                key={step.id}
                className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition-all ${
                  step.complete
                    ? 'border-green-100 bg-green-50/40'
                    : 'border-yuzu-300/40 bg-yuzu-50/50'
                }`}
              >
                <div className={`mt-0.5 shrink-0 ${step.complete ? 'text-green-500' : 'text-neutral-300'}`}>
                  {step.complete ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${step.complete ? 'text-green-700' : 'text-brand-text'}`}>
                    {step.label}
                  </p>
                  <p className="text-xs text-brand-text-secondary mt-0.5">{step.description}</p>
                </div>
                {step.action && (
                  <button
                    onClick={() => navigate(step.action!)}
                    className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-yuzu-900 bg-yuzu-400 hover:bg-yuzu-300 px-3.5 py-1.5 rounded-full transition-colors shadow-sm"
                  >
                    {step.actionLabel}
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Account Summary */}
        <div className="bg-white rounded-2xl border border-brand-border p-5">
          <h2 className="text-base font-semibold text-brand-text mb-4">Account summary</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-brand-text-secondary" />
              <span className="text-sm text-brand-text-secondary">Your role:</span>
              <span className="text-sm font-semibold text-brand-text">Admin, Owner</span>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4 text-brand-text-secondary" />
              <span className="text-sm text-brand-text-secondary">Plan:</span>
              <span className="text-sm font-semibold text-brand-text">Business</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-brand-text-secondary" />
              <span className="text-sm text-brand-text-secondary">Team:</span>
              <span className="text-sm font-semibold text-brand-text">1 member</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-brand-text-secondary" />
              <span className="text-sm text-brand-text-secondary">Trial:</span>
              <span className="text-sm font-semibold text-green-600">14 days left</span>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-neutral-100">
            <button
              onClick={() => navigate('/app/settings')}
              className="w-full flex items-center justify-center gap-2 text-sm font-medium text-brand-text border border-brand-border rounded-full px-4 py-2 hover:bg-neutral-50 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              Manage Settings
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-base font-semibold text-brand-text mb-3">Quick actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => navigate('/onboarding/invite-team')}
            className="flex items-center gap-3.5 p-4 rounded-2xl border border-brand-border bg-white hover:border-yuzu-400/40 hover:shadow-sm transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-yuzu-50 border border-yuzu-300/30 flex items-center justify-center shrink-0">
              <UserPlus className="w-5 h-5 text-yuzu-900" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-brand-text group-hover:text-yuzu-900 transition-colors">Invite Team</p>
              <p className="text-xs text-brand-text-secondary">Add members via email or WhatsApp</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-yuzu-900 transition-colors shrink-0" />
          </button>

          <button
            onClick={() => navigate('/app/conversations')}
            className="flex items-center gap-3.5 p-4 rounded-2xl border border-brand-border bg-white hover:border-yuzu-400/40 hover:shadow-sm transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
              <Plug className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-brand-text group-hover:text-yuzu-900 transition-colors">Connect Channels</p>
              <p className="text-xs text-brand-text-secondary">WhatsApp, email & more</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-yuzu-900 transition-colors shrink-0" />
          </button>

          <button
            onClick={() => navigate('/app/settings')}
            className="flex items-center gap-3.5 p-4 rounded-2xl border border-brand-border bg-white hover:border-yuzu-400/40 hover:shadow-sm transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-brand-text group-hover:text-yuzu-900 transition-colors">Company Profile</p>
              <p className="text-xs text-brand-text-secondary">Update business details</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-yuzu-900 transition-colors shrink-0" />
          </button>
        </div>
      </div>

      {/* Plan Overview */}
      <div className="mb-6">
        <div className="bg-gradient-to-br from-yuzu-50 to-white rounded-2xl border border-yuzu-300/30 p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-base font-semibold text-brand-text">Business Plan</h2>
                <span className="text-[10px] font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full uppercase tracking-wider">Trial</span>
              </div>
              <p className="text-sm text-brand-text-secondary">$20/user/month after trial ends</p>
            </div>
            <button
              onClick={() => navigate('/app/settings')}
              className="text-xs font-medium text-yuzu-900 hover:text-yuzu-800 flex items-center gap-1"
            >
              Manage plan <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Team members', value: 'Up to 50' },
              { label: 'WhatsApp', value: 'Included' },
              { label: 'AI replies', value: 'Included' },
              { label: 'Knowledge base', value: 'Included' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/70 rounded-xl px-3.5 py-2.5 border border-yuzu-300/20">
                <p className="text-xs text-brand-text-secondary">{label}</p>
                <p className="text-sm font-semibold text-brand-text mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-brand-text mb-3">Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { title: 'Help Center', desc: 'Browse articles and guides to find answers quickly.', icon: BookOpen, color: 'text-green-600' },
            { title: 'Yuzu Academy', desc: 'Videos, courses, and best practices to master yuzu.', icon: GraduationCap, color: 'text-yuzu-900' },
            { title: 'Getting Started', desc: 'Follow simple steps to get up and running in minutes.', icon: Rocket, color: 'text-blue-600' },
            { title: "What's New", desc: 'See the latest features and improvements.', icon: Lightbulb, color: 'text-purple-600' },
          ].map(({ title, desc, icon: Icon, color }) => (
            <div key={title} className="bg-white rounded-2xl border border-brand-border p-4 hover:shadow-sm hover:border-yuzu-400/40 transition-all cursor-pointer group">
              <div className="flex items-center gap-2.5 mb-2">
                <Icon className={`w-5 h-5 ${color}`} />
                <h3 className="text-sm font-semibold text-brand-text group-hover:text-yuzu-900 transition-colors">{title}</h3>
              </div>
              <p className="text-xs text-brand-text-secondary leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Download footer */}
      <div className="border-t border-brand-border pt-4 pb-2 flex flex-wrap items-center gap-x-6 gap-y-2">
        <span className="text-xs text-brand-text-secondary flex items-center gap-1.5">
          <Download className="w-3.5 h-3.5" /> Download yuzu:
        </span>
        {[
          { label: 'Desktop', icon: Monitor, action: 'macOS & Windows' },
          { label: 'iOS', icon: Smartphone, action: 'App Store' },
          { label: 'Android', icon: Smartphone, action: 'Google Play' },
        ].map(({ label, icon: Icon, action }) => (
          <button key={label} className="flex items-center gap-1.5 text-xs text-yuzu-900 hover:text-yuzu-800 font-medium transition-colors">
            <Icon className="w-3.5 h-3.5" />
            {label}
            <span className="text-brand-text-secondary font-normal">({action})</span>
          </button>
        ))}
      </div>
    </div>
  )
}

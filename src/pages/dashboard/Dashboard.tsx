import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  User, CreditCard, Plug, ArrowUpRight,
  MessageSquare, Bot, BookOpen, Lightbulb, Rocket, GraduationCap,
  Monitor, Smartphone, Download, X,
  Headphones, Users, Zap, BarChart3, Radio, Workflow,
  LayoutDashboard, CheckSquare, Circle, Clock,
} from 'lucide-react'
import Confetti from '../../components/Confetti'

const WELCOME_FEATURES = [
  { label: 'AI Agent', icon: Bot, color: 'bg-blue-50 text-blue-600' },
  { label: 'Voice & Calls', icon: Headphones, color: 'bg-purple-50 text-purple-600' },
  { label: 'Integrations', icon: Plug, color: 'bg-green-50 text-green-600' },
  { label: 'Workflows', icon: Workflow, color: 'bg-orange-50 text-orange-600' },
  { label: 'Team Inbox', icon: Users, color: 'bg-pink-50 text-pink-600' },
  { label: 'Reports', icon: BarChart3, color: 'bg-cyan-50 text-cyan-600' },
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

export default function Dashboard() {
  const [showWelcome, setShowWelcome] = useState(
    () => sessionStorage.getItem('yuzu_show_welcome') !== '0'
  )

  const handleCloseWelcome = () => {
    sessionStorage.setItem('yuzu_show_welcome', '0')
    setShowWelcome(false)
  }
  const navigate = useNavigate()

  return (
    <div>
      {showWelcome && <WelcomeModal onClose={handleCloseWelcome} />}

      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-text">Hello, Priya 👋</h1>
        <p className="text-sm text-brand-text-secondary mt-1">Here's what's happening with your workspace today.</p>
      </div>

      {/* Top row: Account summary + Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 mb-6">
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
              <span className="text-sm text-brand-text-secondary">Company plan:</span>
              <span className="text-sm font-semibold text-brand-text">Business</span>
            </div>
            <div className="flex items-center gap-3">
              <Plug className="w-4 h-4 text-brand-text-secondary" />
              <span className="text-sm text-brand-text-secondary">Active integrations:</span>
              <span className="text-sm font-semibold text-brand-text">2</span>
              <a href="#/app/settings" className="ml-auto text-xs font-medium text-brand-text border border-brand-border rounded-full px-3 py-1 hover:bg-neutral-50 transition-colors">View</a>
            </div>
          </div>
          <div className="mt-5 p-3.5 bg-yuzu-50 rounded-xl border border-yuzu-300/30">
            <div className="flex items-center gap-2 mb-1">
              <Bot className="w-4 h-4 text-yuzu-900" />
              <span className="text-sm font-semibold text-yuzu-900">AI Agent free minutes left: 150</span>
            </div>
            <p className="text-xs text-yuzu-900/70 mb-2">Let AI answer, qualify, and route calls automatically.</p>
            <button className="text-xs font-medium text-yuzu-900 border border-yuzu-400 rounded-full px-3 py-1 hover:bg-yuzu-100 transition-colors">Get started</button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-brand-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-brand-text">Recent account activity</h2>
            <div className="flex items-center gap-3">
              <select className="text-sm text-brand-text-secondary border border-brand-border rounded-full px-3 py-1 bg-white appearance-none pr-7">
                <option>This week</option>
                <option>Today</option>
                <option>This month</option>
              </select>
              <button className="text-sm text-yuzu-900 hover:text-yuzu-800 font-medium flex items-center gap-1">
                View analytics <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Team Presence */}
            <div className="border border-brand-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-brand-text">Team Presence</h3>
                <Users className="w-4 h-4 text-brand-text-secondary" />
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-brand-text-secondary flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />Online
                  </span>
                  <span className="text-sm font-semibold text-green-600">14</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-brand-text-secondary flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />In meeting
                  </span>
                  <span className="text-sm font-semibold text-brand-text">4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-brand-text-secondary flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />Away / DND
                  </span>
                  <span className="text-sm font-semibold text-brand-text">3</span>
                </div>
                <div className="border-t border-neutral-100 pt-2.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-brand-text-secondary flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-neutral-300 shrink-0" />Offline
                    </span>
                    <span className="text-sm font-semibold text-brand-text">7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-brand-text-secondary">Attendance rate</span>
                    <span className="text-sm font-semibold text-green-600">75%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messaging */}
            <div className="border border-brand-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-brand-text">Messaging</h3>
                <MessageSquare className="w-4 h-4 text-brand-text-secondary" />
              </div>
              <div className="space-y-2.5">
                {[
                  { label: 'Total messages', value: '3,420' },
                  { label: 'WhatsApp conv.', value: '344' },
                  { label: 'Internal DMs', value: '2,198' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-sm text-brand-text-secondary">{label}</span>
                    <span className="text-sm font-semibold text-brand-text">{value}</span>
                  </div>
                ))}
                <div className="border-t border-neutral-100 pt-2.5 space-y-2.5">
                  {[
                    { label: 'Voice notes', value: '124' },
                    { label: 'Active channels', value: '12' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-sm text-brand-text-secondary">{label}</span>
                      <span className="text-sm font-semibold text-brand-text">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tasks & AI */}
            <div className="border border-brand-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-brand-text">Tasks & AI</h3>
                <CheckSquare className="w-4 h-4 text-brand-text-secondary" />
              </div>
              <div className="space-y-2.5">
                {[
                  { label: 'Total tasks', value: '48', icon: Circle },
                  { label: 'In progress', value: '23', icon: Clock },
                  { label: 'Completed today', value: '13', icon: CheckSquare },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-sm text-brand-text-secondary">{label}</span>
                    <span className="text-sm font-semibold text-brand-text">{value}</span>
                  </div>
                ))}
                <div className="border-t border-neutral-100 pt-2.5 space-y-2.5">
                  {[
                    { label: 'AI transcriptions', value: '142' },
                    { label: 'Auto-tags & summaries', value: '251' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-sm text-brand-text-secondary">{label}</span>
                      <span className="text-sm font-semibold text-brand-text">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Dashboard banner */}
      <button
        onClick={() => navigate('/app/dashboard')}
        className="w-full flex items-center gap-4 bg-white border border-brand-border rounded-2xl p-4 mb-6 hover:border-yuzu-400/40 hover:shadow-sm transition-all group text-left"
      >
        <div className="w-10 h-10 rounded-xl bg-yuzu-50 border border-yuzu-300/30 flex items-center justify-center shrink-0">
          <LayoutDashboard className="w-5 h-5 text-yuzu-900" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-sm font-semibold text-brand-text group-hover:text-yuzu-900 transition-colors">Live Dashboard</p>
            <span className="flex items-center gap-1 text-[10px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />LIVE
            </span>
          </div>
          <p className="text-xs text-brand-text-secondary">Real-time KPIs across WhatsApp, messaging, agents, and calls.</p>
        </div>
        <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-yuzu-900 transition-colors shrink-0" />
      </button>

      {/* Download Apps */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-brand-text mb-3">Download yuzu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: 'Desktop App', desc: 'For macOS and Windows', icon: Monitor, action: 'Download' },
            { title: 'iOS App', desc: 'iPhone & iPad', icon: Smartphone, action: 'App Store' },
            { title: 'Android App', desc: 'Phone & tablet', icon: Smartphone, action: 'Google Play' },
          ].map(({ title, desc, icon: Icon, action }) => (
            <div key={title} className="bg-white rounded-2xl border border-brand-border p-4 flex items-center gap-4 hover:shadow-sm hover:border-yuzu-400/40 transition-all cursor-pointer group">
              <div className="w-11 h-11 rounded-xl bg-yuzu-50 border border-yuzu-300/30 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-yuzu-900" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-brand-text group-hover:text-yuzu-900 transition-colors">{title}</p>
                <p className="text-xs text-brand-text-secondary">{desc}</p>
              </div>
              <span className="text-xs font-medium text-yuzu-900 border border-yuzu-400 rounded-full px-3 py-1 hover:bg-yuzu-100 transition-colors flex items-center gap-1 shrink-0">
                <Download className="w-3 h-3" />{action}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-brand-text mb-3">Resources for you</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { title: 'Help Center', desc: 'Browse articles and guides to find answers quickly.', icon: BookOpen, color: 'text-green-600' },
            { title: 'Yuzu Academy', desc: 'Videos, courses, and best practices to master Yuzu.', icon: GraduationCap, color: 'text-yuzu-900' },
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

      {/* Knowledge Base */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-brand-text">Knowledge Base</h2>
          <a href="#/app/knowledge" className="text-sm text-yuzu-900 hover:text-yuzu-800 font-medium flex items-center gap-1">
            View all <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { title: 'Order delivery process', category: 'Operations', uses: 12 },
            { title: 'Return & refund policy', category: 'Support', uses: 28 },
            { title: 'Payment methods accepted', category: 'Support', uses: 19 },
            { title: 'Working hours & holidays', category: 'HR', uses: 8 },
            { title: 'Escalation procedure', category: 'Support', uses: 15 },
            { title: 'New employee onboarding checklist', category: 'HR', uses: 4 },
          ].map(({ title, category, uses }) => (
            <div key={title} className="bg-white rounded-xl border border-brand-border p-4 hover:shadow-sm hover:border-yuzu-400/40 transition-all cursor-pointer">
              <p className="text-sm font-medium text-brand-text mb-1.5">{title}</p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500">{category}</span>
                <span className="text-xs text-brand-text-secondary">Used {uses} times</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

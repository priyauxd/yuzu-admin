import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Plus,
  Send,
  Trash2,
  UserPlus,
} from 'lucide-react'
import Logo from '../../components/Logo'

const ROLES = ['Member', 'Field Member', 'Support Agent', 'Ops Manager']

interface Invite {
  id: string
  email: string
  role: string
  method: 'email' | 'whatsapp' | 'sms'
}

export default function InviteTeam() {
  const navigate = useNavigate()
  const [invites, setInvites] = useState<Invite[]>([
    { id: '1', email: '', role: 'Member', method: 'email' },
  ])
  const [sent, setSent] = useState(false)

  const addRow = () => {
    setInvites((prev) => [
      ...prev,
      { id: Date.now().toString(), email: '', role: 'Member', method: 'email' },
    ])
  }

  const updateInvite = (id: string, field: keyof Invite, value: string) => {
    setInvites((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, [field]: value } : inv))
    )
  }

  const removeInvite = (id: string) => {
    if (invites.length > 1) {
      setInvites((prev) => prev.filter((inv) => inv.id !== id))
    }
  }

  const handleSend = () => {
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="px-6 py-5 flex items-center justify-between">
        <Logo />
      </header>

      <main className="flex-1 flex items-start justify-center px-6 py-8">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-yuzu-50 flex items-center justify-center mx-auto mb-4 border border-yuzu-300/30">
              <UserPlus className="w-7 h-7 text-yuzu-900" />
            </div>
            <h1 className="text-2xl font-bold text-brand-text mb-2">
              Invite your team
            </h1>
            <p className="text-brand-text-secondary">
              Send invite links via email, WhatsApp, or SMS
            </p>
          </div>

          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-yuzu-50 flex items-center justify-center mx-auto mb-4 border border-yuzu-300/30">
                <Send className="w-8 h-8 text-yuzu-900" />
              </div>
              <h2 className="text-xl font-bold text-brand-text mb-2">
                Invites sent!
              </h2>
              <p className="text-brand-text-secondary mb-8">
                {invites.filter((i) => i.email).length} invite
                {invites.filter((i) => i.email).length !== 1 ? 's' : ''} sent.
                Your team will receive a link to join.
              </p>
              <button
                onClick={() => { sessionStorage.setItem('yuzu_show_welcome', '1'); navigate('/app') }}
                className="inline-flex items-center gap-2 bg-yuzu-400 hover:bg-yuzu-300 text-white font-semibold px-8 py-3 rounded-full shadow-[0_4px_14px_rgba(246,196,83,0.45)] transition-colors"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-4">
                {invites.map((invite) => (
                  <div
                    key={invite.id}
                    className="bg-white rounded-2xl border border-brand-border p-3"
                  >
                    <div className="flex gap-2 mb-2">
                      <input
                        type="email"
                        placeholder="colleague@company.com"
                        value={invite.email}
                        onChange={(e) =>
                          updateInvite(invite.id, 'email', e.target.value)
                        }
                        className="flex-1 px-3 py-2 rounded-full border border-brand-border bg-neutral-50 text-brand-text text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition"
                      />
                      <button
                        onClick={() => removeInvite(invite.id)}
                        className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={invite.role}
                        onChange={(e) =>
                          updateInvite(invite.id, 'role', e.target.value)
                        }
                        className="flex-1 px-3 py-2 rounded-full border border-brand-border bg-neutral-50 text-brand-text-tertiary text-sm focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition appearance-none"
                      >
                        {ROLES.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                      <div className="flex gap-1">
                        {(
                          [
                            { method: 'email', icon: Mail, label: 'Email' },
                            {
                              method: 'whatsapp',
                              icon: MessageCircle,
                              label: 'WhatsApp',
                            },
                          ] as const
                        ).map(({ method, icon: Icon, label }) => (
                          <button
                            key={method}
                            onClick={() =>
                              updateInvite(invite.id, 'method', method)
                            }
                            title={label}
                            className={`p-2 rounded-full border text-sm transition-all ${
                              invite.method === method
                                ? 'border-yuzu-400 bg-yuzu-50 text-yuzu-900'
                                : 'border-brand-border bg-neutral-50 text-neutral-400 hover:text-neutral-600'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addRow}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border-2 border-dashed border-brand-border text-brand-text-secondary hover:border-neutral-300 hover:text-brand-text text-sm font-medium transition-colors mb-6"
              >
                <Plus className="w-4 h-4" />
                Add another
              </button>

              <button
                onClick={handleSend}
                className="w-full flex items-center justify-center gap-2 bg-yuzu-400 hover:bg-yuzu-300 text-white font-semibold py-3 rounded-full shadow-[0_4px_14px_rgba(246,196,83,0.45)] transition-colors"
              >
                <Send className="w-4 h-4" />
                Send Invites
              </button>

              <button
                onClick={() => { sessionStorage.setItem('yuzu_show_welcome', '1'); navigate('/app') }}
                className="w-full text-center mt-3 text-sm text-brand-text-secondary hover:text-brand-text font-medium py-2"
              >
                Skip for now
              </button>
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

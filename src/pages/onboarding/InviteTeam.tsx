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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-yuzu-50 flex flex-col">
      <header className="px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-yuzu-400 flex items-center justify-center">
            <span className="text-white font-bold text-sm">Y</span>
          </div>
          <span className="font-semibold text-slate-900 text-lg">yuzu</span>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center px-6 py-8">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-7 h-7 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Invite your team
            </h1>
            <p className="text-slate-500">
              Send invite links via email, WhatsApp, or SMS
            </p>
          </div>

          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Invites sent!
              </h2>
              <p className="text-slate-500 mb-8">
                {invites.filter((i) => i.email).length} invite
                {invites.filter((i) => i.email).length !== 1 ? 's' : ''} sent.
                Your team will receive a link to join.
              </p>
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 bg-yuzu-400 hover:bg-yuzu-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
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
                    className="bg-white rounded-xl border border-slate-200 p-3"
                  >
                    <div className="flex gap-2 mb-2">
                      <input
                        type="email"
                        placeholder="colleague@company.com"
                        value={invite.email}
                        onChange={(e) =>
                          updateInvite(invite.id, 'email', e.target.value)
                        }
                        className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition"
                      />
                      <button
                        onClick={() => removeInvite(invite.id)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
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
                        className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition appearance-none"
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
                            className={`p-2 rounded-lg border text-sm transition-all ${
                              invite.method === method
                                ? 'border-yuzu-400 bg-yuzu-50 text-yuzu-600'
                                : 'border-slate-200 bg-slate-50 text-slate-400 hover:text-slate-600'
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
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-600 text-sm font-medium transition-colors mb-6"
              >
                <Plus className="w-4 h-4" />
                Add another
              </button>

              <button
                onClick={handleSend}
                className="w-full flex items-center justify-center gap-2 bg-yuzu-400 hover:bg-yuzu-500 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                <Send className="w-4 h-4" />
                Send Invites
              </button>

              <button
                onClick={() => navigate('/')}
                className="w-full text-center mt-3 text-sm text-slate-500 hover:text-slate-700 font-medium py-2"
              >
                Skip for now
              </button>
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

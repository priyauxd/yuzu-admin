import { useState } from 'react'
import { Users, Plus, Search, Mail, Phone } from 'lucide-react'

const MEMBERS = [
  { name: 'Ahmed Al Maktoum', email: 'ahmed@company.ae', phone: '+971 55 111 2222', role: 'Ops Manager', status: 'online', lang: 'Arabic' },
  { name: 'Fatima Hassan', email: 'fatima@company.ae', phone: '+971 55 333 4444', role: 'Support Agent', status: 'online', lang: 'Arabic' },
  { name: 'Raj Patel', email: 'raj@company.ae', phone: '+971 50 555 6666', role: 'Field Member', status: 'break', lang: 'Hindi' },
  { name: 'Sara Mohamed', email: 'sara@company.ae', phone: '+971 55 777 8888', role: 'Member', status: 'offline', lang: 'English' },
  { name: 'Omar Khalid', email: 'omar@company.ae', phone: '+971 50 999 0000', role: 'Support Agent', status: 'meeting', lang: 'Arabic' },
  { name: 'Priya Sharma', email: 'priya@company.ae', phone: '+971 55 222 3333', role: 'Member', status: 'online', lang: 'Hindi' },
]

const STATUS_COLORS: Record<string, string> = {
  online: 'bg-green-400',
  offline: 'bg-neutral-300',
  break: 'bg-orange-400',
  meeting: 'bg-blue-400',
}

const STATUS_LABELS: Record<string, string> = {
  online: 'Online',
  offline: 'Offline',
  break: 'On Break',
  meeting: 'In Meeting',
}

export default function TeamPage() {
  const [search, setSearch] = useState('')

  const filtered = MEMBERS.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-text flex items-center gap-2">
            <Users className="w-6 h-6" /> Team
          </h1>
          <p className="text-brand-text-secondary">{MEMBERS.length} members · {MEMBERS.filter(m => m.status === 'online').length} online</p>
        </div>
        <button className="flex items-center gap-2 bg-yuzu-400 hover:bg-yuzu-300 text-white font-semibold px-4 py-2.5 rounded-full text-sm transition-colors shadow-[0_4px_14px_rgba(246,196,83,0.45)]">
          <Plus className="w-4 h-4" />
          Invite Member
        </button>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by name or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full border border-brand-border bg-white text-brand-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-brand-border overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-3 border-b border-neutral-100 text-xs font-medium text-brand-text-secondary uppercase tracking-wider">
          <span>Member</span>
          <span>Role</span>
          <span>Language</span>
          <span>Status</span>
          <span>Contact</span>
        </div>
        {filtered.map((member) => (
          <div key={member.email} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-4 border-b border-neutral-100 last:border-0 items-center hover:bg-neutral-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-sm font-medium text-brand-text-tertiary">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${STATUS_COLORS[member.status]}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-brand-text">{member.name}</p>
                <p className="text-xs text-brand-text-secondary">{member.email}</p>
              </div>
            </div>
            <span className="text-sm text-brand-text-tertiary w-28">{member.role}</span>
            <span className="text-sm text-brand-text-tertiary w-20">{member.lang}</span>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full w-24 text-center ${
              member.status === 'online' ? 'bg-green-50 text-green-700' :
              member.status === 'break' ? 'bg-orange-50 text-orange-700' :
              member.status === 'meeting' ? 'bg-blue-50 text-blue-700' :
              'bg-neutral-100 text-neutral-500'
            }`}>
              {STATUS_LABELS[member.status]}
            </span>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-brand-text transition-colors">
                <Mail className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-brand-text transition-colors">
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

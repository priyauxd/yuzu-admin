import { useState } from 'react'
import {
  User, Users, CreditCard, Plug, UsersRound, PhoneCall,
  Search, Mail, Phone, Plus, Minus, Download, Trash2,
  MessageCircle, Database, ExternalLink,
  ArrowUpRight, X, MoreHorizontal, Pencil,
  LayoutGrid, List, ChevronLeft, ChevronRight, PanelLeftClose, PanelLeft,
  UserX, Send, Smartphone,
} from 'lucide-react'
import Toggle from '../../components/Toggle'

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'teams', label: 'Teams', icon: UsersRound },
  { id: 'numbers', label: 'Numbers', icon: PhoneCall },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'connectors', label: 'Connectors', icon: Plug },
]

interface Member {
  id: string
  name: string
  email: string
  phone: string
  role: string
  status: string
  lang: string
  team: string
  lastLogin: string
  extension: string
  deactivated?: boolean
}

interface Team {
  id: string
  name: string
  description: string
  memberIds: string[]
  color: string
  type: string
}

interface DIDNumber {
  id: string
  number: string
  label: string
  assignedTo: string
  assignedType: 'team' | 'user' | 'unassigned'
  country: string
  status: 'active' | 'inactive'
}

const ROLES = ['Member', 'Field Member', 'Support Agent', 'Ops Manager', 'Admin']

const INITIAL_TEAMS: Team[] = [
  { id: 't1', name: 'Sales', description: 'Outbound sales and lead management', memberIds: ['1', '3'], color: 'bg-blue-50 text-blue-600', type: 'Round Robin' },
  { id: 't2', name: 'Support', description: 'Customer support and ticket handling', memberIds: ['2', '5'], color: 'bg-green-50 text-green-600', type: 'Skill Based' },
  { id: 't3', name: 'Operations', description: 'Field operations and logistics', memberIds: ['1', '3', '6'], color: 'bg-purple-50 text-purple-600', type: 'Round Robin' },
  { id: 't4', name: 'HR', description: 'Human resources and onboarding', memberIds: ['4'], color: 'bg-orange-50 text-orange-600', type: 'Sequential' },
]

const INITIAL_MEMBERS: Member[] = [
  { id: '1', name: 'Ahmed Al Maktoum', email: 'ahmed@company.ae', phone: '+971 55 111 2222', role: 'Ops Manager', status: 'online', lang: 'Arabic', team: 'Sales', lastLogin: 'Today 10:32 AM', extension: '0101' },
  { id: '2', name: 'Fatima Hassan', email: 'fatima@company.ae', phone: '+971 55 333 4444', role: 'Support Agent', status: 'online', lang: 'Arabic', team: 'Support', lastLogin: 'Today 9:15 AM', extension: '0102' },
  { id: '3', name: 'Raj Patel', email: 'raj@company.ae', phone: '+971 50 555 6666', role: 'Field Member', status: 'break', lang: 'Hindi', team: 'Operations', lastLogin: 'Yesterday 4:20 PM', extension: '0103' },
  { id: '4', name: 'Sara Mohamed', email: 'sara@company.ae', phone: '+971 55 777 8888', role: 'Admin', status: 'offline', lang: 'English', team: 'HR', lastLogin: 'May 12, 2026', extension: '0104' },
  { id: '5', name: 'Omar Khalid', email: 'omar@company.ae', phone: '+971 50 999 0000', role: 'Support Agent', status: 'meeting', lang: 'Arabic', team: 'Support', lastLogin: 'Today 8:45 AM', extension: '0105' },
  { id: '6', name: 'Priya Sharma', email: 'priya@company.ae', phone: '+971 55 222 3333', role: 'Member', status: 'online', lang: 'Hindi', team: 'Operations', lastLogin: 'Today 11:00 AM', extension: '0106' },
  { id: '7', name: 'Ali Khan', email: 'ali@company.ae', phone: '+971 55 444 5555', role: 'Support Agent', status: 'online', lang: 'Arabic', team: 'Support', lastLogin: 'Today 9:50 AM', extension: '0107' },
  { id: '8', name: 'Mariam Noor', email: 'mariam@company.ae', phone: '+971 50 666 7777', role: 'Member', status: 'offline', lang: 'English', team: 'Sales', lastLogin: 'May 10, 2026', extension: '0108' },
]

const INITIAL_DIDS: DIDNumber[] = [
  { id: 'd1', number: '+971 4 123 4567', label: 'Main Line', assignedTo: 'Support', assignedType: 'team', country: 'UAE', status: 'active' },
  { id: 'd2', number: '+971 4 123 4568', label: 'Sales Hotline', assignedTo: 'Sales', assignedType: 'team', country: 'UAE', status: 'active' },
  { id: 'd3', number: '+971 4 123 4569', label: 'Ahmed Direct', assignedTo: 'Ahmed Al Maktoum', assignedType: 'user', country: 'UAE', status: 'active' },
  { id: 'd4', number: '+971 4 123 4570', label: 'Ops Line', assignedTo: 'Operations', assignedType: 'team', country: 'UAE', status: 'active' },
  { id: 'd5', number: '+971 4 123 4571', label: '', assignedTo: '', assignedType: 'unassigned', country: 'UAE', status: 'inactive' },
  { id: 'd6', number: '+966 11 456 7890', label: 'Riyadh Office', assignedTo: 'Sales', assignedType: 'team', country: 'KSA', status: 'active' },
]

const STATUS_COLORS: Record<string, string> = { online: 'bg-green-400', offline: 'bg-neutral-300', break: 'bg-orange-400', meeting: 'bg-blue-400' }


const INVOICES = [
  { date: 'May 1, 2026', amount: '$480.00', users: 24, status: 'Paid' },
  { date: 'Apr 1, 2026', amount: '$440.00', users: 22, status: 'Paid' },
  { date: 'Mar 1, 2026', amount: '$400.00', users: 20, status: 'Paid' },
]

const USER_CHANGES = [
  { action: 'added', name: 'Priya Sharma', date: 'May 8', prorated: '$14.84' },
  { action: 'added', name: 'Omar Khalid', date: 'May 3', prorated: '$18.06' },
  { action: 'removed', name: 'Ali Khan', date: 'Apr 28', note: 'Will not renew Jun 1' },
]

const CONNECTORS = [
  { name: 'WhatsApp Business', description: 'Send & receive WhatsApp messages, voice notes, locations & attachments', icon: MessageCircle, color: 'bg-green-50 text-green-600', status: 'connected', details: [{ label: 'Business Number', value: '+971 4 123 4567' }, { label: 'Messages Today', value: '142' }, { label: 'Auto-responses', value: 'Enabled' }] },
  { name: 'SIP Voice', description: 'Inbound & outbound calls, DID assignment, skill-based routing', icon: Phone, color: 'bg-blue-50 text-blue-600', status: 'connected', details: [{ label: 'Provider', value: 'Twilio' }, { label: 'Active DIDs', value: '4' }, { label: 'Calls Today', value: '43' }] },
  { name: 'Zoho CRM', description: 'Fetch contact data — name, interactions, last order, notes', icon: Database, color: 'bg-orange-50 text-orange-600', status: 'not_configured', details: [{ label: 'Status', value: 'Awaiting API key' }, { label: 'Synced Contacts', value: '—' }] },
  { name: 'WhatsApp Voice', description: 'Voice calling via WhatsApp (optional add-on)', icon: MessageCircle, color: 'bg-green-50 text-green-600', status: 'available', details: [{ label: 'Plan Required', value: '$25/user/mo' }, { label: 'Status', value: 'Available to enable' }] },
]

const ITEMS_PER_PAGE = 6

function ProfileTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-brand-text mb-4">Profile</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-text mb-1.5">First name</label>
              <input type="text" defaultValue="Priya" className="w-full px-4 py-2.5 rounded-full border border-brand-border bg-white text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text mb-1.5">Family name</label>
              <input type="text" defaultValue="" className="w-full px-4 py-2.5 rounded-full border border-brand-border bg-white text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-text mb-1.5">Email</label>
              <input type="email" defaultValue="priyamvada.s.m@gmail.com" className="w-full px-4 py-2.5 rounded-full border border-brand-border bg-white text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text mb-1.5">Phone</label>
              <input type="tel" defaultValue="+971 55 123 4567" className="w-full px-4 py-2.5 rounded-full border border-brand-border bg-white text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-100 pt-6">
        <h2 className="text-lg font-semibold text-brand-text mb-4">Language & Timezone</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-text mb-1.5">Mother tongue</label>
              <select className="w-full px-4 py-2.5 rounded-full border border-brand-border bg-white text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition appearance-none">
                <option>English</option>
                <option>العربية (Arabic)</option>
                <option>हिन्दी (Hindi)</option>
                <option>اردو (Urdu)</option>
                <option>Filipino (Tagalog)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text mb-1.5">Other language</label>
              <select className="w-full px-4 py-2.5 rounded-full border border-brand-border bg-white text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition appearance-none">
                <option>Arabic — Intermediate</option>
                <option>English — Fluent</option>
                <option>Hindi — Native</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-text mb-1.5">Timezone</label>
            <select className="w-full px-4 py-2.5 rounded-full border border-brand-border bg-white text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition appearance-none">
              <option>Dubai (GMT+4)</option>
              <option>Riyadh (GMT+3)</option>
              <option>Mumbai (GMT+5:30)</option>
              <option>London (GMT+0)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-100 pt-6">
        <h2 className="text-lg font-semibold text-brand-text mb-4">Notifications</h2>
        <div className="space-y-4">
          {[
            { label: 'DM notifications', desc: 'Get notified for direct messages' },
            { label: 'Channel mentions', desc: 'Only when @mentioned in channels' },
            { label: 'Voice note alerts', desc: 'Notify when you receive a voice note' },
            { label: 'Task assignments', desc: 'Get notified when assigned a task' },
          ].map(({ label, desc }) => (
            <div key={label} className="flex items-center justify-between py-1">
              <div>
                <p className="text-sm font-medium text-brand-text">{label}</p>
                <p className="text-xs text-brand-text-secondary">{desc}</p>
              </div>
              <Toggle enabled={true} />
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-neutral-100 pt-6">
        <h2 className="text-lg font-semibold text-brand-text mb-4">Attendance & Status</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-text mb-1.5">Default status</label>
            <select className="w-full px-4 py-2.5 rounded-full border border-brand-border bg-white text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition appearance-none">
              <option>Online</option>
              <option>Offline</option>
              <option>Non-working hours</option>
              <option>Break</option>
              <option>In Meeting</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-text mb-1.5">Auto-response message</label>
            <input type="text" defaultValue="I'll get back to you shortly." className="w-full px-4 py-2.5 rounded-full border border-brand-border bg-white text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition" />
          </div>
        </div>
      </div>

      <button className="bg-yuzu-400 hover:bg-yuzu-300 text-white font-semibold py-2.5 px-8 rounded-full transition-colors shadow-[0_4px_14px_rgba(246,196,83,0.45)]">
        Save Changes
      </button>
    </div>
  )
}

function UsersTab() {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [page, setPage] = useState(1)
  const [showInvite, setShowInvite] = useState(false)
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', phone: '', role: 'Member', lang: 'English', team: 'Sales' })
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editRole, setEditRole] = useState('')
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [resendId, setResendId] = useState<string | null>(null)
  const [resendMethod, setResendMethod] = useState<'email' | 'sms'>('email')

  const roleCounts = {
    all: members.length,
    Admin: members.filter(m => m.role === 'Admin' || m.role === 'Ops Manager').length,
    Agent: members.filter(m => m.role === 'Support Agent' || m.role === 'Field Member').length,
    Member: members.filter(m => m.role === 'Member').length,
  }

  const filtered = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase())
    const matchesRole = roleFilter === 'all' ||
      (roleFilter === 'Admin' && (m.role === 'Admin' || m.role === 'Ops Manager')) ||
      (roleFilter === 'Agent' && (m.role === 'Support Agent' || m.role === 'Field Member')) ||
      (roleFilter === 'Member' && m.role === 'Member')
    return matchesSearch && matchesRole
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteForm.name.trim() || !inviteForm.email.trim()) return
    const newMember: Member = {
      id: Date.now().toString(), name: inviteForm.name, email: inviteForm.email, phone: inviteForm.phone,
      role: inviteForm.role, status: 'offline', lang: inviteForm.lang, team: inviteForm.team,
      lastLogin: '—', extension: String(Math.floor(Math.random() * 9000) + 1000),
    }
    setMembers(prev => [...prev, newMember])
    setInviteForm({ name: '', email: '', phone: '', role: 'Member', lang: 'English', team: 'Sales' })
    setShowInvite(false)
  }

  const handleRemove = (id: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, deactivated: true } : m))
    setConfirmDeleteId(null)
    setMenuOpenId(null)
  }

  const handleReactivate = (id: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, deactivated: false } : m))
  }

  const handleSaveRole = (id: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, role: editRole } : m))
    setEditingId(null)
    setMenuOpenId(null)
  }

  const ROLE_BADGE: Record<string, string> = {
    Admin: 'bg-red-50 text-red-600', 'Ops Manager': 'bg-red-50 text-red-600',
    'Support Agent': 'bg-yuzu-50 text-yuzu-900', 'Field Member': 'bg-blue-50 text-blue-600',
    Member: 'bg-neutral-100 text-neutral-600',
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Role filter tabs */}
      <div className="flex items-center gap-2 mb-4">
        {Object.entries(roleCounts).map(([key, count]) => (
          <button
            key={key}
            onClick={() => { setRoleFilter(key); setPage(1); }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
              roleFilter === key ? 'bg-yuzu-400 text-white' : 'bg-white border border-brand-border text-brand-text-secondary hover:bg-neutral-50'
            }`}
          >
            {key === 'all' ? 'All' : key} | {count}
          </button>
        ))}
      </div>

      {/* Search + view toggle + invite */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input type="text" placeholder="Search" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="w-full pl-11 pr-4 py-2.5 rounded-full border border-brand-border bg-white text-brand-text text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition" />
        </div>
        <div className="flex items-center border border-brand-border rounded-lg overflow-hidden">
          <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-yuzu-400 text-white' : 'bg-white text-neutral-400 hover:bg-neutral-50'}`}>
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-yuzu-400 text-white' : 'bg-white text-neutral-400 hover:bg-neutral-50'}`}>
            <List className="w-4 h-4" />
          </button>
        </div>
        <button onClick={() => setShowInvite(true)} className="flex items-center gap-2 bg-yuzu-400 hover:bg-yuzu-300 text-white font-semibold px-4 py-2.5 rounded-full text-sm transition-colors shadow-[0_4px_14px_rgba(246,196,83,0.45)] shrink-0">
          <Plus className="w-4 h-4" /> Invite user
        </button>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {paginated.map((member) => (
            <div key={member.id} className={`border rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 bg-gradient-to-br relative group ${member.deactivated ? 'from-neutral-50 to-neutral-100/50 border-neutral-200 opacity-60' : 'from-white to-neutral-50/50 border-neutral-200/80'}`}>
              <button
                onClick={() => setMenuOpenId(menuOpenId === member.id ? null : member.id)}
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-neutral-100 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
              {menuOpenId === member.id && (
                <div className="absolute right-3 top-9 w-40 bg-white rounded-xl border border-brand-border shadow-lg py-1 z-50">
                  <button onClick={() => { setEditingId(member.id); setEditRole(member.role); setMenuOpenId(null); }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-brand-text-secondary hover:bg-neutral-50 hover:text-brand-text"><Pencil className="w-3.5 h-3.5" /> Edit Role</button>
                  <button onClick={() => { setResendId(member.id); setResendMethod('email'); setMenuOpenId(null); }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-brand-text-secondary hover:bg-neutral-50 hover:text-brand-text"><Send className="w-3.5 h-3.5" /> Resend Invitation</button>
                  {member.deactivated
                    ? <button onClick={() => { handleReactivate(member.id); setMenuOpenId(null); }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-green-600 hover:bg-green-50"><UserX className="w-3.5 h-3.5" /> Reactivate</button>
                    : <button onClick={() => { setConfirmDeleteId(member.id); setMenuOpenId(null); }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-orange-500 hover:bg-orange-50"><UserX className="w-3.5 h-3.5" /> Deactivate</button>
                  }
                </div>
              )}
              <div className="flex items-center gap-3 mb-3">
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-sm font-semibold text-brand-text-tertiary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${STATUS_COLORS[member.status]}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-brand-text truncate">{member.name}</p>
                    {member.deactivated
                      ? <span className="text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 bg-neutral-200 text-neutral-500">Deactivated</span>
                      : <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${ROLE_BADGE[member.role] || 'bg-neutral-100 text-neutral-600'}`}>{member.role}</span>
                    }
                  </div>
                  <p className="text-xs text-brand-text-secondary truncate">{member.email}</p>
                </div>
              </div>
              {editingId === member.id ? (
                <div className="flex items-center gap-2 mb-2">
                  <select value={editRole} onChange={(e) => setEditRole(e.target.value)} className="flex-1 px-3 py-1.5 rounded-full border border-brand-border bg-white text-brand-text text-xs appearance-none">
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <button onClick={() => handleSaveRole(member.id)} className="px-3 py-1.5 rounded-full bg-yuzu-400 text-white text-xs font-semibold">Save</button>
                  <button onClick={() => setEditingId(null)} className="px-3 py-1.5 rounded-full border border-brand-border text-xs text-brand-text-secondary">Cancel</button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs mt-1">
                  <div><span className="text-brand-text-secondary">Team</span></div>
                  <div><span className="text-brand-text font-medium">{member.team}</span></div>
                  <div><span className="text-brand-text-secondary">Extension</span></div>
                  <div><span className="text-brand-text font-medium font-mono">{member.extension}</span></div>
                  <div><span className="text-brand-text-secondary">Last Login</span></div>
                  <div><span className="text-brand-text font-medium">{member.lastLogin}</span></div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="border border-brand-border rounded-xl overflow-hidden bg-white">
          <div className="grid grid-cols-[1fr_1.2fr_0.8fr_1fr_0.6fr_0.7fr_40px] gap-2 px-4 py-2.5 bg-neutral-50 text-xs font-medium text-brand-text-secondary border-b border-brand-border">
            <span>Full Name</span><span>Email</span><span>Role</span><span>Last Login</span><span>Ext.</span><span>Team</span><span />
          </div>
          {paginated.map((member) => (
            <div key={member.id} className={`grid grid-cols-[1fr_1.2fr_0.8fr_1fr_0.6fr_0.7fr_40px] gap-2 px-4 py-3 border-b border-neutral-100 last:border-0 hover:bg-neutral-50 items-center group ${member.deactivated ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-medium text-brand-text-tertiary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${STATUS_COLORS[member.status]}`} />
                </div>
                <span className="text-sm font-medium text-brand-text truncate">{member.name}</span>
              </div>
              <span className="text-sm text-brand-text-secondary truncate">{member.email}</span>
              {member.deactivated
                ? <span className="text-[10px] font-medium px-2 py-0.5 rounded-full w-fit bg-neutral-200 text-neutral-500">Deactivated</span>
                : <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full w-fit ${ROLE_BADGE[member.role] || 'bg-neutral-100 text-neutral-600'}`}>{member.role}</span>
              }
              <span className="text-sm text-brand-text-secondary">{member.lastLogin}</span>
              <span className="text-sm text-brand-text font-mono">{member.extension}</span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full w-fit ${INITIAL_TEAMS.find(t => t.name === member.team)?.color || 'bg-neutral-100 text-neutral-500'}`}>{member.team}</span>
              <div className="relative">
                <button onClick={() => setMenuOpenId(menuOpenId === member.id ? null : member.id)} className="p-1 rounded-full hover:bg-neutral-100 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
                {menuOpenId === member.id && (
                  <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl border border-brand-border shadow-lg py-1 z-50">
                    <button onClick={() => { setEditingId(member.id); setEditRole(member.role); setMenuOpenId(null); }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-brand-text-secondary hover:bg-neutral-50 hover:text-brand-text"><Pencil className="w-3.5 h-3.5" /> Edit Role</button>
                    <button onClick={() => { setResendId(member.id); setResendMethod('email'); setMenuOpenId(null); }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-brand-text-secondary hover:bg-neutral-50 hover:text-brand-text"><Send className="w-3.5 h-3.5" /> Resend Invitation</button>
                    {member.deactivated
                      ? <button onClick={() => { handleReactivate(member.id); setMenuOpenId(null); }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-green-600 hover:bg-green-50"><UserX className="w-3.5 h-3.5" /> Reactivate</button>
                      : <button onClick={() => { setConfirmDeleteId(member.id); setMenuOpenId(null); }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-orange-500 hover:bg-orange-50"><UserX className="w-3.5 h-3.5" /> Deactivate</button>
                    }
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      </div>

      {/* Pagination — sticky bottom */}
      <div className="shrink-0 flex items-center justify-between pt-4 mt-auto border-t border-neutral-100 text-sm text-brand-text-secondary">
        <span>{filtered.length} entries</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-lg border border-brand-border hover:bg-neutral-50 disabled:opacity-30 disabled:cursor-not-allowed"><ChevronLeft className="w-4 h-4" /></button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => setPage(n)} className={`w-8 h-8 rounded-lg text-xs font-medium ${page === n ? 'bg-yuzu-400 text-white' : 'border border-brand-border hover:bg-neutral-50'}`}>{n}</button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 rounded-lg border border-brand-border hover:bg-neutral-50 disabled:opacity-30 disabled:cursor-not-allowed"><ChevronRight className="w-4 h-4" /></button>
          <span className="ml-2 text-xs">Page {page}</span>
        </div>
      </div>

      {/* Invite side panel */}
      {showInvite && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowInvite(false)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-[slideIn_0.2s_ease-out]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
              <div><h3 className="text-lg font-semibold text-brand-text">Invite User</h3><p className="text-xs text-brand-text-secondary">Send an invite link via email</p></div>
              <button onClick={() => setShowInvite(false)} className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleInvite} className="flex-1 flex flex-col">
              <div className="flex-1 px-6 py-6 space-y-5 overflow-y-auto">
                <div><label className="block text-sm font-medium text-brand-text mb-1.5">Full name</label><input type="text" placeholder="e.g. Ahmed Al Maktoum" value={inviteForm.name} onChange={(e) => setInviteForm(f => ({ ...f, name: e.target.value }))} className="w-full px-4 py-3 rounded-full border border-brand-border bg-white text-brand-text text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition" required autoFocus /></div>
                <div><label className="block text-sm font-medium text-brand-text mb-1.5">Email address</label><input type="email" placeholder="colleague@company.com" value={inviteForm.email} onChange={(e) => setInviteForm(f => ({ ...f, email: e.target.value }))} className="w-full px-4 py-3 rounded-full border border-brand-border bg-white text-brand-text text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition" required /></div>
                <div><label className="block text-sm font-medium text-brand-text mb-1.5">Phone number</label><input type="tel" placeholder="+971 55 000 0000" value={inviteForm.phone} onChange={(e) => setInviteForm(f => ({ ...f, phone: e.target.value }))} className="w-full px-4 py-3 rounded-full border border-brand-border bg-white text-brand-text text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition" /></div>
                <div><label className="block text-sm font-medium text-brand-text mb-1.5">Role</label><select value={inviteForm.role} onChange={(e) => setInviteForm(f => ({ ...f, role: e.target.value }))} className="w-full px-4 py-3 rounded-full border border-brand-border bg-white text-brand-text text-sm appearance-none">{ROLES.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
                <div><label className="block text-sm font-medium text-brand-text mb-1.5">Team</label><select value={inviteForm.team} onChange={(e) => setInviteForm(f => ({ ...f, team: e.target.value }))} className="w-full px-4 py-3 rounded-full border border-brand-border bg-white text-brand-text text-sm appearance-none">{INITIAL_TEAMS.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}</select></div>
                <div><label className="block text-sm font-medium text-brand-text mb-1.5">Language</label><select value={inviteForm.lang} onChange={(e) => setInviteForm(f => ({ ...f, lang: e.target.value }))} className="w-full px-4 py-3 rounded-full border border-brand-border bg-white text-brand-text text-sm appearance-none"><option>English</option><option>Arabic</option><option>Hindi</option><option>Urdu</option><option>Filipino</option></select></div>
                <div className="bg-yuzu-50 border border-yuzu-300/30 rounded-xl p-3"><p className="text-xs text-yuzu-900">An invite link will be sent to their email. They&apos;ll verify via UAE Pass or OTP and join the workspace.</p></div>
              </div>
              <div className="px-6 py-4 border-t border-brand-border flex gap-3">
                <button type="button" onClick={() => setShowInvite(false)} className="flex-1 py-3 rounded-full border border-brand-border text-sm font-semibold text-brand-text-secondary hover:bg-neutral-50">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-full bg-yuzu-400 hover:bg-yuzu-300 text-white text-sm font-semibold shadow-[0_4px_14px_rgba(246,196,83,0.45)]">Send Invite</button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* Resend Invitation panel */}
      {resendId && (() => {
        const member = members.find(m => m.id === resendId)
        if (!member) return null
        return (
          <>
            <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setResendId(null)} />
            <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-[slideIn_0.2s_ease-out]">
              <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
                <div>
                  <h3 className="text-lg font-semibold text-brand-text">Resend Invitation</h3>
                  <p className="text-xs text-brand-text-secondary">Choose how to reach {member.name}</p>
                </div>
                <button onClick={() => setResendId(null)} className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex-1 px-6 py-6 space-y-5 overflow-y-auto">
                {/* Member summary */}
                <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl border border-brand-border">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-sm font-semibold text-brand-text-tertiary shrink-0">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-brand-text">{member.name}</p>
                    <p className="text-xs text-brand-text-secondary">{member.role} · {member.team}</p>
                  </div>
                </div>

                {/* Method toggle */}
                <div>
                  <label className="block text-sm font-medium text-brand-text mb-2">Send via</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setResendMethod('email')}
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-colors ${
                        resendMethod === 'email'
                          ? 'border-yuzu-400 bg-yuzu-50 text-yuzu-900'
                          : 'border-brand-border bg-white text-brand-text-secondary hover:bg-neutral-50'
                      }`}
                    >
                      <Mail className="w-4 h-4" /> Email
                    </button>
                    <button
                      onClick={() => setResendMethod('sms')}
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-colors ${
                        resendMethod === 'sms'
                          ? 'border-yuzu-400 bg-yuzu-50 text-yuzu-900'
                          : 'border-brand-border bg-white text-brand-text-secondary hover:bg-neutral-50'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" /> SMS
                    </button>
                  </div>
                </div>

                {/* Contact detail */}
                {resendMethod === 'email' ? (
                  <div>
                    <label className="block text-sm font-medium text-brand-text mb-1.5">Email address</label>
                    <input
                      type="email"
                      defaultValue={member.email}
                      className="w-full px-4 py-3 rounded-full border border-brand-border bg-white text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-brand-text mb-1.5">Mobile number</label>
                    <input
                      type="tel"
                      defaultValue={member.phone}
                      className="w-full px-4 py-3 rounded-full border border-brand-border bg-white text-brand-text text-sm font-mono focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition"
                    />
                  </div>
                )}

                <div className="bg-yuzu-50 border border-yuzu-300/30 rounded-xl p-3">
                  {resendMethod === 'email' ? (
                    <p className="text-xs text-yuzu-900">A new invite link will be sent to their email. The previous link will be invalidated.</p>
                  ) : (
                    <p className="text-xs text-yuzu-900">An SMS with a download link and one-time code will be sent. Useful for agents who don't have a work email.</p>
                  )}
                </div>
              </div>
              <div className="px-6 py-4 border-t border-brand-border flex gap-3">
                <button onClick={() => setResendId(null)} className="flex-1 py-3 rounded-full border border-brand-border text-sm font-semibold text-brand-text-secondary hover:bg-neutral-50">Cancel</button>
                <button onClick={() => setResendId(null)} className="flex-1 py-3 rounded-full bg-yuzu-400 hover:bg-yuzu-300 text-white text-sm font-semibold shadow-[0_4px_14px_rgba(246,196,83,0.45)]">
                  Send {resendMethod === 'email' ? 'Email' : 'SMS'}
                </button>
              </div>
            </div>
          </>
        )
      })()}

      {/* Confirm deactivate */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setConfirmDeleteId(null)}>
          <div className="bg-white rounded-2xl border border-brand-border p-6 w-full max-w-sm shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-brand-text mb-2">Deactivate user?</h3>
            <p className="text-sm text-brand-text-secondary mb-1">{members.find(m => m.id === confirmDeleteId)?.name} will lose access to the workspace.</p>
            <p className="text-xs text-brand-text-tertiary mb-5">They won't be billed next cycle. You can reactivate them at any time.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setConfirmDeleteId(null)} className="px-4 py-2 rounded-full border border-brand-border text-sm font-medium text-brand-text-secondary hover:bg-neutral-50">Cancel</button>
              <button onClick={() => handleRemove(confirmDeleteId)} className="px-5 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold">Deactivate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TeamsTab() {
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS)
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showCreate, setShowCreate] = useState(false)
  const [createForm, setCreateForm] = useState({ name: '', description: '', type: 'Round Robin' })
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showAddMember, setShowAddMember] = useState<string | null>(null)
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  const TEAM_COLORS = ['bg-blue-50 text-blue-600', 'bg-green-50 text-green-600', 'bg-purple-50 text-purple-600', 'bg-orange-50 text-orange-600', 'bg-pink-50 text-pink-600', 'bg-cyan-50 text-cyan-600']

  const filtered = teams.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()))

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!createForm.name.trim()) return
    setTeams(prev => [...prev, { id: Date.now().toString(), name: createForm.name, description: createForm.description, memberIds: [], color: TEAM_COLORS[teams.length % TEAM_COLORS.length], type: createForm.type }])
    setCreateForm({ name: '', description: '', type: 'Round Robin' })
    setShowCreate(false)
  }

  const handleDelete = (id: string) => { setTeams(prev => prev.filter(t => t.id !== id)); setConfirmDeleteId(null); }

  const handleAddMemberToTeam = (teamId: string, memberId: string) => {
    setTeams(prev => prev.map(t => t.id === teamId && !t.memberIds.includes(memberId) ? { ...t, memberIds: [...t.memberIds, memberId] } : t))
  }

  const handleRemoveMemberFromTeam = (teamId: string, memberId: string) => {
    setTeams(prev => prev.map(t => t.id === teamId ? { ...t, memberIds: t.memberIds.filter(id => id !== memberId) } : t))
  }

  const getMember = (id: string) => INITIAL_MEMBERS.find(m => m.id === id)

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input type="text" placeholder="Search teams" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-11 pr-4 py-2.5 rounded-full border border-brand-border bg-white text-brand-text text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition" />
        </div>
        <div className="flex items-center border border-brand-border rounded-lg overflow-hidden">
          <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-yuzu-400 text-white' : 'bg-white text-neutral-400 hover:bg-neutral-50'}`}><LayoutGrid className="w-4 h-4" /></button>
          <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-yuzu-400 text-white' : 'bg-white text-neutral-400 hover:bg-neutral-50'}`}><List className="w-4 h-4" /></button>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 bg-yuzu-400 hover:bg-yuzu-300 text-white font-semibold px-4 py-2.5 rounded-full text-sm transition-colors shadow-[0_4px_14px_rgba(246,196,83,0.45)] shrink-0">
          <Plus className="w-4 h-4" /> New Team
        </button>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {filtered.map((team) => (
            <div key={team.id} className="border border-neutral-200/80 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 bg-gradient-to-br from-white to-neutral-50/50 relative group cursor-pointer" onClick={() => setExpandedId(expandedId === team.id ? null : team.id)}>
              <button onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === team.id ? null : team.id); }} className="absolute top-3 right-3 p-1 rounded-full hover:bg-neutral-100 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-4 h-4" />
              </button>
              {menuOpenId === team.id && (
                <div className="absolute right-3 top-9 w-40 bg-white rounded-xl border border-brand-border shadow-lg py-1 z-50">
                  <button onClick={(e) => { e.stopPropagation(); setShowAddMember(team.id); setMenuOpenId(null); }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-brand-text-secondary hover:bg-neutral-50"><Plus className="w-3.5 h-3.5" /> Add User</button>
                  <button onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(team.id); setMenuOpenId(null); }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /> Delete Team</button>
                </div>
              )}
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${team.color}`}><UsersRound className="w-5 h-5" /></div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-brand-text">{team.name}</p>
                  <p className="text-xs text-brand-text-secondary truncate">{team.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                <span className="text-brand-text-secondary">Members</span><span className="text-brand-text font-medium">{team.memberIds.length}</span>
                <span className="text-brand-text-secondary">Routing</span><span className="text-brand-text font-medium">{team.type}</span>
              </div>
              {/* Expanded members */}
              {expandedId === team.id && (
                <div className="mt-3 pt-3 border-t border-neutral-100">
                  {team.memberIds.length === 0 ? (
                    <p className="text-xs text-brand-text-secondary">No members yet</p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {team.memberIds.map(mid => {
                        const m = getMember(mid)
                        if (!m) return null
                        return (
                          <span key={mid} className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-neutral-100 text-xs text-brand-text">
                            <span className="w-5 h-5 rounded-full bg-neutral-200 flex items-center justify-center text-[10px] font-medium">{m.name.split(' ').map(n => n[0]).join('')}</span>
                            {m.name.split(' ')[0]}
                            <button onClick={(e) => { e.stopPropagation(); handleRemoveMemberFromTeam(team.id, mid); }} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                          </span>
                        )
                      })}
                    </div>
                  )}
                  <button onClick={(e) => { e.stopPropagation(); setShowAddMember(team.id); }} className="mt-2 text-xs text-yuzu-900 font-medium flex items-center gap-1"><Plus className="w-3 h-3" /> Add user</button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-brand-border rounded-xl overflow-hidden bg-white">
          <div className="grid grid-cols-[1fr_1.5fr_0.6fr_0.7fr_40px] gap-2 px-4 py-2.5 bg-neutral-50 text-xs font-medium text-brand-text-secondary border-b border-brand-border">
            <span>Team</span><span>Description</span><span>Members</span><span>Routing</span><span />
          </div>
          {filtered.map((team) => (
            <div key={team.id} className="grid grid-cols-[1fr_1.5fr_0.6fr_0.7fr_40px] gap-2 px-4 py-3 border-b border-neutral-100 last:border-0 hover:bg-neutral-50 items-center group">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${team.color}`}><UsersRound className="w-4 h-4" /></div>
                <span className="text-sm font-medium text-brand-text">{team.name}</span>
              </div>
              <span className="text-sm text-brand-text-secondary truncate">{team.description}</span>
              <span className="text-sm text-brand-text font-medium">{team.memberIds.length}</span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 w-fit">{team.type}</span>
              <div className="relative">
                <button onClick={() => setMenuOpenId(menuOpenId === team.id ? null : team.id)} className="p-1 rounded-full hover:bg-neutral-100 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal className="w-4 h-4" /></button>
                {menuOpenId === team.id && (
                  <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl border border-brand-border shadow-lg py-1 z-50">
                    <button onClick={() => { setShowAddMember(team.id); setMenuOpenId(null); }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-brand-text-secondary hover:bg-neutral-50"><Plus className="w-3.5 h-3.5" /> Add User</button>
                    <button onClick={() => { setConfirmDeleteId(team.id); setMenuOpenId(null); }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /> Delete Team</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create team panel */}
      {showCreate && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowCreate(false)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-[slideIn_0.2s_ease-out]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
              <div><h3 className="text-lg font-semibold text-brand-text">Create Team</h3><p className="text-xs text-brand-text-secondary">Add a new team group</p></div>
              <button onClick={() => setShowCreate(false)} className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreate} className="flex-1 flex flex-col">
              <div className="flex-1 px-6 py-6 space-y-5 overflow-y-auto">
                <div><label className="block text-sm font-medium text-brand-text mb-1.5">Team name</label><input type="text" placeholder="e.g. Sales, Support, Logistics" value={createForm.name} onChange={(e) => setCreateForm(f => ({ ...f, name: e.target.value }))} className="w-full px-4 py-3 rounded-full border border-brand-border bg-white text-brand-text text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition" required autoFocus /></div>
                <div><label className="block text-sm font-medium text-brand-text mb-1.5">Description</label><input type="text" placeholder="What does this team handle?" value={createForm.description} onChange={(e) => setCreateForm(f => ({ ...f, description: e.target.value }))} className="w-full px-4 py-3 rounded-full border border-brand-border bg-white text-brand-text text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition" /></div>
                <div><label className="block text-sm font-medium text-brand-text mb-1.5">Routing type</label><select value={createForm.type} onChange={(e) => setCreateForm(f => ({ ...f, type: e.target.value }))} className="w-full px-4 py-3 rounded-full border border-brand-border bg-white text-brand-text text-sm appearance-none"><option>Round Robin</option><option>Skill Based</option><option>Sequential</option></select></div>
                <div className="bg-yuzu-50 border border-yuzu-300/30 rounded-xl p-3"><p className="text-xs text-yuzu-900">Teams are used for routing calls, assigning conversations, and managing permissions.</p></div>
              </div>
              <div className="px-6 py-4 border-t border-brand-border flex gap-3">
                <button type="button" onClick={() => setShowCreate(false)} className="flex-1 py-3 rounded-full border border-brand-border text-sm font-semibold text-brand-text-secondary hover:bg-neutral-50">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-full bg-yuzu-400 hover:bg-yuzu-300 text-white text-sm font-semibold shadow-[0_4px_14px_rgba(246,196,83,0.45)]">Create Team</button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* Add member modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowAddMember(null)}>
          <div className="bg-white rounded-2xl border border-brand-border p-6 w-full max-w-sm shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-brand-text mb-1">Add user to {teams.find(t => t.id === showAddMember)?.name}</h3>
            <p className="text-sm text-brand-text-secondary mb-4">Select a user to add</p>
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {INITIAL_MEMBERS.filter(m => !teams.find(t => t.id === showAddMember)?.memberIds.includes(m.id)).map(m => (
                <button key={m.id} onClick={() => { handleAddMemberToTeam(showAddMember, m.id); setShowAddMember(null); }} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-neutral-50 text-left">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-medium text-brand-text-tertiary">{m.name.split(' ').map(n => n[0]).join('')}</div>
                  <div><p className="text-sm font-medium text-brand-text">{m.name}</p><p className="text-xs text-brand-text-secondary">{m.role}</p></div>
                </button>
              ))}
              {INITIAL_MEMBERS.filter(m => !teams.find(t => t.id === showAddMember)?.memberIds.includes(m.id)).length === 0 && (
                <p className="text-sm text-brand-text-secondary py-2 text-center">All users are already in this team</p>
              )}
            </div>
            <button onClick={() => setShowAddMember(null)} className="mt-4 w-full py-2.5 rounded-full border border-brand-border text-sm font-medium text-brand-text-secondary hover:bg-neutral-50">Close</button>
          </div>
        </div>
      )}

      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setConfirmDeleteId(null)}>
          <div className="bg-white rounded-2xl border border-brand-border p-6 w-full max-w-sm shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-brand-text mb-2">Delete team?</h3>
            <p className="text-sm text-brand-text-secondary mb-5"><strong>{teams.find(t => t.id === confirmDeleteId)?.name}</strong> will be deleted. Users will not be removed.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setConfirmDeleteId(null)} className="px-4 py-2 rounded-full border border-brand-border text-sm font-medium text-brand-text-secondary hover:bg-neutral-50">Cancel</button>
              <button onClick={() => handleDelete(confirmDeleteId)} className="px-5 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function NumbersTab() {
  const [dids, setDids] = useState<DIDNumber[]>(INITIAL_DIDS)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive' | 'unassigned'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [showAdd, setShowAdd] = useState(false)
  const [addForm, setAddForm] = useState({ number: '', label: '', assignedTo: '', assignedType: 'team' as 'team' | 'user', country: 'UAE' })
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editAssign, setEditAssign] = useState({ assignedTo: '', assignedType: 'team' as 'team' | 'user' })

  const filterCounts = {
    all: dids.length,
    active: dids.filter(d => d.status === 'active').length,
    inactive: dids.filter(d => d.status === 'inactive').length,
    unassigned: dids.filter(d => d.assignedType === 'unassigned').length,
  }

  const filtered = dids.filter(d => {
    const matchesSearch = d.number.includes(search) || d.label.toLowerCase().includes(search.toLowerCase()) || d.assignedTo.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || (filter === 'unassigned' ? d.assignedType === 'unassigned' : d.status === filter)
    return matchesSearch && matchesFilter
  })

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!addForm.number.trim()) return
    setDids(prev => [...prev, {
      id: Date.now().toString(), number: addForm.number, label: addForm.label,
      assignedTo: addForm.assignedTo || '', assignedType: addForm.assignedTo ? addForm.assignedType : 'unassigned',
      country: addForm.country, status: addForm.assignedTo ? 'active' : 'inactive',
    }])
    setAddForm({ number: '', label: '', assignedTo: '', assignedType: 'team', country: 'UAE' })
    setShowAdd(false)
  }

  const handleSaveAssign = (id: string) => {
    setDids(prev => prev.map(d => d.id === id ? {
      ...d, assignedTo: editAssign.assignedTo, assignedType: editAssign.assignedTo ? editAssign.assignedType : 'unassigned',
      status: editAssign.assignedTo ? 'active' : 'inactive',
    } : d))
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    setDids(prev => prev.filter(d => d.id !== id))
    setMenuOpenId(null)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <div className="flex items-center gap-2 mb-4">
        {Object.entries(filterCounts).map(([key, count]) => (
          <button key={key} onClick={() => setFilter(key as typeof filter)} className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${filter === key ? 'bg-yuzu-400 text-white' : 'bg-white border border-brand-border text-brand-text-secondary hover:bg-neutral-50'}`}>
            {key.charAt(0).toUpperCase() + key.slice(1)} | {count}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input type="text" placeholder="Search numbers" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-11 pr-4 py-2.5 rounded-full border border-brand-border bg-white text-brand-text text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition" />
        </div>
        <div className="flex items-center border border-brand-border rounded-lg overflow-hidden">
          <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-yuzu-400 text-white' : 'bg-white text-neutral-400 hover:bg-neutral-50'}`}><LayoutGrid className="w-4 h-4" /></button>
          <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-yuzu-400 text-white' : 'bg-white text-neutral-400 hover:bg-neutral-50'}`}><List className="w-4 h-4" /></button>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 bg-yuzu-400 hover:bg-yuzu-300 text-white font-semibold px-4 py-2.5 rounded-full text-sm transition-colors shadow-[0_4px_14px_rgba(246,196,83,0.45)] shrink-0">
          <Plus className="w-4 h-4" /> Add Number
        </button>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {filtered.map((did) => (
            <div key={did.id} className="border border-neutral-200/80 rounded-2xl p-5 bg-gradient-to-br from-white to-neutral-50/50 relative group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <button onClick={() => setMenuOpenId(menuOpenId === did.id ? null : did.id)} className="absolute top-3 right-3 p-1 rounded-full hover:bg-neutral-100 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-4 h-4" />
              </button>
              {menuOpenId === did.id && (
                <div className="absolute right-3 top-9 w-44 bg-white rounded-xl border border-brand-border shadow-lg py-1 z-50">
                  <button onClick={() => { setEditingId(did.id); setEditAssign({ assignedTo: did.assignedTo, assignedType: did.assignedType === 'unassigned' ? 'team' : did.assignedType }); setMenuOpenId(null); }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-brand-text-secondary hover:bg-neutral-50"><Pencil className="w-3.5 h-3.5" /> Reassign</button>
                  <button onClick={() => handleDelete(did.id)} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /> Remove</button>
                </div>
              )}
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${did.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-neutral-100 text-neutral-400'}`}>
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-brand-text font-mono">{did.number}</p>
                  <p className="text-xs text-brand-text-secondary">{did.label || 'No label'}</p>
                </div>
              </div>
              {editingId === did.id ? (
                <div className="space-y-2">
                  <select value={editAssign.assignedType} onChange={(e) => setEditAssign(a => ({ ...a, assignedType: e.target.value as 'team' | 'user' }))} className="w-full px-3 py-2 rounded-full border border-brand-border bg-white text-brand-text text-xs appearance-none">
                    <option value="team">Team</option><option value="user">User</option>
                  </select>
                  <select value={editAssign.assignedTo} onChange={(e) => setEditAssign(a => ({ ...a, assignedTo: e.target.value }))} className="w-full px-3 py-2 rounded-full border border-brand-border bg-white text-brand-text text-xs appearance-none">
                    <option value="">Unassigned</option>
                    {editAssign.assignedType === 'team'
                      ? INITIAL_TEAMS.map(t => <option key={t.id} value={t.name}>{t.name}</option>)
                      : INITIAL_MEMBERS.map(m => <option key={m.id} value={m.name}>{m.name}</option>)
                    }
                  </select>
                  <div className="flex gap-2">
                    <button onClick={() => handleSaveAssign(did.id)} className="flex-1 py-1.5 rounded-full bg-yuzu-400 text-white text-xs font-semibold">Save</button>
                    <button onClick={() => setEditingId(null)} className="flex-1 py-1.5 rounded-full border border-brand-border text-xs text-brand-text-secondary">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                  <span className="text-brand-text-secondary">Assigned to</span>
                  <span className="text-brand-text font-medium">{did.assignedTo || 'Unassigned'}</span>
                  <span className="text-brand-text-secondary">Type</span>
                  <span className={`font-medium px-2 py-0.5 rounded-full w-fit ${did.assignedType === 'team' ? 'bg-purple-50 text-purple-600' : did.assignedType === 'user' ? 'bg-blue-50 text-blue-600' : 'bg-neutral-100 text-neutral-500'}`}>
                    {did.assignedType === 'unassigned' ? 'Unassigned' : did.assignedType.charAt(0).toUpperCase() + did.assignedType.slice(1)}
                  </span>
                  <span className="text-brand-text-secondary">Country</span>
                  <span className="text-brand-text font-medium">{did.country}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-brand-border rounded-xl overflow-hidden bg-white">
          <div className="grid grid-cols-[1fr_0.8fr_0.8fr_0.6fr_0.5fr_0.5fr_40px] gap-2 px-4 py-2.5 bg-neutral-50 text-xs font-medium text-brand-text-secondary border-b border-brand-border">
            <span>Number</span><span>Label</span><span>Assigned To</span><span>Type</span><span>Country</span><span>Status</span><span />
          </div>
          {filtered.map((did) => (
            <div key={did.id} className="grid grid-cols-[1fr_0.8fr_0.8fr_0.6fr_0.5fr_0.5fr_40px] gap-2 px-4 py-3 border-b border-neutral-100 last:border-0 hover:bg-neutral-50 items-center group">
              <span className="text-sm font-medium text-brand-text font-mono">{did.number}</span>
              <span className="text-sm text-brand-text-secondary">{did.label || '—'}</span>
              <span className="text-sm text-brand-text">{did.assignedTo || 'Unassigned'}</span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full w-fit ${did.assignedType === 'team' ? 'bg-purple-50 text-purple-600' : did.assignedType === 'user' ? 'bg-blue-50 text-blue-600' : 'bg-neutral-100 text-neutral-500'}`}>
                {did.assignedType === 'unassigned' ? 'None' : did.assignedType.charAt(0).toUpperCase() + did.assignedType.slice(1)}
              </span>
              <span className="text-sm text-brand-text-secondary">{did.country}</span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full w-fit ${did.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>{did.status === 'active' ? 'Active' : 'Inactive'}</span>
              <div className="relative">
                <button onClick={() => setMenuOpenId(menuOpenId === did.id ? null : did.id)} className="p-1 rounded-full hover:bg-neutral-100 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal className="w-4 h-4" /></button>
                {menuOpenId === did.id && (
                  <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl border border-brand-border shadow-lg py-1 z-50">
                    <button onClick={() => { setEditingId(did.id); setEditAssign({ assignedTo: did.assignedTo, assignedType: did.assignedType === 'unassigned' ? 'team' : did.assignedType }); setMenuOpenId(null); }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-brand-text-secondary hover:bg-neutral-50"><Pencil className="w-3.5 h-3.5" /> Reassign</button>
                    <button onClick={() => handleDelete(did.id)} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /> Remove</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      </div>

      <div className="shrink-0 flex items-center justify-between pt-4 mt-auto border-t border-neutral-100 text-sm text-brand-text-secondary">
        <span>{filtered.length} numbers</span>
      </div>

      {/* Add number panel */}
      {showAdd && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowAdd(false)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-[slideIn_0.2s_ease-out]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
              <div><h3 className="text-lg font-semibold text-brand-text">Add DID Number</h3><p className="text-xs text-brand-text-secondary">Add a new phone number and assign it</p></div>
              <button onClick={() => setShowAdd(false)} className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAdd} className="flex-1 flex flex-col">
              <div className="flex-1 px-6 py-6 space-y-5 overflow-y-auto">
                <div><label className="block text-sm font-medium text-brand-text mb-1.5">Phone number</label><input type="tel" placeholder="+971 4 XXX XXXX" value={addForm.number} onChange={(e) => setAddForm(f => ({ ...f, number: e.target.value }))} className="w-full px-4 py-3 rounded-full border border-brand-border bg-white text-brand-text text-sm font-mono placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition" required autoFocus /></div>
                <div><label className="block text-sm font-medium text-brand-text mb-1.5">Label</label><input type="text" placeholder="e.g. Main Line, Sales Hotline" value={addForm.label} onChange={(e) => setAddForm(f => ({ ...f, label: e.target.value }))} className="w-full px-4 py-3 rounded-full border border-brand-border bg-white text-brand-text text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition" /></div>
                <div><label className="block text-sm font-medium text-brand-text mb-1.5">Country</label><select value={addForm.country} onChange={(e) => setAddForm(f => ({ ...f, country: e.target.value }))} className="w-full px-4 py-3 rounded-full border border-brand-border bg-white text-brand-text text-sm appearance-none"><option>UAE</option><option>KSA</option><option>Bahrain</option><option>Qatar</option><option>Oman</option><option>Kuwait</option></select></div>
                <div><label className="block text-sm font-medium text-brand-text mb-1.5">Assign to</label><select value={addForm.assignedType} onChange={(e) => setAddForm(f => ({ ...f, assignedType: e.target.value as 'team' | 'user' }))} className="w-full px-4 py-3 rounded-full border border-brand-border bg-white text-brand-text text-sm appearance-none"><option value="team">Team</option><option value="user">User</option></select></div>
                <div><label className="block text-sm font-medium text-brand-text mb-1.5">{addForm.assignedType === 'team' ? 'Select team' : 'Select user'}</label>
                  <select value={addForm.assignedTo} onChange={(e) => setAddForm(f => ({ ...f, assignedTo: e.target.value }))} className="w-full px-4 py-3 rounded-full border border-brand-border bg-white text-brand-text text-sm appearance-none">
                    <option value="">Leave unassigned</option>
                    {addForm.assignedType === 'team'
                      ? INITIAL_TEAMS.map(t => <option key={t.id} value={t.name}>{t.name}</option>)
                      : INITIAL_MEMBERS.map(m => <option key={m.id} value={m.name}>{m.name}</option>)
                    }
                  </select>
                </div>
                <div className="bg-yuzu-50 border border-yuzu-300/30 rounded-xl p-3"><p className="text-xs text-yuzu-900">DID numbers are used for inbound call routing. Assign to a team for group routing or to a user for direct lines.</p></div>
              </div>
              <div className="px-6 py-4 border-t border-brand-border flex gap-3">
                <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-3 rounded-full border border-brand-border text-sm font-semibold text-brand-text-secondary hover:bg-neutral-50">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-full bg-yuzu-400 hover:bg-yuzu-300 text-white text-sm font-semibold shadow-[0_4px_14px_rgba(246,196,83,0.45)]">Add Number</button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

function BillingTab() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-brand-text mb-4">Billing</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-neutral-50 rounded-xl p-4">
          <p className="text-xs text-brand-text-secondary mb-1">Current Plan</p>
          <p className="text-xl font-bold text-brand-text">Business</p>
          <p className="text-xs text-brand-text-secondary">$20/user/month</p>
          <button className="mt-2 text-xs text-yuzu-900 font-medium flex items-center gap-1">Upgrade <ArrowUpRight className="w-3 h-3" /></button>
        </div>
        <div className="bg-neutral-50 rounded-xl p-4">
          <p className="text-xs text-brand-text-secondary mb-1">Active Users</p>
          <p className="text-xl font-bold text-brand-text">24 <span className="text-sm font-normal text-brand-text-secondary">/ 50</span></p>
          <div className="mt-2 w-full bg-neutral-200 rounded-full h-1.5"><div className="bg-yuzu-400 h-1.5 rounded-full" style={{ width: '48%' }} /></div>
        </div>
        <div className="bg-neutral-50 rounded-xl p-4">
          <p className="text-xs text-brand-text-secondary mb-1">Next Billing</p>
          <p className="text-xl font-bold text-brand-text">$480</p>
          <p className="text-xs text-brand-text-secondary">June 1, 2026 · Visa 4242</p>
        </div>
      </div>
      <div className="border-t border-neutral-100 pt-6 mb-6">
        <h3 className="text-sm font-semibold text-brand-text mb-3">Invoices</h3>
        {INVOICES.map((inv) => (
          <div key={inv.date} className="flex items-center justify-between py-2.5 border-b border-neutral-100 last:border-0">
            <div><p className="text-sm text-brand-text">{inv.date}</p><p className="text-xs text-brand-text-secondary">{inv.users} users</p></div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-brand-text">{inv.amount}</span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700">{inv.status}</span>
              <button className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400"><Download className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-neutral-100 pt-6">
        <h3 className="text-sm font-semibold text-brand-text mb-3">User Changes</h3>
        {USER_CHANGES.map((change, i) => (
          <div key={i} className="flex items-center gap-3 py-2.5 border-b border-neutral-100 last:border-0">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center ${change.action === 'added' ? 'bg-green-50' : 'bg-red-50'}`}>
              {change.action === 'added' ? <Plus className="w-3.5 h-3.5 text-green-600" /> : <Minus className="w-3.5 h-3.5 text-red-500" />}
            </div>
            <div className="flex-1"><p className="text-sm text-brand-text">{change.name}</p><p className="text-xs text-brand-text-secondary">{change.date}</p></div>
            <span className="text-xs text-brand-text-secondary">{change.prorated ? `Prorated: ${change.prorated}` : change.note}</span>
          </div>
        ))}
        <div className="mt-4 p-3 bg-yuzu-50 rounded-xl border border-yuzu-300/30">
          <p className="text-xs text-yuzu-900"><strong>Billing rules:</strong> New users are charged prorated till month-end, then full amount on the 1st. Removed users will not renew next cycle.</p>
        </div>
      </div>
    </div>
  )
}

function ConnectorsTab() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-brand-text mb-4">Connectors</h2>
      <div className="space-y-4">
        {CONNECTORS.map((connector) => {
          const Icon = connector.icon
          const isActive = connector.status === 'connected'
          return (
            <div key={connector.name} className="border border-brand-border rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${connector.color}`}><Icon className="w-5 h-5" /></div>
                  <div><h3 className="text-sm font-semibold text-brand-text">{connector.name}</h3><p className="text-xs text-brand-text-secondary">{connector.description}</p></div>
                </div>
                <Toggle enabled={isActive} />
              </div>
              <div className="flex items-center gap-6 text-sm">
                {connector.details.map(({ label, value }) => (
                  <div key={label}><span className="text-brand-text-secondary">{label}: </span><span className="font-medium text-brand-text">{value}</span></div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-100">
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${isActive ? 'bg-green-50 text-green-700' : connector.status === 'available' ? 'bg-yuzu-50 text-yuzu-900' : 'bg-neutral-100 text-neutral-500'}`}>
                  {isActive ? 'Connected' : connector.status === 'available' ? 'Available' : 'Not Configured'}
                </span>
                <button className="text-xs text-yuzu-900 hover:text-yuzu-800 font-medium flex items-center gap-1">
                  {isActive ? 'Settings' : 'Configure'} <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex gap-0 min-h-[calc(100vh-80px)]">
      <nav className={`shrink-0 bg-[#FAF7F4] rounded-2xl mr-4 pt-3 pb-3 transition-all duration-200 ${sidebarOpen ? 'w-52 px-2' : 'w-14 px-1.5'}`}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center justify-center w-full mb-2 p-2 rounded-lg text-brand-text-secondary hover:text-brand-text hover:bg-yuzu-100 transition-colors"
          title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
        </button>
        <div className="space-y-0.5">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              title={!sidebarOpen ? label : undefined}
              className={`flex items-center w-full rounded-xl text-sm font-medium transition-colors relative group ${
                sidebarOpen ? 'gap-3 px-4 py-2.5' : 'justify-center p-2.5'
              } ${
                activeTab === id ? 'bg-white text-brand-text shadow-sm' : 'text-brand-text-secondary hover:bg-white/60 hover:text-brand-text'
              }`}
            >
              <Icon className="w-4.5 h-4.5 shrink-0" />
              {sidebarOpen && label}
              {!sidebarOpen && (
                <div className="absolute left-full ml-3 px-2.5 py-1 bg-neutral-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {label}
                </div>
              )}
            </button>
          ))}
        </div>
      </nav>

      <div className="flex-1 pl-4 pt-2 max-w-5xl">
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'users' && <UsersTab />}
        {activeTab === 'teams' && <TeamsTab />}
        {activeTab === 'numbers' && <NumbersTab />}
        {activeTab === 'billing' && <BillingTab />}
        {activeTab === 'connectors' && <ConnectorsTab />}
      </div>
    </div>
  )
}

import { useState, useRef, useEffect } from 'react'
import {
  MessageSquare, Mail, Phone, Hash, Search,
  Download, ChevronLeft, ChevronRight, Mic, Circle, X,
  SlidersHorizontal, ChevronRight as ChevRight, Users, Building2, Tag, Zap,
} from 'lucide-react'

type ConvType       = 'dm' | 'channel' | 'whatsapp' | 'email' | 'chat'
type ExternalStatus = 'Open' | 'Pending' | 'Resolved' | 'Closed'
type InternalStatus = 'Unread' | 'Read'
type Section        = 'internal' | 'external'

interface Conversation {
  id: string
  type: ConvType
  contact: string
  contactSub?: string
  avatarColor?: string
  avatarInitials?: string
  subject: string
  lastMessage: string
  hasVoiceNote?: boolean
  status?: ExternalStatus
  assignee: string
  assigneeColor?: string
  assigneeInitials?: string
  dept: string
  lastActivity: string
  tags: string[]
  unread: boolean
  aiFlag?: 'urgent' | 'attention'
}

const CONVERSATIONS: Conversation[] = [
  // ── DMs ─────────────────────────────────────────────────────────────────
  {
    id: 'dm1', type: 'dm',
    contact: 'Sarah Jenkins', contactSub: 'Head of Design · sarah.j@yuzu.team',
    avatarColor: '#7c3aed', avatarInitials: 'SJ',
    subject: 'Brand assets & color palette',
    lastMessage: '3pm works perfectly! See you then 👍',
    assignee: 'Priya Nair', assigneeColor: '#be185d', assigneeInitials: 'PN',
    dept: 'Design', lastActivity: 'Today 12:03 PM',
    tags: ['brand', 'design'], unread: true, aiFlag: 'attention',
  },
  {
    id: 'dm2', type: 'dm',
    contact: 'David Chen', contactSub: 'Lead Engineer · david.c@yuzu.team',
    avatarColor: '#2563eb', avatarInitials: 'DC',
    subject: 'Q3 report — slide 14 placeholder numbers',
    lastMessage: 'Thanks for the heads-up, will fix slide 14 🙏',
    hasVoiceNote: true,
    assignee: 'Marcus Lee', assigneeColor: '#0891b2', assigneeInitials: 'ML',
    dept: 'Engineering', lastActivity: 'Today 1h ago',
    tags: ['report', 'q3'], unread: false,
  },
  {
    id: 'dm3', type: 'dm',
    contact: 'Alex Kim', contactSub: 'Senior Designer · alex.k@yuzu.team',
    avatarColor: '#059669', avatarInitials: 'AK',
    subject: 'New brand feedback + desktop app stack',
    lastMessage: 'Electron with vanilla JS — keeping it lean and fast.',
    hasVoiceNote: true,
    assignee: 'Sarah Jenkins', assigneeColor: '#7c3aed', assigneeInitials: 'SJ',
    dept: 'Design', lastActivity: 'Yesterday',
    tags: ['brand', 'tech'], unread: false,
  },
  {
    id: 'dm4', type: 'dm',
    contact: 'Jessica Park', contactSub: 'Marketing Manager · jessica.p@yuzu.team',
    avatarColor: '#d97706', avatarInitials: 'JP',
    subject: 'Campaign slides for Q3 launch',
    lastMessage: 'Sounds good, looking forward to it 👍',
    assignee: '—',
    dept: 'Marketing', lastActivity: 'Yesterday',
    tags: ['campaign', 'marketing'], unread: true,
  },
  {
    id: 'dm5', type: 'dm',
    contact: 'Marcus Lee', contactSub: 'Product Manager · marcus.l@yuzu.team',
    avatarColor: '#0891b2', avatarInitials: 'ML',
    subject: 'Product roadmap — Monday sync',
    lastMessage: 'Added the items to the backlog. Ready for Monday.',
    assignee: 'Alex Kim', assigneeColor: '#059669', assigneeInitials: 'AK',
    dept: 'Product', lastActivity: 'Yesterday',
    tags: ['roadmap'], unread: false,
  },
  {
    id: 'dm6', type: 'dm',
    contact: 'Tom Eriksson', contactSub: 'Backend Engineer · tom.e@yuzu.team',
    avatarColor: '#64748b', avatarInitials: 'TE',
    subject: 'CI pipeline config update',
    lastMessage: 'Added a note: use the new CI pipeline config',
    assignee: 'David Chen', assigneeColor: '#2563eb', assigneeInitials: 'DC',
    dept: 'Engineering', lastActivity: '2 days ago',
    tags: ['devops'], unread: false,
  },
  // ── Channels ─────────────────────────────────────────────────────────────
  {
    id: 'ch1', type: 'channel',
    contact: '#product-launch-q3', contactSub: '12 members',
    subject: 'Q3 Brand Launch Discussion',
    lastMessage: 'Launch is set for next Monday. Will share the timeline doc today.',
    assignee: 'Sarah Jenkins', assigneeColor: '#7c3aed', assigneeInitials: 'SJ',
    dept: 'Product', lastActivity: 'Today 10:35 AM',
    tags: ['launch', 'brand', 'q3'], unread: true, aiFlag: 'urgent',
  },
  {
    id: 'ch2', type: 'channel',
    contact: '#engineering-team', contactSub: '8 members',
    subject: 'Staging Deployment Update',
    lastMessage: 'All smoke tests passing. Will monitor logs post-deploy.',
    assignee: 'David Chen', assigneeColor: '#2563eb', assigneeInitials: 'DC',
    dept: 'Engineering', lastActivity: 'Today 9:47 AM',
    tags: ['deployment', 'staging'], unread: false,
  },
  {
    id: 'ch3', type: 'channel',
    contact: '#design-system', contactSub: '5 members',
    subject: 'Component Library v2 Review',
    lastMessage: 'Ghost variant: 1px border, 40% opacity. Updating spec now.',
    assignee: 'Alex Kim', assigneeColor: '#059669', assigneeInitials: 'AK',
    dept: 'Design', lastActivity: 'Yesterday',
    tags: ['components'], unread: true,
  },
  // ── WhatsApp ──────────────────────────────────────────────────────────────
  {
    id: 'wa1', type: 'whatsapp',
    contact: 'Sarah Al Mansoori', contactSub: '+971 55 123 4567',
    subject: 'Order tracking issue',
    lastMessage: 'Can you please check my order status?',
    status: 'Open',
    assignee: 'Marcus Lee', assigneeColor: '#0891b2', assigneeInitials: 'ML',
    dept: 'Support', lastActivity: 'Today 6:08 PM',
    tags: ['urgent', 'order'], unread: true, aiFlag: 'urgent',
  },
  {
    id: 'wa2', type: 'whatsapp',
    contact: 'Lena Müller', contactSub: '+49 151 234 5678',
    subject: 'Return & refund request',
    lastMessage: 'I would like to return the item I bought last week.',
    status: 'Pending',
    assignee: 'Tom Eriksson', assigneeColor: '#64748b', assigneeInitials: 'TE',
    dept: 'Support', lastActivity: 'Today 4:26 PM',
    tags: ['refund'], unread: false,
  },
  {
    id: 'wa3', type: 'whatsapp',
    contact: 'Aisha Yusuf', contactSub: '+254 700 123456',
    subject: 'Subscription upgrade to Pro',
    lastMessage: 'I want to move to the Pro plan.',
    status: 'Closed',
    assignee: 'Jessica Park', assigneeColor: '#d97706', assigneeInitials: 'JP',
    dept: 'Billing', lastActivity: 'Today 2:15 PM',
    tags: ['subscription'], unread: false,
  },
  // ── Email ─────────────────────────────────────────────────────────────────
  {
    id: 'em1', type: 'email',
    contact: 'James Carter', contactSub: 'james@acme.com',
    subject: 'Invoice request for March',
    lastMessage: 'Hi, I need the invoice for last month subscription.',
    status: 'Pending',
    assignee: 'Priya Nair', assigneeColor: '#be185d', assigneeInitials: 'PN',
    dept: 'Billing', lastActivity: 'Today 5:46 PM',
    tags: ['billing', 'invoice'], unread: true, aiFlag: 'attention',
  },
  {
    id: 'em2', type: 'email',
    contact: 'Tomás Ferreira', contactSub: 'tomas@globalco.pt',
    subject: 'SLA & uptime guarantee query',
    lastMessage: 'What uptime do you guarantee for enterprise?',
    status: 'Open',
    assignee: '—',
    dept: 'Sales', lastActivity: 'Today 1:40 PM',
    tags: ['enterprise', 'sla'], unread: true,
  },
  {
    id: 'em3', type: 'email',
    contact: 'David Kim', contactSub: 'david.kim@startup.io',
    subject: 'Onboarding walkthrough request',
    lastMessage: 'We need help getting the whole team set up on yuzu.',
    status: 'Open',
    assignee: 'Marcus Lee', assigneeColor: '#0891b2', assigneeInitials: 'ML',
    dept: 'Sales', lastActivity: 'Today 3:55 PM',
    tags: ['onboarding'], unread: false,
  },
  // ── Live Chat ─────────────────────────────────────────────────────────────
  {
    id: 'lc1', type: 'chat',
    contact: 'Riya Mehta',
    subject: 'Password reset not working',
    lastMessage: 'I still cannot log in after resetting my password.',
    status: 'Open',
    assignee: 'Tom Eriksson', assigneeColor: '#64748b', assigneeInitials: 'TE',
    dept: 'Support', lastActivity: 'Today 5:30 PM',
    tags: ['auth'], unread: false,
  },
  {
    id: 'lc2', type: 'chat',
    contact: 'Carlos Reyes',
    subject: 'API rate limit 429 error',
    lastMessage: 'Getting 429 errors on the search endpoint.',
    status: 'Open',
    assignee: 'David Chen', assigneeColor: '#2563eb', assigneeInitials: 'DC',
    dept: 'Support', lastActivity: 'Today 3:10 PM',
    tags: ['technical', 'api'], unread: true, aiFlag: 'urgent',
  },
]

// ── helpers ─────────────────────────────────────────────────────────────────

const INTERNAL_TYPES: ConvType[] = ['dm', 'channel']
const EXTERNAL_TYPES: ConvType[] = ['whatsapp', 'email', 'chat']
const isInternal = (c: Conversation) => INTERNAL_TYPES.includes(c.type)
const isExternal = (c: Conversation) => EXTERNAL_TYPES.includes(c.type)

const TYPE_CONFIG: Record<ConvType, { icon: typeof MessageSquare; bg: string; iconColor: string; label: string }> = {
  dm:       { icon: MessageSquare, bg: 'bg-violet-100', iconColor: 'text-violet-600', label: 'DMs' },
  channel:  { icon: Hash,          bg: 'bg-blue-100',   iconColor: 'text-blue-600',   label: 'Channels' },
  whatsapp: { icon: Phone,         bg: 'bg-green-100',  iconColor: 'text-green-600',  label: 'WhatsApp' },
  email:    { icon: Mail,          bg: 'bg-purple-100', iconColor: 'text-purple-600', label: 'Email' },
  chat:     { icon: MessageSquare, bg: 'bg-sky-100',    iconColor: 'text-sky-600',    label: 'Live Chat' },
}

const EXT_STATUS_COLORS: Record<ExternalStatus, string> = {
  Open:     'text-blue-600 bg-blue-50',
  Pending:  'text-orange-500 bg-orange-50',
  Resolved: 'text-green-600 bg-green-50',
  Closed:   'text-neutral-500 bg-neutral-100',
}

const ALL_ASSIGNEES = [
  { name: 'Sarah Jenkins', color: '#7c3aed' },
  { name: 'Alex Kim',      color: '#059669' },
  { name: 'David Chen',    color: '#2563eb' },
  { name: 'Jessica Park',  color: '#d97706' },
  { name: 'Marcus Lee',    color: '#0891b2' },
  { name: 'Priya Nair',    color: '#be185d' },
  { name: 'Tom Eriksson',  color: '#64748b' },
]

const ITEMS_PER_PAGE = 8

type FilterCategory = 'status' | 'team' | 'assignee' | 'tag' | 'ai'

function ConversationsPage() {
  const [section, setSection]       = useState<Section>('internal')
  const [intTypeFilter, setIntType] = useState<ConvType | 'all'>('all')
  const [intStatus, setIntStatus]   = useState<InternalStatus | 'all'>('all')
  const [extTypeFilter, setExtType] = useState<ConvType | 'all'>('all')
  const [extStatus, setExtStatus]   = useState<ExternalStatus | 'all'>('all')
  const [deptFilter, setDept]       = useState('all')
  const [assigneeFilter, setAssignee] = useState('all')
  const [tagFilter, setTag]         = useState('all')
  const [aiFlagFilter, setAiFlag]   = useState<'all' | 'urgent' | 'attention'>('all')
  const [search, setSearch]         = useState('')
  const [page, setPage]             = useState(1)
  const [filterOpen, setFilterOpen] = useState(false)
  const [filterCategory, setFilterCategory] = useState<FilterCategory | null>(null)
  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false)
        setFilterCategory(null)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function resetPage(fn: () => void) { fn(); setPage(1) }

  function switchSection(s: Section) {
    setSection(s)
    setDept('all')
    setAssignee('all')
    setTag('all')
    setAiFlag('all')
    setSearch('')
    setPage(1)
  }

  function clearAllFilters() {
    setDept('all')
    setAssignee('all')
    setTag('all')
    setAiFlag('all')
    setIntStatus('all')
    setExtStatus('all')
    setPage(1)
  }

  const base = CONVERSATIONS.filter(section === 'internal' ? isInternal : isExternal)

  const filtered = base.filter(c => {
    if (section === 'internal') {
      if (intTypeFilter !== 'all' && c.type !== intTypeFilter) return false
      if (intStatus === 'Unread' && !c.unread)  return false
      if (intStatus === 'Read'   &&  c.unread)  return false
    } else {
      if (extTypeFilter !== 'all' && c.type !== extTypeFilter)  return false
      if (extStatus     !== 'all' && c.status !== extStatus)    return false
    }
    if (deptFilter     !== 'all' && c.dept     !== deptFilter)     return false
    if (assigneeFilter !== 'all' && c.assignee !== assigneeFilter) return false
    if (tagFilter      !== 'all' && !c.tags.includes(tagFilter))   return false
    if (aiFlagFilter   !== 'all' && c.aiFlag !== aiFlagFilter)     return false
    const q = search.toLowerCase()
    if (q && !c.contact.toLowerCase().includes(q)
          && !c.subject.toLowerCase().includes(q)
          && !c.assignee.toLowerCase().includes(q)
          && !(c.contactSub?.toLowerCase().includes(q) ?? false)) return false
    return true
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const intBase = CONVERSATIONS.filter(isInternal)
  const extBase = CONVERSATIONS.filter(isExternal)

  const intTypeCounts = {
    all:     intBase.length,
    dm:      intBase.filter(c => c.type === 'dm').length,
    channel: intBase.filter(c => c.type === 'channel').length,
  }
  const extTypeCounts = {
    all:      extBase.length,
    whatsapp: extBase.filter(c => c.type === 'whatsapp').length,
    email:    extBase.filter(c => c.type === 'email').length,
    chat:     extBase.filter(c => c.type === 'chat').length,
  }
  const availableTags = Array.from(new Set(base.flatMap(c => c.tags))).sort()
  const deptOptions = section === 'internal'
    ? ['Design', 'Engineering', 'Marketing', 'Product']
    : ['Support', 'Sales', 'Billing']

  const currentStatus = section === 'internal' ? intStatus : extStatus
  const appliedFilters: { key: string; label: string; clear: () => void }[] = [
    ...(currentStatus  !== 'all' ? [{ key: 'status',   label: `Status is ${currentStatus}`,   clear: () => resetPage(() => section === 'internal' ? setIntStatus('all') : setExtStatus('all')) }] : []),
    ...(deptFilter     !== 'all' ? [{ key: 'dept',     label: `Team is ${deptFilter}`,         clear: () => resetPage(() => setDept('all')) }]      : []),
    ...(assigneeFilter !== 'all' ? [{ key: 'assignee', label: `Assignee is ${assigneeFilter}`, clear: () => resetPage(() => setAssignee('all')) }]  : []),
    ...(tagFilter      !== 'all' ? [{ key: 'tag',      label: `Tag is ${tagFilter}`,                 clear: () => resetPage(() => setTag('all')) }]             : []),
    ...(aiFlagFilter   !== 'all' ? [{ key: 'ai',       label: `AI: ${aiFlagFilter === 'urgent' ? '🔴 Urgent' : '🟡 Attention'}`, clear: () => resetPage(() => setAiFlag('all')) }] : []),
  ]

  const FILTER_CATEGORIES: { key: FilterCategory; label: string; icon: typeof Tag }[] = [
    { key: 'ai',       label: 'AI Priority', icon: Zap },
    { key: 'status',   label: 'Status',      icon: Circle },
    { key: 'team',     label: 'Team',        icon: Building2 },
    { key: 'assignee', label: 'Assignee',    icon: Users },
    { key: 'tag',      label: 'Tags',        icon: Tag },
  ]

  function renderFilterPanel() {
    if (filterCategory === null) {
      return (
        <>
          <p className="px-3 pt-2.5 pb-1.5 text-[11px] font-semibold text-brand-text-secondary uppercase tracking-wide">Filter by…</p>
          <div className="border-t border-neutral-100 py-1">
            {FILTER_CATEGORIES.map(({ key, label, icon: Icon }) => {
              const active = (key === 'ai'       && aiFlagFilter !== 'all') ||
                             (key === 'status'   && currentStatus !== 'all') ||
                             (key === 'team'     && deptFilter !== 'all') ||
                             (key === 'assignee' && assigneeFilter !== 'all') ||
                             (key === 'tag'      && tagFilter !== 'all')
              return (
                <button key={key} onClick={() => setFilterCategory(key)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-neutral-50 transition-colors">
                  <span className="flex items-center gap-2.5 text-brand-text">
                    <Icon className={`w-4 h-4 ${active ? 'text-yuzu-400' : 'text-neutral-400'}`} />
                    {label}
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-yuzu-400" />}
                  </span>
                  <ChevRight className="w-3.5 h-3.5 text-neutral-300" />
                </button>
              )
            })}
          </div>
        </>
      )
    }

    const back = () => setFilterCategory(null)

    if (filterCategory === 'ai') {
      const opts: { value: 'urgent' | 'attention'; label: string; color: string }[] = [
        { value: 'urgent',    label: 'Urgent',    color: 'bg-red-500' },
        { value: 'attention', label: 'Attention', color: 'bg-yellow-400' },
      ]
      return (
        <>
          <button onClick={back} className="flex items-center gap-1.5 px-3 pt-2.5 pb-1.5 text-[11px] font-semibold text-brand-text-secondary uppercase tracking-wide hover:text-brand-text transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" /> AI Priority
          </button>
          <div className="border-t border-neutral-100 py-1">
            {opts.map(opt => {
              const selected = aiFlagFilter === opt.value
              return (
                <button key={opt.value} onClick={() => { resetPage(() => setAiFlag(selected ? 'all' : opt.value)); back() }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-neutral-50 transition-colors text-brand-text">
                  <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${selected ? 'bg-yuzu-400 border-yuzu-400' : 'border-neutral-300'}`}>
                    {selected && <span className="w-2 h-2 bg-white rounded-sm" />}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${opt.color}`} />
                    {opt.label}
                  </span>
                </button>
              )
            })}
          </div>
        </>
      )
    }

    if (filterCategory === 'status') {
      const intOpts: InternalStatus[] = ['Unread', 'Read']
      const extOpts: ExternalStatus[] = ['Open', 'Pending', 'Resolved', 'Closed']
      const opts = section === 'internal' ? intOpts : extOpts
      const dotColor: Record<string, string> = {
        Unread: 'bg-yuzu-400', Read: 'bg-neutral-300',
        Open: 'bg-blue-500', Pending: 'bg-orange-400', Resolved: 'bg-green-500', Closed: 'bg-neutral-400',
      }
      return (
        <>
          <button onClick={back} className="flex items-center gap-1.5 px-3 pt-2.5 pb-1.5 text-[11px] font-semibold text-brand-text-secondary uppercase tracking-wide hover:text-brand-text transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" /> Filter by Status
          </button>
          <div className="border-t border-neutral-100 py-1">
            {opts.map(opt => {
              const selected = section === 'internal' ? intStatus === opt : extStatus === opt
              return (
                <button key={opt} onClick={() => {
                  if (section === 'internal') resetPage(() => setIntStatus(selected ? 'all' : opt as InternalStatus))
                  else resetPage(() => setExtStatus(selected ? 'all' : opt as ExternalStatus))
                  back()
                }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-neutral-50 transition-colors text-brand-text">
                  <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${selected ? 'bg-yuzu-400 border-yuzu-400' : 'border-neutral-300'}`}>
                    {selected && <span className="w-2 h-2 bg-white rounded-sm" />}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${dotColor[opt]}`} />
                    {opt}
                  </span>
                </button>
              )
            })}
          </div>
        </>
      )
    }

    if (filterCategory === 'team') {
      return (
        <>
          <button onClick={back} className="flex items-center gap-1.5 px-3 pt-2.5 pb-1.5 text-[11px] font-semibold text-brand-text-secondary uppercase tracking-wide hover:text-brand-text transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" /> Filter by Team
          </button>
          <div className="border-t border-neutral-100 py-1">
            {deptOptions.map(opt => (
              <button key={opt} onClick={() => { resetPage(() => setDept(opt === deptFilter ? 'all' : opt)); back() }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-neutral-50 transition-colors text-brand-text">
                <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${deptFilter === opt ? 'bg-yuzu-400 border-yuzu-400' : 'border-neutral-300'}`}>
                  {deptFilter === opt && <span className="w-2 h-2 bg-white rounded-sm" />}
                </span>
                {opt}
              </button>
            ))}
          </div>
        </>
      )
    }

    if (filterCategory === 'assignee') {
      return (
        <>
          <button onClick={back} className="flex items-center gap-1.5 px-3 pt-2.5 pb-1.5 text-[11px] font-semibold text-brand-text-secondary uppercase tracking-wide hover:text-brand-text transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" /> Filter by Assignee
          </button>
          <div className="border-t border-neutral-100 py-1 max-h-52 overflow-y-auto">
            {['—', ...ALL_ASSIGNEES.map(a => a.name)].map(opt => {
              const a = ALL_ASSIGNEES.find(x => x.name === opt)
              return (
                <button key={opt} onClick={() => { resetPage(() => setAssignee(opt === assigneeFilter ? 'all' : opt)); back() }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-neutral-50 transition-colors text-brand-text">
                  <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${assigneeFilter === opt ? 'bg-yuzu-400 border-yuzu-400' : 'border-neutral-300'}`}>
                    {assigneeFilter === opt && <span className="w-2 h-2 bg-white rounded-sm" />}
                  </span>
                  {a ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full text-[9px] font-bold text-white flex items-center justify-center shrink-0"
                        style={{ backgroundColor: a.color }}>{a.name.split(' ').map(n => n[0]).join('')}</span>
                      {opt}
                    </span>
                  ) : <span className="text-brand-text-secondary">Unassigned</span>}
                </button>
              )
            })}
          </div>
        </>
      )
    }

    if (filterCategory === 'tag') {
      return (
        <>
          <button onClick={back} className="flex items-center gap-1.5 px-3 pt-2.5 pb-1.5 text-[11px] font-semibold text-brand-text-secondary uppercase tracking-wide hover:text-brand-text transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" /> Filter by Tag
          </button>
          <div className="border-t border-neutral-100 py-1 max-h-52 overflow-y-auto">
            {availableTags.map(opt => (
              <button key={opt} onClick={() => { resetPage(() => setTag(opt === tagFilter ? 'all' : opt)); back() }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-neutral-50 transition-colors text-brand-text">
                <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${tagFilter === opt ? 'bg-yuzu-400 border-yuzu-400' : 'border-neutral-300'}`}>
                  {tagFilter === opt && <span className="w-2 h-2 bg-white rounded-sm" />}
                </span>
                {opt}
              </button>
            ))}
          </div>
        </>
      )
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">

      {/* ── Single filter bar ── */}
      <div className="flex items-center gap-2 mb-3">
        {/* Internal / External toggle */}
        <div className="flex items-center bg-neutral-100 rounded-full p-0.5 gap-0.5 shrink-0">
          {(['internal', 'external'] as const).map(s => (
            <button key={s} onClick={() => switchSection(s)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all capitalize ${
                section === s ? 'bg-white text-brand-text shadow-sm' : 'text-brand-text-secondary hover:text-brand-text'
              }`}>
              {s === 'internal' ? `Internal · ${intBase.length}` : `External · ${extBase.length}`}
            </button>
          ))}
        </div>

        <div className="w-px h-4 bg-neutral-200 shrink-0" />

        {/* Type chips */}
        {section === 'internal'
          ? (['all', 'dm', 'channel'] as const).map(t => (
              <button key={t} onClick={() => resetPage(() => setIntType(t))}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors shrink-0 ${
                  intTypeFilter === t ? 'bg-yuzu-400 text-white' : 'bg-white border border-brand-border text-brand-text-secondary hover:bg-neutral-50'
                }`}>
                {t === 'all' ? `All · ${intTypeCounts.all}` : t === 'dm' ? `DMs · ${intTypeCounts.dm}` : `Channels · ${intTypeCounts.channel}`}
              </button>
            ))
          : (['all', 'whatsapp', 'email', 'chat'] as const).map(t => (
              <button key={t} onClick={() => resetPage(() => setExtType(t))}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors shrink-0 ${
                  extTypeFilter === t ? 'bg-yuzu-400 text-white' : 'bg-white border border-brand-border text-brand-text-secondary hover:bg-neutral-50'
                }`}>
                {t !== 'all' && (() => { const { icon: Icon } = TYPE_CONFIG[t]; return <Icon className="w-3 h-3" /> })()}
                {t === 'all' ? `All · ${extTypeCounts.all}` : `${TYPE_CONFIG[t].label} · ${extTypeCounts[t as keyof typeof extTypeCounts]}`}
              </button>
            ))
        }

        {/* Search */}
        <div className="relative ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
          <input type="text" placeholder="Search in Conversations" value={search}
            onChange={e => resetPage(() => setSearch(e.target.value))}
            className="w-44 pl-9 pr-3 py-1.5 rounded-full border border-brand-border bg-white text-xs text-brand-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent focus:w-56 transition-all"
          />
        </div>

        {/* Filter button + panel */}
        <div className="relative shrink-0" ref={filterRef}>
          <button onClick={() => { setFilterOpen(o => !o); setFilterCategory(null) }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              filterOpen || appliedFilters.length > 0
                ? 'bg-yuzu-50 border-yuzu-400 text-yuzu-900'
                : 'bg-white border-brand-border text-brand-text-secondary hover:bg-neutral-50'
            }`}>
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filter
            {appliedFilters.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-yuzu-400 text-white text-[10px] font-bold flex items-center justify-center leading-none">
                {appliedFilters.length}
              </span>
            )}
          </button>
          {filterOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-56 bg-white border border-neutral-200 rounded-xl shadow-lg z-50 overflow-hidden">
              {renderFilterPanel()}
            </div>
          )}
        </div>

        <button className="p-1.5 rounded-lg border border-brand-border bg-white text-neutral-500 hover:bg-neutral-50 transition-colors shrink-0">
          <Download className="w-4 h-4" />
        </button>
      </div>

      {/* ── Applied filters strip ── */}
      {appliedFilters.length > 0 && (
        <div className="flex items-center gap-1.5 mb-3 flex-wrap">
          {appliedFilters.map(f => (
            <span key={f.key} className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-neutral-100 text-brand-text border border-neutral-200">
              {f.label}
              <button onClick={f.clear} className="ml-0.5 text-neutral-400 hover:text-brand-text transition-colors">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button onClick={clearAllFilters}
            className="inline-flex items-center gap-1 text-[11px] font-semibold px-3 py-1 rounded-full bg-yuzu-400 text-white hover:bg-yuzu-300 transition-colors">
            <X className="w-3 h-3" />
            Clear Filters
          </button>
        </div>
      )}

      <div className="flex items-center justify-end mb-2">
        <span className="text-xs text-brand-text-secondary">{filtered.length} conversation{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* ── Table ── */}
      <div className="flex-1 overflow-y-auto min-h-0 bg-white border border-brand-border rounded-xl">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="border-b border-brand-border bg-neutral-50 text-xs text-brand-text-secondary">
              <th className="px-2 py-3 w-6"></th>
              <th className="px-4 py-3 text-left font-medium w-10">Type</th>
              <th className="px-4 py-3 text-left font-medium">Contact / Channel</th>
              <th className="px-4 py-3 text-left font-medium">Subject</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Assignee</th>
              <th className="px-4 py-3 text-left font-medium">Team</th>
              <th className="px-4 py-3 text-left font-medium">Last Activity</th>
              <th className="px-4 py-3 text-left font-medium">Tags</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-center text-sm text-brand-text-secondary">
                  No conversations match your filters.
                </td>
              </tr>
            )}
            {paginated.map(conv => {
              const { icon: Icon, bg, iconColor } = TYPE_CONFIG[conv.type]
              return (
                <tr key={conv.id} className={`border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors cursor-pointer ${conv.aiFlag === 'urgent' ? 'border-l-2 border-l-red-400' : conv.aiFlag === 'attention' ? 'border-l-2 border-l-yellow-400' : 'border-l-2 border-l-transparent'}`}>
                  <td className="pl-2 pr-0 py-3">
                    {conv.aiFlag && (
                      <div title={conv.aiFlag === 'urgent' ? 'AI: Urgent' : 'AI: Needs attention'}
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${conv.aiFlag === 'urgent' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                        <Zap className={`w-2.5 h-2.5 ${conv.aiFlag === 'urgent' ? 'text-red-500' : 'text-yellow-500'}`} />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bg}`}>
                      <Icon className={`w-4 h-4 ${iconColor}`} />
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      {conv.unread && <span className="w-2 h-2 rounded-full bg-yuzu-400 shrink-0" />}
                      {conv.avatarInitials ? (
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                          style={{ backgroundColor: conv.avatarColor }}>
                          {conv.avatarInitials}
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500 text-xs font-bold shrink-0">
                          {conv.contact.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-brand-text leading-tight">{conv.contact}</p>
                        {conv.contactSub && <p className="text-xs text-brand-text-secondary truncate max-w-[160px]">{conv.contactSub}</p>}
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 max-w-[220px]">
                    <p className="text-brand-text font-medium truncate">{conv.subject}</p>
                    <div className="flex items-center gap-1">
                      {conv.hasVoiceNote && <Mic className="w-3 h-3 text-brand-text-secondary shrink-0" />}
                      <p className="text-xs text-brand-text-secondary truncate">{conv.lastMessage}</p>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    {conv.status ? (
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${EXT_STATUS_COLORS[conv.status]}`}>
                        {conv.status}
                      </span>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <Circle className={`w-2 h-2 fill-current ${conv.unread ? 'text-yuzu-400' : 'text-neutral-300'}`} />
                        <span className="text-xs text-brand-text-secondary">{conv.unread ? 'Unread' : 'Read'}</span>
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {conv.assigneeInitials ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                          style={{ backgroundColor: conv.assigneeColor }}>
                          {conv.assigneeInitials}
                        </div>
                        <span className="text-xs text-brand-text-secondary">{conv.assignee}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-brand-text-secondary">{conv.assignee}</span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-xs text-brand-text-secondary">{conv.dept}</td>
                  <td className="px-4 py-3 text-xs text-brand-text-secondary whitespace-nowrap">{conv.lastActivity}</td>

                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {conv.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500">{tag}</span>
                      ))}
                      {conv.tags.length > 2 && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-400">+{conv.tags.length - 2}</span>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      <div className="shrink-0 flex items-center justify-end pt-4 mt-auto border-t border-neutral-100">
        <div className="flex items-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="p-1.5 rounded-lg border border-brand-border hover:bg-neutral-50 disabled:opacity-30 disabled:cursor-not-allowed">
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => setPage(n)}
              className={`w-8 h-8 rounded-lg text-xs font-medium ${page === n ? 'bg-yuzu-400 text-white' : 'border border-brand-border hover:bg-neutral-50'}`}>
              {n}
            </button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages || totalPages === 0}
            className="p-1.5 rounded-lg border border-brand-border hover:bg-neutral-50 disabled:opacity-30 disabled:cursor-not-allowed">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConversationsPage

import { useState } from 'react'
import {
  PhoneIncoming, PhoneOutgoing, PhoneMissed, PhoneForwarded,
  Search, Download, SlidersHorizontal, ChevronLeft, ChevronRight,
} from 'lucide-react'

type CallDirection = 'inbound' | 'outbound' | 'missed' | 'transfer'
type CallResult = 'Answered' | 'No-Answer' | 'Failed' | 'Cancel'

interface Call {
  id: string
  direction: CallDirection
  startDate: string
  endDate: string
  callerNumber: string
  calledNumber: string
  duration: string
  result: CallResult
  agent: string
  queue: string
  tags: string[]
}

const CALLS: Call[] = [
  { id: 'c1', direction: 'inbound', startDate: '5/15/26 6:08 PM', endDate: '5/15/26 6:10 PM', callerNumber: '+971 55 123 4567', calledNumber: '+971 4 123 4567', duration: '00:01:24', result: 'Answered', agent: 'Ahmed Al Maktoum', queue: 'Support', tags: [] },
  { id: 'c2', direction: 'inbound', startDate: '5/15/26 6:04 PM', endDate: '5/15/26 6:08 PM', callerNumber: '+971 55 123 4567', calledNumber: '+971 4 123 4567', duration: '00:04:32', result: 'Cancel', agent: 'Ahmed Al Maktoum', queue: 'Support', tags: [] },
  { id: 'c3', direction: 'outbound', startDate: '5/15/26 5:46 PM', endDate: '5/15/26 5:46 PM', callerNumber: 'Fatima Hassan', calledNumber: '+966 11 500 3609', duration: '00:00:01', result: 'Failed', agent: 'Fatima Hassan', queue: '—', tags: [] },
  { id: 'c4', direction: 'outbound', startDate: '5/15/26 5:00 PM', endDate: '5/15/26 5:00 PM', callerNumber: 'Omar Khalid', calledNumber: '+971 50 353 8087', duration: '00:00:06', result: 'Answered', agent: 'Omar Khalid', queue: '—', tags: [] },
  { id: 'c5', direction: 'missed', startDate: '5/15/26 4:46 PM', endDate: '5/15/26 4:46 PM', callerNumber: '+971 58 501 9835', calledNumber: '+971 4 123 4568', duration: '00:00:22', result: 'No-Answer', agent: 'Fatima Hassan', queue: 'Sales', tags: [] },
  { id: 'c6', direction: 'outbound', startDate: '5/15/26 4:30 PM', endDate: '5/15/26 4:30 PM', callerNumber: 'Raj Patel', calledNumber: '+971 44 419 6405', duration: '00:00:03', result: 'Answered', agent: 'Raj Patel', queue: '—', tags: [] },
  { id: 'c7', direction: 'outbound', startDate: '5/15/26 4:28 PM', endDate: '5/15/26 4:28 PM', callerNumber: 'Omar Khalid', calledNumber: '+971 50 353 8087', duration: '00:00:01', result: 'Cancel', agent: 'Omar Khalid', queue: '—', tags: [] },
  { id: 'c8', direction: 'inbound', startDate: '5/15/26 4:26 PM', endDate: '5/15/26 4:26 PM', callerNumber: '+971 44 593 408', calledNumber: '+971 4 123 4570', duration: '00:00:03', result: 'Answered', agent: 'Sara Mohamed', queue: 'Operations', tags: [] },
  { id: 'c9', direction: 'transfer', startDate: '5/15/26 4:22 PM', endDate: '5/15/26 4:22 PM', callerNumber: 'Omar Khalid', calledNumber: 'Ahmed Al Maktoum', duration: '00:06:48', result: 'Answered', agent: 'Ahmed Al Maktoum', queue: 'Support', tags: [] },
  { id: 'c10', direction: 'missed', startDate: '5/15/26 3:55 PM', endDate: '5/15/26 3:55 PM', callerNumber: '+971 50 666 7777', calledNumber: '+971 4 123 4567', duration: '00:00:00', result: 'No-Answer', agent: '—', queue: 'Support', tags: [] },
  { id: 'c11', direction: 'inbound', startDate: '5/15/26 3:30 PM', endDate: '5/15/26 3:34 PM', callerNumber: '+966 55 234 5678', calledNumber: '+966 11 456 7890', duration: '00:03:12', result: 'Answered', agent: 'Ali Khan', queue: 'Sales', tags: [] },
  { id: 'c12', direction: 'outbound', startDate: '5/15/26 2:15 PM', endDate: '5/15/26 2:17 PM', callerNumber: 'Priya Sharma', calledNumber: '+971 55 999 0001', duration: '00:02:05', result: 'Answered', agent: 'Priya Sharma', queue: '—', tags: [] },
]

const DIRECTION_CONFIG: Record<CallDirection, { icon: typeof PhoneIncoming; bg: string; iconColor: string }> = {
  inbound:  { icon: PhoneIncoming,  bg: 'bg-green-100',  iconColor: 'text-green-600' },
  outbound: { icon: PhoneOutgoing,  bg: 'bg-blue-100',   iconColor: 'text-blue-600' },
  missed:   { icon: PhoneMissed,    bg: 'bg-red-100',    iconColor: 'text-red-500' },
  transfer: { icon: PhoneForwarded, bg: 'bg-purple-100', iconColor: 'text-purple-600' },
}

const RESULT_COLORS: Record<CallResult, string> = {
  Answered:   'text-green-600 bg-green-50',
  'No-Answer': 'text-orange-500 bg-orange-50',
  Failed:     'text-red-500 bg-red-50',
  Cancel:     'text-neutral-500 bg-neutral-100',
}

const ITEMS_PER_PAGE = 8

export default function VoicePage() {
  const [search, setSearch] = useState('')
  const [dirFilter, setDirFilter] = useState<CallDirection | 'all'>('all')
  const [page, setPage] = useState(1)

  const filtered = CALLS.filter(c => {
    const matchDir = dirFilter === 'all' || c.direction === dirFilter
    const q = search.toLowerCase()
    const matchSearch = !q || c.callerNumber.toLowerCase().includes(q) || c.calledNumber.toLowerCase().includes(q) || c.agent.toLowerCase().includes(q) || c.queue.toLowerCase().includes(q)
    return matchDir && matchSearch
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const counts = {
    all: CALLS.length,
    inbound: CALLS.filter(c => c.direction === 'inbound').length,
    outbound: CALLS.filter(c => c.direction === 'outbound').length,
    missed: CALLS.filter(c => c.direction === 'missed').length,
    transfer: CALLS.filter(c => c.direction === 'transfer').length,
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Filter tabs + search + actions — single row */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {(['all', 'inbound', 'outbound', 'missed', 'transfer'] as const).map(dir => (
          <button
            key={dir}
            onClick={() => { setDirFilter(dir); setPage(1) }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium capitalize transition-colors shrink-0 ${
              dirFilter === dir ? 'bg-yuzu-400 text-white' : 'bg-white border border-brand-border text-brand-text-secondary hover:bg-neutral-50'
            }`}
          >
            {dir === 'all' ? 'All' : dir} | {counts[dir]}
          </button>
        ))}

        <div className="relative ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by number, agent or queue…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            className="w-48 pl-9 pr-3 py-1.5 rounded-full border border-brand-border bg-white text-xs text-brand-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent focus:w-64 transition-all"
          />
        </div>
        <button className="p-1.5 rounded-lg border border-brand-border bg-white text-neutral-500 hover:bg-neutral-50 transition-colors shrink-0">
          <SlidersHorizontal className="w-4 h-4" />
        </button>
        <button className="p-1.5 rounded-lg border border-brand-border bg-white text-neutral-500 hover:bg-neutral-50 transition-colors shrink-0">
          <Download className="w-4 h-4" />
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto min-h-0 bg-white border border-brand-border rounded-xl">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="border-b border-brand-border bg-neutral-50 text-xs text-brand-text-secondary">
              <th className="px-4 py-3 text-left font-medium w-10">Dir</th>
              <th className="px-4 py-3 text-left font-medium">Start Date</th>
              <th className="px-4 py-3 text-left font-medium">End Date</th>
              <th className="px-4 py-3 text-left font-medium">Caller Number</th>
              <th className="px-4 py-3 text-left font-medium">Called Number</th>
              <th className="px-4 py-3 text-left font-medium">Duration</th>
              <th className="px-4 py-3 text-left font-medium">Result</th>
              <th className="px-4 py-3 text-left font-medium">Agent</th>
              <th className="px-4 py-3 text-left font-medium">Queue</th>
              <th className="px-4 py-3 text-left font-medium">Tags</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(call => {
              const { icon: Icon, bg, iconColor } = DIRECTION_CONFIG[call.direction]
              return (
                <tr key={call.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bg}`}>
                      <Icon className={`w-4 h-4 ${iconColor}`} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-brand-text-secondary whitespace-nowrap">{call.startDate}</td>
                  <td className="px-4 py-3 text-brand-text-secondary whitespace-nowrap">{call.endDate}</td>
                  <td className="px-4 py-3 text-brand-text font-medium">{call.callerNumber}</td>
                  <td className="px-4 py-3 text-brand-text">{call.calledNumber}</td>
                  <td className="px-4 py-3 text-brand-text font-mono">{call.duration}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${RESULT_COLORS[call.result]}`}>
                      {call.result}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-brand-text-secondary">{call.agent}</td>
                  <td className="px-4 py-3 text-brand-text-secondary">{call.queue}</td>
                  <td className="px-4 py-3 text-brand-text-secondary">—</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="shrink-0 flex items-center justify-between pt-4 mt-auto border-t border-neutral-100 text-sm text-brand-text-secondary">
        <span>{filtered.length} calls</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-lg border border-brand-border hover:bg-neutral-50 disabled:opacity-30 disabled:cursor-not-allowed">
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => setPage(n)} className={`w-8 h-8 rounded-lg text-xs font-medium ${page === n ? 'bg-yuzu-400 text-white' : 'border border-brand-border hover:bg-neutral-50'}`}>{n}</button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages || totalPages === 0} className="p-1.5 rounded-lg border border-brand-border hover:bg-neutral-50 disabled:opacity-30 disabled:cursor-not-allowed">
            <ChevronRight className="w-4 h-4" />
          </button>
          <span className="ml-2 text-xs">Page {page}</span>
        </div>
      </div>
    </div>
  )
}

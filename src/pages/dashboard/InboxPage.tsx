import { useState } from 'react'
import { Star, Clock, CheckCheck, Filter } from 'lucide-react'

const PRIORITIES = ['All', 'High', 'Medium', 'Low'] as const

const MESSAGES = [
  { id: 1, from: 'Ahmed Al Maktoum', preview: 'Can you review the delivery schedule for tomorrow?', channel: 'DM', time: '2 min ago', priority: 'High', unread: true, starred: true },
  { id: 2, from: '#operations', preview: 'Fatima: Updated the shift roster for next week', channel: 'Channel', time: '5 min ago', priority: 'Medium', unread: true, starred: false },
  { id: 3, from: 'WhatsApp · +971 55 123 4567', preview: 'Hi, I need to change my delivery address', channel: 'WhatsApp', time: '12 min ago', priority: 'High', unread: true, starred: false },
  { id: 4, from: 'Raj Patel', preview: '🎤 Voice note (0:34)', channel: 'DM', time: '18 min ago', priority: 'Low', unread: false, starred: false },
  { id: 5, from: '#support', preview: 'Omar: Ticket #1042 has been escalated', channel: 'Channel', time: '25 min ago', priority: 'High', unread: false, starred: true },
  { id: 6, from: 'Sara Mohamed', preview: 'The site inspection report is ready', channel: 'DM', time: '1 hr ago', priority: 'Medium', unread: false, starred: false },
  { id: 7, from: 'WhatsApp · +971 50 987 6543', preview: 'Thank you for the quick response!', channel: 'WhatsApp', time: '2 hr ago', priority: 'Low', unread: false, starred: false },
]

const PRIORITY_COLORS: Record<string, string> = {
  High: 'bg-red-50 text-red-600',
  Medium: 'bg-yuzu-50 text-yuzu-900',
  Low: 'bg-neutral-100 text-neutral-500',
}

const CHANNEL_COLORS: Record<string, string> = {
  DM: 'bg-blue-50 text-blue-600',
  Channel: 'bg-purple-50 text-purple-600',
  WhatsApp: 'bg-green-50 text-green-700',
}

export default function InboxPage() {
  const [filter, setFilter] = useState<(typeof PRIORITIES)[number]>('All')

  const filtered = filter === 'All' ? MESSAGES : MESSAGES.filter(m => m.priority === filter)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div />
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-text-secondary" />
          {PRIORITIES.map(p => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === p
                  ? 'bg-yuzu-400 text-white'
                  : 'bg-white border border-brand-border text-brand-text-secondary hover:bg-neutral-50'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-brand-border overflow-hidden">
        {filtered.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-center gap-4 px-5 py-4 border-b border-neutral-100 last:border-0 hover:bg-neutral-50 cursor-pointer transition-colors ${
              msg.unread ? 'bg-yuzu-50/30' : ''
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-sm font-medium text-brand-text-tertiary shrink-0">
              {msg.from.startsWith('#') ? msg.from.slice(1, 3).toUpperCase() : msg.from.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`text-sm font-medium ${msg.unread ? 'text-brand-text' : 'text-brand-text-secondary'}`}>
                  {msg.from}
                </span>
                {msg.starred && <Star className="w-3.5 h-3.5 text-yuzu-400 fill-yuzu-400" />}
              </div>
              <p className="text-sm text-brand-text-tertiary truncate">{msg.preview}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${CHANNEL_COLORS[msg.channel]}`}>
                {msg.channel}
              </span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${PRIORITY_COLORS[msg.priority]}`}>
                {msg.priority}
              </span>
              <span className="text-xs text-brand-text-secondary w-16 text-right">{msg.time}</span>
              {msg.unread && <div className="w-2 h-2 rounded-full bg-yuzu-400" />}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-brand-text-secondary">
        <div className="flex items-center gap-2">
          <CheckCheck className="w-4 h-4" />
          <span>{MESSAGES.filter(m => !m.unread).length} read</span>
          <span>·</span>
          <span>{MESSAGES.filter(m => m.unread).length} unread</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>Last updated: just now</span>
        </div>
      </div>
    </div>
  )
}

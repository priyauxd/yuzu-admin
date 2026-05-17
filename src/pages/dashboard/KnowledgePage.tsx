import { Plus, Search, FileText, MessageSquare } from 'lucide-react'
import { useState } from 'react'

const ARTICLES = [
  { id: 1, title: 'Order delivery process', category: 'Operations', responses: 12, lastUsed: '2 hr ago' },
  { id: 2, title: 'Return & refund policy', category: 'Support', responses: 28, lastUsed: '15 min ago' },
  { id: 3, title: 'Payment methods accepted', category: 'Support', responses: 19, lastUsed: '1 hr ago' },
  { id: 4, title: 'Working hours & holidays', category: 'HR', responses: 8, lastUsed: '1 day ago' },
  { id: 5, title: 'Escalation procedure', category: 'Support', responses: 15, lastUsed: '3 hr ago' },
  { id: 6, title: 'New employee onboarding checklist', category: 'HR', responses: 4, lastUsed: '2 days ago' },
]

const CANNED_RESPONSES = [
  { id: 1, shortcut: '/greeting', text: 'Hello! Thank you for reaching out. How can I help you today?', uses: 156 },
  { id: 2, shortcut: '/eta', text: 'Your order is on its way and should arrive within [TIME]. I\'ll keep you updated!', uses: 89 },
  { id: 3, shortcut: '/resolved', text: 'Glad I could help! Is there anything else you need assistance with?', uses: 124 },
  { id: 4, shortcut: '/hold', text: 'Let me check on that for you. I\'ll get back to you within a few minutes.', uses: 67 },
]

export default function KnowledgePage() {
  const [search, setSearch] = useState('')

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div />
        <button className="flex items-center gap-2 bg-yuzu-400 hover:bg-yuzu-300 text-white font-semibold px-4 py-2.5 rounded-full text-sm transition-colors shadow-[0_4px_14px_rgba(246,196,83,0.45)]">
          <Plus className="w-4 h-4" />
          New Article
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search articles & responses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full border border-brand-border bg-white text-brand-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-brand-border p-5">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-brand-text-secondary" />
            <h2 className="font-semibold text-brand-text">Articles</h2>
            <span className="text-xs text-brand-text-secondary ml-auto">{ARTICLES.length} articles</span>
          </div>
          <div className="space-y-2">
            {ARTICLES.map(article => (
              <div key={article.id} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-neutral-50 cursor-pointer transition-colors border-b border-neutral-100 last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-brand-text">{article.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500">{article.category}</span>
                    <span className="text-xs text-brand-text-secondary">Used {article.responses} times</span>
                  </div>
                </div>
                <span className="text-xs text-brand-text-secondary shrink-0">{article.lastUsed}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-brand-border p-5">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-brand-text-secondary" />
            <h2 className="font-semibold text-brand-text">Canned Responses</h2>
            <span className="text-xs text-brand-text-secondary ml-auto">{CANNED_RESPONSES.length} responses</span>
          </div>
          <div className="space-y-2">
            {CANNED_RESPONSES.map(resp => (
              <div key={resp.id} className="px-3 py-3 rounded-xl hover:bg-neutral-50 cursor-pointer transition-colors border-b border-neutral-100 last:border-0">
                <div className="flex items-center gap-2 mb-1">
                  <code className="text-xs font-mono bg-yuzu-50 text-yuzu-900 px-2 py-0.5 rounded-full">{resp.shortcut}</code>
                  <span className="text-xs text-brand-text-secondary ml-auto">{resp.uses} uses</span>
                </div>
                <p className="text-sm text-brand-text-tertiary">{resp.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

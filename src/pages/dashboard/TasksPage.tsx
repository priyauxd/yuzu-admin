import { useState } from 'react'
import {
  Plus, Circle, CheckCircle2, Clock, AlertCircle,
  Search, LayoutGrid, List, MoreHorizontal,
  ChevronLeft, ChevronRight,
} from 'lucide-react'

type TaskStatus = 'todo' | 'in_progress' | 'done'
type TaskPriority = 'High' | 'Medium' | 'Low'

interface Task {
  id: number
  title: string
  assignee: string
  status: TaskStatus
  priority: TaskPriority
  due: string
  team: string
}

const TASKS: Task[] = [
  { id: 1, title: 'Review delivery schedule for Zone A', assignee: 'Ahmed Al Maktoum', status: 'in_progress', priority: 'High', due: 'Today', team: 'Operations' },
  { id: 2, title: 'Update knowledge base articles', assignee: 'Fatima Hassan', status: 'todo', priority: 'Medium', due: 'Tomorrow', team: 'Support' },
  { id: 3, title: 'Complete site inspection report', assignee: 'Raj Patel', status: 'done', priority: 'High', due: 'Yesterday', team: 'Operations' },
  { id: 4, title: 'Configure WhatsApp auto-responses', assignee: 'Omar Khalid', status: 'todo', priority: 'Low', due: 'May 18', team: 'Support' },
  { id: 5, title: 'Onboard new support agents', assignee: 'Sara Mohamed', status: 'in_progress', priority: 'Medium', due: 'May 16', team: 'HR' },
  { id: 6, title: 'Test SIP call routing rules', assignee: 'Ahmed Al Maktoum', status: 'todo', priority: 'High', due: 'Today', team: 'Operations' },
  { id: 7, title: 'Prepare monthly sales report', assignee: 'Priya Sharma', status: 'todo', priority: 'Medium', due: 'May 20', team: 'Sales' },
  { id: 8, title: 'Follow up with lead #2045', assignee: 'Ali Khan', status: 'in_progress', priority: 'High', due: 'Today', team: 'Sales' },
  { id: 9, title: 'Review escalated tickets from last week', assignee: 'Fatima Hassan', status: 'done', priority: 'Medium', due: 'May 12', team: 'Support' },
  { id: 10, title: 'Set up new DID routing for Riyadh', assignee: 'Omar Khalid', status: 'todo', priority: 'Low', due: 'May 22', team: 'Operations' },
]

const STATUS_CONFIG = {
  todo: { label: 'To Do', icon: Circle, color: 'text-neutral-400', bg: 'bg-neutral-100 text-neutral-600' },
  in_progress: { label: 'In Progress', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50 text-blue-600' },
  done: { label: 'Done', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50 text-green-600' },
}

const PRIORITY_COLORS: Record<TaskPriority, string> = {
  High: 'bg-red-50 text-red-600',
  Medium: 'bg-yuzu-50 text-yuzu-900',
  Low: 'bg-neutral-100 text-neutral-500',
}

const ITEMS_PER_PAGE = 6

export default function TasksPage() {
  const [filter, setFilter] = useState<TaskStatus | 'all'>('all')
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [page, setPage] = useState(1)

  const statusCounts = {
    all: TASKS.length,
    todo: TASKS.filter(t => t.status === 'todo').length,
    in_progress: TASKS.filter(t => t.status === 'in_progress').length,
    done: TASKS.filter(t => t.status === 'done').length,
  }

  const filtered = TASKS.filter(t => {
    const matchesFilter = filter === 'all' || t.status === filter
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.assignee.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Filter tabs + search + actions — single row */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {(Object.entries(statusCounts) as [string, number][]).map(([key, count]) => (
          <button
            key={key}
            onClick={() => { setFilter(key as TaskStatus | 'all'); setPage(1); }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors shrink-0 ${
              filter === key ? 'bg-yuzu-400 text-white' : 'bg-white border border-brand-border text-brand-text-secondary hover:bg-neutral-50'
            }`}
          >
            {key === 'all' ? 'All' : STATUS_CONFIG[key as TaskStatus].label} | {count}
          </button>
        ))}

        <div className="relative ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
          <input type="text" placeholder="Search tasks" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="w-48 pl-9 pr-3 py-1.5 rounded-full border border-brand-border bg-white text-brand-text text-xs placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent focus:w-64 transition-all" />
        </div>

        <div className="flex items-center border border-brand-border rounded-lg overflow-hidden shrink-0">
          <button onClick={() => setViewMode('grid')} className={`p-1.5 ${viewMode === 'grid' ? 'bg-yuzu-400 text-white' : 'bg-white text-neutral-400 hover:bg-neutral-50'}`}>
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button onClick={() => setViewMode('list')} className={`p-1.5 ${viewMode === 'list' ? 'bg-yuzu-400 text-white' : 'bg-white text-neutral-400 hover:bg-neutral-50'}`}>
            <List className="w-4 h-4" />
          </button>
        </div>

        <button className="flex items-center gap-1.5 bg-yuzu-400 hover:bg-yuzu-300 text-white font-semibold px-4 py-1.5 rounded-full text-xs transition-colors shadow-[0_4px_14px_rgba(246,196,83,0.45)] shrink-0">
          <Plus className="w-3.5 h-3.5" /> New Task
        </button>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {paginated.map((task) => {
            const StatusIcon = STATUS_CONFIG[task.status].icon
            return (
              <div key={task.id} className="border border-neutral-200/80 rounded-2xl p-5 bg-gradient-to-br from-white to-neutral-50/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 relative group">
                <button className="absolute top-3 right-3 p-1 rounded-full hover:bg-neutral-100 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
                <div className="flex items-start gap-3 mb-3">
                  <StatusIcon className={`w-5 h-5 mt-0.5 shrink-0 ${STATUS_CONFIG[task.status].color}`} />
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-medium ${task.status === 'done' ? 'text-brand-text-secondary line-through' : 'text-brand-text'}`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-brand-text-secondary mt-0.5">{task.assignee}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${PRIORITY_COLORS[task.priority]}`}>{task.priority}</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${STATUS_CONFIG[task.status].bg}`}>{STATUS_CONFIG[task.status].label}</span>
                  <span className={`text-xs ml-auto ${task.due === 'Today' || task.due === 'Yesterday' ? 'text-red-500 font-medium' : 'text-brand-text-secondary'}`}>
                    {task.due === 'Yesterday' && <AlertCircle className="w-3 h-3 inline mr-0.5" />}
                    {task.due}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="border border-brand-border rounded-xl overflow-hidden bg-white">
          <div className="grid grid-cols-[auto_1fr_1fr_0.6fr_0.6fr_0.6fr_40px] gap-3 px-4 py-2.5 bg-neutral-50 text-xs font-medium text-brand-text-secondary border-b border-brand-border">
            <span className="w-5" /><span>Task</span><span>Assignee</span><span>Status</span><span>Priority</span><span>Due</span><span />
          </div>
          {paginated.map((task) => {
            const StatusIcon = STATUS_CONFIG[task.status].icon
            return (
              <div key={task.id} className="grid grid-cols-[auto_1fr_1fr_0.6fr_0.6fr_0.6fr_40px] gap-3 px-4 py-3 border-b border-neutral-100 last:border-0 hover:bg-neutral-50 items-center group">
                <StatusIcon className={`w-5 h-5 shrink-0 ${STATUS_CONFIG[task.status].color}`} />
                <p className={`text-sm font-medium truncate ${task.status === 'done' ? 'text-brand-text-secondary line-through' : 'text-brand-text'}`}>
                  {task.title}
                </p>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-[10px] font-medium text-brand-text-tertiary shrink-0">
                    {task.assignee.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-sm text-brand-text-secondary truncate">{task.assignee}</span>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full w-fit ${STATUS_CONFIG[task.status].bg}`}>{STATUS_CONFIG[task.status].label}</span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full w-fit ${PRIORITY_COLORS[task.priority]}`}>{task.priority}</span>
                <span className={`text-xs ${task.due === 'Today' || task.due === 'Yesterday' ? 'text-red-500 font-medium' : 'text-brand-text-secondary'}`}>
                  {task.due === 'Yesterday' && <AlertCircle className="w-3 h-3 inline mr-0.5" />}
                  {task.due}
                </span>
                <button className="p-1 rounded-full hover:bg-neutral-100 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            )
          })}
        </div>
      )}

      </div>

      {/* Pagination — sticky bottom */}
      <div className="shrink-0 flex items-center justify-between pt-4 mt-auto border-t border-neutral-100 text-sm text-brand-text-secondary">
        <span>{filtered.length} tasks</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-lg border border-brand-border hover:bg-neutral-50 disabled:opacity-30 disabled:cursor-not-allowed"><ChevronLeft className="w-4 h-4" /></button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => setPage(n)} className={`w-8 h-8 rounded-lg text-xs font-medium ${page === n ? 'bg-yuzu-400 text-white' : 'border border-brand-border hover:bg-neutral-50'}`}>{n}</button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages || totalPages === 0} className="p-1.5 rounded-lg border border-brand-border hover:bg-neutral-50 disabled:opacity-30 disabled:cursor-not-allowed"><ChevronRight className="w-4 h-4" /></button>
          <span className="ml-2 text-xs">Page {page}</span>
        </div>
      </div>
    </div>
  )
}

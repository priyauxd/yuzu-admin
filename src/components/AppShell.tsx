import { useState, useRef, useEffect } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  CheckSquare,
  Headphones,
  MessageSquare,
  BookOpen,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  House,
} from 'lucide-react'
import Logo from './Logo'

const TOP_NAV = [
  { to: '/app', icon: House, label: 'Home', end: true as const },
  { to: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard', end: false as const },
]

const NAV_ITEMS = [
  { to: '/app/conversations', icon: MessageSquare, label: 'Conversations' },
  { to: '/app/tasks', icon: CheckSquare, label: 'Tasks' },
  { to: '/app/voice', icon: Headphones, label: 'Voice & Calls' },
  { to: '/app/settings', icon: Settings, label: 'Settings' },
]


export default function AppShell() {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const PAGE_TITLES: Record<string, string> = {
    '/app': '',
    '/app/dashboard': 'Dashboard',
    '/app/conversations': 'Conversations',
    '/app/tasks': 'Tasks',
    '/app/voice': 'Voice & Calls',
    '/app/ai-agents': '',
    '/app/knowledge': 'Knowledge Base',
    '/app/settings': 'Settings',
  }
  const pageTitle = PAGE_TITLES[location.pathname] ?? ''

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="h-screen bg-white flex overflow-hidden">
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-[#FAF7F4] border-r border-brand-border flex flex-col transition-all duration-200 lg:static lg:z-auto lg:h-full ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${collapsed ? 'w-[72px]' : 'w-[260px]'}`}
      >
        <div className={`pt-4 pb-4 flex flex-col items-center ${collapsed ? 'px-3' : 'px-6'}`}>
          <button
            onClick={() => { setCollapsed(!collapsed); setMobileOpen(false); }}
            className="w-8 h-8 mb-3 bg-white border border-brand-border rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 hover:border-neutral-400 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {collapsed ? (
            <img src={import.meta.env.BASE_URL + 'yuzu-logo.svg'} alt="yuzu" className="h-8" />
          ) : (
            <>
              <Logo className="h-9" />
              <span className="mt-2 text-[11px] font-semibold text-yuzu-900 bg-yuzu-50 border border-yuzu-300/30 px-3 py-0.5 rounded-full">
                Admin Panel
              </span>
            </>
          )}
        </div>

        <nav className={`flex-1 min-h-0 py-4 overflow-y-auto ${collapsed ? 'px-2' : 'px-3'}`}>
          {/* Top section: Home + Dashboard */}
          <div className="space-y-1 mb-2">
            {TOP_NAV.map(({ to, icon: Icon, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? label : undefined}
                className={({ isActive }) =>
                  `flex items-center rounded-xl transition-all group relative ${
                    collapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'
                  } ${
                    isActive
                      ? 'bg-yuzu-400 text-white shadow-[0_2px_8px_rgba(246,196,83,0.35)]'
                      : 'text-brand-text-secondary hover:bg-white hover:text-brand-text'
                  }`
                }
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{label}</span>}
                {collapsed && (
                  <div className="absolute left-full ml-3 px-2.5 py-1 bg-neutral-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {label}
                  </div>
                )}
              </NavLink>
            ))}
          </div>

          {/* Divider */}
          <div className={`border-t border-brand-border my-2 ${collapsed ? 'mx-1' : 'mx-2'}`} />

          {/* Main section */}
          <div className="space-y-1">
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? label : undefined}
              className={({ isActive }) =>
                `flex items-center rounded-xl transition-all group relative ${
                  collapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'
                } ${
                  isActive
                    ? 'bg-yuzu-400 text-white shadow-[0_2px_8px_rgba(246,196,83,0.35)]'
                    : 'text-brand-text-secondary hover:bg-white hover:text-brand-text'
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{label}</span>}
              {collapsed && (
                <div className="absolute left-full ml-3 px-2.5 py-1 bg-neutral-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {label}
                </div>
              )}
            </NavLink>
          ))}
          </div>
        </nav>

        <div className={`shrink-0 ${collapsed ? 'px-2' : 'px-3'} mb-1`}>
          <NavLink
            to="/app/knowledge"
            onClick={() => setMobileOpen(false)}
            title={collapsed ? 'Knowledge Base' : undefined}
            className={({ isActive }) =>
              `flex items-center rounded-xl transition-all group relative ${
                collapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'
              } ${
                isActive
                  ? 'bg-yuzu-400 text-white shadow-[0_2px_8px_rgba(246,196,83,0.35)]'
                  : 'text-brand-text-secondary hover:bg-white hover:text-brand-text'
              }`
            }
          >
            <BookOpen className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Knowledge Base</span>}
            {collapsed && (
              <div className="absolute left-full ml-3 px-2.5 py-1 bg-neutral-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                Knowledge Base
              </div>
            )}
          </NavLink>
        </div>

        <div ref={dropdownRef} className={`shrink-0 border-t border-brand-border relative ${collapsed ? 'px-2 py-3' : 'px-3 py-3'}`}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`flex items-center rounded-xl hover:bg-white transition-colors w-full group relative ${
              collapsed ? 'justify-center p-2' : 'gap-3 px-3 py-2.5'
            }`}
          >
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full bg-yuzu-400 flex items-center justify-center text-white text-sm font-semibold">
                P
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
            </div>
            {!collapsed && (
              <>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-brand-text truncate">Priya</p>
                  <p className="text-[11px] text-brand-text-secondary truncate">priyamvada.s.m@gmail.com</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </>
            )}
            {collapsed && (
              <div className="absolute left-full ml-3 px-2.5 py-1 bg-neutral-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                Priya
              </div>
            )}
          </button>

          {dropdownOpen && (
            <div className={`absolute bottom-full mb-2 w-60 bg-white rounded-xl border border-brand-border shadow-lg py-1.5 z-50 ${
              collapsed ? 'left-full ml-2' : 'left-3 right-3 w-auto'
            }`}>
              <div className="px-4 py-3 border-b border-neutral-100 flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full bg-yuzu-400 flex items-center justify-center text-white text-sm font-semibold">
                    P
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-brand-text truncate">Priya</p>
                  <p className="text-xs text-brand-text-secondary truncate">priyamvada.s.m@...com</p>
                </div>
                <span className="text-xs text-green-600 font-medium flex items-center gap-1 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Online
                </span>
              </div>

              <div className="py-1">
                <button
                  onClick={() => { setDropdownOpen(false); navigate('/app/settings'); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-brand-text-secondary hover:bg-neutral-50 hover:text-brand-text transition-colors"
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button
                  onClick={() => { setDropdownOpen(false); navigate('/app/settings'); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-brand-text-secondary hover:bg-neutral-50 hover:text-brand-text transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  Notification settings
                </button>
              </div>

              <div className="border-t border-neutral-100 pt-1">
                <button
                  onClick={() => { setDropdownOpen(false); navigate('/'); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 bg-white overflow-hidden">
        {/* Mobile menu button only */}
        <div className="lg:hidden px-4 py-3">
          <button onClick={() => setMobileOpen(true)} className="p-1.5 text-neutral-500 hover:text-neutral-700">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <main className="flex-1 p-5 lg:p-8 overflow-y-auto">
          {pageTitle && <h1 className="text-xl font-bold text-brand-text mb-5">{pageTitle}</h1>}
          <Outlet />
        </main>
      </div>
    </div>
  )
}

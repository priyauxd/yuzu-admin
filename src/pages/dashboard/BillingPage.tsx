import { CreditCard, Users, ArrowUpRight, Download, Plus, Minus } from 'lucide-react'

const INVOICES = [
  { date: 'May 1, 2026', amount: '$480.00', users: 24, status: 'Paid' },
  { date: 'Apr 1, 2026', amount: '$440.00', users: 22, status: 'Paid' },
  { date: 'Mar 1, 2026', amount: '$400.00', users: 20, status: 'Paid' },
  { date: 'Feb 1, 2026', amount: '$360.00', users: 18, status: 'Paid' },
]

const USER_CHANGES = [
  { action: 'added', name: 'Priya Sharma', date: 'May 8', prorated: '$14.84' },
  { action: 'added', name: 'Omar Khalid', date: 'May 3', prorated: '$18.06' },
  { action: 'removed', name: 'Ali Khan', date: 'Apr 28', note: 'Will not renew Jun 1' },
]

export default function BillingPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-text flex items-center gap-2">
          <CreditCard className="w-6 h-6" /> Billing
        </h1>
        <p className="text-brand-text-secondary">Subscription, invoices & user changes</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-brand-border p-5">
          <p className="text-sm text-brand-text-secondary mb-1">Current Plan</p>
          <p className="text-2xl font-bold text-brand-text">Business</p>
          <p className="text-sm text-brand-text-secondary">$20/user/month</p>
          <button className="mt-3 text-sm text-yuzu-900 hover:text-yuzu-800 font-medium flex items-center gap-1">
            Upgrade <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-brand-border p-5">
          <p className="text-sm text-brand-text-secondary mb-1">Active Users</p>
          <p className="text-2xl font-bold text-brand-text">24 <span className="text-sm font-normal text-brand-text-secondary">/ 50 max</span></p>
          <div className="mt-2 w-full bg-neutral-100 rounded-full h-2">
            <div className="bg-yuzu-400 h-2 rounded-full" style={{ width: '48%' }} />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-brand-border p-5">
          <p className="text-sm text-brand-text-secondary mb-1">Next Billing</p>
          <p className="text-2xl font-bold text-brand-text">$480.00</p>
          <p className="text-sm text-brand-text-secondary">June 1, 2026</p>
          <p className="text-xs text-brand-text-tertiary mt-1">Visa ending 4242</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-brand-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-brand-text">Invoices</h2>
          </div>
          <div className="space-y-3">
            {INVOICES.map((inv) => (
              <div key={inv.date} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-brand-text">{inv.date}</p>
                  <p className="text-xs text-brand-text-secondary">{inv.users} users</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-brand-text">{inv.amount}</span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700">{inv.status}</span>
                  <button className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-brand-text transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-brand-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-brand-text">User Changes</h2>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-brand-text-secondary" />
              <span className="text-xs text-brand-text-secondary">This billing cycle</span>
            </div>
          </div>
          <div className="space-y-3">
            {USER_CHANGES.map((change, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-neutral-100 last:border-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  change.action === 'added' ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  {change.action === 'added' ? (
                    <Plus className="w-4 h-4 text-green-600" />
                  ) : (
                    <Minus className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-brand-text">{change.name}</p>
                  <p className="text-xs text-brand-text-secondary">{change.date}</p>
                </div>
                <span className="text-xs text-brand-text-secondary">
                  {change.prorated ? `Prorated: ${change.prorated}` : change.note}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-yuzu-50 rounded-xl border border-yuzu-300/30">
            <p className="text-xs text-yuzu-900">
              <strong>Billing rules:</strong> New users are charged prorated till month-end, then full amount on the 1st. Removed users will not renew next cycle.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

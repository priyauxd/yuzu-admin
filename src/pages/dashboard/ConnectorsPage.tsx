import { Plug, MessageCircle, Phone, Database, ToggleLeft, ToggleRight, ExternalLink } from 'lucide-react'

const CONNECTORS = [
  {
    name: 'WhatsApp Business',
    description: 'Send & receive WhatsApp messages, voice notes, locations, and attachments',
    icon: MessageCircle,
    color: 'bg-green-50 text-green-600',
    status: 'connected',
    details: [
      { label: 'Business Number', value: '+971 4 123 4567' },
      { label: 'Messages Today', value: '142' },
      { label: 'Auto-responses', value: 'Enabled' },
    ],
  },
  {
    name: 'SIP Voice',
    description: 'Inbound & outbound calls, DID assignment, skill-based routing',
    icon: Phone,
    color: 'bg-blue-50 text-blue-600',
    status: 'connected',
    details: [
      { label: 'Provider', value: 'Twilio' },
      { label: 'Active DIDs', value: '4' },
      { label: 'Calls Today', value: '43' },
    ],
  },
  {
    name: 'Zoho CRM',
    description: 'Fetch contact data — name, interactions, last order, notes',
    icon: Database,
    color: 'bg-orange-50 text-orange-600',
    status: 'not_configured',
    details: [
      { label: 'Status', value: 'Awaiting API key' },
      { label: 'Synced Contacts', value: '—' },
      { label: 'Last Sync', value: '—' },
    ],
  },
  {
    name: 'WhatsApp Voice',
    description: 'Voice calling via WhatsApp (optional add-on)',
    icon: MessageCircle,
    color: 'bg-green-50 text-green-600',
    status: 'available',
    details: [
      { label: 'Plan Required', value: '$25/user/mo' },
      { label: 'Status', value: 'Available to enable' },
    ],
  },
]

export default function ConnectorsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-text flex items-center gap-2">
          <Plug className="w-6 h-6" /> Connectors
        </h1>
        <p className="text-brand-text-secondary">Manage external integrations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {CONNECTORS.map((connector) => {
          const Icon = connector.icon
          const isActive = connector.status === 'connected'
          return (
            <div key={connector.name} className="bg-white rounded-2xl border border-brand-border p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${connector.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-text">{connector.name}</h3>
                    <p className="text-xs text-brand-text-secondary">{connector.description}</p>
                  </div>
                </div>
                {isActive ? (
                  <ToggleRight className="w-8 h-8 text-green-500 shrink-0" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-neutral-300 shrink-0" />
                )}
              </div>

              <div className="space-y-2 mb-4">
                {connector.details.map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-brand-text-secondary">{label}</span>
                    <span className="font-medium text-brand-text">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  isActive ? 'bg-green-50 text-green-700' :
                  connector.status === 'available' ? 'bg-yuzu-50 text-yuzu-900' :
                  'bg-neutral-100 text-neutral-500'
                }`}>
                  {isActive ? 'Connected' : connector.status === 'available' ? 'Available' : 'Not Configured'}
                </span>
                <button className="text-sm text-yuzu-900 hover:text-yuzu-800 font-medium flex items-center gap-1">
                  {isActive ? 'Settings' : 'Configure'} <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

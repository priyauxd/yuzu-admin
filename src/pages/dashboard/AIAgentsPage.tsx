import { useState } from 'react'
import Toggle from '../../components/Toggle'
import {
  Bot, MessageSquare, RefreshCw, Users, BookOpen, Zap, ChevronLeft,
  Pencil, Plus, Send, Smile, Paperclip, Phone, AlertCircle,
  ExternalLink,
} from 'lucide-react'

const FEATURES = [
  { icon: MessageSquare, text: 'Replies to messages instantly, 24/7' },
  { icon: RefreshCw, text: 'Updates lead stages and contact fields automatically' },
  { icon: Users, text: 'Assigns conversations to other agents, teams and AI Agents' },
  { icon: BookOpen, text: 'Answers questions using knowledge sources, and more!' },
]

const TEMPLATES = [
  {
    emoji: '💁‍♀️',
    name: 'Receptionist',
    desc: 'Greets contacts, identifies their needs, captures essential details, and efficiently routes conversations to the right team or person for further assistance.',
    tips: ['Provide clear product details in your AI knowledge sources.', 'Define routing rules for different types of inquiries.', 'Set a friendly, professional greeting tone.', 'Define what to include in internal comments when escalating.'],
    actions: ['Collect and update Contact details', 'Close and summarize conversation', 'Assign to another team or agent', 'Follow up on inactive conversations', 'Add internal comments'],
  },
  {
    emoji: '🤑',
    name: 'Sales agent',
    desc: 'Greets potential customers, learns about their needs, suggests suitable products, and connects them to the relevant team when ready.',
    tips: ['Provide clear product details in your AI knowledge sources.', 'Specify Lifecycle stages that match your sales process.', 'Select a suitable team or agent to handle interested Contacts.', 'Define what to include in internal comments when escalating a conversation.'],
    actions: ['Collect and update Contact details', 'Close and summarize conversation', 'Assign to another team or agent', 'Update Lifecycle stages', 'Follow up on inactive conversations', 'Add internal comments'],
  },
  {
    emoji: '💜',
    name: 'Support agent',
    desc: 'Answers product questions using your AI Knowledge Sources and smoothly escalates to a human when needed.',
    tips: ['Add comprehensive FAQ and product docs to knowledge sources.', 'Define escalation rules for complex issues.', 'Set a helpful, empathetic communication style.', 'Configure auto-tagging for common issue types.'],
    actions: ['Collect and update Contact details', 'Close and summarize conversation', 'Assign to another team or agent', 'Update tags', 'Add internal comments'],
  },
]

const STEPS = [
  'Create your AI Agent using a template or start from scratch.',
  'Customize its role, tone, and behavior.',
  'Enable actions like closing conversations or assigning to other agents.',
  'Add AI knowledge sources, for more accurate, relevant replies.',
  'Publish to start handling conversations automatically.',
]

interface AgentAction {
  name: string
  desc: string
  enabled: boolean
  upgrade?: boolean
}

const DEFAULT_ACTIONS: AgentAction[] = [
  { name: 'Close conversations', desc: 'AI Agent can close a conversation based on your guidelines.', enabled: false },
  { name: 'Assign to agent or team', desc: 'AI Agent can assign the conversation to a human agent, another AI Agent, or a team.', enabled: false },
  { name: 'Update Lifecycle stages', desc: "AI Agent can update a Contact's Lifecycle Stage based on the conversation.", enabled: false },
  { name: 'Update Contact fields', desc: 'AI Agent can automatically update Contact fields based on the conversation and guidelines that you define.', enabled: false },
  { name: 'Update tags', desc: 'AI Agent can add or remove existing tags from a Contact.', enabled: false },
  { name: 'Trigger Workflows', desc: 'AI Agent can trigger existing Workflows and automate conversations.', enabled: false },
  { name: 'Add comments', desc: 'AI Agent can add internal comments to share quick context with your other agents.', enabled: false },
  { name: 'Handle calls', desc: 'Let the AI Agent answer and manage calls for you.', enabled: false, upgrade: true },
  { name: 'Make HTTP requests', desc: 'AI Agent can trigger external actions or fetch data via API. You can add multiple actions.', enabled: false, upgrade: true },
]

/* ─── Hero View ─── */
function HeroView({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-3">
          <Bot className="w-6 h-6 text-brand-text" />
          <div>
            <h1 className="text-xl font-bold text-brand-text">AI Agents</h1>
            <p className="text-sm text-brand-text-secondary">Handle more conversations with less effort using AI Agents.</p>
          </div>
        </div>
        <button className="text-sm text-brand-text-secondary hover:text-brand-text font-medium flex items-center gap-1.5 border border-brand-border rounded-full px-4 py-2 hover:bg-neutral-50 transition-colors">
          <BookOpen className="w-4 h-4" />
          Learn more
        </button>
      </div>

      <div className="flex items-center gap-12 mt-16 lg:mt-24">
        <div className="flex-1 max-w-lg">
          <h2 className="text-3xl font-bold text-brand-text mb-3 leading-tight">
            Grow your team with AI Agents
          </h2>
          <p className="text-brand-text-secondary mb-8">
            Built to handle hundreds of conversations at a time.
          </p>
          <div className="space-y-5 mb-10">
            {FEATURES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-yuzu-50 border border-yuzu-300/30 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-yuzu-900" />
                </div>
                <span className="text-sm text-brand-text">{text}</span>
              </div>
            ))}
          </div>
          <button onClick={onGetStarted} className="flex items-center justify-center gap-2 bg-yuzu-400 hover:bg-yuzu-300 text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-[0_4px_14px_rgba(246,196,83,0.45)] text-sm w-full max-w-sm">
            <Bot className="w-4 h-4" /> Get started
          </button>
        </div>

        <div className="hidden lg:block flex-1 max-w-md">
          <div className="bg-white rounded-2xl border border-brand-border shadow-lg p-5 relative">
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-yuzu-400 rounded-full flex items-center justify-center shadow-md">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-600">AD</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-brand-text">Anna DiLaurentis</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-medium bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded">Hot Lead</span>
                  <span className="text-[10px] text-brand-text-secondary">AI Agent</span>
                </div>
              </div>
              <span className="text-[10px] font-medium bg-green-100 text-green-600 px-2 py-0.5 rounded-full">Open</span>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex justify-end"><div className="bg-neutral-100 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%]"><p className="text-xs text-brand-text">Hi, I want to sign up for the Beginner Spanish Course. What's included?</p></div></div>
              <div className="flex justify-start"><div className="bg-yuzu-50 border border-yuzu-300/30 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%]"><p className="text-xs text-brand-text">The level 1 course includes live classes and materials, twice a week. Can I get your email for sign up please?</p><div className="flex items-center gap-1 mt-1"><Bot className="w-3 h-3 text-yuzu-900" /><span className="text-[10px] text-yuzu-900 font-medium">AI Agent</span></div></div></div>
              <div className="flex justify-end"><div className="bg-neutral-100 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%]"><p className="text-xs text-brand-text">My email is annad4@gmail.com</p></div></div>
              <div className="flex justify-start"><div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2 max-w-[85%]"><p className="text-[10px] text-green-700 font-medium">Conversation closed by AI Agent · Potential Lead</p><p className="text-[10px] text-green-600 mt-0.5">Summary: User provided email and is interested in the Spanish Beginner Course.</p></div></div>
            </div>
            <div className="border-t border-neutral-100 pt-3">
              <p className="text-[10px] font-semibold text-brand-text-secondary mb-2">Contact Details</p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between"><span className="text-[10px] text-brand-text-secondary">Phone</span><span className="text-[10px] text-brand-text font-medium">+971 52 345 6789</span></div>
                <div className="flex items-center justify-between"><span className="text-[10px] text-brand-text-secondary">Email</span><span className="text-[10px] text-brand-text font-medium">annad4@gmail.com</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/* ─── Templates View ─── */
function TemplatesView({ onBack, onSelect }: { onBack: () => void; onSelect: (t: typeof TEMPLATES[0] | null) => void }) {
  return (
    <>
      <div className="mb-6">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-brand-text-secondary hover:text-brand-text mb-3 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-xl font-bold text-brand-text">AI Agent templates</h1>
        <p className="text-sm text-brand-text-secondary mt-1">Use a template tailored for business goals like support or sales, or create your own AI Agent from scratch.</p>
      </div>

      <div className="flex gap-8">
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {TEMPLATES.map((t) => (
              <div key={t.name} className="border border-brand-border rounded-2xl p-5 bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
                <span className="text-2xl mb-3">{t.emoji}</span>
                <h3 className="text-sm font-bold text-brand-text mb-2">{t.name}</h3>
                <p className="text-xs text-brand-text-secondary leading-relaxed flex-1">{t.desc}</p>
                <button onClick={() => onSelect(t)} className="mt-5 w-full py-2 rounded-lg border border-brand-border text-sm font-medium text-brand-text hover:bg-neutral-50 transition-colors">
                  Use template
                </button>
              </div>
            ))}
          </div>
          <div className="border border-brand-border rounded-2xl p-5 bg-white max-w-sm">
            <h3 className="text-sm font-bold text-brand-text mb-1">Create one from scratch</h3>
            <p className="text-xs text-brand-text-secondary mb-4">Create a custom AI Agent.</p>
            <button onClick={() => onSelect(null)} className="flex items-center gap-2 py-2 px-4 rounded-lg border border-brand-border text-sm font-medium text-brand-text hover:bg-neutral-50 transition-colors">
              <Bot className="w-4 h-4" /> Start from scratch
            </button>
          </div>
        </div>

        <div className="hidden lg:block w-72 shrink-0">
          <div className="bg-white rounded-2xl border border-brand-border shadow-sm p-4 mb-5 scale-[0.85] origin-top-right">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-[9px] font-bold text-orange-600">AD</div>
              <div><p className="text-[10px] font-semibold text-brand-text">Anna DiLaurentis</p><span className="text-[8px] text-brand-text-secondary">AI Agent</span></div>
              <div className="ml-auto text-[8px] text-brand-text-secondary">Contact Details</div>
            </div>
            <div className="space-y-1.5 mb-2">
              <div className="bg-neutral-100 rounded-lg px-2.5 py-1.5"><p className="text-[9px] text-brand-text">...Course. What's included?</p></div>
              <div className="bg-yuzu-50 border border-yuzu-300/30 rounded-lg px-2.5 py-1.5"><p className="text-[9px] text-brand-text">...live classes and materials...</p></div>
            </div>
            <div className="text-right text-[8px] text-brand-text-secondary">Phone: +971 52 345 6789<br />Email: annad4@gmail.com</div>
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-text mb-4">Here's how to get started:</p>
            <div className="space-y-4">
              {STEPS.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-yuzu-50 border border-yuzu-300/30 flex items-center justify-center text-xs font-bold text-yuzu-900 shrink-0">{i + 1}</div>
                  <p className="text-sm text-brand-text-secondary pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


/* ─── Create / Edit View ─── */
function CreateView({ template, onBack }: { template: typeof TEMPLATES[0] | null; onBack: () => void }) {
  const [agentName, setAgentName] = useState(template?.name || '')
  const [emoji] = useState(template?.emoji || '🤖')
  const [instructions, setInstructions] = useState('')
  const [showDesc, setShowDesc] = useState(false)
  const [actions, setActions] = useState<AgentAction[]>(DEFAULT_ACTIONS)
  const [testTab, setTestTab] = useState<'chat' | 'fields'>('chat')
  const [testMsg, setTestMsg] = useState('')

  const toggleAction = (i: number) => {
    setActions(prev => prev.map((a, idx) => idx === i ? { ...a, enabled: !a.enabled } : a))
  }

  return (
    <div className="-m-5 lg:-m-8">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-brand-border bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 rounded-lg hover:bg-neutral-100 text-brand-text-secondary transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-brand-text">Create AI Agent</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="px-4 py-2 rounded-lg border border-brand-border text-sm font-medium text-brand-text hover:bg-neutral-50 transition-colors">
            Cancel
          </button>
          <button className="px-5 py-2 rounded-lg bg-yuzu-400 hover:bg-yuzu-300 text-white text-sm font-semibold transition-colors shadow-sm">
            Publish
          </button>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-130px)]">
        {/* Left: Config */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 border-r border-brand-border">
          {/* Template summary (if from template) */}
          {template && (
            <div className="border border-brand-border rounded-xl p-5 mb-6 relative">
              <button className="absolute top-4 right-4 flex items-center gap-1.5 text-xs text-brand-text-secondary hover:text-brand-text border border-brand-border rounded-lg px-3 py-1.5 hover:bg-neutral-50 transition-colors">
                <Pencil className="w-3 h-3" /> Edit
              </button>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{template.emoji}</span>
                <h3 className="text-sm font-bold text-brand-text">{template.name}</h3>
              </div>
              <ul className="text-xs text-brand-text-secondary space-y-1 mb-4 list-disc list-inside">
                <li>{template.desc}</li>
                <li>Best suited for teams looking to handle inquiries efficiently.</li>
              </ul>
              <p className="text-xs font-semibold text-brand-text mb-2">Setup tips:</p>
              <ul className="text-xs text-brand-text-secondary space-y-1 list-disc list-inside mb-4">
                {template.tips.map((tip) => <li key={tip}>{tip}</li>)}
              </ul>
              <p className="text-xs font-semibold text-brand-text mb-2">Actions:</p>
              <div className="flex flex-wrap gap-2">
                {template.actions.map((a) => (
                  <span key={a} className="text-[11px] font-medium text-brand-text-secondary bg-neutral-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Bot className="w-3 h-3" /> {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Configuration */}
          {!template && (
            <>
              <div className="mb-8">
                <h2 className="text-base font-bold text-brand-text mb-1">Configuration</h2>
                <p className="text-sm text-brand-text-secondary">Clearly define what AI Agent is responsible for and how it supports your business.</p>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs text-brand-text-secondary">Emoji</span>
                  <span className="text-xs text-brand-text-secondary">Name</span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-lg hover:bg-neutral-200 transition-colors">
                    {emoji}
                  </button>
                  <input
                    type="text"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder="AI Agent name"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-brand-border bg-white text-sm text-brand-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition"
                  />
                </div>
                <button onClick={() => setShowDesc(!showDesc)} className="text-xs text-yuzu-900 hover:underline mt-2">
                  {showDesc ? 'Hide description' : 'Show description'}
                </button>
                {showDesc && (
                  <textarea
                    placeholder="Describe what this AI Agent does..."
                    className="w-full mt-2 px-4 py-3 rounded-xl border border-brand-border bg-white text-sm text-brand-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition resize-none h-20"
                  />
                )}
              </div>

              {/* Instructions */}
              <div className="border border-brand-border rounded-xl p-5 mb-6">
                <h3 className="text-sm font-bold text-brand-text mb-1">Instructions</h3>
                <p className="text-xs text-brand-text-secondary mb-3">
                  Describe the AI Agent's role, communication style, and the actions it should perform. Give step-by-step instructions using clear, actionable language.
                </p>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="# ROLE & STYLE - You are a polite and helpful virtual assistant. Speak clearly, stay calm, and guide the Contact..."
                  className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-sm text-brand-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent transition resize-none h-28"
                />
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <button className="p-1 hover:text-brand-text transition-colors"><Smile className="w-4 h-4" /></button>
                    <button className="p-1 hover:text-brand-text transition-colors"><Users className="w-4 h-4" /></button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-brand-text-secondary border border-brand-border rounded-lg px-3 py-1.5 hover:bg-neutral-50 transition-colors">
                      Add prompt templates ▾
                    </button>
                    <button className="text-xs text-brand-text-secondary border border-brand-border rounded-lg px-3 py-1.5 hover:bg-neutral-50 transition-colors flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Optimize
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-3">
                  <BookOpen className="w-3.5 h-3.5 text-yuzu-900" />
                  <span className="text-xs text-yuzu-900 hover:underline cursor-pointer">Learn how to write this</span>
                </div>
              </div>
            </>
          )}

          {/* Actions */}
          <div className="mb-6">
            <h2 className="text-base font-bold text-brand-text mb-1">Actions</h2>
            <p className="text-xs text-brand-text-secondary mb-4">
              Assign actions the AI Agent can take during a conversation. Each action only works if it's enabled.
            </p>
            <div className="space-y-3">
              {actions.map((action, i) => (
                <div key={action.name} className="border border-brand-border rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-brand-text">{action.name}</h4>
                        {action.upgrade && (
                          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Upgrade</span>
                        )}
                      </div>
                      <p className="text-xs text-brand-text-secondary mt-0.5">{action.desc}</p>
                    </div>
                    <Toggle enabled={action.enabled} onChange={() => toggleAction(i)} />
                  </div>
                  {action.name === 'Trigger Workflows' && (
                    <div className="mt-3 bg-blue-50 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-brand-text">No Workflows available</p>
                          <p className="text-xs text-brand-text-secondary">To use this action, first create a Workflow.</p>
                        </div>
                      </div>
                      <button className="flex items-center gap-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-3 py-1.5 transition-colors shrink-0">
                        <ExternalLink className="w-3 h-3" /> Go to Workflows
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Knowledge Sources */}
          <div className="mb-6">
            <h2 className="text-base font-bold text-brand-text mb-4">Knowledge Sources</h2>
            <div className="bg-yuzu-50 border border-yuzu-300/30 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="w-4 h-4 text-yuzu-900 shrink-0" />
                <p className="text-sm font-semibold text-brand-text">Want your AI Agent to respond more accurately?</p>
              </div>
              <p className="text-xs text-brand-text-secondary">Add and enable knowledge sources to give your AI Agent the context it needs for accurate, company-specific responses.</p>
            </div>

            <div className="text-center py-8">
              <BookOpen className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-brand-text mb-1">Train your AI Agent</h3>
              <p className="text-xs text-brand-text-secondary mb-4 max-w-sm mx-auto">
                To improve accuracy, we recommend training your AI Agent with company-specific documents and link.
              </p>
              <button className="inline-flex items-center gap-2 bg-yuzu-400 hover:bg-yuzu-300 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors shadow-[0_4px_14px_rgba(246,196,83,0.45)]">
                <Plus className="w-4 h-4" /> Add knowledge source
              </button>
            </div>
          </div>
        </div>

        {/* Right: Test Panel */}
        <div className="hidden lg:flex flex-col w-96 shrink-0 bg-white">
          <div className="px-5 py-4 border-b border-brand-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-brand-text" />
              <span className="text-sm font-bold text-brand-text">Test AI Agent</span>
            </div>
            <button className="flex items-center gap-1.5 text-xs text-brand-text-secondary hover:text-brand-text transition-colors">
              <Phone className="w-3.5 h-3.5" /> Reset Chat
            </button>
          </div>

          <div className="flex border-b border-brand-border">
            <button
              onClick={() => setTestTab('chat')}
              className={`flex-1 py-2.5 text-sm font-medium text-center transition-colors relative ${testTab === 'chat' ? 'text-yuzu-900' : 'text-brand-text-secondary hover:text-brand-text'}`}
            >
              Chat
              {testTab === 'chat' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yuzu-400" />}
            </button>
            <button
              onClick={() => setTestTab('fields')}
              className={`flex-1 py-2.5 text-sm font-medium text-center transition-colors relative ${testTab === 'fields' ? 'text-yuzu-900' : 'text-brand-text-secondary hover:text-brand-text'}`}
            >
              Contact fields
              {testTab === 'fields' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yuzu-400" />}
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <Bot className="w-10 h-10 text-neutral-200 mb-4" />
            <h3 className="text-sm font-bold text-brand-text mb-2">Test your AI Agent</h3>
            <p className="text-xs text-brand-text-secondary leading-relaxed max-w-[240px]">
              To begin testing, give your AI Agent a name and some instructions to see how it will respond in a real conversation.
            </p>
          </div>

          <div className="p-4 border-t border-brand-border">
            <div className="border border-brand-border rounded-xl px-4 py-3">
              <input
                type="text"
                value={testMsg}
                onChange={(e) => setTestMsg(e.target.value)}
                placeholder="Enter message here"
                className="w-full text-sm text-brand-text placeholder:text-neutral-400 focus:outline-none mb-2"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-neutral-400">
                  <button className="hover:text-brand-text transition-colors"><Smile className="w-4.5 h-4.5" /></button>
                  <button className="hover:text-brand-text transition-colors"><Paperclip className="w-4.5 h-4.5" /></button>
                </div>
                <button className="p-1.5 rounded-lg bg-neutral-100 text-neutral-400 hover:bg-yuzu-400 hover:text-white transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-[10px] text-brand-text-secondary text-center mt-2 leading-tight">
              Actions taken by the AI Agent here are for testing only and won't impact your live setup. Calls will not transfer in test mode.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Page ─── */
export default function AIAgentsPage() {
  const [view, setView] = useState<'hero' | 'templates' | 'create'>('hero')
  const [selectedTemplate, setSelectedTemplate] = useState<typeof TEMPLATES[0] | null>(null)

  const handleSelectTemplate = (t: typeof TEMPLATES[0] | null) => {
    setSelectedTemplate(t)
    setView('create')
  }

  return (
    <div>
      {view === 'hero' && <HeroView onGetStarted={() => setView('templates')} />}
      {view === 'templates' && <TemplatesView onBack={() => setView('hero')} onSelect={handleSelectTemplate} />}
      {view === 'create' && <CreateView template={selectedTemplate} onBack={() => setView('templates')} />}
    </div>
  )
}

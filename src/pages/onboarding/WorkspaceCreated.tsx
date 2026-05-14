import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Users, MessageSquare, Mic } from 'lucide-react'
import OnboardingLayout from '../../components/OnboardingLayout'

const STEP_LABELS = ['Email', 'Verify', 'Profile', 'Plan', 'Payment', 'Workspace']

export default function WorkspaceCreated() {
  const navigate = useNavigate()

  return (
    <OnboardingLayout
      currentStep={6}
      totalSteps={6}
      stepLabels={STEP_LABELS}
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-yuzu-50 flex items-center justify-center mx-auto mb-4 border border-yuzu-300/30">
          <CheckCircle2 className="w-9 h-9 text-yuzu-900" />
        </div>
        <h1 className="text-2xl font-bold text-brand-text mb-2">
          Workspace created!
        </h1>
        <p className="text-brand-text-secondary">
          Your workspace is live. Billing is activated and you&apos;re the admin.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-brand-border p-5 mb-6">
        <h3 className="font-semibold text-brand-text mb-3 text-sm">
          Your workspace is ready with:
        </h3>
        <ul className="space-y-3">
          {[
            { icon: MessageSquare, text: 'Channels, DMs & priority inbox' },
            { icon: Mic, text: 'Voice notes with live transcription' },
            { icon: Users, text: 'Team management & role assignment' },
          ].map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-yuzu-50 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-yuzu-900" />
              </div>
              <span className="text-sm text-brand-text-tertiary">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => navigate('/onboarding/invite-team')}
        className="w-full flex items-center justify-center gap-2 bg-yuzu-400 hover:bg-yuzu-300 text-white font-semibold py-3 rounded-full transition-colors shadow-[0_4px_14px_rgba(246,196,83,0.45)]"
      >
        Invite Your Team
        <ArrowRight className="w-4 h-4" />
      </button>

      <button
        onClick={() => navigate('/')}
        className="w-full text-center mt-3 text-sm text-brand-text-secondary hover:text-brand-text font-medium py-2"
      >
        Skip for now &mdash; go to dashboard
      </button>
    </OnboardingLayout>
  )
}

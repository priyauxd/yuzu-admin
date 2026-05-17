import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Welcome from './pages/onboarding/Welcome'
import Email from './pages/onboarding/Email'
import VerifyOtp from './pages/onboarding/VerifyOtp'
import Profile from './pages/onboarding/Profile'
import Plan from './pages/onboarding/Plan'
import Payment from './pages/onboarding/Payment'
import WorkspaceCreated from './pages/onboarding/WorkspaceCreated'
import InviteTeam from './pages/onboarding/InviteTeam'
import InvitedLanding from './pages/onboarding/InvitedLanding'
import InvitedVerify from './pages/onboarding/InvitedVerify'
import InvitedSuccess from './pages/onboarding/InvitedSuccess'
import AppShell from './components/AppShell'
import Dashboard from './pages/dashboard/Dashboard'
import LiveDashboardPage from './pages/dashboard/LiveDashboardPage'

import ConversationsPage from './pages/dashboard/ConversationsPage'
import TasksPage from './pages/dashboard/TasksPage'
import VoicePage from './pages/dashboard/VoicePage'
import KnowledgePage from './pages/dashboard/KnowledgePage'
import AIAgentsPage from './pages/dashboard/AIAgentsPage'
import SettingsPage from './pages/dashboard/SettingsPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Admin onboarding flow */}
        <Route path="/" element={<Welcome />} />
        <Route path="/onboarding/email" element={<Email />} />
        <Route path="/onboarding/verify-otp" element={<VerifyOtp />} />
        <Route path="/onboarding/profile" element={<Profile />} />
        <Route path="/onboarding/plan" element={<Plan />} />
        <Route path="/onboarding/payment" element={<Payment />} />
        <Route path="/onboarding/workspace-created" element={<WorkspaceCreated />} />
        <Route path="/onboarding/invite-team" element={<InviteTeam />} />

        {/* Invited user flow */}
        <Route path="/invite" element={<InvitedLanding />} />
        <Route path="/invite/verify" element={<InvitedVerify />} />
        <Route path="/invite/success" element={<InvitedSuccess />} />

        {/* Dashboard (post-login) */}
        <Route path="/app" element={<AppShell />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<LiveDashboardPage />} />

          <Route path="conversations" element={<ConversationsPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="voice" element={<VoicePage />} />
          <Route path="ai-agents" element={<AIAgentsPage />} />
          <Route path="knowledge" element={<KnowledgePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="team" element={<Navigate to="/app/settings" replace />} />
          <Route path="billing" element={<Navigate to="/app/settings" replace />} />
          <Route path="connectors" element={<Navigate to="/app/settings" replace />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}

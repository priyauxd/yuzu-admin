import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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

export default function App() {
  return (
    <BrowserRouter>
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

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

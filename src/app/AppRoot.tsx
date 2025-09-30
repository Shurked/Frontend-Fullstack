import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from '../features/landing/LandingPage'

// Auth Components
import { LoginPage as Login, RegisterPage as Register } from '../features/auth'
import {
  WorkTypeStep as WorkType,
  ProjectNameStep as ProjectName,
  WorkNeedsStep as WorkNeeds,
  WorkTrackingStep as WorkTracking
} from '../features/auth'

// Dashboard Components
import Dashboard from '../features/dashboard/Dashboard'
import ForYou from '../features/dashboard/modules/foryou/ForYou'
import Projects from '../features/dashboard/modules/projects/Projects'
import Templates from '../features/dashboard/modules/templates/Templates'
import Teams from '../features/dashboard/modules/teams/Teams'
import Calendar from '../features/dashboard/modules/calendar/Calendar'
import Profile from '../features/dashboard/modules/profile/Profile'

const AppRoot: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Authentication Flow */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/work-type" element={<WorkType />} />
        <Route path="/auth/project-name" element={<ProjectName />} />
        <Route path="/auth/work-needs" element={<WorkNeeds />} />
        <Route path="/auth/work-tracking" element={<WorkTracking />} />
        
        {/* Dashboard with nested routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<ForYou />} />
          <Route path="for-you" element={<ForYou />} />
          <Route path="projects" element={<Projects />} />
          <Route path="templates" element={<Templates />} />
          <Route path="teams" element={<Teams />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="profile/:id" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoot

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../features/auth/context/AuthContext'
import { ProjectProvider } from '../features/dashboard/modules/projects/context/ProjectContext'
import ProtectedRoute from '../components/ProtectedRoute'
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
import { ProjectSummary } from '../features/dashboard/modules/projects/sumary'
import Templates from '../features/dashboard/modules/templates/Templates'
import Teams from '../features/dashboard/modules/teams/Teams'
import Calendar from '../features/dashboard/modules/calendar/Calendar'
import Profile from '../features/dashboard/modules/profile/Profile'
import TeamDetail from '../features/dashboard/modules/teams/components/equipos/TeamDetail'

// Configuration Components - RUTAS INDEPENDIENTES
import ConfigurationLayout from '../features/dashboard/modules/configuration/ConfigurationLayout'
import ConfigurationProfile from '../features/dashboard/modules/configuration/Profile'
import Appearance from '../features/dashboard/modules/configuration/Appearance'
import Notifications from '../features/dashboard/modules/configuration/Notifications'
import Security from '../features/dashboard/modules/configuration/Security'

const AppRoot: React.FC = () => {
  return (
    <AuthProvider>
      <ProjectProvider>
        <Router>
          <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Authentication Flow */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/work-type" element={<ProtectedRoute><WorkType /></ProtectedRoute>} />
          <Route path="/auth/project-name" element={<ProtectedRoute><ProjectName /></ProtectedRoute>} />
          <Route path="/auth/work-needs" element={<ProtectedRoute><WorkNeeds /></ProtectedRoute>} />
          <Route path="/auth/work-tracking" element={<ProtectedRoute><WorkTracking /></ProtectedRoute>} />

          {/* Dashboard con rutas anidadas - PROTEGIDO */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
            <Route index element={<ForYou />} />
            <Route path="for-you" element={<ForYou />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:projectId" element={<ProjectSummary />} />
            <Route path="templates" element={<Templates />} />
            <Route path="teams" element={<Teams />} />
            <Route path="teams/equipo/:teamId" element={<TeamDetail />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="profile/:id" element={<Profile />} />
          </Route>

          {/* CONFIGURACIÓN - RUTAS INDEPENDIENTES - PROTEGIDO */}
          <Route path="/configuration" element={<ProtectedRoute><ConfigurationLayout /></ProtectedRoute>}>
            <Route index element={<ConfigurationProfile />} /> {/* Ruta por defecto */}
            <Route path="profile" element={<ConfigurationProfile />} />
            <Route path="appearance" element={<Appearance />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="security" element={<Security />} />
          </Route>
        </Routes>
        </Router>
      </ProjectProvider>
    </AuthProvider>
  )
}

export default AppRoot
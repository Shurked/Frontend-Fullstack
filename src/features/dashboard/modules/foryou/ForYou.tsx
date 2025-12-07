import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/context';
import UserHeader from './components/UserHeader';
import StatsGrid from './components/StatsGrid';
import RecentProjects from './components/RecentProjects';
import NavigationTabs from './components/NavigationTabs';
import TabContent from './components/TabContent';
import {
  useDashboardStats,
  useRecentProjects,
  useTodayActivities,
  useFavoriteBoards,
} from './dashboard.service';

const ForYou: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('En trabajo');
  const [currentTime, setCurrentTime] = useState(new Date());

  const { data: statsData, isLoading: statsLoading, error: statsError } = useDashboardStats();
  const { data: projectsData, isLoading: projectsLoading, error: projectsError } = useRecentProjects(5, 0);
  const { data: activitiesData, isLoading: activitiesLoading, error: activitiesError } = useTodayActivities();
  const { data: boardsData, isLoading: boardsLoading, error: boardsError } = useFavoriteBoards();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleViewAllProjects = () => {
    navigate('/dashboard/projects');
  };

  const handleViewProject = (projectId: string) => {
    navigate(`/dashboard/projects/${projectId}`);
  };

  const unreadNotifications = 0;

  const userData = user ? {
    completeName: user.completeName,
    email: user.email
  } : null;

  const isLoading = statsLoading || projectsLoading || activitiesLoading;
  const hasError = statsError || projectsError || activitiesError;

  if (isLoading && !statsData) {
    return (
      <div className="flex-1 bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin" style={{ borderTopColor: '#4931A9' }}></div>
          </div>
          <p className="text-gray-700 font-medium text-lg">Cargando dashboard...</p>
          <p className="text-gray-500 text-sm mt-2">Obteniendo tus datos más recientes</p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex-1 bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen flex items-center justify-center p-6">
        <div className="bg-white border-2 border-red-200 rounded-2xl p-8 max-w-md shadow-xl">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-red-900 font-bold text-xl mb-2 text-center">Error al cargar el dashboard</h3>
          <p className="text-red-600 text-sm text-center mb-6">
            {(statsError || projectsError || activitiesError)?.message || 'Ocurrió un error inesperado'}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="w-full px-6 py-3 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            style={{ backgroundColor: '#4931A9' }}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-8">
          {userData && (
            <UserHeader 
              user={userData}
              currentTime={currentTime}
              unreadNotifications={unreadNotifications}
            />
          )}
          
          {statsData && (
            <StatsGrid stats={statsData} />
          )}
          
          {projectsData && (
            <RecentProjects 
              projects={projectsData.projects}
              onViewAll={handleViewAllProjects}
              onViewProject={handleViewProject}
            />
          )}
          
          <NavigationTabs 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={[
              { 
                id: 'En trabajo', 
                label: 'En trabajo', 
                count: activitiesData?.count || 0 
              },
              { 
                id: 'Asignado a mi', 
                label: 'Asignado a mi', 
                count: 0 
              },
              { 
                id: 'Tableros', 
                label: 'Tableros', 
                count: boardsData?.count || 0 
              }
            ]}
          />
        </div>
      </div>

      <div className="px-6">
        {activitiesLoading || boardsLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin" style={{ borderTopColor: '#4931A9' }}></div>
            </div>
          </div>
        ) : (
          <TabContent 
            activeTab={activeTab}
            todayActivities={activitiesData?.activities || []}
            boards={boardsData?.boards || []}
          />
        )}
      </div>
    </div>
  );
};

export default ForYou;
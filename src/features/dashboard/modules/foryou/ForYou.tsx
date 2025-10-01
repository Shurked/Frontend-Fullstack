import React, { useState, useEffect } from 'react';
import UserHeader from './components/UserHeader';
import StatsGrid from './components/StatsGrid';
import RecentProjects from './components/RecentProjects';
import NavigationTabs from './components/NavigationTabs';
import TabContent from './components/TabContent';
import TasksNotifications from './components/TasksNotifications';

const mockData = {
  user: {
    name: "Jorge C. Bardales",
    avatar: "https://ui-avatars.com/api/?name=Jorge+Bardales&background=4931A9&color=fff&size=40",
    role: "Desarrollador Senior",
    initials: "JC"
  },
  stats: {
    projectsCompleted: 12,
    projectsInProgress: 5,
    tasksCompleted: 47,
    overdueTasks: 3,
    productivityScore: 85,
    meetingHours: 12,
    codeCommits: 24,
    collaborationScore: 92,
    teamMembers: 8
  },
  recentProjects: [
    {
      id: 1,
      name: "Plataforma de Desarrollo",
      type: "Scrum",
      quickAccess: "Acceso rápido",
      completedElements: 0,
      openElements: 0,
      board: "Tablero",
      progress: 75,
      members: 4,
      lastUpdate: "Hace 2 horas"
    }
  ],
  recentTasks: [
    { id: 1, title: "Creación del inicio de sesión", project: "Plataforma de Desarrollo", priority: "alta", completed: false, dueDate: "2025-10-01" },
    { id: 2, title: "Implementar validación de formularios", project: "Plataforma de Desarrollo", priority: "media", completed: false, dueDate: "2025-10-02" },
    { id: 3, title: "Optimizar queries de base de datos", project: "Sistema CRM", priority: "baja", completed: true, dueDate: "2025-09-28" },
    { id: 4, title: "Configurar pipeline CI/CD", project: "DevOps", priority: "alta", completed: false, dueDate: "2025-10-03" }
  ],
  notifications: [
    { id: 1, type: "success", message: "Tarea completada exitosamente", time: "Hace 5 min", read: false },
    { id: 2, type: "warning", message: "Reunión programada en 30 minutos", time: "Hace 10 min", read: false },
    { id: 3, type: "info", message: "Nueva actualización disponible", time: "Hace 2 horas", read: true },
    { id: 4, type: "error", message: "Error en deployment detectado", time: "Hace 3 horas", read: true }
  ],
  quickActions: [
    { id: 1, title: "Crear Proyecto", icon: "➕", color: "#4931A9" },
    { id: 2, title: "Nueva Tarea", icon: "📝", color: "#36B37E" },
    { id: 3, title: "Ver Reportes", icon: "📊", color: "#FFAB00" },
    { id: 4, title: "Configuración", icon: "⚙️", color: "#7A869A" }
  ],
  workItems: [],
  assignedToMe: [],
  boards: [
    {
      id: 1,
      name: "Tablero: Plataforma de Desarrollo",
      project: "Plataforma de Desarrollo",
      favorite: true
    },
    {
      id: 2,
      name: "Tablero: Sistema CRM",
      project: "Sistema CRM",
      favorite: true
    }
  ],
  todayActivities: [
    {
      id: 1,
      title: "Creación del inicio de sesión",
      project: "Plataforma de Desarrollo",
      createdBy: "Creado por Mario López"
    },
    {
      id: 2,
      title: "Implementar validación de formularios",
      project: "Plataforma de Desarrollo",
      createdBy: "Creado por Ana García"
    },
    {
      id: 3,
      title: "Configurar pipeline CI/CD",
      project: "DevOps",
      createdBy: "Creado por Carlos Ruiz"
    }
  ]
};

const ForYou: React.FC = () => {
  const [activeTab, setActiveTab] = useState('En trabajo');
  const [tasks, setTasks] = useState(mockData.recentTasks);
  const [notifications, setNotifications] = useState(mockData.notifications);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleTaskToggle = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleMarkRead = (notificationId: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId ? { ...notification, read: true } : notification
    ));
  };

  const handleViewAllProjects = () => {
    // Lógica para ver todos los proyectos
    console.log('Ver todos los proyectos');
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className="flex-1 bg-[#F4F5F7] min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-6">
          {/* Comentado por ahora - puedes descomentar cuando quieras usarlos */}
          
          {/* <UserHeader 
            user={mockData.user}
            currentTime={currentTime}
            unreadNotifications={unreadNotifications}
          />
          <StatsGrid stats={mockData.stats} /> */}
         
          
          <RecentProjects 
            projects={mockData.recentProjects}
            onViewAll={handleViewAllProjects}
          />
          
          <NavigationTabs 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={[
              { id: 'En trabajo', label: 'En trabajo', count: mockData.todayActivities.length },
              { id: 'Asignado a mi', label: 'Asignado a mi', count: 0 },
              { id: 'Tableros', label: 'Tableros', count: mockData.boards.length }
            ]}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-6">
        <TabContent 
          activeTab={activeTab}
          todayActivities={mockData.todayActivities}
          boards={mockData.boards}
        />
      </div>

      {/* Comentado por ahora - puedes descomentar cuando quieras usarlos */}
      {/* <TasksNotifications 
        tasks={tasks}
        notifications={notifications}
        onTaskToggle={handleTaskToggle}
        onMarkRead={handleMarkRead}
      /> */}
     
    </div>
  );
};

export default ForYou;
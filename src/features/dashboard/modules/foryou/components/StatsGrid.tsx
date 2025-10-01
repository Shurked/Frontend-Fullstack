import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendType = 'positive' }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-[#7A869A] mb-1">{title}</p>
        <p className="text-2xl font-bold text-[#172B4D]">{value}</p>
        {trend && (
          <p className={`text-xs mt-1 ${
            trendType === 'positive' ? 'text-[#36B37E]' :
            trendType === 'negative' ? 'text-[#FF7452]' :
            'text-[#4931A9]'
          }`}>
            {trend}
          </p>
        )}
      </div>
      <div className="text-2xl">{icon}</div>
    </div>
  </div>
);

interface StatsGridProps {
  stats: {
    projectsCompleted: number;
    projectsInProgress: number;
    tasksCompleted: number;
    overdueTasks: number;
    productivityScore: number;
    meetingHours: number;
    codeCommits: number;
    collaborationScore: number;
  };
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Proyectos Completados"
        value={stats.projectsCompleted}
        icon="🎯"
        trend="+2 este mes"
      />
      <StatCard
        title="En Progreso"
        value={stats.projectsInProgress}
        icon="🚀"
      />
      <StatCard
        title="Tareas Completadas"
        value={stats.tasksCompleted}
        icon="✅"
        trend="+8 esta semana"
      />
      <StatCard
        title="Tareas Pendientes"
        value={stats.overdueTasks}
        icon="⚠️"
        trend="+1 pendiente"
        trendType="negative"
      />
    </div>
  );
};

export default StatsGrid;
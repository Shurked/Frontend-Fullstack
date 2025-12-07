import React from 'react';
import { CheckCircle2, Clock, ListChecks, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendType = 'positive', color }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            trendType === 'positive' ? 'text-green-600' :
            trendType === 'negative' ? 'text-red-600' :
            'text-gray-600'
          }`}>
            {trendType === 'positive' && <TrendingUp className="w-3 h-3" />}
            {trendType === 'negative' && <TrendingDown className="w-3 h-3" />}
            <span>{trend}</span>
          </div>
        )}
      </div>
      <div className="rounded-lg p-3" style={{ backgroundColor: `${color}15` }}>
        <div style={{ color }}>{icon}</div>
      </div>
    </div>
  </div>
);

interface StatsGridProps {
  stats: {
    projectsCompleted: number;
    projectsInProgress: number;
    tasksCompleted: number;
    overdueTasks: number;
    teamMembers?: number;
  };
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Proyectos Completados"
        value={stats.projectsCompleted}
        icon={<CheckCircle2 className="w-6 h-6" />}
        color="#10b981"
      />
      <StatCard
        title="En Progreso"
        value={stats.projectsInProgress}
        icon={<Clock className="w-6 h-6" />}
        color="#4931A9"
      />
      <StatCard
        title="Tareas Completadas"
        value={stats.tasksCompleted}
        icon={<ListChecks className="w-6 h-6" />}
        color="#3b82f6"
      />
      <StatCard
        title="Tareas Vencidas"
        value={stats.overdueTasks}
        icon={<AlertCircle className="w-6 h-6" />}
        color="#ef4444"
        trend={stats.overdueTasks > 0 ? "Requiere atención" : "Al día"}
        trendType={stats.overdueTasks > 0 ? "negative" : "positive"}
      />
    </div>
  );
};

export default StatsGrid;
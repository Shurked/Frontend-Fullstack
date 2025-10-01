import React from 'react';
import { ProjectDetails } from './types';
import StatusCard from './StatusCard';
import StatusChart from './StatusChart';
import RecentActivity from './RecentActivity';

interface SummaryTabProps {
  project: ProjectDetails;
}

const SummaryTab: React.FC<SummaryTabProps> = ({ project }) => {
  return (
    <div className="space-y-6">
      {/* Tarjetas de estado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          icon={
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path
                d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="22 4 12 14.01 9 11.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          count={project.stats.completed}
          label="Completadas"
          sublabel={`últimos 7 días`}
          color="bg-[#E8F5E9] text-[#00C853]"
        />

        <StatusCard
          icon={
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M8 12h8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          }
          count={project.stats.updated}
          label="Actualizadas"
          sublabel={`últimos 7 días`}
          color="bg-[#E3F2FD] text-[#2196F3]"
        />

        <StatusCard
          icon={
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M8 7h8M8 12h8M8 17h4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          }
          count={project.stats.created}
          label="Creadas"
          sublabel={`últimos 7 días`}
          color="bg-[#F3E5F5] text-[#9C27B0]"
        />

        <StatusCard
          icon={
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <polyline
                points="12 6 12 12 16 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          count={project.stats.duesSoon}
          label="Vence pronto"
          sublabel={`últimos 7 días`}
          color="bg-[#FFF3E0] text-[#FF6F00]"
        />
      </div>

      {/* Sección inferior con gráfico y actividad */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatusChart
          inProgress={project.statusBreakdown.inProgress}
          inReview={project.statusBreakdown.inReview}
          toDo={project.statusBreakdown.toDo}
        />
        
        <RecentActivity activities={project.recentActivity} />
      </div>
    </div>
  );
};

export default SummaryTab;

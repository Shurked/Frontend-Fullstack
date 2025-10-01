import React from 'react';
import { Activity } from './types';

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `Hace ${minutes} minutos`;
    if (hours < 24) return `Hace ${hours} horas`;
    if (days < 7) return `Hace ${days} días`;
    
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'status_change':
        return (
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="#4931A9"
            />
          </svg>
        );
      case 'creation':
        return (
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="#00C853" strokeWidth="2" fill="none" />
            <path d="M9 12h6M12 9v6" stroke="#00C853" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'update':
        return (
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path
              d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
              stroke="#FFAB00"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
              stroke="#FFAB00"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-[#DFE1E6] rounded-lg p-6">
      <h3 className="text-[#172B4D] font-semibold mb-4">Actividad reciente</h3>
      <p className="text-[#7A869A] text-sm mb-6">
        Manténgase actualizado con lo que sucede en todo el proyecto.
      </p>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-[#7A869A] text-sm">No hay actividad reciente</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex gap-3">
              {/* Avatar del usuario */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#4931A9] flex items-center justify-center text-white font-semibold text-sm">
                  {activity.user.initials}
                </div>
              </div>

              {/* Contenido de la actividad */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2">
                  <p className="text-[#172B4D] text-sm flex-1">
                    <span className="font-semibold">{activity.user.name}</span>{' '}
                    <span className="text-[#7A869A]">{activity.action}</span>
                  </p>
                  {getActivityIcon(activity.type)}
                </div>
                <p className="text-[#7A869A] text-xs mt-1">
                  {formatDate(activity.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivity;

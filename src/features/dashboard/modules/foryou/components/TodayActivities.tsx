import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Plus, CheckCircle2, Edit3, MessageSquare, User } from 'lucide-react';
import type { Activity } from '../types';

interface TodayActivitiesProps {
  activities: Activity[];
}

const activityConfig: Record<string, { icon: React.ReactNode; color: string; bgColor: string }> = {
  task_created: { 
    icon: <Plus className="w-4 h-4" />, 
    color: '#3b82f6',
    bgColor: '#dbeafe'
  },
  task_completed: { 
    icon: <CheckCircle2 className="w-4 h-4" />, 
    color: '#10b981',
    bgColor: '#d1fae5'
  },
  task_updated: { 
    icon: <Edit3 className="w-4 h-4" />, 
    color: '#f59e0b',
    bgColor: '#fef3c7'
  },
  comment_added: { 
    icon: <MessageSquare className="w-4 h-4" />, 
    color: '#8b5cf6',
    bgColor: '#ede9fe'
  },
};

const TodayActivities: React.FC<TodayActivitiesProps> = ({ activities }) => {
  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Actividades de Hoy</h2>
      <div className="space-y-3">
        {activities.map((activity, index) => {
          const config = activityConfig[activity.type] || activityConfig.task_created;
          return (
            <div 
              key={`${activity.task.id}-${index}`} 
              className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" 
                style={{ backgroundColor: config.bgColor }}
              >
                <div style={{ color: config.color }}>
                  {config.icon}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 mb-1 truncate">{activity.task.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{activity.project.name}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <User className="w-3 h-3" />
                  <span>{activity.user.name}</span>
                  <span className="text-gray-400">•</span>
                  <span>{formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true, locale: es })}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodayActivities;
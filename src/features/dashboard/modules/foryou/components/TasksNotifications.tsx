import React from 'react';
import TaskItem from '../common/TaskItem';
import NotificationItem from '../common/NotificationItem';

interface TasksNotificationsProps {
  tasks: any[];
  notifications: any[];
  onTaskToggle: (id: number) => void;
  onMarkRead: (id: number) => void;
}

const TasksNotifications: React.FC<TasksNotificationsProps> = ({
  tasks,
  notifications,
  onTaskToggle,
  onMarkRead
}) => {
  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className="px-6 pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Tareas Recientes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#172B4D]">Tareas Recientes</h2>
            <button className="text-[#4931A9] hover:text-[#372189] font-medium text-sm">
              Ver todas
            </button>
          </div>
          <div className="space-y-3">
            {tasks.slice(0, 4).map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onTaskToggle}
              />
            ))}
          </div>
        </div>

        {/* Notificaciones */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#172B4D]">
              Notificaciones
              {unreadNotifications > 0 && (
                <span className="ml-2 bg-[#FF7452] text-white text-xs px-2 py-1 rounded-full">
                  {unreadNotifications}
                </span>
              )}
            </h2>
            <button className="text-[#4931A9] hover:text-[#372189] font-medium text-sm">
              Ver todas
            </button>
          </div>
          <div className="space-y-3">
            {notifications.slice(0, 4).map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkRead={onMarkRead}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksNotifications;
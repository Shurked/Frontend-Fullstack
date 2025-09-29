import React from 'react';

interface Notification {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  time: string;
  read: boolean;
}

interface NotificationItemProps {
  notification: Notification;
  onMarkRead: (id: number) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkRead }) => {
  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return '#36B37E';
      case 'error': return '#FF7452';
      case 'warning': return '#FFAB00';
      default: return '#4931A9';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  return (
    <div 
      className={`p-4 border-l-4 rounded-lg ${notification.read ? 'bg-white' : 'bg-[#F4F5F7]'}`}
      style={{ borderLeftColor: getNotificationColor(notification.type) }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <span className="text-lg">{getNotificationIcon(notification.type)}</span>
          <div>
            <p className="text-sm font-medium text-[#172B4D]">{notification.message}</p>
            <p className="text-xs text-[#7A869A] mt-1">{notification.time}</p>
          </div>
        </div>
        {!notification.read && (
          <button
            onClick={() => onMarkRead(notification.id)}
            className="text-xs text-[#4931A9] hover:text-[#372189] font-medium"
          >
            Marcar leído
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
import React from 'react';
import { Calendar, Bell, User as UserIcon } from 'lucide-react';

interface UserHeaderProps {
  user: {
    completeName: string;
    email: string;
  };
  currentTime: Date;
  unreadNotifications: number;
}

const UserHeader: React.FC<UserHeaderProps> = ({ user, currentTime, unreadNotifications }) => {
  const firstName = user.completeName?.split(' ')[0] || 'Usuario';
  
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div 
            className="w-16 h-16 rounded-full border-3 shadow-lg flex items-center justify-center text-white text-2xl font-bold"
            style={{ borderColor: '#4931A9', backgroundColor: '#4931A9' }}
          >
            {firstName.charAt(0).toUpperCase()}
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Hola, {firstName}
          </h1>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <p className="text-sm font-medium">
              {currentTime.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>
      {unreadNotifications > 0 && (
        <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg border border-red-200 shadow-sm hover:shadow-md transition-shadow">
          <Bell className="w-4 h-4" />
          <span className="text-sm font-semibold">{unreadNotifications} notificaciones</span>
        </div>
      )}
    </div>
  );
};

export default UserHeader;
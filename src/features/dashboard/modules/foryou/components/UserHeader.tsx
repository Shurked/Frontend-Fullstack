import React from 'react';

interface UserHeaderProps {
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  currentTime: Date;
  unreadNotifications: number;
}

const UserHeader: React.FC<UserHeaderProps> = ({ user, currentTime, unreadNotifications }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-12 h-12 rounded-full border-2 border-[#4931A9]"
        />
        <div>
          <h1 className="text-2xl font-bold text-[#172B4D]">
            ¡Hola, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-sm text-[#7A869A]">
            {currentTime.toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>
      {unreadNotifications > 0 && (
        <div className="bg-[#FF7452] text-white px-3 py-1 rounded-full text-sm font-medium">
          {unreadNotifications} nuevas notificaciones
        </div>
      )}
    </div>
  );
};

export default UserHeader;
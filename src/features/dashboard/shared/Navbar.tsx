import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  Home,
  FolderOpen,
  FileText,
  Users,
  Calendar,
  Menu
} from 'lucide-react';
// Componente Navbar independiente
const Navbar = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState('success');

  const user = {
    name: 'Jorge C. Bardales',
    avatar: null,
    initials: 'JC'
  };

  const getNotificationColor = () => {
    switch (notificationStatus) {
      case 'success': return 'bg-[#36B37E]';
      case 'error': return 'bg-[#FF7452]';
      case 'warning': return 'bg-[#FFAB00]';
      default: return 'bg-[#36B37E]';
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 w-full">
        <div className="flex items-center justify-between">
          
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-auto px-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7A869A]" />
              <input
                type="text"
                placeholder="Buscar servicios, productos..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4931A9] focus:border-transparent"
              />
            </div>
          </div>

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-[#F4F5F7] transition-colors">
              <Bell className="w-5 h-5 text-[#7A869A]" />
              <div className={`absolute -top-1 -right-1 w-3 h-3 ${getNotificationColor()} rounded-full`}></div>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#F4F5F7] transition-colors"
              >
                {/* Name  */}
                <span className="hidden md:block text-[#172B4D] font-medium">
                  {user.name}
                </span>
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-[#FF7452] flex items-center justify-center">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-sm font-semibold">
                      {user.initials}
                    </span>
                  )}
                </div>
                
                
              </button>

              {/* Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <button className="w-full flex items-center space-x-3 px-4 py-2 text-[#172B4D] hover:bg-[#F4F5F7] transition-colors">
                      <User className="w-4 h-4" />
                      <span>Mi perfil</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-2 text-[#172B4D] hover:bg-[#F4F5F7] transition-colors">
                      <Settings className="w-4 h-4" />
                      <span>Configuraciones</span>
                    </button>
                    <hr className="my-2 border-gray-200" />
                    <button className="w-full flex items-center space-x-3 px-4 py-2 text-[#172B4D] hover:bg-[#F4F5F7] transition-colors">
                      <LogOut className="w-4 h-4" />
                      <span>Salir</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Overlay para cerrar dropdown en mobile */}
      {showProfileDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowProfileDropdown(false)}
        />
      )}
    </>
  );
};
export default Navbar;

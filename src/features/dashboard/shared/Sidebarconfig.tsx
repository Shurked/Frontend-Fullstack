import React, { useState } from 'react';
import { User, Bell, Shield, FlaskConical } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebarconfig = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const menuItems = [
    { path: '/configuration/Profile', label: 'Perfil', icon: User },
    { path: '/configuration/Notifications', label: 'Notificaciones', icon: Bell },
    { path: '/configuration/Security', label: 'Seguridad', icon: Shield },
    { path: '/configuration/Appearance', label: 'Apariencia', icon: FlaskConical },
  ];

  const toggleSidebar = () => setSidebarExpanded(!sidebarExpanded);

  return (
    <div className={`${sidebarExpanded ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen`}>
      {/* Header */}
      <div className="flex items-center justify-between p-5.5 border-b border-gray-200">
        <div className={`flex items-center ${sidebarExpanded ? 'space-x-3' : 'justify-center'}`}>
          <span className="inline-flex items-center gap-2">
            {sidebarExpanded && <span className="text-lg font-semibold text-gray-800">Configuración</span>}
          </span>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {sidebarExpanded ? (
            <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <rect x="5" y="6" width="4" height="12" fill="currentColor" />
              <line x1="14" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <rect x="5" y="6" width="4" height="12" fill="currentColor" />
              <line x1="12" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="12" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="12" y1="16" x2="18" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>
      {/* Menu */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors relative ${isActive
                    ? 'bg-[#4931A9] text-white'
                    : 'text-[#172B4D] hover:bg-[#F4F5F7] hover:text-[#172B4D]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
                    )}
                    <Icon className={`w-5 h-5 ${sidebarExpanded ? '' : 'mx-auto'}`} />
                    {sidebarExpanded && <span className="font-medium">{item.label}</span>}
                  </>
                )}
              </NavLink>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebarconfig;

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
import { NavLink } from 'react-router-dom';

// Componente Sidebar independiente
const Sidebar = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const menuItems = [
    { path: '/dashboard/for-you', label: 'Para ti', icon: Home },
    { path: '/dashboard/projects', label: 'Proyectos', icon: FolderOpen },
    { path: '/dashboard/templates', label: 'Plantillas', icon: FileText },
    { path: '/dashboard/teams', label: 'Equipos', icon: Users },
    { path: '/dashboard/calendar', label: 'Calendario', icon: Calendar },
  ];

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className={`${sidebarExpanded ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen`}>
      {/* Logo y botón de colapso */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className={`flex items-center ${sidebarExpanded ? 'space-x-3' : 'justify-center'}`}>
          <img
            src="/kuska-logo.webp"
            alt="Kuska Logo"
            className="w-8 h-8 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iIzQ5MzFBOSIvPgo8dGV4dCB4PSIxNiIgeT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5LPC90ZXh0Pgo8L3N2Zz4K';
            }}
          />
          {sidebarExpanded && (
            <span className="text-lg font-semibold text-gray-800">Kuska</span>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {sidebarExpanded ? (
            <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.path}>

                {/* PARA TU PROYECTO REAL: Reemplaza este div por NavLink: */}

                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors relative ${
                      isActive
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


              {/* Demo con botón (solo para mostrar el diseño) */}
              {/* <button
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors relative text-[#172B4D] hover:bg-[#F4F5F7] hover:text-[#172B4D]"
              >
                <Icon className={`w-5 h-5 ${sidebarExpanded ? '' : 'mx-auto'}`} />
                {sidebarExpanded && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button> */}
            </div>
          );
        })}
      </nav>
    </div>
  );
};
export default Sidebar;

import React, { useState } from 'react';
import {
  Home,
  FolderOpen,
  FileText,
  Users,
  Calendar
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
      <div className="flex items-center justify-between p-5.5 border-b border-gray-200">
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
            // Ícono cuando sidebar está expandido (flecha hacia izquierda)
            <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none">
              {/* Rectángulo dividido en dos secciones */}
              <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
              {/* Sección izquierda sólida */}
              <rect x="5" y="6" width="4" height="12" fill="currentColor" />
              {/* Sección derecha con trazo central */}
              <line x1="14" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            // Ícono cuando sidebar está colapsado (hamburguesa minimalista)
            <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none">
              {/* Rectángulo dividido en dos secciones */}
              <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
              {/* Sección izquierda sólida */}
              <rect x="5" y="6" width="4" height="12" fill="currentColor" />
              {/* Sección derecha con tres trazos (hamburguesa) */}
              <line x1="12" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="12" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="12" y1="16" x2="18" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
export default Sidebar;
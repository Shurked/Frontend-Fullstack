import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const menuItems = [
    { path: '/dashboard/for-you', label: 'Para ti', icon: '👤' },
    { path: '/dashboard/projects', label: 'Proyectos', icon: '📁' },
    { path: '/dashboard/templates', label: 'Plantillas', icon: '📋' },
    { path: '/dashboard/teams', label: 'Equipos', icon: '👥' },
    { path: '/dashboard/calendar', label: 'Calendario', icon: '📅' },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-xl font-bold">KUSKA</h1>
      </div>
      <nav className="mt-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                    isActive ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
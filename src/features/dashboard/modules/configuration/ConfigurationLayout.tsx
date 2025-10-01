import React from 'react';
import { Outlet } from 'react-router-dom';
import ConfigurationSidebar from '../../shared/Sidebarconfig';
import Navbar from '../../shared/Navbar';

const ConfigurationLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <ConfigurationSidebar />
      <div className="flex-1 flex flex-col"> 
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ConfigurationLayout;
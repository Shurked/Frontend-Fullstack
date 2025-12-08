import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './shared/Sidebar';
import Navbar from './shared/Navbar';
import { usePresence } from '../auth/hooks/usePresence';

const Dashboard: React.FC = () => {
  // Activate presence tracking when dashboard is mounted
  usePresence();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col"> 
        <Navbar/>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
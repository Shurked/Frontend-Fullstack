import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './shared/Sidebar';

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
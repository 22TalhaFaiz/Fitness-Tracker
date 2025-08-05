import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../Components/DashboardComponents/Navbar/DashBar';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-neutral-900 text-white">
      {/* Fixed Sidebar */}
      <DashboardNavbar />

      {/* Main Content with correct left margin */}
      <main className="flex-1 pt-6 px-6 ml-64 lg:ml-72">
        <div className="space-y-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

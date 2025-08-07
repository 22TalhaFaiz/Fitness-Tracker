import { Outlet } from "react-router-dom";
import DashboardNavbar from "../Components/DashboardComponents/Navbar/DashBar";
import React from "react";
const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-neutral-900 ">
      <DashboardNavbar />
      <main className="flex-1 pt-6 px-4 lg:px-6 transition-all duration-300 lg:ml-72">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

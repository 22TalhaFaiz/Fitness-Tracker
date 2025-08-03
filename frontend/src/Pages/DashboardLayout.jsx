import React from 'react'

import { Outlet } from 'react-router-dom'
import DashboardNavbar from '../Components/DashboardComponents/Navbar/DashBar'

const DashboardLayout = () => {
  return (
    <>
      <DashboardNavbar />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  )
}

export default DashboardLayout

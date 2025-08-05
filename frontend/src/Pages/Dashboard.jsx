import React from 'react'
import DashboardNavbar from '../Components/DashboardComponents/Navbar/DashBar'
import WorkoutChart from '../Components/DashboardComponents/Charts/WorkoutChart'
import WelcomeCard from '../Components/DashboardComponents/Card/Card'
import RecentWorkouts from '../Components/DashboardComponents/Charts/RecentWorkouts'

const Dashboard = () => {
  return (
     <div className="space-y-8">
      {/* Other components */}
      <WelcomeCard/>
      <RecentWorkouts/>
      <WorkoutChart />
    </div>
  )
}

export default Dashboard
import MetricCard from "../Components/DashboardComponents/Card/MetricCard";
import UserProfileCard from "../Components/DashboardComponents/Card/ProfileCard";
import RecentWorkouts from "../Components/DashboardComponents/Charts/RecentWorkouts";
import WorkoutChart from "../Components/DashboardComponents/Charts/WorkoutChart";
import SearchModel from "../Components/SearchModel";
import { FaChartLine, FaDumbbell, FaFire } from "react-icons/fa";

const DashboardHome = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-4 lg:p-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <FaFire className="text-white text-sm" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            Welcome to your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
        </div>
        <p className="text-neutral-400 text-lg">Track your progress and stay motivated</p>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Search Section */}
          <div className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 backdrop-blur-sm rounded-2xl p-6 border border-neutral-700/50 shadow-2xl hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-md flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Quick Search</h3>
            </div>
            <SearchModel />
          </div>

          {/* Recent Workouts Section */}
          <div className="bg-gradient-to-br from-neutral-800/60 to-neutral-900/80 backdrop-blur-sm rounded-2xl p-6 border border-neutral-700/50 shadow-2xl hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <FaDumbbell className="text-white text-sm" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Recent Workouts</h2>
                  <p className="text-sm text-neutral-400">Your latest fitness activities</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-neutral-700/50 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-neutral-300 font-medium">Live</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-neutral-700/30 to-neutral-800/30 rounded-xl p-4 border border-neutral-600/30 hover:border-neutral-500/50 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-2 mb-3">
                  <FaChartLine className="text-blue-400 text-sm" />
                  <h4 className="text-sm font-medium text-neutral-300">Workout History</h4>
                </div>
                <RecentWorkouts />
              </div>
              
              <div className="bg-gradient-to-br from-neutral-700/30 to-neutral-800/30 rounded-xl p-4 border border-neutral-600/30 hover:border-neutral-500/50 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h4 className="text-sm font-medium text-neutral-300">Performance Chart</h4>
                </div>
                <WorkoutChart />
              </div>
            </div>

            {/* Stats Bar */}
        <MetricCard/>
          </div>
        </div>

        {/* Right Section - Profile Card */}
        <div className="lg:col-span-1 h-full">
          <div className="bg-gradient-to-b from-neutral-800/60 to-neutral-900/80 backdrop-blur-sm rounded-2xl p-1 border border-neutral-700/50 shadow-2xl hover:shadow-3xl transition-all duration-300 h-full">
            <div className="bg-gradient-to-br from-neutral-800/40 to-neutral-900/60 rounded-xl p-5 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Your Profile</h3>
                  <p className="text-sm text-neutral-400">Personal dashboard</p>
                </div>
              </div>
              <UserProfileCard className="h-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3">
        <button className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group">
          <svg className="w-5 h-5 text-white group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center">
          <FaFire className="text-white text-sm" />
        </button>
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
    </main>
  );
};

export default DashboardHome;
import UserProfileCard from "../Components/DashboardComponents/Card/ProfileCard";
import RecentWorkouts from "../Components/DashboardComponents/Charts/RecentWorkouts";
import WorkoutChart from "../Components/DashboardComponents/Charts/WorkoutChart";
import SearchModel from "../Components/SearchModel";

const DashboardHome = () => {
  return (
    <main className="min-h-screen p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Section */}
      <div className="lg:col-span-2 space-y-6">
        <SearchModel />
        <div className="bg-neutral-800 rounded-xl p-4 shadow-md">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Workouts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RecentWorkouts />
            <WorkoutChart />
          </div>
        </div>
      </div>

      <div className="lg:col-span-1 h-full flex flex-col justify-start">
        <UserProfileCard className="h-full" />
      </div>
    </main>
  );
};

export default DashboardHome;

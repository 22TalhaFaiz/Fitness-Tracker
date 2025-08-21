import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2, Dumbbell, Trash2, Calendar, Clock, Flame, Plus, Target, Activity } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Link, useNavigate } from 'react-router-dom'; // Uncomment in your project

const GetWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate(); // Uncomment in your project

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:3008/api/workouts', { withCredentials: true });
        setWorkouts(res.data);
      } catch (err) {
        console.error("Failed to fetch workouts:", err);
        toast.error('❌ Failed to fetch workouts', { 
          theme: 'dark',
          style: {
            background: '#1e1b4b',
            border: '1px solid #7c3aed',
            color: '#e2e8f0'
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this workout?')) return;

    try {
      await axios.delete(`http://localhost:3008/api/workouts/${id}`, { withCredentials: true });
      setWorkouts(prev => prev.filter(w => w._id !== id));
      toast.success('✅ Workout deleted successfully', { 
        theme: 'dark',
        style: {
          background: '#1e1b4b',
          border: '1px solid #7c3aed',
          color: '#e2e8f0'
        }
      });
    } catch (err) {
      console.error('Failed to delete workout:', err);
      toast.error('❌ Failed to delete workout', { 
        theme: 'dark',
        style: {
          background: '#1e1b4b',
          border: '1px solid #7c3aed',
          color: '#e2e8f0'
        }
      });
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      cardio: 'from-red-500 to-pink-500',
      strength: 'from-blue-500 to-cyan-500',
      flexibility: 'from-green-500 to-emerald-500',
      sports: 'from-orange-500 to-yellow-500',
      default: 'from-purple-500 to-indigo-500'
    };
    return colors[type?.toLowerCase()] || colors.default;
  };

  const getTypeIcon = (type) => {
    switch(type?.toLowerCase()) {
      case 'cardio': return <Flame className="w-4 h-4" />;
      case 'strength': return <Dumbbell className="w-4 h-4" />;
      case 'flexibility': return <Target className="w-4 h-4" />;
      case 'sports': return <Activity className="w-4 h-4" />;
      default: return <Dumbbell className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-6 animate-pulse">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Workouts...</h2>
          <p className="text-slate-400">Getting your fitness journey ready</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 lg:p-8">
      <ToastContainer />
      
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl mb-6 shadow-2xl">
            <Dumbbell className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent mb-4">
            Your Workouts
          </h1>
          <p className="text-slate-400 text-lg lg:text-xl max-w-2xl mx-auto mb-8">
            Track your fitness journey with detailed logs and achieve your goals
          </p>
          
          <button className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl font-semibold text-white shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span>Add New Workout</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </button>

          {/* Stats Overview */}
          {workouts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Dumbbell className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{workouts.length}</p>
                    <p className="text-slate-400 text-sm">Total Workouts</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {workouts.reduce((total, w) => total + (w.duration || 0), 0)}
                    </p>
                    <p className="text-slate-400 text-sm">Total Minutes</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <Flame className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {workouts.reduce((total, w) => total + (w.caloriesBurned || 0), 0)}
                    </p>
                    <p className="text-slate-400 text-sm">Calories Burned</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Workouts List */}
        {workouts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-800/50 rounded-full mb-6">
              <Dumbbell className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No workouts found</h3>
            <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
              Start your fitness journey by creating your first workout session!
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl font-semibold text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                <span>Create First Workout</span>
              </div>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {workouts.map((workout) => (
              <div key={workout._id} className="group bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 lg:p-8 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
                
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getTypeColor(workout.type)} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(workout._id)}
                  className="absolute top-4 right-4 z-10 p-3 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-xl transition-all duration-200 group/delete"
                >
                  <Trash2 className="w-5 h-5 group-hover/delete:scale-110 transition-transform duration-200" />
                </button>

                {/* Header */}
                <div className="relative z-10 mb-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${getTypeColor(workout.type)} rounded-xl flex items-center justify-center shadow-lg`}>
                      {getTypeIcon(workout.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl lg:text-2xl font-bold text-white mb-2 truncate pr-12">
                        {workout.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(workout.date).toLocaleDateString()}</span>
                        </div>
                        <div className={`px-3 py-1 bg-gradient-to-r ${getTypeColor(workout.type)} bg-opacity-20 rounded-full text-xs font-medium text-white border border-white/10`}>
                          {workout.type}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-700/30 rounded-xl p-3 text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-lg font-bold text-white">{workout.duration}</span>
                      </div>
                      <p className="text-xs text-slate-400">Minutes</p>
                    </div>
                    <div className="bg-slate-700/30 rounded-xl p-3 text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Flame className="w-4 h-4 text-red-400" />
                        <span className="text-lg font-bold text-white">{workout.caloriesBurned || 0}</span>
                      </div>
                      <p className="text-xs text-slate-400">Calories</p>
                    </div>
                    <div className="bg-slate-700/30 rounded-xl p-3 text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Target className="w-4 h-4 text-green-400" />
                        <span className="text-lg font-bold text-white">{workout.exercises?.length || 0}</span>
                      </div>
                      <p className="text-xs text-slate-400">Exercises</p>
                    </div>
                  </div>
                </div>

                {/* Exercises */}
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-purple-400" />
                    Exercises
                  </h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
                    {workout.exercises?.map((ex, idx) => (
                      <div key={idx} className="bg-slate-700/40 rounded-xl p-4 border border-slate-600/30">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-white text-sm lg:text-base">{ex.name}</h4>
                          {ex.weight && (
                            <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-lg">
                              {ex.weight}kg
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-300 mb-2">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                            {ex.sets} sets
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                            {ex.reps} reps
                          </span>
                        </div>
                        {ex.notes && (
                          <p className="text-xs text-slate-400 italic mt-2 p-2 bg-slate-800/50 rounded-lg">
                            "{ex.notes}"
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  );
};

export default GetWorkouts;
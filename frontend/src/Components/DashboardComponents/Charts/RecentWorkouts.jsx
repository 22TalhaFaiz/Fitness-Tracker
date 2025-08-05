import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecentWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await axios.get("http://localhost:3008/api/workouts", {
          withCredentials: true,
        });
        setWorkouts(res.data);
      } catch (error) {
        console.error("Failed to fetch workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-orange-500">Recent Workouts</h2>

      {workouts.length === 0 ? (
        <p className="text-gray-600">No workouts found.</p>
      ) : (
        <div className="space-y-4">
          {workouts.slice(0, 5).map((workout, index) => (
            <div key={index} className="border border-orange-200 rounded-lg overflow-hidden shadow transition-all">
              <button
                onClick={() => toggleExpand(index)}
                className="w-full text-left px-4 py-3 bg-orange-100 hover:bg-orange-200 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-orange-700">{workout.title}</h3>
                  <p className="text-sm text-gray-600">
                    {workout.type} | {workout.duration} min | {new Date(workout.date).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-black text-xl">
                  {expanded === index ? '−' : '+'}
                </span>
              </button>

              {expanded === index && (
                <div className="bg-white px-4 py-3 animate-fade-in-down">
                  {workout.exercises.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {workout.exercises.map((ex, exIdx) => (
                        <li key={exIdx} className="text-gray-700">
                          <span className="font-medium text-black">{ex.name}</span>: {ex.sets}x{ex.reps} @ {ex.weight || 0}kg
                          {ex.notes && (
                            <span className="italic text-sm text-gray-500"> – {ex.notes}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No exercises listed.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentWorkouts;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const WorkoutChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3008/api/analytics/frequency', { withCredentials: true })
      .then(res => {
        const formatted = res.data.map(item => ({
          ...item,
          date: new Date(item.date).toLocaleDateString('en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
          })
        }));
        setData(formatted);
      })
      .catch(err => console.error('Error fetching workout frequency:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-neutral-800 p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold text-orange-400">Workout Frequency (Last 7 Days)</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading chart...</p>
      ) : data.length === 0 ? (
        <p className="text-center text-gray-500">No workouts logged in the past 7 days.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#f97316" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default WorkoutChart;

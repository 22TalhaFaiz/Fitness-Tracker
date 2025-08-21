import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader2 } from 'lucide-react';

// Zod Schema for validation
const progressSchema = z.object({
  weight: z.number().min(1, 'Weight is required'),
  bodyMeasurements: z.object({
    chest: z.number().min(0).optional(),
    waist: z.number().min(0).optional(),
    hips: z.number().min(0).optional(),
    arms: z.number().min(0).optional(),
    legs: z.number().min(0).optional(),
  }),
  performanceMetrics: z.object({
    runTime: z.number().min(0).optional(),
    liftingMax: z.number().min(0).optional(),
    other: z.string().optional(),
  }),
  date: z.string().optional(),
});

const Progress = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(progressSchema),
    defaultValues: {
      weight: '',
      bodyMeasurements: { chest: '', waist: '', hips: '', arms: '', legs: '' },
      performanceMetrics: { runTime: '', liftingMax: '', other: '' },
      date: '',
    }
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const response = await axios.post(
        'http://localhost:3008/api/progress/add',
        data,
        { withCredentials: true }
      );

      toast.success('🎉 Progress added successfully!', { theme: 'dark', autoClose: 3000 });
      reset();
    } catch (error) {
      console.error('Error adding progress:', error);
      let msg = 'Failed to add progress';
      if (error.response) msg = error.response.data?.message || msg;
      toast.error(`❌ ${msg}`, { theme: 'dark', autoClose: 5000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <ToastContainer />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Log Your Progress</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl space-y-6"
        >
          {/* Weight */}
          <div>
            <label className="block text-gray-300 mb-2">Weight (kg)</label>
            <input
              type="number"
              {...register('weight', { valueAsNumber: true })}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              placeholder="Enter your weight"
              disabled={isSubmitting}
            />
            {errors.weight && <p className="text-red-400 text-sm mt-1">⚠️ {errors.weight.message}</p>}
          </div>

          {/* Body Measurements */}
          <div>
            <h2 className="text-white font-medium mb-2">Body Measurements (cm)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['chest','waist','hips','arms','legs'].map((part) => (
                <div key={part}>
                  <label className="block text-gray-300 mb-1 capitalize">{part}</label>
                  <input
                    type="number"
                    {...register(`bodyMeasurements.${part}`, { valueAsNumber: true })}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 transition-all duration-200"
                    placeholder="0"
                    disabled={isSubmitting}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div>
            <h2 className="text-white font-medium mb-2">Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-300 mb-1">Run Time (mins)</label>
                <input
                  type="number"
                  {...register('performanceMetrics.runTime', { valueAsNumber: true })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                  placeholder="0"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Max Lift (kg)</label>
                <input
                  type="number"
                  {...register('performanceMetrics.liftingMax', { valueAsNumber: true })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                  placeholder="0"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Other Notes</label>
                <input
                  type="text"
                  {...register('performanceMetrics.other')}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                  placeholder="Optional"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-300 mb-2">Date</label>
            <input
              type="date"
              {...register('date')}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              disabled={isSubmitting}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 hover:from-blue-600 hover:via-purple-600 hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin"/> Logging...</> : 'Log Progress'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Progress;

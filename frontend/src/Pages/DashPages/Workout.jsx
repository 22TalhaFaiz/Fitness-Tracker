import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2, Dumbbell, Clock, Flame } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Zod Schema
const exerciseSchema = z.object({
  name: z.string().min(1, 'Exercise name is required'),
  sets: z.number().min(1, 'At least 1 set'),
  reps: z.number().min(1, 'At least 1 rep'),
  weight: z.number().min(0).optional(),
  notes: z.string().optional(),
});

const workoutSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['Cardio', 'Strength', 'Flexibility', 'HIIT', 'Other']),
  duration: z.number().min(0),
  caloriesBurned: z.number().min(0).optional(),
  exercises: z.array(exerciseSchema).min(1, 'At least one exercise is required'),
});

const Workout = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      title: '',
      type: 'Strength',
      duration: 0,
      caloriesBurned: 0,
      exercises: [{ name: '', sets: 1, reps: 1, weight: 0, notes: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exercises',
  });

  const onSubmit = async (data) => {
    try {
      console.log('Submitting workout:', data);
      toast.success('Workout created successfully');
    } catch (error) {
      console.error('Workout creation failed', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <ToastContainer/>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <Dumbbell className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Create Workout
          </h1>
          <p className="text-gray-400 mt-2">Track your fitness journey with detailed workout logging</p>
        </div>

        {/* Main Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Workout Details Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2 border-b border-gray-700 pb-2">
                <div className="w-2 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded"></div>
                Workout Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Workout Title</label>
                  <input
                    {...register('title')}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter workout name..."
                  />
                  {errors.title && <p className="text-red-400 text-sm mt-2 flex items-center gap-1">⚠️ {errors.title.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Workout Type</label>
                  <select 
                    {...register('type')} 
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="Cardio">🏃 Cardio</option>
                    <option value="Strength">💪 Strength</option>
                    <option value="Flexibility">🧘 Flexibility</option>
                    <option value="HIIT">⚡ HIIT</option>
                    <option value="Other">📝 Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    {...register('duration', { valueAsNumber: true })}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="0"
                  />
                  {errors.duration && <p className="text-red-400 text-sm mt-2 flex items-center gap-1">⚠️ {errors.duration.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-1">
                    <Flame className="w-4 h-4" />
                    Calories Burned (optional)
                  </label>
                  <input
                    type="number"
                    {...register('caloriesBurned', { valueAsNumber: true })}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Estimated calories burned..."
                  />
                </div>
              </div>
            </div>

            {/* Exercises Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-700 pb-2">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <div className="w-2 h-6 bg-gradient-to-b from-green-400 to-blue-500 rounded"></div>
                  Exercises
                </h2>
                <button
                  type="button"
                  onClick={() => append({ name: '', sets: 1, reps: 1, weight: 0, notes: '' })}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  Add Exercise
                </button>
              </div>

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="bg-gray-700/30 border border-gray-600/50 rounded-xl p-6 space-y-4 hover:bg-gray-700/40 transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white">Exercise {index + 1}</h3>
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-1 rounded-lg transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <input
                        placeholder="Exercise name (e.g., Push-ups, Squats)"
                        {...register(`exercises.${index}.name`)}
                        className="w-full bg-gray-600/50 border border-gray-500 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      />
                      {errors.exercises?.[index]?.name && (
                        <p className="text-red-400 text-sm flex items-center gap-1">⚠️ {errors.exercises[index].name.message}</p>
                      )}

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Sets</label>
                          <input
                            type="number"
                            placeholder="3"
                            {...register(`exercises.${index}.sets`, { valueAsNumber: true })}
                            className="w-full bg-gray-600/50 border border-gray-500 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          />
                          {errors.exercises?.[index]?.sets && (
                            <p className="text-red-400 text-xs mt-1">⚠️ {errors.exercises[index].sets.message}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Reps</label>
                          <input
                            type="number"
                            placeholder="12"
                            {...register(`exercises.${index}.reps`, { valueAsNumber: true })}
                            className="w-full bg-gray-600/50 border border-gray-500 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          />
                          {errors.exercises?.[index]?.reps && (
                            <p className="text-red-400 text-xs mt-1">⚠️ {errors.exercises[index].reps.message}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Weight (kg)</label>
                          <input
                            type="number"
                            placeholder="20"
                            {...register(`exercises.${index}.weight`, { valueAsNumber: true })}
                            className="w-full bg-gray-600/50 border border-gray-500 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          />
                        </div>
                      </div>

                      <textarea
                        placeholder="Additional notes (form cues, difficulty, etc.)"
                        {...register(`exercises.${index}.notes`)}
                        className="w-full bg-gray-600/50 border border-gray-500 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                        rows="2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 hover:from-blue-600 hover:via-purple-600 hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Dumbbell className="w-5 h-5" />
              Create Workout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Workout;
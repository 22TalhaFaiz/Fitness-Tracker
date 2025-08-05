import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

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
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post('http://localhost:3008/api/workouts/c', data, {
        withCredentials: true,
      });
      alert('Workout created successfully');
    } catch (error) {
      console.error('Workout creation failed', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create Workout</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            {...register('title')}
            className="w-full border rounded px-3 py-2"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Type</label>
          <select {...register('type')} className="w-full border rounded px-3 py-2">
            <option value="Cardio">Cardio</option>
            <option value="Strength">Strength</option>
            <option value="Flexibility">Flexibility</option>
            <option value="HIIT">HIIT</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium">Duration (min)</label>
            <input
              type="number"
              {...register('duration', { valueAsNumber: true })}
              className="w-full border rounded px-3 py-2"
            />
            {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
          </div>
          <div className="flex-1">
            <label className="block font-medium">Calories Burned</label>
            <input
              type="number"
              {...register('caloriesBurned', { valueAsNumber: true })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Exercises</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="border p-4 rounded mb-3 space-y-2">
              <input
                placeholder="Exercise Name"
                {...register(`exercises.${index}.name`)}
                className="w-full border rounded px-3 py-2"
              />
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="Sets"
                  {...register(`exercises.${index}.sets`, { valueAsNumber: true })}
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Reps"
                  {...register(`exercises.${index}.reps`, { valueAsNumber: true })}
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Weight (kg)"
                  {...register(`exercises.${index}.weight`, { valueAsNumber: true })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <textarea
                placeholder="Notes"
                {...register(`exercises.${index}.notes`)}
                className="w-full border rounded px-3 py-2"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 text-sm"
              >
                Remove Exercise
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ name: '', sets: 1, reps: 1, weight: 0, notes: '' })}
            className="bg-orange-500 text-white px-4 py-2 rounded"
          >
            Add Exercise
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-900"
        >
          Submit Workout
        </button>
      </form>
    </div>
  );
};

export default Workout;
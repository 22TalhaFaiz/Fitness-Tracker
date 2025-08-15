import { zodResolver } from '@hookform/resolvers/zod'
import { Clipboard } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod';

const toNumber = (val) => (typeof val === 'string' && val !== '' ? Number(val) : val);
const toNumberOrUndefined = (val) =>
  typeof val === 'string' && val.trim() === '' ? undefined : Number(val);

const nutritionSchema = z.object({
  food: z.string().min(1, 'Invalid Food Name'),
  calories: z.preprocess(toNumber, z.number().min(1, 'At least 1 calorie')),
  protein: z.preprocess(toNumber, z.number().min(1, 'At least 1 protein')),
  carbs: z.preprocess(toNumberOrUndefined, z.number().min(0).optional()),
  fats: z.preprocess(toNumberOrUndefined, z.number().min(0).optional()),
});

const Nutrition = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(nutritionSchema)
  })

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/nutrition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ food: data.food }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Something went wrong')

      console.log('Fetched nutrition data:', result);

      // Use setValue to update the form inputs with the fetched data
      setValue('calories', result.calories || 0);
      setValue('protein', result.protein || 0);
      setValue('carbs', result.carbs || 0);
      setValue('fats', result.fats || 0);

    } catch (error) {
      console.error('Error while submitting:', error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <Clipboard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Nutrition Tracker
          </h1>
          <p className="text-gray-400 mt-2">Track your Calories</p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2 border-b border-gray-700 pb-2">
                <div className="w-2 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded"></div>
                Nutrition
              </h2>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Food Name</label>
                <input
                  {...register('food')}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Food Name..."
                  autoComplete="off"
                />
                {errors.food && <p className="text-red-400 text-sm mt-2 flex items-center gap-1">⚠️ {errors.food.message}</p>}
              </div>

              {['calories', 'protein', 'carbs', 'fats'].map((field) => (
                <div key={field} className="md:col-span-2 mt-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">{field}</label>
                  <input
                    type="number"
                    readOnly
                    {...register(field)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)}...`}
                  />
                  {errors[field] && <p className="text-red-400 text-sm mt-2 flex items-center gap-1">⚠️ {errors[field].message}</p>}
                </div>
              ))}

            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 hover:from-blue-600 hover:via-purple-600 hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-5"
            >
              <Clipboard className="w-5 h-5" />
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Nutrition

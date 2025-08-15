import { zodResolver } from '@hookform/resolvers/zod'
import { Clipboard } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod';


const nutritionSchema = z.object({
  food: z.string().min(1, 'Invalid Food Name,'),
  calories: z.number().min(1, 'At least 1 set'),
  protein: z.number().min(1, 'At least 1 rep'),
  carbs: z.number().min(0).optional(),
  fats: z.number().min(0).optional(),
});




const Nutrition = () => {

  const {
    register,
    handleSubmit,
    formState:{errors}

    
  } = useForm({
    resolver: zodResolver
  })


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
        {/* Main Form */}

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
          <form>
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2 border-b border-gray-700 pb-2">
                <div className="w-2 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded"></div>
                Nutrition
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Food Name</label>
                  <input
                    {...register('food')}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Food Name..."
                  />
                  {errors.food && <p className="text-red-400 text-sm mt-2 flex items-center gap-1">⚠️ {errors.food.message}</p>}
                </div>

              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Calories </label>
                  <input
                    {...register('calories')}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Calories..."
                  />
                  {errors.calories && <p className="text-red-400 text-sm mt-2 flex items-center gap-1">⚠️ {errors.calories.message}</p>}
                </div>

              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Protein</label>
                  <input
                    {...register('protein')}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Protein..."
                  />
                  {errors.protein && <p className="text-red-400 text-sm mt-2 flex items-center gap-1">⚠️ {errors.protein.message}</p>}
                </div>

              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Carbs</label>
                  <input
                    {...register('carbs')}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Carbs..."
                  />
                  {errors.carbs && <p className="text-red-400 text-sm mt-2 flex items-center gap-1">⚠️ {errors.carbs.message}</p>}
                </div>

              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Fats</label>
                  <input
                    {...register('fats')}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Fats..."
                  />
                  {errors.fats && <p className="text-red-400 text-sm mt-2 flex items-center gap-1">⚠️ {errors.fats.message}</p>}
                </div>

              </div>
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
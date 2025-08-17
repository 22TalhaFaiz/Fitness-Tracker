import { Clipboard, Search } from 'lucide-react'
import React, { useState, useEffect } from 'react'

const Nutrition = () => {
  const [formData, setFormData] = useState({
    food: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Auto-fetch nutrition data when food name changes
  useEffect(() => {
    const fetchNutritionData = async () => {
      if (!formData.food.trim() || formData.food.length < 3) {
        // Clear nutrition data if food name is too short
        setFormData(prev => ({
          ...prev,
          calories: '',
          protein: '',
          carbs: '',
          fats: ''
        }))
        return
      }

      setIsLoading(true)
      setError('')

      try {
        const response = await fetch('http://localhost:3008/api/nutrition', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ food: formData.food }),
        });

        const result = await response.json();

        if (!response.ok) throw new Error(result.error || 'Something went wrong')

        console.log('Fetched nutrition data:', result);

        // Update form with fetched data
        setFormData(prev => ({
          ...prev,
          calories: result.calories?.toString() || '0',
          protein: result.protein?.toString() || '0',
          carbs: result.carbs?.toString() || '0',
          fats: result.fats?.toString() || '0'
        }))

      } catch (error) {
        console.error('Error fetching nutrition data:', error.message)
        setError(error.message)
        // Clear nutrition fields on error
        setFormData(prev => ({
          ...prev,
          calories: '',
          protein: '',
          carbs: '',
          fats: ''
        }))
      } finally {
        setIsLoading(false)
      }
    }

    // Debounce the API call by 1 second
    const timeoutId = setTimeout(fetchNutritionData, 1000)
    return () => clearTimeout(timeoutId)
  }, [formData.food])

  const handleFoodNameChange = (value) => {
    setFormData(prev => ({
      ...prev,
      food: value
    }))
    setError('')
  }

  const handleManualFetch = async () => {
    if (!formData.food.trim()) {
      setError('Please enter a food name')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:5000/api/nutrition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ food: formData.food }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Something went wrong')

      console.log('Fetched nutrition data:', result);

      // Update form with fetched data
      setFormData(prev => ({
        ...prev,
        calories: result.calories?.toString() || '0',
        protein: result.protein?.toString() || '0',
        carbs: result.carbs?.toString() || '0',
        fats: result.fats?.toString() || '0'
      }))

    } catch (error) {
      console.error('Error fetching nutrition data:', error.message)
      setError(error.message)
    } finally {
      setIsLoading(false)
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
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2 border-b border-gray-700 pb-2">
              <div className="w-2 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded"></div>
              Nutrition
            </h2>

            {error && (
              <div className="bg-red-900/50 border border-red-500 rounded-lg p-3">
                <p className="text-red-400 text-sm">⚠️ {error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Food Name</label>
              <div className="relative">
                <input
                  value={formData.food}
                  onChange={(e) => handleFoodNameChange(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
                  placeholder="Type a food name (e.g., apple, chicken breast)..."
                  autoComplete="off"
                />
                {isLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
                  </div>
                )}
              </div>
              <p className="text-gray-500 text-xs mt-1">Nutrition data will auto-fetch as you type (after 3+ characters)</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { field: 'calories', label: 'Calories', color: 'from-red-400 to-red-500' },
                { field: 'protein', label: 'Protein (g)', color: 'from-green-400 to-green-500' },
                { field: 'carbs', label: 'Carbs (g)', color: 'from-yellow-400 to-yellow-500' },
                { field: 'fats', label: 'Fats (g)', color: 'from-purple-400 to-purple-500' }
              ].map(({ field, label, color }) => (
                <div key={field} className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/50">
                  <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
                  <div className={`text-2xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
                    {formData[field] || '--'}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleManualFetch}
              disabled={isLoading || !formData.food.trim()}
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 hover:from-blue-600 hover:via-purple-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              {isLoading ? 'Fetching...' : 'Fetch Nutrition Data'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nutrition
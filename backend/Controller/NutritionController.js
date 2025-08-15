const axios = require('axios');
const Nutrition = require('../Collection/Nutrition');

const addNutritionData = async (req, res) => {
  const { food } = req.body;

  try {
    const response = await axios.post(
      'https://trackapi.nutritionix.com/v2/natural/nutrients',
      { query: food },
      {
        headers: {
          'x-app-id': process.env.NUTRITIONIX_APP_ID,
          'x-app-key': process.env.NUTRITIONIX_APP_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    const item = response.data.foods[0];

    const newEntry = new Nutrition({
      food: item.food_name,
      calories: item.nf_calories,
      protein: item.nf_protein,
      carbs: item.nf_total_carbohydrate,
      fats: item.nf_total_fat,
    });

    await newEntry.save();
    res.status(201).json(newEntry);

  } catch (error) {
    console.error('[Nutrition Controller] Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch or save nutrition data' });
  }
};

module.exports = {
  addNutritionData
};

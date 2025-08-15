const express = require('express');
const { addNutritionData } = require('../Controller/NutritionController');

const router = express.Router();

router.post('/', addNutritionData);
router.get('/g', async (req, res) => {
    try {
      const entries = await Nutrition.find().sort({ createdAt: -1 });
      res.json(entries);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch entries' });
    }
  });


module.exports = router;

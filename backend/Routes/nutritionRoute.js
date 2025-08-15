const express = require('express');
const { addNutritionData } = require('../Controller/NutritionController');

const router = express.Router();

router.post('/', addNutritionData);

module.exports = router;

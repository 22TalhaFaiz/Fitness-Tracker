const mongoose = require("mongoose")
require("dotenv").config();

const nutritionSchema = new mongoose.Schema({
    food: { type: String, required: true },
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number },
    fats: { type: Number },

})

module.exports = mongoose.model('Nutrition', nutritionSchema);
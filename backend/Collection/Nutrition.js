const mongoose = require("mongoose");
require("dotenv").config();

const nutritionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // link nutrition to user
  food: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number },
  fats: { type: Number },
  date: { type: Date, default: Date.now } // when the food was logged
});

module.exports = mongoose.model("Nutrition", nutritionSchema);

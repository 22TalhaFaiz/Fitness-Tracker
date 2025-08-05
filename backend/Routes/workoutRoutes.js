const express = require("express");
const { createWorkout, getWorkouts } = require("../Controller/WorkoutController");
const isAuthenticated = require("../Middleware/authMiddleware");

const router = express.Router();

router.post("/c", isAuthenticated, createWorkout);
router.get("/", isAuthenticated, getWorkouts);

module.exports = router;
const express = require('express');
const isAuthenticated = require('../Middleware/authMiddleware');
const { getWorkoutFrequency } = require('../Controller/AnalyticsController');
const router = express.Router();

router.get('/frequency', isAuthenticated , getWorkoutFrequency)

module.exports = router;
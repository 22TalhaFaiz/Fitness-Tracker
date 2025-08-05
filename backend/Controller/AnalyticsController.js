const Workout = require("../Collection/Workout");

exports.getWorkoutFrequency = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    const workouts = await Workout.find({
      userId,
      date: { $gte: sevenDaysAgo }
    });

    const frequencyMap = {};
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toLocaleDateString();
      frequencyMap[key] = 0;
    }

    workouts.forEach(workout => {
      const key = new Date(workout.date).toLocaleDateString();
      if (frequencyMap[key] !== undefined) {
        frequencyMap[key]++;
      }
    });

    const result = Object.entries(frequencyMap)
      .reverse()
      .map(([date, count]) => ({ date, count }));

    res.json(result);
  } catch (error) {
    console.error("Frequency route error:", error);
    res.status(500).json({ error: "Failed to fetch workout frequency" });
  }
};

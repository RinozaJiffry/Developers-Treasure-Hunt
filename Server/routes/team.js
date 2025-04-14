const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

// Register a new team
router.post('/register', async (req, res) => {
  const { name, members } = req.body;
  const team = new Team({ name, members, startTime: new Date() });
  await team.save();
  res.status(200).json(team);
});

// Get the leaderboard (sorted by endTime)
router.get('/leaderboard', async (req, res) => {
  const teams = await Team.find({ endTime: { $ne: null } }).sort({ endTime: 1 });
  res.json(teams);
});

module.exports = router;

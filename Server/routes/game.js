const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

const levels = [
  {
    answer: 'notebook',
    keyword: 'LIGHT',
    image: '/images/desk.jpg',
    story: 'They say she never left her desk. But there was one tool she trusted above all. It typed no code but held every thought.'
  },
  {
    answer: 'microphone',
    keyword: 'OF',
    image: '/images/microphone.jpg',
    story: 'The voice of the forgotten echoed into this device. It heard secrets not meant for any ear.'
  },
  {
    answer: 'clock',
    keyword: 'TRUTH',
    image: '/images/clock.jpg',
    story: 'It ticked endlessly, not forward or back, but toward something deeper—something hidden in time.'
  },
  {
    answer: 'motherboard',
    keyword: 'IS',
    image: '/images/motherboard.jpg',
    story: 'Where veins of silicon pulse and light flickers like neurons—this was the digital mind.'
  },
  {
    answer: 'semicolon',
    keyword: 'HIDDEN',
    image: '/images/code.jpg',
    story: 'A symbol forgotten by the careless, but fatal to those who knew its power.'
  }
];

// Submit an answer for a clue
router.post('/submit/:teamId', async (req, res) => {
  const { teamId } = req.params;
  const { answer } = req.body;
  const team = await Team.findById(teamId);
  const level = levels[team.currentLevel];

  if (answer.toLowerCase() === level.answer) {
    team.keywordFragments.push(level.keyword);
    team.currentLevel++;
    if (team.currentLevel === levels.length) team.endTime = new Date();
    await team.save();
    return res.json({
      correct: true,
      fragment: level.keyword,
      nextLevel: team.currentLevel,
      image: level.image,
      story: level.story
    });
  }
  return res.json({ correct: false });
});

// Get the current progress of a team
router.get('/progress/:teamId', async (req, res) => {
  const team = await Team.findById(req.params.teamId);
  res.json({ currentLevel: team.currentLevel, fragments: team.keywordFragments });
});

module.exports = router;

const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: String,
  members: [String],
  currentLevel: { type: Number, default: 0 },
  keywordFragments: [String],
  startTime: Date,
  endTime: Date
});

module.exports = mongoose.model('Team', TeamSchema);

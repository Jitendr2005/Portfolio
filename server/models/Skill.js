const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true }, // e.g., Beginner, Intermediate, Expert
  category: { type: String },
});

module.exports = mongoose.model('Skill', SkillSchema); 
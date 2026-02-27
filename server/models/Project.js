const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  url: { type: String },
  image: { type: String },
  techStack: [{ type: String }],
  github: { type: String },
});

module.exports = mongoose.model('Project', ProjectSchema); 
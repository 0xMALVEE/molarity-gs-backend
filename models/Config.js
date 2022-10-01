const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ConfigSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  config:{
      type: String,
      required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Config = mongoose.model('config', ConfigSchema);

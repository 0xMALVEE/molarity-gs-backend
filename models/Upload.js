// Posts, likes, comments
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UploadSchema = new Schema({
  upload_string: {
    type: String,
    required: true
  },
  post_created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Upload = mongoose.model('upload', UploadSchema);

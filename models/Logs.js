// Posts, likes, comments
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const LogSchema = new Schema({
  invite_code: {
    type: String
  },
  createdAt: { 
      type: Date, expires: '1m', default: Date.now 
  }

});

module.exports = Invite = mongoose.model('log', LogSchema);

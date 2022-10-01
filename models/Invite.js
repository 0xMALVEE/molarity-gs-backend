// Posts, likes, comments
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const InviteSchema = new Schema({
  invite_code: {
    type: String
  },
  createdAt: { 
      type: Date, default: Date.now 
  }

});

module.exports = Invite = mongoose.model('invite', InviteSchema);

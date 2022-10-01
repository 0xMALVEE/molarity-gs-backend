// Posts, likes, comments
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const StoreScema = new Schema({
  lua: {
    type: String
  },
  createdAt: { 
    type: Date,
    default: Date.now
  }

});

module.exports = Store = mongoose.model('store', StoreScema);

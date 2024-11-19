const mongoose = require('mongoose');

const flowSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['INITIAL', 'WAITING_FIRST', 'SENDING_SECOND', 'WAITING_FINAL', 'COMPLETED'],
    default: 'INITIAL'
  },
  logs: [{
    message: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Flow', flowSchema);
const mongoose = require('mongoose');

const intrusionSchema = new mongoose.Schema({
  ipAddress: {
    type: String,
    required: true
  },
  macAddress: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Intrusion', intrusionSchema);

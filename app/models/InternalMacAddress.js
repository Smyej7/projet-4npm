const mongoose = require('mongoose');

const InternalMacAddressSchema = new mongoose.Schema({
  macAddress: {
    type: String,
    required: true,
    unique: true
  },
});

module.exports = mongoose.model('InternalMacAddress', InternalMacAddressSchema);
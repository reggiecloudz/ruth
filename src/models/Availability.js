const mongoose = require('mongoose');

const AvailabilitySchema = new mongoose.Schema(
  {
    day: { type: Number },
    dayOfWeek: {
      type: String,
      enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    startTime: {
      type: String,
      match: [/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/, 'Please provide a valid time']
    },
    endTime: {
      type: String,
      match: [/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/, 'Please provide a valid time']
    },
    isBooked: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Availability', AvailabilitySchema);

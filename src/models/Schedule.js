const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema(
  {
    month: {
      type: String,
      enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      required: true
    },
    year: { type: Number, required: true },
    order: { type: Number, required: true },
    daysInMonth: { type: Number, required: true },
    passed: { type: Boolean, default: false },
    availability: [{ type: mongoose.Types.ObjectId, ref: 'Availability' }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Schedule', ScheduleSchema);

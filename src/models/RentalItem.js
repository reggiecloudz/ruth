const mongoose = require('mongoose');

const RentalItemSchema = new mongoose.Schema(
  {
    quantity: { type: Number, default: 1 },
    amount: { type: Number },
    fines: { type: Number },
    cost: { type: Number }, // amount(dailyRate * daysOfRental * quantity) + fines(fineRate * daysPassExpectedToReturnDate)
    isComplete: { type: Boolean, default: false },
    month: {
      type: String,
      enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      required: true
    },
    year: { type: Number, required: true },
    day: { type: Number, required: true },
    dayOfWeek: {
      type: String,
      enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      required: true
    },
    scheduledPickupTime: {
      type: String,
      match: [/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/, 'Please provide a valid time']
    },
    expectedReturnDate: { type: Date },
    returnDate: { type: Date },
    equipment: { type: mongoose.Types.ObjectId, ref: 'Equipment', required: true },
    provider: { id: { type: String }, name: { type: string } }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('RentalItem', RentalItemSchema);

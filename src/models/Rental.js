const mongoose = require('mongoose');

const RentalSchema = new mongoose.Schema(
  {
    total: { type: Number, required: true },
    renter: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    items: [{ type: mongoose.Types.ObjectId, ref: 'RentalItem' }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Rental', RentalSchema);

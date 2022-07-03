const mongoose = require('mongoose');

const BasketSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    items: [{ type: mongoose.Types.ObjectId, ref: 'RentalItem' }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Basket', BasketSchema);

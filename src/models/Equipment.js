const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String },
    condition: { type: String, enum: ['Excellent', 'Good', 'Fair'], required: true },
    status: { type: String, enum: ['Available', 'Unavailable', 'Rented'], default: 'Unavailable' },
    inventory: { type: Number, default: 1 },
    inStock: { type: Boolean, default: true },
    description: { type: String },
    dailyRate: { type: Number, required: true },
    fineRate: { type: Number, required: true },
    terms: { type: String },
    owner: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Equipment', EquipmentSchema);

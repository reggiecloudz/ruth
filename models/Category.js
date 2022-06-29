const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

var Category = mongoose.model("Category", categorySchema);

module.exports = Category;
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  category:    { type: String, required: true },
  price:       { type: Number, required: true },
  description: { type: String, default: '' },
  image:       { type: String, default: '' },
  isVeg:       { type: Boolean, default: true },
  isPopular:   { type: Boolean, default: false },
  isSpecial:   { type: Boolean, default: false },
  isOutOfStock:{ type: Boolean, default: false },
  prepTime:    { type: Number, default: 10 }, // minutes
  rating:      { type: Number, default: 4.0, min: 0, max: 5 },
  tags:        [String],
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);

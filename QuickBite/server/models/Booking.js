const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName:    { type: String },
  date:        { type: String, required: true }, // 'YYYY-MM-DD'
  timeSlot:    { type: String, required: true }, // '12:00 PM'
  seats:       { type: Number, required: true, min: 1, max: 10 },
  tableNumber: { type: Number },
  status:      { type: String, enum: ['Confirmed', 'Cancelled', 'Completed'], default: 'Confirmed' },
  notes:       { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);

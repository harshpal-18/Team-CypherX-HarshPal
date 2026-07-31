const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
  name:     { type: String, required: true },
  price:    { type: Number, required: true },
  qty:      { type: Number, required: true, min: 1 },
}, { _id: false });

const ORDER_STAGES = ['Received', 'Preparing', 'Cooking', 'Ready', 'Completed'];

const orderSchema = new mongoose.Schema({
  orderId:       { type: String, unique: true },
  customer:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerName:  { type: String },
  items:         [orderItemSchema],
  subtotal:      { type: Number, required: true },
  discount:      { type: Number, default: 0 },
  taxes:         { type: Number, default: 0 },
  total:         { type: Number, required: true },
  orderType:     { type: String, enum: ['Dine In', 'Take Away', 'Parcel'], default: 'Dine In' },
  paymentMethod: { type: String, enum: ['Cash', 'Card', 'UPI', 'Razorpay'], default: 'Cash' },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  razorpayOrderId:   { type: String },
  razorpayPaymentId: { type: String },
  token:         { type: String },
  status:        { type: String, enum: [...ORDER_STAGES, 'Cancelled'], default: 'Received' },
  stageIndex:    { type: Number, default: 0 },
  estimatedMinutes: { type: Number, default: 10 },
  promoCode:     { type: String },
}, { timestamps: true });

// Auto-generate readable orderId before save
orderSchema.pre('save', function (next) {
  if (!this.orderId) {
    this.orderId = `QB-${Date.now()}`;
    this.token   = `T-${String(Math.floor(Math.random() * 900) + 100)}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);

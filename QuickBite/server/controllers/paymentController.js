const Razorpay = require('razorpay');
const crypto   = require('crypto');
const Order    = require('../models/Order');

const getRazorpay = () => new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST /api/payment/create-order
// Creates a Razorpay order before checkout
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // amount in paise (₹1 = 100 paise)
    if (!amount) return res.status(400).json({ message: 'Amount is required' });

    const razorpay = getRazorpay();
    const rzpOrder = await razorpay.orders.create({
      amount:   Math.round(amount * 100), // convert ₹ → paise
      currency: 'INR',
      receipt:  `qb_${Date.now()}`,
    });

    res.json({
      razorpayOrderId: rzpOrder.id,
      amount:          rzpOrder.amount,
      currency:        rzpOrder.currency,
      keyId:           process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/payment/verify
// Called after Razorpay checkout completes — verifies HMAC signature
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = req.body;

    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (expected !== razorpaySignature) {
      return res.status(400).json({ message: 'Payment verification failed — invalid signature' });
    }

    // Mark order as paid
    const order = await Order.findOneAndUpdate(
      { orderId },
      { paymentStatus: 'Paid', razorpayOrderId, razorpayPaymentId },
      { new: true }
    );

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

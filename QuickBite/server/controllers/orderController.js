const Order = require('../models/Order');

// POST /api/orders  (customer)
exports.placeOrder = async (req, res) => {
  try {
    const { items, orderType, paymentMethod, subtotal, discount, taxes, total, promoCode } = req.body;

    if (!items || items.length === 0) return res.status(400).json({ message: 'No items in order' });

    const estimatedMinutes = items.reduce((m, i) => Math.max(m, i.prepTime || 10), 0) + 2;

    const order = await Order.create({
      customer:      req.user._id,
      customerName:  req.user.name,
      items,
      subtotal:      subtotal || total,
      discount:      discount || 0,
      taxes:         taxes    || 0,
      total,
      orderType,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash' ? 'Pending' : 'Paid',
      estimatedMinutes,
      promoCode,
    });

    res.status(201).json({ order });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET /api/orders/mine  (customer)
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/orders  (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customer', 'name email phone')
      .sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/orders/:id  (customer/admin)
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id })
      .populate('customer', 'name email phone');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/orders/:id/status  (admin)
const ORDER_STAGES = ['Received', 'Preparing', 'Cooking', 'Ready', 'Completed'];

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const stageIndex = ORDER_STAGES.indexOf(status);
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.id },
      { status, stageIndex: stageIndex >= 0 ? stageIndex : undefined },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ order });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/orders/:id/cancel  (customer — only before Cooking)
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id, customer: req.user._id });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.stageIndex >= 2) return res.status(400).json({ message: 'Cannot cancel after cooking has started' });
    order.status = 'Cancelled';
    await order.save();
    res.json({ order });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

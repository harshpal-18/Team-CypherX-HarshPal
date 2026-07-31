const router = require('express').Router();
const {
  placeOrder, getMyOrders, getAllOrders, getOrder, updateStatus, cancelOrder
} = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/',                protect,              placeOrder);
router.get ('/mine',            protect,              getMyOrders);
router.get ('/',                protect, adminOnly,   getAllOrders);
router.get ('/:id',             protect,              getOrder);
router.put ('/:id/status',      protect, adminOnly,   updateStatus);
router.put ('/:id/cancel',      protect,              cancelOrder);

module.exports = router;

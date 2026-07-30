const router = require('express').Router();
const {
  createBooking, getMyBookings, getAllBookings, cancelBooking
} = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/',              protect,            createBooking);
router.get ('/mine',          protect,            getMyBookings);
router.get ('/',              protect, adminOnly, getAllBookings);
router.put ('/:id/cancel',    protect,            cancelBooking);

module.exports = router;

const Booking = require('../models/Booking');

// POST /api/bookings  (customer)
exports.createBooking = async (req, res) => {
  try {
    const { date, timeSlot, seats, notes } = req.body;
    if (!date || !timeSlot || !seats) return res.status(400).json({ message: 'Date, time slot and seats are required' });

    // Assign a random table number 1–10
    const tableNumber = Math.floor(Math.random() * 10) + 1;

    const booking = await Booking.create({
      user:        req.user._id,
      userName:    req.user.name,
      date, timeSlot, seats, notes, tableNumber,
    });

    res.status(201).json({ booking });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET /api/bookings/mine  (customer)
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/bookings  (admin)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .sort({ date: 1, timeSlot: 1 });
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/bookings/:id/cancel  (customer)
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { status: 'Cancelled' },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ booking });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

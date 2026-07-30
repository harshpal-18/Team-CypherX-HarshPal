const jwt  = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' });

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !password)       return res.status(400).json({ message: 'Name and password are required' });
    if (!email && !phone)         return res.status(400).json({ message: 'Email or phone is required' });

    // Check duplicate
    if (email) {
      const exists = await User.findOne({ email });
      if (exists) return res.status(409).json({ message: 'An account with this email already exists' });
    }
    if (phone) {
      const exists = await User.findOne({ phone });
      if (exists) return res.status(409).json({ message: 'An account with this phone number already exists' });
    }

    const user = await User.create({
      name,
      email:    email || undefined,
      phone:    phone || undefined,
      password,
      role:     role === 'admin' ? 'admin' : 'customer',
    });

    res.status(201).json({
      token: signToken(user._id),
      user:  user.toJSON(),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { identifier, password, role } = req.body;
    if (!identifier || !password) return res.status(400).json({ message: 'Identifier and password are required' });

    // Detect email vs phone
    const isEmail = identifier.includes('@');
    const query   = isEmail ? { email: identifier.toLowerCase() } : { phone: identifier };

    // Also filter by role if provided
    if (role) query.role = role;

    const user = await User.findOne(query).select('+password');

    if (!user) {
      const field = isEmail ? 'email address' : 'phone number';
      return res.status(401).json({ message: `No account found with this ${field}` });
    }

    const ok = await user.matchPassword(password);
    if (!ok) return res.status(401).json({ message: 'Incorrect password. Please try again.' });

    res.json({
      token: signToken(user._id),
      user:  user.toJSON(),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/auth/me  (protected)
exports.getMe = async (req, res) => {
  res.json({ user: req.user });
};

// PUT /api/auth/profile  (protected)
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, email },
      { new: true, runValidators: true }
    );
    res.json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

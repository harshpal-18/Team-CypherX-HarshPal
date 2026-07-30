const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name:           { type: String, required: true, trim: true },
  email:          { type: String, unique: true, sparse: true, lowercase: true, trim: true },
  phone:          { type: String, unique: true, sparse: true, trim: true },
  password:       { type: String, required: true, minlength: 6 },
  role:           { type: String, enum: ['customer', 'admin'], default: 'customer' },
  isGoldenMember: { type: Boolean, default: false },
  goldenPlan:     { type: String, enum: ['monthly', 'yearly', null], default: null },
}, { timestamps: true });

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (entered) {
  return bcrypt.compare(entered, this.password);
};

// Never send password to client
userSchema.set('toJSON', {
  transform: (doc, ret) => { delete ret.password; return ret; },
});

module.exports = mongoose.model('User', userSchema);

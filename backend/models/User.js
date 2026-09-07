const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'agent', 'admin'], default: 'user' },
    phone: { type: String, default: '+1 (555) 019-2834' },
    avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
    bio: { type: String, default: 'EstatePro Certified Real Estate Professional' },
    agency: { type: String, default: 'EstatePro Luxury Realty' },
    status: { type: String, enum: ['active', 'suspended'], default: 'active' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

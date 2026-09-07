const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    propertyId: { type: String, required: true },
    propertyTitle: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    tourDate: { type: String, default: '' },
    tourTime: { type: String, default: '' },
    agentEmail: { type: String, default: 'sarah@estatepro.com' },
    status: { type: String, enum: ['new', 'read', 'contacted'], default: 'new' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inquiry', inquirySchema);

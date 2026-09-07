const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    type: { 
      type: String, 
      enum: ['Apartment', 'Villa', 'House', 'Penthouse', 'Commercial', 'Townhouse'], 
      required: true 
    },
    status: { type: String, enum: ['For Sale', 'For Rent'], required: true },
    city: { type: String, required: true },
    state: { type: String, default: 'NY' },
    address: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    areaSqFt: { type: Number, required: true },
    yearBuilt: { type: Number, default: 2024 },
    images: [{ type: String }],
    featured: { type: Boolean, default: false },
    approvalStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' },
    amenities: [{ type: String }],
    agent: {
      name: { type: String, default: 'Sarah Connor' },
      email: { type: String, default: 'sarah@estatepro.com' },
      phone: { type: String, default: '+1 (555) 234-5678' },
      avatar: { type: String, default: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' },
      agency: { type: String, default: 'EstatePro Premier' }
    },
    views: { type: Number, default: 142 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', propertySchema);

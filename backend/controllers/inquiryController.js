const Inquiry = require('../models/Inquiry');
const { initialInquiries } = require('../seedData');

let memoryInquiries = [...initialInquiries];

const createInquiry = async (req, res) => {
  const { propertyId, propertyTitle, name, email, phone, message, tourDate, tourTime, agentEmail } = req.body;

  const inquiryData = {
    propertyId,
    propertyTitle,
    name,
    email,
    phone,
    message,
    tourDate: tourDate || '',
    tourTime: tourTime || '',
    agentEmail: agentEmail || 'victoria@estatepro.com',
    status: 'new',
    createdAt: new Date().toISOString()
  };

  try {
    const newInquiry = await Inquiry.create(inquiryData);
    return res.status(201).json(newInquiry);
  } catch (error) {
    const memInq = {
      _id: 'inq_' + Date.now(),
      ...inquiryData
    };
    memoryInquiries.unshift(memInq);
    return res.status(201).json(memInq);
  }
};

const getInquiries = async (req, res) => {
  const { agentEmail } = req.query;

  try {
    let query = {};
    if (agentEmail) query.agentEmail = agentEmail;

    const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });
    if (inquiries && inquiries.length > 0) {
      return res.json(inquiries);
    }
  } catch (error) {
    // Continue memory check
  }

  let filtered = [...memoryInquiries];
  if (agentEmail) {
    filtered = filtered.filter(i => i.agentEmail.toLowerCase() === agentEmail.toLowerCase());
  }

  return res.json(filtered);
};

module.exports = {
  createInquiry,
  getInquiries,
  memoryInquiries
};

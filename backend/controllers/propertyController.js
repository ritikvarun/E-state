const Property = require('../models/Property');
const { initialProperties } = require('../seedData');

let memoryProperties = [...initialProperties];

// GET /api/properties
const getProperties = async (req, res) => {
  const {
    search,
    type,
    status,
    city,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    featured,
    sort,
    agentEmail
  } = req.query;

  try {
    let query = { approvalStatus: 'approved' };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } }
      ];
    }

    if (type && type !== 'All') query.type = type;
    if (status && status !== 'All') query.status = status;
    if (city && city !== 'All') query.city = { $regex: city, $options: 'i' };
    if (featured === 'true') query.featured = true;

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (bedrooms && bedrooms !== 'Any') {
      query.bedrooms = { $gte: Number(bedrooms) };
    }

    if (bathrooms && bathrooms !== 'Any') {
      query.bathrooms = { $gte: Number(bathrooms) };
    }

    if (agentEmail) {
      query['agent.email'] = agentEmail;
      delete query.approvalStatus; // Agent can view all their own properties regardless of approval
    }

    let sortOptions = { createdAt: -1 };
    if (sort === 'price-asc') sortOptions = { price: 1 };
    if (sort === 'price-desc') sortOptions = { price: -1 };
    if (sort === 'views') sortOptions = { views: -1 };

    const properties = await Property.find(query).sort(sortOptions);
    if (properties && properties.length > 0) {
      return res.json(properties);
    }
  } catch (error) {
    // Continue to memory filtering
  }

  // Memory fallback filter logic
  let filtered = [...memoryProperties];

  if (agentEmail) {
    filtered = filtered.filter(p => p.agent && p.agent.email.toLowerCase() === agentEmail.toLowerCase());
  } else {
    filtered = filtered.filter(p => p.approvalStatus === 'approved');
  }

  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.address.toLowerCase().includes(term) ||
      p.city.toLowerCase().includes(term)
    );
  }

  if (type && type !== 'All') {
    filtered = filtered.filter(p => p.type.toLowerCase() === type.toLowerCase());
  }

  if (status && status !== 'All') {
    filtered = filtered.filter(p => p.status.toLowerCase() === status.toLowerCase());
  }

  if (city && city !== 'All') {
    filtered = filtered.filter(p => p.city.toLowerCase().includes(city.toLowerCase()));
  }

  if (featured === 'true') {
    filtered = filtered.filter(p => p.featured === true);
  }

  if (minPrice) {
    filtered = filtered.filter(p => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    filtered = filtered.filter(p => p.price <= Number(maxPrice));
  }

  if (bedrooms && bedrooms !== 'Any') {
    filtered = filtered.filter(p => p.bedrooms >= Number(bedrooms));
  }

  if (bathrooms && bathrooms !== 'Any') {
    filtered = filtered.filter(p => p.bathrooms >= Number(bathrooms));
  }

  if (sort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === 'views') {
    filtered.sort((a, b) => b.views - a.views);
  } else {
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return res.json(filtered);
};

// GET /api/properties/:id
const getPropertyById = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findById(id);
    if (property) {
      property.views = (property.views || 0) + 1;
      await property.save();
      return res.json(property);
    }
  } catch (error) {
    // Memory fallback lookup
  }

  const found = memoryProperties.find(p => p._id === id || p.id === id);
  if (found) {
    found.views = (found.views || 0) + 1;
    return res.json(found);
  }

  return res.status(404).json({ message: 'Property not found' });
};

// POST /api/properties (Add Property)
const createProperty = async (req, res) => {
  const {
    title,
    description,
    price,
    type,
    status,
    city,
    state,
    address,
    bedrooms,
    bathrooms,
    areaSqFt,
    yearBuilt,
    images,
    amenities,
    agent
  } = req.body;

  const propertyData = {
    title,
    description,
    price: Number(price),
    type,
    status,
    city,
    state: state || 'NY',
    address,
    bedrooms: Number(bedrooms),
    bathrooms: Number(bathrooms),
    areaSqFt: Number(areaSqFt),
    yearBuilt: Number(yearBuilt) || 2024,
    images: images && images.length > 0 ? images : [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    approvalStatus: 'approved',
    amenities: amenities || ['Air Conditioning', 'High Speed Internet', 'Parking'],
    agent: agent || {
      name: 'Victoria Vance',
      email: 'victoria@estatepro.com',
      phone: '+1 (212) 555-0199',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      agency: 'EstatePro Private Client Group'
    },
    views: 12,
    createdAt: new Date().toISOString()
  };

  try {
    const newProp = await Property.create(propertyData);
    return res.status(201).json(newProp);
  } catch (error) {
    const newMemProp = {
      _id: 'prop_' + Date.now(),
      ...propertyData
    };
    memoryProperties.unshift(newMemProp);
    return res.status(201).json(newMemProp);
  }
};

// DELETE /api/properties/:id
const deleteProperty = async (req, res) => {
  const { id } = req.params;

  try {
    await Property.findByIdAndDelete(id);
  } catch (error) {
    // Continue
  }

  memoryProperties = memoryProperties.filter(p => p._id !== id && p.id !== id);
  return res.json({ message: 'Property deleted successfully' });
};

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  deleteProperty,
  memoryProperties
};

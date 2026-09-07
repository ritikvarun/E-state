import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const PropertyContext = createContext();

const initialMockProperties = [
  {
    _id: "prop_101",
    title: "The Penthouse at Billionaires' Row",
    description: "Experience unprecedented Manhattan luxury in this full-floor duplex penthouse featuring 360-degree panoramic views of Central Park, soaring 14ft ceilings, private elevator access, custom Italian marble kitchen, and a 1,200 sq.ft private landscaped terrace.",
    price: 18500000,
    type: "Penthouse",
    status: "For Sale",
    city: "New York",
    state: "NY",
    address: "432 Park Avenue, Penthouse 88, New York, NY 10022",
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 6200,
    yearBuilt: 2023,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    approvalStatus: "approved",
    amenities: ["Private Pool", "Central Park Views", "Gym", "Concierge 24/7", "Private Elevator", "Wine Cellar", "Terrace", "Smart Home Automation"],
    agent: {
      name: "Victoria Vance",
      email: "victoria@estatepro.com",
      phone: "+1 (212) 555-0199",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      agency: "EstatePro Private Client Group"
    },
    views: 840,
    createdAt: "2026-08-01T10:00:00Z"
  },
  {
    _id: "prop_102",
    title: "Bel Air Modern Minimalist Architectural Estate",
    description: "Designed by world-renowned architects, this ultra-private Bel Air sanctuary offers seamless indoor-outdoor living, zero-edge infinity pool overlooking the city to ocean, temperature-controlled 500-bottle wine room, and professional wellness spa.",
    price: 24900000,
    type: "Villa",
    status: "For Sale",
    city: "Los Angeles",
    state: "CA",
    address: "10771 Bellagio Road, Bel Air, Los Angeles, CA 90077",
    bedrooms: 6,
    bathrooms: 8,
    areaSqFt: 11400,
    yearBuilt: 2024,
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    approvalStatus: "approved",
    amenities: ["Infinity Pool", "Ocean View", "Home Theater", "Spa & Sauna", "6-Car Garage", "Security System", "Outdoor Kitchen"],
    agent: {
      name: "Julian Mercer",
      email: "julian@estatepro.com",
      phone: "+1 (310) 555-0144",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
      agency: "EstatePro Luxury West Coast"
    },
    views: 1210,
    createdAt: "2026-08-02T14:30:00Z"
  },
  {
    _id: "prop_103",
    title: "Star Island Waterfront Villa & Yacht Dock",
    description: "Exclusive gated Star Island estate featuring 100ft of prime deep-water frontage, private yacht dock, lush tropical gardens, custom resort-style swimming pool, summer kitchen, and master suite with dual spa bathrooms.",
    price: 32000000,
    type: "Villa",
    status: "For Sale",
    city: "Miami",
    state: "FL",
    address: "22 Star Island Drive, Miami Beach, FL 33139",
    bedrooms: 7,
    bathrooms: 9,
    areaSqFt: 12500,
    yearBuilt: 2025,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    approvalStatus: "approved",
    amenities: ["Private Yacht Dock", "Waterfront", "Resort Pool", "Gated Security", "Tennis Court", "Smart Automation", "Outdoor Bar"],
    agent: {
      name: "Elena Rostova",
      email: "elena@estatepro.com",
      phone: "+1 (305) 555-0899",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      agency: "EstatePro Miami International"
    },
    views: 950,
    createdAt: "2026-08-03T11:15:00Z"
  },
  {
    _id: "prop_104",
    title: "Mayfair Grand Victorian Townhouse",
    description: "An impeccably restored 6-story Victorian Residence in Mayfair. Combines preserved heritage molding and fireplaces with state-of-the-art climate control, private passenger elevator, spa suite, and underground subterranean pool.",
    price: 45000,
    type: "Townhouse",
    status: "For Rent",
    city: "London",
    state: "UK",
    address: "14 Grosvenor Square, Mayfair, London W1K 6LD",
    bedrooms: 5,
    bathrooms: 5,
    areaSqFt: 5800,
    yearBuilt: 2023,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-35f13ebc67df?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    approvalStatus: "approved",
    amenities: ["Subterranean Pool", "Private Elevator", "Wine Cellar", "24/7 Security", "Private Garden", "Underfloor Heating"],
    agent: {
      name: "Arthur Sterling",
      email: "arthur@estatepro.com",
      phone: "+44 20 7946 0912",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      agency: "EstatePro London Signature"
    },
    views: 710,
    createdAt: "2026-08-04T09:00:00Z"
  },
  {
    _id: "prop_105",
    title: "Downtown Manhattan Loft at Soho",
    description: "Authentic Soho cast-iron building loft featuring exposed brick, original timber beams, oversized timber-framed windows, chef's custom steel island kitchen, and custom art lighting installation throughout.",
    price: 12500,
    type: "Apartment",
    status: "For Rent",
    city: "New York",
    state: "NY",
    address: "102 Prince Street, Loft 4B, Soho, New York, NY 10012",
    bedrooms: 2,
    bathrooms: 2,
    areaSqFt: 2400,
    yearBuilt: 2022,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    approvalStatus: "approved",
    amenities: ["Exposed Brick", "High Ceilings", "Doorman", "Pet Friendly", "Washer/Dryer", "Storage Unit"],
    agent: {
      name: "Victoria Vance",
      email: "victoria@estatepro.com",
      phone: "+1 (212) 555-0199",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      agency: "EstatePro Private Client Group"
    },
    views: 630,
    createdAt: "2026-08-05T16:20:00Z"
  },
  {
    _id: "prop_106",
    title: "Hollywood Hills Glass Pavilion Villa",
    description: "Perched dramatically above the Sunset Strip, this glass pavilion compound offers unobstructed views of the LA Basin to Catalina Island, cantilevered infinity deck, private spa, and state-of-the-art security.",
    price: 15750000,
    type: "Villa",
    status: "For Sale",
    city: "Los Angeles",
    state: "CA",
    address: "8422 Bluebird Avenue, Hollywood Hills, CA 90069",
    bedrooms: 4,
    bathrooms: 5,
    areaSqFt: 5200,
    yearBuilt: 2024,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    approvalStatus: "approved",
    amenities: ["City View", "Infinity Pool", "Fire Pit", "Smart Home", "Wine Display", "Outdoor Dining"],
    agent: {
      name: "Julian Mercer",
      email: "julian@estatepro.com",
      phone: "+1 (310) 555-0144",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
      agency: "EstatePro Luxury West Coast"
    },
    views: 890,
    createdAt: "2026-08-06T12:00:00Z"
  },
  {
    _id: "prop_107",
    title: "Brickell Financial Tower Executive Suite",
    description: "Turnkey luxury executive space & penthouse office situated on the 45th floor of Brickell's premier financial glass tower. Includes high-speed fiber infrastructure, private boardrooms, and waterfront terrace.",
    price: 8500000,
    type: "Commercial",
    status: "For Sale",
    city: "Miami",
    state: "FL",
    address: "1421 Brickell Avenue, Suite 4500, Miami, FL 33131",
    bedrooms: 0,
    bathrooms: 4,
    areaSqFt: 4800,
    yearBuilt: 2024,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    approvalStatus: "approved",
    amenities: ["24/7 Security", "Valet Parking", "Fiber Internet", "Executive Lounge", "Helipad Access"],
    agent: {
      name: "Elena Rostova",
      email: "elena@estatepro.com",
      phone: "+1 (305) 555-0899",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      agency: "EstatePro Miami International"
    },
    views: 540,
    createdAt: "2026-08-07T08:45:00Z"
  },
  {
    _id: "prop_108",
    title: "Palm Jumeirah Water Villa with Private Beach",
    description: "Iconic Palm Jumeirah luxury frond villa featuring private white sand beach, private infinity pool, skylight atrium, Italian marble flooring, and uninterrupted skyline views of Dubai Marina.",
    price: 19800000,
    type: "Villa",
    status: "For Sale",
    city: "Dubai",
    state: "UAE",
    address: "Frond G, Palm Jumeirah, Dubai, UAE",
    bedrooms: 6,
    bathrooms: 7,
    areaSqFt: 8900,
    yearBuilt: 2025,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    approvalStatus: "approved",
    amenities: ["Private Beach", "Infinity Pool", "Skyline Views", "Driver's Room", "Smart Security", "Private Elevator"],
    agent: {
      name: "Tariq Al-Mansoor",
      email: "tariq@estatepro.com",
      phone: "+971 4 321 8899",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      agency: "EstatePro Middle East Luxury"
    },
    views: 1450,
    createdAt: "2026-08-08T15:10:00Z"
  }
];

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState(initialMockProperties);
  const [filteredProperties, setFilteredProperties] = useState(initialMockProperties);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // Active Filter state
  const [filters, setFilters] = useState({
    search: '',
    status: 'All', // 'All', 'For Sale', 'For Rent'
    type: 'All', // 'All', 'Apartment', 'Villa', 'House', 'Penthouse', 'Commercial', 'Townhouse'
    city: 'All',
    minPrice: 0,
    maxPrice: 40000000,
    bedrooms: 'Any',
    bathrooms: 'Any',
    sort: 'newest',
    amenities: []
  });

  // Fetch properties from backend API if reachable
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await api.get('/properties');
      if (res.data && res.data.length > 0) {
        setProperties(res.data);
      }
    } catch (error) {
      console.log('Using local client property state engine');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
    const savedFavs = localStorage.getItem('estatepro_favorites');
    if (savedFavs) {
      setFavorites(JSON.parse(savedFavs));
    }
  }, []);

  // Real-time filtering algorithm whenever filters or properties change
  useEffect(() => {
    let result = [...properties];

    // Status filter (Buy vs Rent)
    if (filters.status && filters.status !== 'All') {
      result = result.filter(p => p.status.toLowerCase() === filters.status.toLowerCase());
    }

    // Property Type filter
    if (filters.type && filters.type !== 'All') {
      result = result.filter(p => p.type.toLowerCase() === filters.type.toLowerCase());
    }

    // City filter
    if (filters.city && filters.city !== 'All') {
      result = result.filter(p => p.city.toLowerCase() === filters.city.toLowerCase());
    }

    // Keyword search filter
    if (filters.search) {
      const term = filters.search.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.address.toLowerCase().includes(term) ||
        p.city.toLowerCase().includes(term)
      );
    }

    // Price Range filter
    if (filters.minPrice) {
      result = result.filter(p => p.price >= filters.minPrice);
    }
    if (filters.maxPrice) {
      result = result.filter(p => p.price <= filters.maxPrice);
    }

    // Bedrooms filter
    if (filters.bedrooms && filters.bedrooms !== 'Any') {
      const reqBeds = parseInt(filters.bedrooms);
      result = result.filter(p => p.bedrooms >= reqBeds);
    }

    // Bathrooms filter
    if (filters.bathrooms && filters.bathrooms !== 'Any') {
      const reqBaths = parseInt(filters.bathrooms);
      result = result.filter(p => p.bathrooms >= reqBaths);
    }

    // Amenities filter
    if (filters.amenities && filters.amenities.length > 0) {
      result = result.filter(p => 
        filters.amenities.every(amenity => p.amenities && p.amenities.includes(amenity))
      );
    }

    // Sorting
    if (filters.sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sort === 'views') {
      result.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProperties(result);
  }, [filters, properties]);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      status: 'All',
      type: 'All',
      city: 'All',
      minPrice: 0,
      maxPrice: 40000000,
      bedrooms: 'Any',
      bathrooms: 'Any',
      sort: 'newest',
      amenities: []
    });
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter(item => item !== id);
      } else {
        updated = [...prev, id];
      }
      localStorage.setItem('estatepro_favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const addProperty = async (newPropData) => {
    try {
      const res = await api.post('/properties', newPropData);
      const created = res.data;
      setProperties(prev => [created, ...prev]);
      return created;
    } catch (error) {
      const mockCreated = {
        _id: 'prop_' + Date.now(),
        ...newPropData,
        views: 0,
        approvalStatus: 'approved',
        createdAt: new Date().toISOString()
      };
      setProperties(prev => [mockCreated, ...prev]);
      return mockCreated;
    }
  };

  return (
    <PropertyContext.Provider value={{
      properties,
      filteredProperties,
      favorites,
      filters,
      loading,
      updateFilters,
      resetFilters,
      toggleFavorite,
      addProperty,
      refetchProperties: fetchProperties
    }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => useContext(PropertyContext);

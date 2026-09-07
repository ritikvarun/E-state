import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Calendar, Heart, Share2, Phone, Mail, CheckCircle, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import MortgageCalculator from '../components/MortgageCalculator';
import ScheduleTourModal from '../components/ScheduleTourModal';
import PropertyCard from '../components/PropertyCard';
import api from '../services/api';

export default function PropertyDetail() {
  const { id } = useParams();
  const { properties, favorites, toggleFavorite } = useProperties();
  const [property, setProperty] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [showTourModal, setShowTourModal] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('I am interested in receiving full information package for this property.');
  const [inquirySent, setInquirySent] = useState(false);

  useEffect(() => {
    // Find property locally or from API
    const found = properties.find(p => p._id === id || p.id === id);
    if (found) {
      setProperty(found);
    } else {
      api.get(`/properties/${id}`).then(res => setProperty(res.data)).catch(() => {});
    }
  }, [id, properties]);

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-semibold text-slate-500">Loading luxury estate details...</p>
      </div>
    );
  }

  const isFav = favorites.includes(property._id || property.id);
  const images = property.images && property.images.length > 0 ? property.images : [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
  ];

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/inquiries', {
        propertyId: property._id || property.id,
        propertyTitle: property.title,
        name: inquiryName,
        email: inquiryEmail,
        phone: inquiryPhone,
        message: inquiryMsg,
        agentEmail: property.agent?.email || 'victoria@estatepro.com'
      });
    } catch (err) {}
    setInquirySent(true);
  };

  const formatPrice = (price, status) => {
    if (status === 'For Rent') return `$${price.toLocaleString()}/month`;
    return `$${price.toLocaleString()}`;
  };

  const similarProperties = properties
    .filter(p => (p._id || p.id) !== (property._id || property.id))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Title & Price Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-600 text-white font-bold text-xs rounded-full uppercase tracking-wider">
              {property.status}
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 font-bold text-xs rounded-full uppercase tracking-wider">
              {property.type}
            </span>
            {property.featured && (
              <span className="px-3 py-1 bg-amber-400 text-slate-900 font-bold text-xs rounded-full uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Featured Estate
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-serif">
            {property.title}
          </h1>
          <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-blue-600" />
            {property.address}, {property.city}, {property.state}
          </p>
        </div>

        <div className="text-left md:text-right space-y-2">
          <p className="text-3xl sm:text-4xl font-extrabold text-blue-600 font-serif">
            {formatPrice(property.price, property.status)}
          </p>
          <div className="flex items-center gap-2 justify-start md:justify-end">
            <button
              onClick={() => toggleFavorite(property._id || property.id)}
              className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
                isFav ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{isFav ? 'Saved to Wishlist' : 'Save Property'}</span>
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Property link copied to clipboard!');
              }}
              className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </div>

      {/* High-res Image Gallery Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Main Featured Photo */}
        <div className="lg:col-span-2 aspect-[16/10] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-estate relative">
          <img
            src={images[activeImg]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Thumbnail Stack */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          {images.slice(0, 3).map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImg(idx)}
              className={`aspect-[16/9] rounded-2xl overflow-hidden border-2 transition-all ${
                activeImg === idx ? 'border-blue-600 ring-2 ring-blue-500/20' : 'border-transparent opacity-80 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Gallery thumbnail ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

      </div>

      {/* Quick Specs Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-estate grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Bedrooms</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1 flex items-center justify-center gap-2">
            <Bed className="w-5 h-5 text-blue-600" />
            {property.bedrooms} Beds
          </p>
        </div>
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Bathrooms</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1 flex items-center justify-center gap-2">
            <Bath className="w-5 h-5 text-blue-600" />
            {property.bathrooms} Baths
          </p>
        </div>
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Area</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1 flex items-center justify-center gap-2">
            <Square className="w-5 h-5 text-blue-600" />
            {property.areaSqFt ? property.areaSqFt.toLocaleString() : '5,000'} sqft
          </p>
        </div>
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Year Completed</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1 flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            {property.yearBuilt || 2024}
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Description & Amenities */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Description */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-estate space-y-4">
            <h3 className="text-xl font-bold text-slate-900 font-serif">About This Residence</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-estate space-y-6">
            <h3 className="text-xl font-bold text-slate-900 font-serif">Property Amenities & Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="text-xs font-bold text-slate-800">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mortgage Calculator */}
          <MortgageCalculator defaultPrice={property.price} />

        </div>

        {/* Right Column: Agent Inquiry Card & Schedule Tour CTA */}
        <div className="space-y-6">
          
          {/* Agent Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-estate space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={property.agent?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'}
                alt={property.agent?.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/20"
              />
              <div>
                <h4 className="text-base font-bold text-slate-900">{property.agent?.name || 'Victoria Vance'}</h4>
                <p className="text-xs text-blue-600 font-semibold">{property.agent?.agency || 'EstatePro Luxury Client Group'}</p>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Verified Premier Agent
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowTourModal(true)}
              className="w-full py-3.5 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Schedule Private Showing
            </button>

            {/* Direct Message Form */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700">Direct Agent Inquiry</h5>
              
              {inquirySent ? (
                <div className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl text-xs font-bold text-center">
                  Inquiry sent! The agent will reach out shortly.
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3 text-xs font-semibold text-slate-700">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-normal text-slate-900"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-normal text-slate-900"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-normal text-slate-900"
                  />
                  <textarea
                    rows="3"
                    value={inquiryMsg}
                    onChange={(e) => setInquiryMsg(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-normal text-slate-900"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-blue-600 transition-colors"
                  >
                    Send Agent Inquiry
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Similar Properties Recommendation */}
      <div className="pt-10 space-y-6">
        <h3 className="text-2xl font-bold text-slate-900 font-serif">Similar Luxury Residences</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {similarProperties.map(p => (
            <PropertyCard key={p._id || p.id} property={p} />
          ))}
        </div>
      </div>

      {/* Tour Booking Modal */}
      {showTourModal && (
        <ScheduleTourModal property={property} onClose={() => setShowTourModal(false)} />
      )}

    </div>
  );
}

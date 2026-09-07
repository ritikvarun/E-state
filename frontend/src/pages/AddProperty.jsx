import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Upload, Plus, Check, Image as ImageIcon, MapPin, DollarSign } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';

const propertyTypes = ['Apartment', 'Villa', 'House', 'Penthouse', 'Commercial', 'Townhouse'];
const topCities = ['New York', 'Los Angeles', 'Miami', 'London', 'Dubai'];
const allAmenities = [
  'Private Pool',
  'Ocean View',
  'Gym',
  'Concierge 24/7',
  'Private Elevator',
  'Wine Cellar',
  'Terrace',
  'Smart Home Automation',
  'Home Theater',
  'Private Yacht Dock'
];

export default function AddProperty() {
  const { addProperty } = useProperties();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('Apartment');
  const [status, setStatus] = useState('For Sale');
  const [city, setCity] = useState('New York');
  const [state, setState] = useState('NY');
  const [address, setAddress] = useState('');
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(3);
  const [areaSqFt, setAreaSqFt] = useState(3500);
  const [yearBuilt, setYearBuilt] = useState(2024);
  const [selectedAmenities, setSelectedAmenities] = useState(['Private Pool', 'Gym']);
  const [imageUrls, setImageUrls] = useState([
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  ]);
  const [newImageInput, setNewImageInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleToggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleAddImage = () => {
    if (newImageInput.trim()) {
      setImageUrls([...imageUrls, newImageInput.trim()]);
      setNewImageInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const propertyPayload = {
      title,
      description,
      price: Number(price),
      type,
      status,
      city,
      state,
      address,
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      areaSqFt: Number(areaSqFt),
      yearBuilt: Number(yearBuilt),
      images: imageUrls,
      amenities: selectedAmenities,
      agent: {
        name: user?.name || 'Victoria Vance',
        email: user?.email || 'victoria@estatepro.com',
        phone: user?.phone || '+1 (212) 555-0199',
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
        agency: user?.agency || 'EstatePro Private Client Group'
      }
    };

    const created = await addProperty(propertyPayload);
    setLoading(false);
    navigate(`/property/${created._id || created.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Agent & Owner Portal</span>
        <h1 className="text-3xl font-extrabold text-slate-900 font-serif mt-1">List A New Luxury Property</h1>
        <p className="text-xs text-slate-500 mt-1">Fill out residence specs to publish to the global EstatePro marketplace.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-estate space-y-8">
        
        {/* Basic Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Residence Overview</h3>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Property Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The Penthouse at Billionaires' Row"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Detailed Description</label>
            <textarea
              rows="4"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe architectural features, view orientation, floor finishes, and terrace details..."
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Listing Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900"
              >
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Property Category</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900"
              >
                {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Price ($ USD)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="18500000"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Location & Specs */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Location & Key Specifications</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">City Location</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900"
              >
                {topCities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">State / Region</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="NY"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Full Physical Address</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="432 Park Avenue, Penthouse 88, New York, NY 10022"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Bedrooms</label>
              <input
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Bathrooms</label>
              <input
                type="number"
                value={bathrooms}
                onChange={(e) => setBathrooms(Number(e.target.value))}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Area (Sq Ft)</label>
              <input
                type="number"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Year Built</label>
              <input
                type="number"
                value={yearBuilt}
                onChange={(e) => setYearBuilt(Number(e.target.value))}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
              />
            </div>
          </div>
        </div>

        {/* Image Uploader Preview */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">High-Res Media Photos</h3>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={newImageInput}
              onChange={(e) => setNewImageInput(e.target.value)}
              placeholder="Paste Unsplash image URL or Cloudinary CDN link..."
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-normal"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="px-4 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-blue-600 transition-colors"
            >
              Add Photo
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {imageUrls.map((url, idx) => (
              <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 group">
                <img src={url} alt="Property preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImageUrls(imageUrls.filter((_, i) => i !== idx))}
                  className="absolute top-1.5 right-1.5 p-1 bg-rose-600 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Luxury Amenities</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {allAmenities.map(amenity => {
              const selected = selectedAmenities.includes(amenity);
              return (
                <button
                  type="button"
                  key={amenity}
                  onClick={() => handleToggleAmenity(amenity)}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                    selected
                      ? 'bg-blue-50 border-blue-600 text-blue-700'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{amenity}</span>
                  {selected && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-extrabold text-sm shadow-lg shadow-blue-500/25 transition-all"
        >
          {loading ? 'Publishing Listing...' : 'Publish Property to EstatePro'}
        </button>

      </form>

    </div>
  );
}

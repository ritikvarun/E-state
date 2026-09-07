import React from 'react';
import { Search, MapPin, Building, DollarSign, Bed, Bath, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';

const propertyTypes = ['All', 'Apartment', 'Villa', 'House', 'Penthouse', 'Commercial', 'Townhouse'];
const topCities = ['All', 'New York', 'Los Angeles', 'Miami', 'London', 'Dubai'];
const bedOptions = ['Any', '1', '2', '3', '4', '5+'];
const bathOptions = ['Any', '1', '2', '3', '4', '5+'];

const availableAmenities = [
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

export default function SearchFilters() {
  const { filters, updateFilters, resetFilters, filteredProperties } = useProperties();

  const handleAmenityToggle = (amenity) => {
    const current = filters.amenities || [];
    let updated;
    if (current.includes(amenity)) {
      updated = current.filter(a => a !== amenity);
    } else {
      updated = [...current, amenity];
    }
    updateFilters({ amenities: updated });
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-estate space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-slate-900">Advanced Filter</h3>
        </div>
        <button
          onClick={resetFilters}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All
        </button>
      </div>

      {/* Buy / Rent Toggle Tabs */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Listing Type</label>
        <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          {['All', 'For Sale', 'For Rent'].map((st) => (
            <button
              key={st}
              onClick={() => updateFilters({ status: st })}
              className={`py-2 rounded-lg transition-all ${
                filters.status === st
                  ? 'bg-white text-blue-600 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st === 'For Sale' ? 'Buy' : st === 'For Rent' ? 'Rent' : 'All Status'}
            </button>
          ))}
        </div>
      </div>

      {/* Keyword Search */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Search Term</label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            placeholder="Search address, title, city..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* City Dropdown */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">City Location</label>
        <div className="relative">
          <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={filters.city}
            onChange={(e) => updateFilters({ city: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none transition-all appearance-none cursor-pointer"
          >
            {topCities.map(c => (
              <option key={c} value={c}>{c === 'All' ? 'All Global Cities' : c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Property Type Dropdown */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Property Category</label>
        <div className="relative">
          <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={filters.type}
            onChange={(e) => updateFilters({ type: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none transition-all appearance-none cursor-pointer"
          >
            {propertyTypes.map(pt => (
              <option key={pt} value={pt}>{pt === 'All' ? 'All Property Types' : pt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Max Price Range Slider */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Max Price</label>
          <span className="text-sm font-extrabold text-blue-600">
            ${filters.maxPrice ? filters.maxPrice.toLocaleString() : '40,000,000'}
          </span>
        </div>
        <input
          type="range"
          min="5000"
          max="40000000"
          step="50000"
          value={filters.maxPrice}
          onChange={(e) => updateFilters({ maxPrice: Number(e.target.value) })}
          className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-1">
          <span>$5k</span>
          <span>$40M+</span>
        </div>
      </div>

      {/* Bedrooms Selector */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Min Bedrooms</label>
        <div className="flex gap-1.5">
          {bedOptions.map((b) => (
            <button
              key={b}
              onClick={() => updateFilters({ bedrooms: b })}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${
                filters.bedrooms === b
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms Selector */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Min Bathrooms</label>
        <div className="flex gap-1.5">
          {bathOptions.map((b) => (
            <button
              key={b}
              onClick={() => updateFilters({ bathrooms: b })}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${
                filters.bathrooms === b
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Luxury Amenities Checkboxes */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5">Key Amenities</label>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {availableAmenities.map((amenity) => {
            const checked = (filters.amenities || []).includes(amenity);
            return (
              <label
                key={amenity}
                onClick={() => handleAmenityToggle(amenity)}
                className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-slate-900"
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                  checked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-slate-50'
                }`}>
                  {checked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>{amenity}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Real-time Match Count Badge */}
      <div className="pt-2 text-center">
        <span className="text-xs font-bold text-slate-500">
          Showing <span className="text-blue-600 font-extrabold">{filteredProperties.length}</span> luxury properties
        </span>
      </div>

    </div>
  );
}

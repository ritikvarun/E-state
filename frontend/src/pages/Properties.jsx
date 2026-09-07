import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, List, Map, SlidersHorizontal, ArrowUpDown, Building2, MapPin } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';
import SearchFilters from '../components/SearchFilters';

export default function Properties() {
  const { filteredProperties, filters, updateFilters, loading } = useProperties();
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'map'
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const location = useLocation();

  // Read URL query params (e.g. /properties?status=For Sale)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const statusParam = params.get('status');
    const typeParam = params.get('type');
    const cityParam = params.get('city');

    if (statusParam) updateFilters({ status: statusParam });
    if (typeParam) updateFilters({ type: typeParam });
    if (cityParam) updateFilters({ city: cityParam });
  }, [location.search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Title & Search Bar Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Real Estate Search</span>
          <h1 className="text-3xl font-extrabold text-slate-900 font-serif mt-1">
            {filters.status === 'For Sale' ? 'Luxury Homes For Sale' : filters.status === 'For Rent' ? 'Exclusive Rental Estates' : 'All Available Listings'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Showing <span className="font-bold text-slate-900">{filteredProperties.length}</span> verified properties matching your criteria
          </p>
        </div>

        {/* View Toggle & Sorting */}
        <div className="flex items-center gap-3">
          
          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>

          {/* Sort selector */}
          <div className="relative">
            <select
              value={filters.sort}
              onChange={(e) => updateFilters({ sort: e.target.value })}
              className="pl-3 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600 appearance-none cursor-pointer"
            >
              <option value="newest">Sort by Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="views">Most Viewed</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Layout Toggle Buttons */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'
              }`}
              title="Compact List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'map' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'
              }`}
              title="Map Split View"
            >
              <Map className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Main Filter Sidebar + Results Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filter */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28">
            <SearchFilters />
          </div>
        </div>

        {/* Mobile Slideout Filter */}
        {showMobileFilter && (
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 relative">
              <button
                onClick={() => setShowMobileFilter(false)}
                className="absolute top-4 right-4 text-slate-500 font-bold"
              >
                Close ✕
              </button>
              <SearchFilters />
            </div>
          </div>
        )}

        {/* Results Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-semibold text-slate-500">Searching global luxury listings...</p>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">No properties matched your criteria</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try expanding your price range slider or clearing amenity filters to view available inventory.
              </p>
            </div>
          ) : viewMode === 'map' ? (
            /* Map Split View Mode */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
                {filteredProperties.map(p => (
                  <PropertyCard key={p._id || p.id} property={p} />
                ))}
              </div>
              <div className="bg-slate-100 rounded-3xl border border-slate-200 p-6 flex flex-col items-center justify-center text-center space-y-3 min-h-[500px]">
                <MapPin className="w-10 h-10 text-blue-600" />
                <h4 className="text-base font-bold text-slate-900">Interactive Map Preview</h4>
                <p className="text-xs text-slate-500 max-w-xs">
                  Showing map coordinates for {filteredProperties.length} active listings across Manhattan, Beverly Hills, Star Island, Mayfair & Palm Jumeirah.
                </p>
              </div>
            </div>
          ) : viewMode === 'list' ? (
            /* Compact List View Mode */
            <div className="space-y-4">
              {filteredProperties.map(p => (
                <div key={p._id || p.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-estate flex flex-col sm:flex-row gap-4 items-center">
                  <img src={p.images[0]} alt={p.title} className="w-full sm:w-48 h-32 object-cover rounded-xl" />
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-blue-600 tracking-wider">{p.status} • {p.type}</span>
                    <h3 className="text-base font-bold text-slate-900">{p.title}</h3>
                    <p className="text-xs text-slate-500 truncate">{p.address}</p>
                    <p className="text-sm font-extrabold text-slate-900 pt-1">${p.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Grid View Mode */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map(p => (
                <PropertyCard key={p._id || p.id} property={p} />
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

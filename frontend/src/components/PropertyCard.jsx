import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin, Heart, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProperties } from '../context/PropertyContext';

export default function PropertyCard({ property }) {
  const { favorites, toggleFavorite } = useProperties();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const isFav = favorites.includes(property._id || property.id);

  const images = property.images && property.images.length > 0 ? property.images : [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
  ];

  const handlePrevImg = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImg = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const formatPrice = (price, status) => {
    if (status === 'For Rent') {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-estate hover:shadow-estate-lg transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Container with slider */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={images[currentImgIndex]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20 pointer-events-none" />

        {/* Status Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-sm ${
            property.status === 'For Sale'
              ? 'bg-blue-600 text-white'
              : 'bg-emerald-600 text-white'
          }`}>
            {property.status}
          </span>
          {property.featured && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-slate-900 flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(property._id || property.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-700 hover:text-rose-500 hover:bg-white transition-all shadow-md"
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Carousel arrows */}
        {images.length > 1 && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handlePrevImg}
              className="p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md backdrop-blur-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImg}
              className="p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md backdrop-blur-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Price tag on bottom of image */}
        <div className="absolute bottom-3 left-3 text-white">
          <p className="text-xl font-extrabold tracking-tight drop-shadow-md">
            {formatPrice(property.price, property.status)}
          </p>
        </div>

        {/* Image index indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 flex gap-1">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentImgIndex ? 'bg-white w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Property Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-1">
            <MapPin className="w-3.5 h-3.5 text-blue-500" />
            <span className="truncate">{property.city}, {property.state || 'USA'}</span>
          </div>

          <Link to={`/property/${property._id || property.id}`}>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
              {property.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-slate-400" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-slate-400" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Square className="w-4 h-4 text-slate-400" />
            <span>{property.areaSqFt ? property.areaSqFt.toLocaleString() : '4,500'} sqft</span>
          </div>
        </div>

        {/* Footer Agent info */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={property.agent?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'}
              alt={property.agent?.name}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
            />
            <span className="text-xs font-medium text-slate-700 truncate max-w-[120px]">
              {property.agent?.name || 'Victoria Vance'}
            </span>
          </div>

          <Link
            to={`/property/${property._id || property.id}`}
            className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>View Details</span>
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

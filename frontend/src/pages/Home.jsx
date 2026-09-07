import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Building, Sparkles, ArrowRight, ShieldCheck, Award, TrendingUp, Key, Star, Users, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';

export default function Home() {
  const { properties, filters, updateFilters } = useProperties();
  const navigate = useNavigate();
  const statsRef = useRef(null);

  // GSAP animation for stats counter
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-number', {
        innerText: 0,
        duration: 2,
        snap: { innerText: 1 },
        ease: 'power1.out',
        stagger: 0.2
      });
    }, statsRef);
    return () => ctx.revert();
  }, []);

  const featuredList = properties.filter(p => p.featured || p.approvalStatus === 'approved').slice(0, 6);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    navigate('/properties');
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-blue-100 via-indigo-50 to-purple-100 rounded-full blur-3xl opacity-60 pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto w-full text-center space-y-8">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Discover The World's Most Prestigious Real Estate</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight font-serif max-w-5xl mx-auto leading-[1.1]"
          >
            Find Your Signature <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Luxury Sanctuary</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Explore an unexcelled collection of architectural masterpieces, prime waterfront estates, and iconic high-rise penthouses across New York, Los Angeles, Miami, London, and Dubai.
          </motion.p>

          {/* Real-time Multi-Tab Hero Search Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-estate-lg space-y-4"
          >
            
            {/* Status Tabs */}
            <div className="flex items-center justify-center gap-2 max-w-xs mx-auto p-1 bg-slate-100 rounded-2xl text-xs font-bold">
              <button
                type="button"
                onClick={() => updateFilters({ status: 'For Sale' })}
                className={`flex-1 py-2 rounded-xl transition-all ${
                  filters.status === 'For Sale' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'
                }`}
              >
                Buy Home
              </button>
              <button
                type="button"
                onClick={() => updateFilters({ status: 'For Rent' })}
                className={`flex-1 py-2 rounded-xl transition-all ${
                  filters.status === 'For Rent' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'
                }`}
              >
                Rent Property
              </button>
              <button
                type="button"
                onClick={() => updateFilters({ status: 'All' })}
                className={`flex-1 py-2 rounded-xl transition-all ${
                  filters.status === 'All' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'
                }`}
              >
                All Status
              </button>
            </div>

            {/* Inputs Grid */}
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Location Input */}
              <div className="relative">
                <MapPin className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => updateFilters({ search: e.target.value })}
                  placeholder="Location or address..."
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none transition-all"
                />
              </div>

              {/* Property Type Dropdown */}
              <div className="relative">
                <Building className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={filters.type}
                  onChange={(e) => updateFilters({ type: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Villa">Waterfront Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Commercial">Commercial Office</option>
                  <option value="Townhouse">Historic Townhouse</option>
                </select>
              </div>

              {/* Search Submit CTA Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 transition-all hover:shadow-lg"
              >
                <Search className="w-5 h-5" />
                <span>Search Properties</span>
              </button>

            </form>

          </motion.div>

        </div>
      </section>

      {/* GSAP STATS COUNTER SECTION */}
      <section ref={statsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          
          <div className="text-center pt-4 md:pt-0">
            <p className="text-4xl sm:text-5xl font-extrabold text-blue-400">
              $<span className="stat-number">4.2</span>B+
            </p>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-2">Closed Sales Volume</p>
          </div>

          <div className="text-center pt-4 md:pt-0">
            <p className="text-4xl sm:text-5xl font-extrabold text-indigo-400">
              <span className="stat-number">1250</span>+
            </p>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-2">Active Global Listings</p>
          </div>

          <div className="text-center pt-4 md:pt-0">
            <p className="text-4xl sm:text-5xl font-extrabold text-emerald-400">
              <span className="stat-number">99</span>.4%
            </p>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-2">Client Satisfaction Rate</p>
          </div>

          <div className="text-center pt-4 md:pt-0">
            <p className="text-4xl sm:text-5xl font-extrabold text-purple-400">
              <span className="stat-number">180</span>+
            </p>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-2">Certified Advisory Agents</p>
          </div>

        </div>
      </section>

      {/* FEATURED PROPERTIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Handpicked Portfolio</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif mt-1">
              Featured Luxury Properties
            </h2>
          </div>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>View All Listings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredList.map((property) => (
            <PropertyCard key={property._id || property.id} property={property} />
          ))}
        </div>

      </section>

      {/* TOP CITIES SEO EXPLORER */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Global Destinations</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
              Explore Premier Capital Cities
            </h2>
            <p className="text-sm text-slate-600">
              Filter exclusive properties by world capital markets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            {[
              { name: 'New York', count: '340+ Properties', slug: 'new-york', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80' },
              { name: 'Los Angeles', count: '280+ Properties', slug: 'los-angeles', img: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=600&q=80' },
              { name: 'Miami', count: '190+ Properties', slug: 'miami', img: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80' },
              { name: 'London', count: '210+ Properties', slug: 'london', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80' },
              { name: 'Dubai', count: '310+ Properties', slug: 'dubai', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80' }
            ].map((city) => (
              <Link
                key={city.slug}
                to={`/city/${city.slug}`}
                className="group relative h-72 rounded-3xl overflow-hidden shadow-estate hover:shadow-estate-lg transition-all duration-300"
              >
                <img
                  src={city.img}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 text-white">
                  <h3 className="text-xl font-bold font-serif">{city.name}</h3>
                  <p className="text-xs text-blue-300 font-medium">{city.count}</p>
                </div>
              </Link>
            ))}

          </div>

        </div>
      </section>

      {/* WHY CHOOSE ESTATEPRO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Unrivaled Service</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
            Why Discerning Clients Choose EstatePro
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-estate space-y-4 hover:border-blue-500 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Vetted Off-Market Listings</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Access rare off-market inventory and verified titles checked rigorously by our internal legal team.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-estate space-y-4 hover:border-blue-500 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">White-Glove Concierge</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dedicated private advisors available 24/7 for helicopter viewings, luxury transfers, and escrow support.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-estate space-y-4 hover:border-blue-500 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Data-Driven Valuation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Comprehensive real-time market analysis and yield estimation for institutional and private investors.
            </p>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 sm:p-16 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif">Are You Ready To List Your Exclusive Property?</h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Reach over 2.5 million high-net-worth buyers globally. Work with certified EstatePro luxury specialists today.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/add-property"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-900 font-extrabold text-sm hover:bg-slate-100 transition-all shadow-lg"
              >
                List Property Now
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-800/60 hover:bg-blue-800 text-white border border-blue-400 font-extrabold text-sm transition-all"
              >
                Speak With An Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Building, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';

const cityDataMap = {
  'new-york': {
    name: 'New York',
    title: 'Luxury Real Estate & Penthouse Residences in New York City',
    description: 'Explore world-class condos, pre-war duplexes, and iconic Central Park penthouses across Manhattan, Brooklyn, and Soho.',
    heroImg: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1600&q=80',
    avgPrice: '$14.2M',
    totalListings: '340+'
  },
  'los-angeles': {
    name: 'Los Angeles',
    title: 'Architectural Estates & Bel Air Mansions in Los Angeles',
    description: 'Unmatched Beverly Hills, Bel Air, and Hollywood Hills glass pavilion sanctuaries with ocean-to-city vistas.',
    heroImg: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=1600&q=80',
    avgPrice: '$18.5M',
    totalListings: '280+'
  },
  'miami': {
    name: 'Miami',
    title: 'Star Island Waterfront Villas & Deep-Water Docks in Miami',
    description: 'Resort-style waterfront compounds, yacht docks, and Brickell skyline penthouses in Miami Beach.',
    heroImg: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1600&q=80',
    avgPrice: '$21.0M',
    totalListings: '190+'
  },
  'london': {
    name: 'London',
    title: 'Mayfair Townhouses & Knightsbridge Residences in London',
    description: 'Heritage Victorian estates, underground pool sanctuaries, and private garden square residences in Mayfair and Belgravia.',
    heroImg: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80',
    avgPrice: '£12.8M',
    totalListings: '210+'
  },
  'dubai': {
    name: 'Dubai',
    title: 'Palm Jumeirah Water Villas & Emirates Hills Estates in Dubai',
    description: 'Iconic private white-sand beach frond villas, skylight atriums, and skyline views of Dubai Marina.',
    heroImg: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
    avgPrice: 'AED 45M',
    totalListings: '310+'
  }
};

export default function CityLandingPage() {
  const { slug } = useParams();
  const { properties, updateFilters } = useProperties();

  const cityInfo = cityDataMap[slug] || {
    name: slug ? slug.toUpperCase() : 'Global City',
    title: 'Exclusive Luxury Real Estate Collection',
    description: 'Explore premier real estate portfolio in this global capital.',
    heroImg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    avgPrice: '$15M',
    totalListings: '150+'
  };

  useEffect(() => {
    updateFilters({ city: cityInfo.name });
  }, [slug]);

  const cityProperties = properties.filter(p => p.city.toLowerCase().includes(cityInfo.name.toLowerCase()));

  return (
    <div className="space-y-16 pb-20">
      
      {/* City Hero */}
      <section className="relative h-[60vh] flex items-center justify-center text-white text-center px-4 overflow-hidden">
        <img
          src={cityInfo.heroImg}
          alt={cityInfo.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-black/30" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-extrabold uppercase tracking-widest text-blue-300">
            SEO Capital Market Guide
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-serif tracking-tight">
            {cityInfo.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {cityInfo.description}
          </p>
        </div>
      </section>

      {/* City Market Specs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-estate grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Portfolio Price</span>
            <p className="text-3xl font-extrabold text-blue-600 mt-1">{cityInfo.avgPrice}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Inventory</span>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">{cityInfo.totalListings}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Advisor Team</span>
            <p className="text-3xl font-extrabold text-emerald-600 mt-1">24/7 Concierge</p>
          </div>
        </div>
      </section>

      {/* City Property Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-end border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Active Listings</span>
            <h2 className="text-3xl font-extrabold text-slate-900 font-serif">
              Residences in {cityInfo.name}
            </h2>
          </div>
          <Link to="/properties" className="text-xs font-bold text-blue-600 hover:text-blue-700">
            View All Global Properties →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cityProperties.length > 0 ? (
            cityProperties.map(p => <PropertyCard key={p._id || p.id} property={p} />)
          ) : (
            <p className="col-span-3 text-center text-slate-500 py-10">No specific listings found for this city today.</p>
          )}
        </div>
      </section>

    </div>
  );
}

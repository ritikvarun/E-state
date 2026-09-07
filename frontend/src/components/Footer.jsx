import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, ArrowRight, ShieldCheck, Award, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-serif">
                Estate<span className="text-blue-500">Pro</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              EstatePro is the premier global marketplace for luxury residential & commercial properties. Connecting discerning buyers with world-class estates.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
                <Award className="w-4 h-4 text-amber-400" />
                #1 Luxury Platform 2026
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
                <Globe className="w-4 h-4 text-emerald-400" />
                Global Portfolio
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Properties</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/properties?status=For Sale" className="hover:text-white transition-colors">Homes For Sale</Link></li>
              <li><Link to="/properties?status=For Rent" className="hover:text-white transition-colors">Luxury Rentals</Link></li>
              <li><Link to="/properties?type=Penthouse" className="hover:text-white transition-colors">Penthouse Collection</Link></li>
              <li><Link to="/properties?type=Villa" className="hover:text-white transition-colors">Waterfront Villas</Link></li>
              <li><Link to="/properties?type=Commercial" className="hover:text-white transition-colors">Commercial Towers</Link></li>
            </ul>
          </div>

          {/* Cities SEO Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Top Cities</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/city/new-york" className="hover:text-white transition-colors">New York Real Estate</Link></li>
              <li><Link to="/city/los-angeles" className="hover:text-white transition-colors">Los Angeles Estates</Link></li>
              <li><Link to="/city/miami" className="hover:text-white transition-colors">Miami Beach Villas</Link></li>
              <li><Link to="/city/london" className="hover:text-white transition-colors">London Mansions</Link></li>
              <li><Link to="/city/dubai" className="hover:text-white transition-colors">Dubai Luxury Homes</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Headquarters</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <span>432 Park Avenue, Suite 2400, New York, NY 10022</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span>+1 (800) 555-ESTATE</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>concierge@estatepro.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 EstatePro International Realty Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="http://localhost:5174" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 flex items-center gap-1 font-semibold text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Admin Portal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

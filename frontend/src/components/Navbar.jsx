import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Building2, Heart, PlusCircle, User, LogOut, ShieldCheck, Menu, X, PhoneCall } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProperties } from '../context/PropertyContext';
import AuthModal from './AuthModal';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { favorites } = useProperties();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-40 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-slate-900 font-serif">
                  Estate<span className="text-blue-600">Pro</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
                  Luxury Real Estate
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <Link
                to="/"
                className={`transition-colors hover:text-blue-600 ${isActive('/') ? 'text-blue-600 font-semibold' : ''}`}
              >
                Home
              </Link>
              <Link
                to="/properties?status=For Sale"
                className={`transition-colors hover:text-blue-600 ${isActive('/properties') && location.search.includes('For Sale') ? 'text-blue-600 font-semibold' : ''}`}
              >
                Buy
              </Link>
              <Link
                to="/properties?status=For Rent"
                className={`transition-colors hover:text-blue-600 ${isActive('/properties') && location.search.includes('For Rent') ? 'text-blue-600 font-semibold' : ''}`}
              >
                Rent
              </Link>
              <Link
                to="/properties"
                className={`transition-colors hover:text-blue-600 ${isActive('/properties') && !location.search ? 'text-blue-600 font-semibold' : ''}`}
              >
                All Listings
              </Link>
              <Link
                to="/about"
                className={`transition-colors hover:text-blue-600 ${isActive('/about') ? 'text-blue-600 font-semibold' : ''}`}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className={`transition-colors hover:text-blue-600 ${isActive('/contact') ? 'text-blue-600 font-semibold' : ''}`}
              >
                Contact
              </Link>
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden md:flex items-center gap-4">
              
              {/* Favorites Counter */}
              <Link
                to="/properties?favorites=true"
                className="relative p-2.5 rounded-full text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                title="Saved Properties"
              >
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* Add Property CTA (Agents & Users) */}
              <Link
                to="/add-property"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-blue-600 transition-all shadow-sm hover:shadow-md"
              >
                <PlusCircle className="w-4 h-4 text-blue-400" />
                <span>Add Listing</span>
              </Link>

              {/* User Account / Agent Dashboard / Admin Portal */}
              {user ? (
                <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                  {user.role === 'agent' && (
                    <Link
                      to="/agent/dashboard"
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition-colors"
                    >
                      Agent Portal
                    </Link>
                  )}
                  {user.role === 'admin' && (
                    <a
                      href="http://localhost:5174"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-50 text-purple-600 border border-purple-100 hover:bg-purple-100 transition-colors flex items-center gap-1"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Admin App
                    </a>
                  )}

                  <div className="relative group">
                    <button className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/30"
                      />
                      <span className="text-sm font-semibold text-slate-800 hidden lg:inline-block">
                        {user.name}
                      </span>
                    </button>

                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 hidden group-hover:block transition-all">
                      <div className="px-3 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900">{user.name}</p>
                        <p className="text-[11px] text-slate-500 capitalize">{user.role} Account</p>
                      </div>
                      {user.role === 'agent' && (
                        <Link
                          to="/agent/dashboard"
                          className="block w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                        >
                          My Properties & Leads
                        </Link>
                      )}
                      <button
                        onClick={logout}
                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-6 space-y-4">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-slate-800">Home</Link>
            <Link to="/properties?status=For Sale" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-slate-800">Buy Properties</Link>
            <Link to="/properties?status=For Rent" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-slate-800">Rent Properties</Link>
            <Link to="/properties" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-slate-800">All Listings</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-slate-800">About Us</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-slate-800">Contact</Link>
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <Link to="/add-property" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2.5 bg-slate-900 text-white font-semibold rounded-xl text-sm">Add Listing</Link>
              {!user ? (
                <button onClick={() => { setShowAuthModal(true); setMobileMenuOpen(false); }} className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-xl text-sm">Sign In / Register</button>
              ) : (
                <button onClick={logout} className="w-full py-2.5 bg-rose-50 text-rose-600 font-semibold rounded-xl text-sm">Sign Out</button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}

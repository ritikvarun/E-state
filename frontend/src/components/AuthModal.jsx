import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Building, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ onClose }) {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('user'); // 'user' or 'agent'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [agency, setAgency] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isRegister) {
      const res = await register({ name, email, password, role, phone, agency });
      if (res.success) {
        onClose();
      } else {
        setError('Registration failed. Please try again.');
      }
    } else {
      const res = await login(email, password);
      if (res.success) {
        onClose();
      } else {
        setError('Invalid credentials.');
      }
    }
    setLoading(false);
  };

  const handleQuickDemo = (demoRole) => {
    if (demoRole === 'agent') {
      setEmail('victoria@estatepro.com');
      setPassword('password123');
    } else if (demoRole === 'admin') {
      setEmail('admin@estatepro.com');
      setPassword('admin123');
    } else {
      setEmail('buyer@estatepro.com');
      setPassword('password123');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 relative border border-slate-100 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 text-center">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">EstatePro Portal</span>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {isRegister ? 'Join our luxury network of buyers and agents' : 'Access your saved properties and inquiries'}
          </p>
        </div>

        {/* Quick Demo Login Bar */}
        {!isRegister && (
          <div className="mb-4 p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">1-Click Quick Demo Login</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('buyer')}
                className="flex-1 py-1.5 bg-white border border-slate-200 hover:border-blue-500 rounded-lg text-xs font-bold text-slate-700 transition-colors shadow-2xs"
              >
                Buyer
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('agent')}
                className="flex-1 py-1.5 bg-white border border-slate-200 hover:border-indigo-500 rounded-lg text-xs font-bold text-slate-700 transition-colors shadow-2xs"
              >
                Agent
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="flex-1 py-1.5 bg-white border border-slate-200 hover:border-purple-500 rounded-lg text-xs font-bold text-slate-700 transition-colors shadow-2xs"
              >
                Admin
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-slate-700">
          
          {isRegister && (
            <>
              {/* Role selector */}
              <div>
                <label className="block mb-1.5">I am registering as an:</label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setRole('user')}
                    className={`py-2 rounded-lg font-bold text-xs transition-all ${
                      role === 'user' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    Buyer / Renting Client
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('agent')}
                    className={`py-2 rounded-lg font-bold text-xs transition-all ${
                      role === 'agent' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    Licensed Agent / Owner
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sarah Vance"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="victoria@estatepro.com"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {isRegister && role === 'agent' && (
            <div>
              <label className="block mb-1">Brokerage / Agency Name</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  placeholder="EstatePro Private Client Group"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20 mt-2"
          >
            {loading ? 'Processing...' : isRegister ? 'Complete Sign Up' : 'Sign In Now'}
          </button>

        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
          </button>
        </div>

      </div>
    </div>
  );
}

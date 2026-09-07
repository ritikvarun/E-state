import React from 'react';
import { Award, ShieldCheck, Globe, Users, Building2, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">About EstatePro</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-serif">
          Redefining Global Luxury Real Estate
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Founded in 2026, EstatePro connects ultra-high-net-worth buyers, investors, and premier brokerages across the world's most desirable trophy markets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-estate space-y-4">
          <Globe className="w-8 h-8 text-blue-600" />
          <h3 className="text-xl font-bold text-slate-900">Global Reach</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Representing signature properties across North America, Europe, the Middle East, and Asia-Pacific.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-estate space-y-4">
          <ShieldCheck className="w-8 h-8 text-indigo-600" />
          <h3 className="text-xl font-bold text-slate-900">Vetted Integrity</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every property undergo rigorous architectural verification, legal title audits, and background reviews.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-estate space-y-4">
          <Award className="w-8 h-8 text-emerald-600" />
          <h3 className="text-xl font-bold text-slate-900">Excellence Awarded</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Voted #1 luxury digital real estate platform for tech integration and seamless transaction concierges.
          </p>
        </div>
      </div>

    </div>
  );
}

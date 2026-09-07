import React from 'react';
import { Bell, ShieldCheck, User } from 'lucide-react';

export default function AdminHeader({ title }) {
  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-slate-900 font-serif">{title}</h2>
        <p className="text-xs text-slate-500">EstatePro Master Administration Console</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>API Server Online</span>
        </div>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
            alt="Super Admin"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-500/20"
          />
          <div className="text-left hidden sm:block">
            <p className="text-xs font-bold text-slate-900">Admin Commander</p>
            <p className="text-[10px] text-purple-600 font-bold uppercase">Super Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}

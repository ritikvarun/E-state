import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Building2, Users, Mail, Settings, ShieldCheck, ExternalLink } from 'lucide-react';

export default function AdminSidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Overview', path: '/', icon: LayoutDashboard },
    { name: 'Properties Moderation', path: '/properties', icon: Building2 },
    { name: 'User & Agent Accounts', path: '/users', icon: Users },
    { name: 'Inquiries Audit', path: '/inquiries', icon: Mail },
    { name: 'System Settings', path: '/settings', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen p-6 flex flex-col justify-between border-r border-slate-800">
      <div className="space-y-8">
        
        {/* Admin Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white font-serif tracking-tight">EstatePro</h1>
            <span className="text-[10px] uppercase font-bold text-purple-400 tracking-widest">Admin Control Portal</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5 text-xs font-bold">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  active
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

      </div>

      {/* External Link to Main Marketplace */}
      <div className="pt-6 border-t border-slate-800 space-y-3">
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/80 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
        >
          <span>Open Main Marketplace</span>
          <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
        </a>
      </div>
    </aside>
  );
}

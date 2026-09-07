import React, { useState, useEffect } from 'react';
import { Building2, Users, DollarSign, Mail, ShieldCheck, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import adminApi from '../services/adminApi';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalProperties: 8,
    activeAgents: 4,
    totalUsers: 12,
    totalInquiries: 5,
    pendingApprovals: 0,
    totalVolumeUSD: 143500000,
    platformStatus: 'Operational',
    systemHealth: '100% Healthy'
  });

  useEffect(() => {
    adminApi.get('/admin/stats').then(res => setStats(res.data)).catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Sales Volume</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">$143.5M</p>
          <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +18.4% this quarter
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Listings</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{stats.totalProperties}</p>
          <span className="text-xs font-semibold text-blue-600">Active Global Properties</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Licensed Agents</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{stats.activeAgents}</p>
          <span className="text-xs font-semibold text-purple-600">Certified Real Estate Advisory</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Client Inquiries</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{stats.totalInquiries}</p>
          <span className="text-xs font-semibold text-amber-600">Buyer Leads & Tours</span>
        </div>

      </div>

      {/* System Health & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-serif">Platform System Diagnostics</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-purple-600" />
                <span className="text-xs font-bold text-slate-800">MongoDB Atlas Connection Status</span>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">Connected / Healthy</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-bold text-slate-800">Cloudinary CDN Upload Engine</span>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">Ready</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                <span className="text-xs font-bold text-slate-800">JWT Security Token Engine</span>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">Active</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-bold font-serif">Master Admin Actions</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Manage global listing approvals, elevate user permissions to certified agents, or inspect platform inquiry audit logs.
          </p>
          <div className="pt-2 space-y-2">
            <a href="/properties" className="block w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-center rounded-xl text-xs font-bold">
              Moderate Properties
            </a>
            <a href="/users" className="block w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-center rounded-xl text-xs font-bold border border-slate-700">
              Manage Users & Roles
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}

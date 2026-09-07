import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Plus, Eye, Trash2, Mail, Phone, Calendar, CheckCircle, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProperties } from '../context/PropertyContext';
import api from '../services/api';

export default function AgentDashboard() {
  const { user } = useAuth();
  const { properties } = useProperties();
  const [inquiries, setInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('listings'); // 'listings' or 'leads'

  useEffect(() => {
    // Fetch inquiries for agent
    api.get('/inquiries').then(res => setInquiries(res.data)).catch(() => {
      setInquiries([
        {
          _id: 'inq_1',
          propertyTitle: "The Penthouse at Billionaires' Row",
          name: 'Harrison Brooks',
          email: 'harrison.b@capitalmgt.com',
          phone: '+1 (212) 998-3310',
          message: 'Requesting a private showing for Tuesday afternoon. Wire proof of funds is ready.',
          tourDate: '2026-08-15',
          tourTime: '14:00',
          createdAt: '2026-08-09T09:30:00Z'
        }
      ]);
    });
  }, []);

  const agentProperties = properties.filter(p => 
    !user || p.agent?.email?.toLowerCase() === user.email?.toLowerCase() || p.agent?.name === user.name
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-5">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'}
            alt={user?.name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-blue-500/30"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold font-serif">{user?.name || 'Victoria Vance'}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500 text-white text-[10px] font-bold uppercase">Certified Agent</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{user?.agency || 'EstatePro Private Client Group'}</p>
          </div>
        </div>

        <Link
          to="/add-property"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-extrabold flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>List New Residence</span>
        </Link>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-estate space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Listings</span>
          <p className="text-3xl font-extrabold text-slate-900">{agentProperties.length}</p>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-estate space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Received Leads</span>
          <p className="text-3xl font-extrabold text-blue-600">{inquiries.length}</p>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-estate space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Portfolio Impressions</span>
          <p className="text-3xl font-extrabold text-emerald-600">14,280</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-8 text-sm font-bold">
        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'listings' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
          }`}
        >
          My Listed Residences ({agentProperties.length})
        </button>
        <button
          onClick={() => setActiveTab('leads')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'leads' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
          }`}
        >
          Inquiries Inbox ({inquiries.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'listings' ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-estate overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4">Property</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {agentProperties.map(p => (
                  <tr key={p._id || p.id} className="hover:bg-slate-50">
                    <td className="p-4 flex items-center gap-3">
                      <img src={p.images[0]} alt={p.title} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <p className="font-bold text-slate-900 line-clamp-1">{p.title}</p>
                        <p className="text-[11px] text-slate-400">{p.city}</p>
                      </div>
                    </td>
                    <td className="p-4">{p.type}</td>
                    <td className="p-4 text-slate-900 font-extrabold">${p.price.toLocaleString()}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase">
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        to={`/property/${p._id || p.id}`}
                        className="p-2 text-blue-600 hover:text-blue-800"
                        title="View details"
                      >
                        <Eye className="w-4 h-4 inline" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map(inq => (
            <div key={inq._id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-estate space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{inq.propertyTitle}</span>
                <span className="text-[11px] text-slate-400">{new Date(inq.createdAt || Date.now()).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-4">
                <User className="w-5 h-5 text-slate-400" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{inq.name}</h4>
                  <p className="text-xs text-slate-500">{inq.email} • {inq.phone}</p>
                </div>
              </div>
              <p className="text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                "{inq.message}"
              </p>
              {inq.tourDate && (
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 p-3 rounded-xl">
                  <Calendar className="w-4 h-4" />
                  <span>Requested Private Tour Date: {inq.tourDate} at {inq.tourTime}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Building2, Sparkles, Check, X, Trash2, Eye } from 'lucide-react';
import adminApi from '../services/adminApi';

export default function PropertyModeration() {
  const [properties, setProperties] = useState([]);

  const fetchProperties = () => {
    adminApi.get('/properties').then(res => setProperties(res.data)).catch(() => {});
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleToggleFeature = async (id, currentFeatured) => {
    await adminApi.patch(`/admin/properties/${id}`, { featured: !currentFeatured });
    fetchProperties();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this property listing from the platform?')) {
      await adminApi.delete(`/properties/${id}`);
      fetchProperties();
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-serif">Property Moderation & Management</h2>
          <p className="text-xs text-slate-500">Review, feature, or remove luxury property listings</p>
        </div>
        <span className="text-xs font-bold px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full border border-purple-200">
          Total Listings: {properties.length}
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Property</th>
                <th className="p-4">City</th>
                <th className="p-4">Price</th>
                <th className="p-4">Agent</th>
                <th className="p-4">Featured</th>
                <th className="p-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold">
              {properties.map(p => (
                <tr key={p._id || p.id} className="hover:bg-slate-50">
                  <td className="p-4 flex items-center gap-3">
                    <img src={p.images[0]} alt={p.title} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <p className="font-bold text-slate-900 line-clamp-1">{p.title}</p>
                      <p className="text-[11px] text-slate-400">{p.type} • {p.status}</p>
                    </div>
                  </td>
                  <td className="p-4">{p.city}</td>
                  <td className="p-4 text-slate-900 font-extrabold">${p.price.toLocaleString()}</td>
                  <td className="p-4">{p.agent?.name || 'Victoria Vance'}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleFeature(p._id || p.id, p.featured)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${
                        p.featured ? 'bg-amber-400 text-slate-900' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <Sparkles className="w-3 h-3" />
                      {p.featured ? 'Featured' : 'Standard'}
                    </button>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <a
                      href={`http://localhost:3000/property/${p._id || p.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-blue-600 hover:text-blue-800"
                      title="View live page"
                    >
                      <Eye className="w-4 h-4 inline" />
                    </a>
                    <button
                      onClick={() => handleDelete(p._id || p.id)}
                      className="p-2 text-rose-600 hover:text-rose-800"
                      title="Delete property"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

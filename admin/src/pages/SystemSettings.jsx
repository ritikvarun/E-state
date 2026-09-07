import React, { useState } from 'react';
import { Settings, ShieldCheck, Database, Cloud, Key, Check } from 'lucide-react';

export default function SystemSettings() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-8">
      
      <div>
        <h2 className="text-xl font-bold text-slate-900 font-serif">Platform System Settings</h2>
        <p className="text-xs text-slate-500">Configure global platform commission rates and Cloudinary / Atlas API keys</p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl text-xs font-bold flex items-center gap-2 border border-emerald-200">
          <Check className="w-4 h-4" />
          <span>System configuration updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 text-xs font-semibold text-slate-700">
        
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Database className="w-4 h-4 text-purple-600" />
            <span>MongoDB Atlas Cluster Connection</span>
          </h3>
          <div>
            <label className="block mb-1">Database Connection String (MONGO_URI)</label>
            <input
              type="text"
              defaultValue="mongodb+srv://estatepro:estatepro123@cluster0.example.mongodb.net/estatepro"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Cloud className="w-4 h-4 text-blue-600" />
            <span>Cloudinary Image CDN Keys</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Cloud Name</label>
              <input
                type="text"
                defaultValue="estatepro-cdn"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900"
              />
            </div>
            <div>
              <label className="block mb-1">API Key</label>
              <input
                type="text"
                defaultValue="84920491823901"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Key className="w-4 h-4 text-emerald-600" />
            <span>Platform Commission Rate</span>
          </h3>
          <div>
            <label className="block mb-1">EstatePro Standard Brokerage Commission (%)</label>
            <input
              type="number"
              defaultValue="2.5"
              step="0.1"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl transition-colors shadow-md"
        >
          Save Platform System Settings
        </button>

      </form>

    </div>
  );
}

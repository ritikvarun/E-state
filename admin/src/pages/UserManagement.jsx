import React, { useState, useEffect } from 'react';
import { User, ShieldCheck, Check, Ban, Mail, Phone } from 'lucide-react';
import adminApi from '../services/adminApi';

export default function UserManagement() {
  const [users, setUsers] = useState([
    {
      _id: 'usr_admin',
      name: 'EstatePro Administrator',
      email: 'admin@estatepro.com',
      role: 'admin',
      phone: '+1 (800) 555-REAL',
      agency: 'EstatePro Corporate HQ',
      status: 'active'
    },
    {
      _id: 'usr_agent1',
      name: 'Victoria Vance',
      email: 'victoria@estatepro.com',
      role: 'agent',
      phone: '+1 (212) 555-0199',
      agency: 'EstatePro Private Client Group',
      status: 'active'
    },
    {
      _id: 'usr_agent2',
      name: 'Julian Mercer',
      email: 'julian@estatepro.com',
      role: 'agent',
      phone: '+1 (310) 555-0144',
      agency: 'EstatePro Luxury West Coast',
      status: 'active'
    },
    {
      _id: 'usr_buyer',
      name: 'David Miller',
      email: 'buyer@estatepro.com',
      role: 'user',
      phone: '+1 (415) 555-0182',
      agency: 'Individual Buyer',
      status: 'active'
    }
  ]);

  useEffect(() => {
    adminApi.get('/admin/users').then(res => setUsers(res.data)).catch(() => {});
  }, []);

  const handleRoleChange = async (id, newRole) => {
    await adminApi.patch(`/admin/users/${id}`, { role: newRole });
    setUsers(users.map(u => u._id === id ? { ...u, role: newRole } : u));
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'active' ? 'suspended' : 'active';
    await adminApi.patch(`/admin/users/${id}`, { status: nextStatus });
    setUsers(users.map(u => u._id === id ? { ...u, status: nextStatus } : u));
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-serif">User & Agent Account Administration</h2>
          <p className="text-xs text-slate-500">Elevate user roles or update account status</p>
        </div>
        <span className="text-xs font-bold px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
          Total Accounts: {users.length}
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">User Details</th>
                <th className="p-4">Brokerage / Agency</th>
                <th className="p-4">Account Role</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold">
              {users.map(u => (
                <tr key={u._id} className="hover:bg-slate-50">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                      alt={u.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-200"
                    />
                    <div>
                      <p className="font-bold text-slate-900">{u.name}</p>
                      <p className="text-[11px] text-slate-400">{u.email} • {u.phone}</p>
                    </div>
                  </td>
                  <td className="p-4">{u.agency || 'EstatePro Realty'}</td>
                  <td className="p-4">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold capitalize text-slate-800"
                    >
                      <option value="user">Buyer / Client</option>
                      <option value="agent">Licensed Agent</option>
                      <option value="admin">Super Admin</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      u.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {u.status || 'active'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleStatusToggle(u._id, u.status || 'active')}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        u.status === 'active'
                          ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      {u.status === 'active' ? 'Suspend Account' : 'Reactivate'}
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

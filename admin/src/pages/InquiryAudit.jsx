import React, { useState, useEffect } from 'react';
import { Mail, Calendar, Clock, User, Phone, CheckCircle } from 'lucide-react';
import adminApi from '../services/adminApi';

export default function InquiryAudit() {
  const [inquiries, setInquiries] = useState([
    {
      _id: 'inq_1',
      propertyTitle: "The Penthouse at Billionaires' Row",
      name: 'Harrison Brooks',
      email: 'harrison.b@capitalmgt.com',
      phone: '+1 (212) 998-3310',
      message: 'I would like to request a private showing for the penthouse on Tuesday afternoon.',
      tourDate: '2026-08-15',
      tourTime: '14:00',
      createdAt: '2026-08-09T09:30:00Z'
    },
    {
      _id: 'inq_2',
      propertyTitle: 'Bel Air Modern Minimalist Architectural Estate',
      name: 'Sophia Chen',
      email: 'sophia@innovatevc.io',
      phone: '+1 (310) 882-9011',
      message: 'Interested in receiving the full disclosure package and architectural floor plans.',
      tourDate: '2026-08-18',
      tourTime: '11:00',
      createdAt: '2026-08-08T18:15:00Z'
    }
  ]);

  useEffect(() => {
    adminApi.get('/inquiries').then(res => setInquiries(res.data)).catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-serif">Platform-Wide Inquiry Audit Log</h2>
          <p className="text-xs text-slate-500">Monitor lead flow across all agents and luxury properties</p>
        </div>
        <span className="text-xs font-bold px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full border border-amber-200">
          Total Inquiries: {inquiries.length}
        </span>
      </div>

      <div className="space-y-4">
        {inquiries.map(inq => (
          <div key={inq._id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">{inq.propertyTitle}</span>
              <span className="text-[11px] text-slate-400">{new Date(inq.createdAt || Date.now()).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-3">
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
                <span>Private Showing Scheduled: {inq.tourDate} at {inq.tourTime}</span>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

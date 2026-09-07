import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import api from '../services/api';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/inquiries', {
        propertyId: 'general_contact',
        propertyTitle: 'General Concierge Inquiry',
        name,
        email,
        phone,
        message,
        agentEmail: 'concierge@estatepro.com'
      });
    } catch (err) {}
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Private Advisory</span>
        <h1 className="text-4xl font-extrabold text-slate-900 font-serif">Contact EstatePro Concierge</h1>
        <p className="text-sm text-slate-600">Our senior luxury real estate advisors are available around the clock.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        <div className="bg-slate-900 rounded-3xl p-8 text-white space-y-6">
          <h3 className="text-xl font-bold font-serif">Global Headquarters</h3>
          <div className="space-y-4 text-xs text-slate-300">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>432 Park Avenue, Suite 2400, New York, NY 10022</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-400 shrink-0" />
              <span>+1 (800) 555-ESTATE</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-400 shrink-0" />
              <span>concierge@estatepro.com</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-estate">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
              <h3 className="text-2xl font-bold text-slate-900">Message Received</h3>
              <p className="text-xs text-slate-600">A senior private client manager will contact you within 2 business hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal"
                    placeholder="Lord Harrison"
                  />
                </div>
                <div>
                  <label className="block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal"
                    placeholder="harrison@capital.com"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal"
                  placeholder="+1 (212) 555-0199"
                />
              </div>

              <div>
                <label className="block mb-1">Inquiry Message</label>
                <textarea
                  rows="4"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal"
                  placeholder="Inquiring about portfolio acquisition in New York and Miami..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-md"
              >
                Send Concierge Message
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import DashboardOverview from './pages/DashboardOverview';
import PropertyModeration from './pages/PropertyModeration';
import UserManagement from './pages/UserManagement';
import InquiryAudit from './pages/InquiryAudit';
import SystemSettings from './pages/SystemSettings';

function AdminLayout() {
  const location = useLocation();

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/': return 'Executive Overview';
      case '/properties': return 'Property Moderation';
      case '/users': return 'User & Agent Accounts';
      case '/inquiries': return 'Inquiries Audit';
      case '/settings': return 'System Settings';
      default: return 'Admin Control Center';
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title={getPageTitle(location.pathname)} />
        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/properties" element={<PropertyModeration />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/inquiries" element={<InquiryAudit />} />
            <Route path="/settings" element={<SystemSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AdminLayout />
    </Router>
  );
}

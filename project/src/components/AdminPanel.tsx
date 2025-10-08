import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Image,
  MessageSquare,
  DollarSign,
  Shield,
  Menu,
  X
} from 'lucide-react';
import Dashboard from './Dashboard';
import UserManagement from './UserManagement';
import ContentModeration from './ContentModeration';
import ChatMonitoring from './ChatMonitoring';
import Subscriptions from './Subscriptions';
import VerificationManagement from './VerificationManagement';

type MenuItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType;
};

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, component: Dashboard },
  { id: 'users', label: 'User Management', icon: <Users className="w-5 h-5" />, component: UserManagement },
  { id: 'content', label: 'Content Moderation', icon: <Image className="w-5 h-5" />, component: ContentModeration },
  { id: 'chat', label: 'Chat Monitoring', icon: <MessageSquare className="w-5 h-5" />, component: ChatMonitoring },
  { id: 'subscriptions', label: 'Subscriptions', icon: <DollarSign className="w-5 h-5" />, component: Subscriptions },
  { id: 'verification', label: 'Verifications', icon: <Shield className="w-5 h-5" />, component: VerificationManagement }
];

export default function AdminPanel() {
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const ActiveComponent = menuItems.find(item => item.id === activeMenuItem)?.component || Dashboard;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white transition-transform duration-300 ease-in-out flex flex-col`}
      >
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2.5 rounded-xl">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Bondly Admin</h1>
                <p className="text-xs text-slate-400">Management Panel</p>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveMenuItem(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeMenuItem === item.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-slate-200 px-6 py-4 lg:hidden">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-slate-600 hover:text-slate-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              <span className="font-bold text-slate-900">Bondly Admin</span>
            </div>
            <div className="w-6"></div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8">
          <ActiveComponent />
        </main>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

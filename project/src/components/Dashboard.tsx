import React from 'react';
import { Users, UserCheck, UserX, Activity, Link2, DollarSign, TrendingUp, Shield } from 'lucide-react';
import { mockDashboardStats } from '../data/mockData';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color: string;
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mb-2">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 font-medium flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              {trend}
            </p>
          )}
        </div>
        <div className={`${color} p-3 rounded-xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const stats = mockDashboardStats;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-600 mt-1">Real-time platform metrics and insights</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-700">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          icon={<Users className="w-6 h-6 text-blue-600" />}
          trend="+12% this week"
          color="bg-blue-100"
        />
        <StatCard
          title="Active Today"
          value={stats.activeUsersDaily.toLocaleString()}
          icon={<Activity className="w-6 h-6 text-green-600" />}
          trend="+8% vs yesterday"
          color="bg-green-100"
        />
        <StatCard
          title="Total Connections"
          value={stats.totalConnections.toLocaleString()}
          icon={<Link2 className="w-6 h-6 text-purple-600" />}
          trend="+15% this week"
          color="bg-purple-100"
        />
        <StatCard
          title="Daily Revenue"
          value={`₹${stats.revenueDaily.toLocaleString()}`}
          icon={<DollarSign className="w-6 h-6 text-emerald-600" />}
          trend="+23% this week"
          color="bg-emerald-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            User Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserCheck className="w-5 h-5 text-green-600" />
                <span className="text-slate-700">Verified Users</span>
              </div>
              <span className="font-semibold text-slate-900">{stats.verifiedUsers.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserX className="w-5 h-5 text-red-600" />
                <span className="text-slate-700">Blocked Users</span>
              </div>
              <span className="font-semibold text-slate-900">{stats.blockedUsers.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-blue-600" />
                <span className="text-slate-700">Active Weekly</span>
              </div>
              <span className="font-semibold text-slate-900">{stats.activeUsersWeekly.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Gender Distribution</h3>
          <div className="space-y-3">
            {[
              { label: 'Male', value: stats.genderDistribution.male, color: 'bg-blue-500', percentage: (stats.genderDistribution.male / stats.totalUsers * 100).toFixed(1) },
              { label: 'Female', value: stats.genderDistribution.female, color: 'bg-pink-500', percentage: (stats.genderDistribution.female / stats.totalUsers * 100).toFixed(1) },
              { label: 'Other', value: stats.genderDistribution.other, color: 'bg-purple-500', percentage: (stats.genderDistribution.other / stats.totalUsers * 100).toFixed(1) }
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                  <span className="text-sm font-semibold text-slate-900">{item.value.toLocaleString()} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Weekly Revenue</h3>
          <p className="text-4xl font-bold mb-2">₹{stats.revenueWeekly.toLocaleString()}</p>
          <p className="text-blue-100 text-sm mb-4">Last 7 days performance</p>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center justify-between text-sm">
              <span>Avg. per day</span>
              <span className="font-semibold">₹{(stats.revenueWeekly / 7).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="bg-white hover:bg-slate-50 text-slate-700 px-4 py-3 rounded-lg font-medium transition-colors border border-slate-200 text-left">
            View Pending Content
          </button>
          <button className="bg-white hover:bg-slate-50 text-slate-700 px-4 py-3 rounded-lg font-medium transition-colors border border-slate-200 text-left">
            Review Flagged Chats
          </button>
          <button className="bg-white hover:bg-slate-50 text-slate-700 px-4 py-3 rounded-lg font-medium transition-colors border border-slate-200 text-left">
            Check Verifications
          </button>
          <button className="bg-white hover:bg-slate-50 text-slate-700 px-4 py-3 rounded-lg font-medium transition-colors border border-slate-200 text-left">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
}

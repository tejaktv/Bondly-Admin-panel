import React, { useState } from 'react';
import { Search, Filter, UserCheck, UserX, Edit, Trash2, RotateCcw, Shield, Coins } from 'lucide-react';
import { mockUsers } from '../data/mockData';
import { User } from '../types';

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleBlockUser = (userId: string) => {
    setUsers(users.map(u =>
      u.id === userId ? { ...u, status: u.status === 'blocked' ? 'active' : 'blocked' } : u
    ));
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(users.map(u =>
        u.id === userId ? { ...u, status: 'deleted' } : u
      ));
      setSelectedUser(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700 border-green-200',
      blocked: 'bg-red-100 text-red-700 border-red-200',
      deleted: 'bg-slate-100 text-slate-700 border-slate-200'
    };
    return styles[status as keyof typeof styles] || styles.active;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
        <p className="text-slate-600 mt-1">Manage user accounts, permissions, and status</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-11 pr-8 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
                <option value="deleted">Deleted</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedUser(user)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                      {user.name}
                      {user.isVerified && <Shield className="w-4 h-4 text-blue-600" />}
                    </h3>
                    <p className="text-sm text-slate-600">{user.email}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center">
                  <p className="text-xs text-slate-600">Followers</p>
                  <p className="font-semibold text-slate-900">{user.followersCount}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-600">Following</p>
                  <p className="font-semibold text-slate-900">{user.followingCount}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-600">Connections</p>
                  <p className="font-semibold text-slate-900">{user.connectionsCount}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(user.status)}`}>
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <Coins className="w-4 h-4" />
                  <span className="font-medium">{user.coins}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No users found matching your criteria</p>
          </div>
        )}
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedUser(null)}>
          <div className="bg-white rounded-xl max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  {selectedUser.name}
                  {selectedUser.isVerified && <Shield className="w-6 h-6 text-blue-600" />}
                </h2>
                <p className="text-slate-600">{selectedUser.email}</p>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Gender</p>
                <p className="font-semibold text-slate-900 capitalize">{selectedUser.gender}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Status</p>
                <p className="font-semibold text-slate-900 capitalize">{selectedUser.status}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Coins</p>
                <p className="font-semibold text-slate-900">{selectedUser.coins}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Verified</p>
                <p className="font-semibold text-slate-900">{selectedUser.isVerified ? 'Yes' : 'No'}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Join Date</p>
                <p className="font-semibold text-slate-900">{new Date(selectedUser.joinDate).toLocaleDateString()}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Last Active</p>
                <p className="font-semibold text-slate-900">{new Date(selectedUser.lastActive).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
              <button
                onClick={() => handleBlockUser(selectedUser.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-colors ${
                  selectedUser.status === 'blocked'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {selectedUser.status === 'blocked' ? (
                  <>
                    <UserCheck className="w-4 h-4" />
                    Unblock User
                  </>
                ) : (
                  <>
                    <UserX className="w-4 h-4" />
                    Block User
                  </>
                )}
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
                <RotateCcw className="w-4 h-4" />
                Reset Password
              </button>
              <button
                onClick={() => handleDeleteUser(selectedUser.id)}
                className="px-4 py-2.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

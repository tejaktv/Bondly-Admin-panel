import React, { useState } from 'react';
import { DollarSign, TrendingUp, CreditCard, Coins, Plus, Edit, Trash2, Link } from 'lucide-react';
import { mockSubscriptions, mockCoinTransactions, mockCoinPackages } from '../data/mockData';
import { CoinPackage } from '../types';

export default function Subscriptions() {
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'coins' | 'packages'>('subscriptions');
  const [subscriptions] = useState(mockSubscriptions);
  const [transactions] = useState(mockCoinTransactions);
  const [coinPackages, setCoinPackages] = useState<CoinPackage[]>(mockCoinPackages);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<CoinPackage | null>(null);

  const totalRevenue = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);
  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active').length;
  const totalCoinsDistributed = transactions.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Subscriptions & Wallet</h1>
        <p className="text-slate-600 mt-1">Manage subscriptions, payments, and coin economy</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold">₹{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 mb-1">Active Subscriptions</p>
              <p className="text-3xl font-bold">{activeSubscriptions}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 mb-1">Coins Distributed</p>
              <p className="text-3xl font-bold">{totalCoinsDistributed.toLocaleString()}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <Coins className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="border-b border-slate-200 p-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'subscriptions'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Subscriptions
            </button>
            <button
              onClick={() => setActiveTab('coins')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'coins'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Coin Transactions
            </button>
            <button
              onClick={() => setActiveTab('packages')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'packages'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Coin Packages
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'subscriptions' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Subscription History</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Export Data
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">User</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Plan</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Payment ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.map((sub) => (
                      <tr key={sub.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-slate-900">{sub.userName}</p>
                            <p className="text-sm text-slate-600">{sub.userId}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-900">{sub.planName}</td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-green-600">₹{sub.amount}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-mono text-sm text-slate-600">{sub.paymentId}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            sub.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : sub.status === 'expired'
                              ? 'bg-slate-100 text-slate-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            <p className="text-slate-900">{new Date(sub.startDate).toLocaleDateString()}</p>
                            <p className="text-slate-600">to {new Date(sub.endDate).toLocaleDateString()}</p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === 'coins' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Coin Transaction History</h2>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Add Bonus Coins
                </button>
              </div>

              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${
                          tx.transactionType === 'earned' || tx.transactionType === 'bonus'
                            ? 'bg-green-100'
                            : tx.transactionType === 'refund'
                            ? 'bg-blue-100'
                            : 'bg-red-100'
                        }`}>
                          {tx.transactionType === 'spent' ? (
                            <TrendingUp className="w-5 h-5 text-red-600 rotate-180" />
                          ) : (
                            <TrendingUp className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-slate-900">{tx.userName}</p>
                            <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                              tx.transactionType === 'earned'
                                ? 'bg-green-100 text-green-700'
                                : tx.transactionType === 'spent'
                                ? 'bg-red-100 text-red-700'
                                : tx.transactionType === 'bonus'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {tx.transactionType.charAt(0).toUpperCase() + tx.transactionType.slice(1)}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600">{tx.description}</p>
                          {tx.createdBy && (
                            <p className="text-xs text-slate-500 mt-1">Created by admin</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${
                          tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount}
                        </p>
                        <p className="text-sm text-slate-600">{new Date(tx.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === 'packages' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Subscription & Coin Packages</h2>
                  <p className="text-slate-600 mt-1">Manage coin packages and track revenue</p>
                </div>
                <button 
                  onClick={() => setShowPackageModal(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Package
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coinPackages.map((pkg) => (
                  <div key={pkg.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative">
                    {/* Status badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-1">
                      {pkg.isPopular && (
                        <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
                          Popular
                        </span>
                      )}
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        pkg.status === 'active' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {pkg.status}
                      </span>
                    </div>

                    {/* Package icon */}
                    <div className="mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Link className="w-5 h-5 text-purple-600" />
                      </div>
                    </div>

                    {/* Package details */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{pkg.name}</h3>
                      <div className="text-2xl font-bold text-purple-600 mb-1">{pkg.coinAmount.toLocaleString()} Coins</div>
                      <div className="text-slate-900 font-medium">₹{pkg.price}</div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <ul className="space-y-2">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-purple-600">
                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setEditingPackage(pkg);
                          setShowPackageModal(true);
                        }}
                        className="flex-1 bg-white border border-slate-300 text-slate-700 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this package?')) {
                            setCoinPackages(prev => prev.filter(p => p.id !== pkg.id));
                          }
                        }}
                        className="flex-1 bg-white border border-red-300 text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Package Modal */}
      {showPackageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              {editingPackage ? 'Edit Package' : 'Add New Package'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Package Name</label>
                <input 
                  type="text" 
                  defaultValue={editingPackage?.name || ''}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter package name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Coin Amount</label>
                <input 
                  type="number" 
                  defaultValue={editingPackage?.coinAmount || ''}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter coin amount"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  defaultValue={editingPackage?.price || ''}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter price"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Features (one per line)</label>
                <textarea 
                  defaultValue={editingPackage?.features.join('\n') || ''}
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter features, one per line"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="isPopular"
                  defaultChecked={editingPackage?.isPopular || false}
                  className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="isPopular" className="text-sm font-medium text-slate-700">Mark as Popular</label>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => {
                  setShowPackageModal(false);
                  setEditingPackage(null);
                }}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // Here you would typically save the package
                  // For now, we'll just close the modal
                  setShowPackageModal(false);
                  setEditingPackage(null);
                }}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                {editingPackage ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

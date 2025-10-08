import React, { useState } from 'react';
import { Image, Filter, CheckCircle, XCircle, Flag, AlertTriangle } from 'lucide-react';
import { mockContentItems } from '../data/mockData';
import { ContentItem } from '../types';

export default function ContentModeration() {
  const [content, setContent] = useState<ContentItem[]>(mockContentItems);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  const filteredContent = content.filter(item =>
    statusFilter === 'all' || item.status === statusFilter
  );

  const handleAction = (itemId: string, action: 'approved' | 'rejected' | 'flagged') => {
    setContent(content.map(item =>
      item.id === itemId
        ? { ...item, status: action, reviewedBy: 'admin-1', reviewedAt: new Date().toISOString() }
        : item
    ));
    setSelectedItem(null);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      approved: 'bg-green-100 text-green-700 border-green-200',
      rejected: 'bg-red-100 text-red-700 border-red-200',
      flagged: 'bg-orange-100 text-orange-700 border-orange-200'
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  const getContentTypeBadge = (type: string) => {
    const styles = {
      profile_picture: 'bg-blue-100 text-blue-700',
      post_media: 'bg-purple-100 text-purple-700',
      room_media: 'bg-pink-100 text-pink-700'
    };
    return styles[type as keyof typeof styles];
  };

  const pendingCount = content.filter(item => item.status === 'pending').length;
  const flaggedCount = content.filter(item => item.status === 'flagged').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Content Moderation</h1>
        <p className="text-slate-600 mt-1">Review and moderate user-generated content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-700 mb-1">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-900">{pendingCount}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-yellow-700" />
            </div>
          </div>
        </div>

        <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-700 mb-1">Flagged Content</p>
              <p className="text-3xl font-bold text-orange-900">{flaggedCount}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-xl">
              <Flag className="w-6 h-6 text-orange-700" />
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700 mb-1">Total Reviewed</p>
              <p className="text-3xl font-bold text-green-900">{content.length - pendingCount}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-700" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900">Content Queue</h2>
          <div className="flex gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-11 pr-8 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="flagged">Flagged</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContent.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <div className="aspect-video bg-slate-200 relative">
                <img
                  src={item.contentUrl}
                  alt="Content preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-900">{item.userName}</span>
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getContentTypeBadge(item.contentType)}`}>
                    {item.contentType.replace('_', ' ')}
                  </span>
                </div>
                {item.reportReason && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-2 mb-2">
                    <p className="text-xs text-red-700 font-medium">Report: {item.reportReason}</p>
                  </div>
                )}
                <p className="text-sm text-slate-600">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <Image className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-500">No content items found</p>
          </div>
        )}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedItem(null)}>
          <div className="bg-white rounded-xl max-w-4xl w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Review Content</h2>
                <p className="text-slate-600">Submitted by {selectedItem.userName}</p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <img
                  src={selectedItem.contentUrl}
                  alt="Content preview"
                  className="w-full rounded-lg border border-slate-200"
                />
              </div>

              <div className="space-y-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Content Type</p>
                  <p className="font-semibold text-slate-900 capitalize">{selectedItem.contentType.replace('_', ' ')}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Status</p>
                  <p className="font-semibold text-slate-900 capitalize">{selectedItem.status}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Submitted</p>
                  <p className="font-semibold text-slate-900">{new Date(selectedItem.createdAt).toLocaleString()}</p>
                </div>
                {selectedItem.reportReason && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-700 font-medium mb-1">Report Reason</p>
                    <p className="text-red-900">{selectedItem.reportReason}</p>
                  </div>
                )}
                {selectedItem.reviewedAt && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-700 font-medium mb-1">Reviewed</p>
                    <p className="text-blue-900">{new Date(selectedItem.reviewedAt).toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleAction(selectedItem.id, 'approved')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="w-5 h-5" />
                Approve Content
              </button>
              <button
                onClick={() => handleAction(selectedItem.id, 'flagged')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Flag className="w-5 h-5" />
                Flag for Review
              </button>
              <button
                onClick={() => handleAction(selectedItem.id, 'rejected')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <XCircle className="w-5 h-5" />
                Reject Content
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

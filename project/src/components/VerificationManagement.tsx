import React, { useState } from 'react';
import { Shield, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { mockVerificationRequests } from '../data/mockData';
import { VerificationRequest } from '../types';

export default function VerificationManagement() {
  const [requests, setRequests] = useState<VerificationRequest[]>(mockVerificationRequests);
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleApprove = (requestId: string) => {
    setRequests(requests.map(req =>
      req.id === requestId
        ? { ...req, status: 'approved', reviewedBy: 'admin-1', reviewedAt: new Date().toISOString() }
        : req
    ));
    setSelectedRequest(null);
  };

  const handleReject = (requestId: string) => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }
    setRequests(requests.map(req =>
      req.id === requestId
        ? { ...req, status: 'rejected', reviewedBy: 'admin-1', reviewedAt: new Date().toISOString(), rejectionReason }
        : req
    ));
    setSelectedRequest(null);
    setRejectionReason('');
  };

  const pendingCount = requests.filter(req => req.status === 'pending').length;
  const approvedCount = requests.filter(req => req.status === 'approved').length;
  const rejectedCount = requests.filter(req => req.status === 'rejected').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Verification Management</h1>
        <p className="text-slate-600 mt-1">Review and approve user verification requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-700 mb-1">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-900">{pendingCount}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-xl">
              <Clock className="w-6 h-6 text-yellow-700" />
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700 mb-1">Approved</p>
              <p className="text-3xl font-bold text-green-900">{approvedCount}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-700" />
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-700 mb-1">Rejected</p>
              <p className="text-3xl font-bold text-red-900">{rejectedCount}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-xl">
              <XCircle className="w-6 h-6 text-red-700" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">Verification Requests</h2>

        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${
                request.status === 'pending'
                  ? 'bg-yellow-50 border-yellow-200'
                  : request.status === 'approved'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}
              onClick={() => setSelectedRequest(request)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {request.userName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                      {request.userName}
                      {request.status === 'approved' && <Shield className="w-4 h-4 text-green-600" />}
                    </h3>
                    <p className="text-sm text-slate-600">{request.userEmail}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Submitted {new Date(request.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  request.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                    : request.status === 'approved'
                    ? 'bg-green-100 text-green-700 border-green-200'
                    : 'bg-red-100 text-red-700 border-red-200'
                }`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>

              {request.rejectionReason && (
                <div className="mt-3 bg-red-100 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-700 font-medium mb-1">Rejection Reason:</p>
                  <p className="text-sm text-red-900">{request.rejectionReason}</p>
                </div>
              )}

              {request.reviewedAt && (
                <p className="text-xs text-slate-500 mt-2">
                  Reviewed {new Date(request.reviewedAt).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>

        {requests.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-500">No verification requests</p>
          </div>
        )}
      </div>

      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedRequest(null)}>
          <div className="bg-white rounded-xl max-w-5xl w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Verification Review</h2>
                <p className="text-slate-600">{selectedRequest.userName} - {selectedRequest.userEmail}</p>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">ID Photo</h3>
                <div className="relative aspect-video bg-slate-100 rounded-lg overflow-hidden border-2 border-slate-200">
                  <img
                    src={selectedRequest.idPhotoUrl}
                    alt="ID verification"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-700 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Verify ID matches the name and selfie
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Selfie Photo</h3>
                <div className="relative aspect-video bg-slate-100 rounded-lg overflow-hidden border-2 border-slate-200">
                  <img
                    src={selectedRequest.selfieUrl}
                    alt="Selfie verification"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-700 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Confirm selfie matches ID photo
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-slate-900 mb-3">Verification Checklist</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 text-slate-700">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                  <span>ID photo is clear and readable</span>
                </label>
                <label className="flex items-center gap-3 text-slate-700">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                  <span>Selfie photo is clear and shows the person's face</span>
                </label>
                <label className="flex items-center gap-3 text-slate-700">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                  <span>Selfie matches the ID photo</span>
                </label>
                <label className="flex items-center gap-3 text-slate-700">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                  <span>Name on ID matches the user's profile name</span>
                </label>
              </div>
            </div>

            {selectedRequest.status === 'pending' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Rejection Reason (if rejecting)
                  </label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Provide a clear reason for rejection..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(selectedRequest.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Approve Verification
                  </button>
                  <button
                    onClick={() => handleReject(selectedRequest.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    <XCircle className="w-5 h-5" />
                    Reject Verification
                  </button>
                </div>
              </div>
            )}

            {selectedRequest.status !== 'pending' && (
              <div className={`p-4 rounded-lg border ${
                selectedRequest.status === 'approved'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}>
                <p className="font-semibold text-slate-900 mb-2">
                  {selectedRequest.status === 'approved' ? 'Verification Approved' : 'Verification Rejected'}
                </p>
                <p className="text-sm text-slate-600">
                  Reviewed by {selectedRequest.reviewedBy} on {new Date(selectedRequest.reviewedAt!).toLocaleString()}
                </p>
                {selectedRequest.rejectionReason && (
                  <p className="text-sm text-red-700 mt-2">Reason: {selectedRequest.rejectionReason}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

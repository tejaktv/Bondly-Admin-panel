import React, { useState } from 'react';
import { MessageSquare, Flag, CheckCircle, Ban, AlertTriangle } from 'lucide-react';
import { mockChatLogs } from '../data/mockData';
import { ChatLog } from '../types';

export default function ChatMonitoring() {
  const [chats, setChats] = useState<ChatLog[]>(mockChatLogs);
  const [filter, setFilter] = useState<string>('all');
  const [selectedChat, setSelectedChat] = useState<ChatLog | null>(null);

  const filteredChats = chats.filter(chat => {
    if (filter === 'flagged') return chat.isFlagged;
    if (filter === 'unreviewed') return !chat.reviewed;
    return true;
  });

  const handleReviewChat = (chatId: string, action: string) => {
    setChats(chats.map(chat =>
      chat.id === chatId
        ? { ...chat, reviewed: true, reviewedBy: 'admin-1', actionTaken: action }
        : chat
    ));
    setSelectedChat(null);
  };

  const flaggedCount = chats.filter(chat => chat.isFlagged).length;
  const unreviewedCount = chats.filter(chat => !chat.reviewed).length;
  const totalChats = chats.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Chat & Messaging</h1>
        <p className="text-slate-600 mt-1">Monitor conversations and flagged messages</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700 mb-1">Total Messages</p>
              <p className="text-3xl font-bold text-blue-900">{totalChats}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <MessageSquare className="w-6 h-6 text-blue-700" />
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-700 mb-1">Flagged Messages</p>
              <p className="text-3xl font-bold text-red-900">{flaggedCount}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-xl">
              <Flag className="w-6 h-6 text-red-700" />
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-700 mb-1">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-900">{unreviewedCount}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-yellow-700" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900">Message Logs</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('flagged')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'flagged'
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Flagged
            </button>
            <button
              onClick={() => setFilter('unreviewed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'unreviewed'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Unreviewed
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${
                chat.isFlagged
                  ? 'bg-red-50 border-red-200'
                  : chat.reviewed
                  ? 'bg-green-50 border-green-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {chat.senderName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{chat.senderName}</p>
                      <p className="text-xs text-slate-600">to {chat.receiverName}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {chat.isFlagged && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full border border-red-200 flex items-center gap-1">
                      <Flag className="w-3 h-3" />
                      Flagged
                    </span>
                  )}
                  {chat.reviewed && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full border border-green-200 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Reviewed
                    </span>
                  )}
                </div>
              </div>

              <p className="text-slate-900 mb-2">{chat.message}</p>

              {chat.flagReason && (
                <div className="bg-red-100 border border-red-200 rounded-md p-2 mb-2">
                  <p className="text-xs text-red-700 font-medium">Reason: {chat.flagReason}</p>
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>{new Date(chat.createdAt).toLocaleString()}</span>
                {chat.actionTaken && (
                  <span className="text-green-700 font-medium">Action: {chat.actionTaken}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredChats.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-500">No messages found</p>
          </div>
        )}
      </div>

      {selectedChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedChat(null)}>
          <div className="bg-white rounded-xl max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Message Review</h2>
                <p className="text-slate-600">From {selectedChat.senderName} to {selectedChat.receiverName}</p>
              </div>
              <button
                onClick={() => setSelectedChat(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-2">Message Content</p>
                <p className="text-lg text-slate-900">{selectedChat.message}</p>
              </div>

              {selectedChat.flagReason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-700 font-medium mb-1">Flag Reason</p>
                  <p className="text-red-900">{selectedChat.flagReason}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Sent</p>
                  <p className="font-semibold text-slate-900">{new Date(selectedChat.createdAt).toLocaleString()}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Status</p>
                  <p className="font-semibold text-slate-900">{selectedChat.reviewed ? 'Reviewed' : 'Pending'}</p>
                </div>
              </div>

              {selectedChat.actionTaken && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-700 font-medium mb-1">Action Taken</p>
                  <p className="text-green-900">{selectedChat.actionTaken}</p>
                </div>
              )}
            </div>

            {!selectedChat.reviewed && (
              <div className="space-y-3">
                <p className="font-semibold text-slate-900">Take Action:</p>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleReviewChat(selectedChat.id, 'Approved - No violation')}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReviewChat(selectedChat.id, 'Message deleted')}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Ban className="w-4 h-4" />
                    Delete
                  </button>
                  <button
                    onClick={() => handleReviewChat(selectedChat.id, 'User warned')}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Warn User
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

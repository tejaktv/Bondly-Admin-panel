import { User, ContentItem, ChatLog, Subscription, CoinTransaction, VerificationRequest, DashboardStats, CoinPackage } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    gender: 'female',
    status: 'active',
    isVerified: true,
    coins: 1250,
    followersCount: 342,
    followingCount: 198,
    connectionsCount: 45,
    joinDate: '2024-01-15T10:30:00Z',
    lastActive: '2024-10-08T09:15:00Z'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    gender: 'male',
    status: 'active',
    isVerified: true,
    coins: 2100,
    followersCount: 521,
    followingCount: 310,
    connectionsCount: 78,
    joinDate: '2024-02-20T14:20:00Z',
    lastActive: '2024-10-08T08:45:00Z'
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    email: 'emma.r@example.com',
    gender: 'female',
    status: 'blocked',
    isVerified: false,
    coins: 450,
    followersCount: 89,
    followingCount: 67,
    connectionsCount: 12,
    joinDate: '2024-03-10T11:00:00Z',
    lastActive: '2024-10-05T16:30:00Z'
  },
  {
    id: '4',
    name: 'Alex Turner',
    email: 'alex.turner@example.com',
    gender: 'other',
    status: 'active',
    isVerified: true,
    coins: 890,
    followersCount: 234,
    followingCount: 156,
    connectionsCount: 34,
    joinDate: '2024-04-05T09:15:00Z',
    lastActive: '2024-10-08T07:20:00Z'
  },
  {
    id: '5',
    name: 'David Park',
    email: 'david.park@example.com',
    gender: 'male',
    status: 'active',
    isVerified: false,
    coins: 120,
    followersCount: 45,
    followingCount: 89,
    connectionsCount: 8,
    joinDate: '2024-09-28T13:45:00Z',
    lastActive: '2024-10-08T10:00:00Z'
  }
];

export const mockContentItems: ContentItem[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Sarah Johnson',
    contentType: 'profile_picture',
    contentUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    status: 'pending',
    createdAt: '2024-10-08T09:30:00Z'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Michael Chen',
    contentType: 'post_media',
    contentUrl: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
    status: 'flagged',
    reportedBy: '3',
    reportReason: 'Inappropriate content',
    createdAt: '2024-10-08T08:15:00Z'
  },
  {
    id: '3',
    userId: '4',
    userName: 'Alex Turner',
    contentType: 'room_media',
    contentUrl: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg',
    status: 'approved',
    reviewedBy: 'admin-1',
    reviewedAt: '2024-10-08T07:45:00Z',
    createdAt: '2024-10-08T07:30:00Z'
  },
  {
    id: '4',
    userId: '5',
    userName: 'David Park',
    contentType: 'profile_picture',
    contentUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    status: 'pending',
    createdAt: '2024-10-08T10:00:00Z'
  }
];

export const mockChatLogs: ChatLog[] = [
  {
    id: '1',
    senderId: '1',
    senderName: 'Sarah Johnson',
    receiverId: '2',
    receiverName: 'Michael Chen',
    message: 'Hey! How are you doing today?',
    isFlagged: false,
    reviewed: true,
    createdAt: '2024-10-08T09:00:00Z'
  },
  {
    id: '2',
    senderId: '3',
    senderName: 'Emma Rodriguez',
    receiverId: '1',
    receiverName: 'Sarah Johnson',
    message: 'This is an offensive message example',
    isFlagged: true,
    flagReason: 'Abusive language',
    reportedBy: '1',
    reviewed: false,
    createdAt: '2024-10-08T08:30:00Z'
  },
  {
    id: '3',
    senderId: '4',
    senderName: 'Alex Turner',
    receiverId: '2',
    receiverName: 'Michael Chen',
    message: 'Would love to connect and chat more!',
    isFlagged: false,
    reviewed: true,
    reviewedBy: 'admin-1',
    actionTaken: 'Approved',
    createdAt: '2024-10-08T07:45:00Z'
  }
];

export const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Michael Chen',
    planName: 'Premium Monthly',
    amount: 29.99,
    paymentId: 'PAY-123456789',
    status: 'active',
    startDate: '2024-10-01T00:00:00Z',
    endDate: '2024-11-01T00:00:00Z',
    createdAt: '2024-10-01T10:30:00Z'
  },
  {
    id: '2',
    userId: '1',
    userName: 'Sarah Johnson',
    planName: 'Premium Annual',
    amount: 299.99,
    paymentId: 'PAY-987654321',
    status: 'active',
    startDate: '2024-09-15T00:00:00Z',
    endDate: '2025-09-15T00:00:00Z',
    createdAt: '2024-09-15T14:20:00Z'
  },
  {
    id: '3',
    userId: '3',
    userName: 'Emma Rodriguez',
    planName: 'Premium Monthly',
    amount: 29.99,
    paymentId: 'PAY-456789123',
    status: 'expired',
    startDate: '2024-08-01T00:00:00Z',
    endDate: '2024-09-01T00:00:00Z',
    createdAt: '2024-08-01T11:00:00Z'
  }
];

export const mockCoinTransactions: CoinTransaction[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Sarah Johnson',
    transactionType: 'earned',
    amount: 100,
    description: 'Daily login bonus',
    createdAt: '2024-10-08T00:00:00Z'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Michael Chen',
    transactionType: 'spent',
    amount: -50,
    description: 'Private room access',
    createdAt: '2024-10-08T09:15:00Z'
  },
  {
    id: '3',
    userId: '4',
    userName: 'Alex Turner',
    transactionType: 'bonus',
    amount: 200,
    description: 'Referral bonus',
    createdBy: 'admin-1',
    createdAt: '2024-10-08T08:30:00Z'
  },
  {
    id: '4',
    userId: '3',
    userName: 'Emma Rodriguez',
    transactionType: 'refund',
    amount: 75,
    description: 'Subscription refund',
    createdBy: 'admin-1',
    createdAt: '2024-10-07T16:00:00Z'
  }
];

export const mockVerificationRequests: VerificationRequest[] = [
  {
    id: '1',
    userId: '5',
    userName: 'David Park',
    userEmail: 'david.park@example.com',
    idPhotoUrl: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
    selfieUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    status: 'pending',
    createdAt: '2024-10-08T09:00:00Z'
  },
  {
    id: '2',
    userId: '1',
    userName: 'Sarah Johnson',
    userEmail: 'sarah.j@example.com',
    idPhotoUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    selfieUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    status: 'approved',
    reviewedBy: 'admin-1',
    reviewedAt: '2024-10-07T14:30:00Z',
    createdAt: '2024-10-07T10:00:00Z'
  },
  {
    id: '3',
    userId: '3',
    userName: 'Emma Rodriguez',
    userEmail: 'emma.r@example.com',
    idPhotoUrl: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg',
    selfieUrl: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg',
    status: 'rejected',
    reviewedBy: 'admin-1',
    reviewedAt: '2024-10-06T11:15:00Z',
    rejectionReason: 'ID photo unclear, please resubmit with better quality',
    createdAt: '2024-10-06T09:00:00Z'
  }
];

export const mockCoinPackages: CoinPackage[] = [
  {
    id: '1',
    name: 'Starter Pack',
    coinAmount: 100,
    price: 4.99,
    features: [
      'Basic features',
      'Standard support'
    ],
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Popular Pack',
    coinAmount: 500,
    price: 19.99,
    features: [
      'All basic features',
      'Priority support',
      'Bonus coins'
    ],
    status: 'active',
    isPopular: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Premium Pack',
    coinAmount: 1200,
    price: 39.99,
    features: [
      'All features',
      '24/7 support',
      'Exclusive badges',
      'Monthly bonus'
    ],
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalUsers: 12453,
  activeUsersDaily: 3421,
  activeUsersWeekly: 8932,
  totalConnections: 34521,
  blockedUsers: 342,
  verifiedUsers: 8934,
  revenueDaily: 2456.78,
  revenueWeekly: 18932.45,
  genderDistribution: {
    male: 5234,
    female: 6123,
    other: 1096
  }
};

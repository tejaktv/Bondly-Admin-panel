export interface User {
  id: string;
  name: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  status: 'active' | 'blocked' | 'deleted';
  isVerified: boolean;
  coins: number;
  followersCount: number;
  followingCount: number;
  connectionsCount: number;
  joinDate: string;
  lastActive: string;
}

export interface AdminUser {
  id: string;
  userId: string;
  role: 'super_admin' | 'moderator' | 'finance_admin';
  email: string;
  createdAt: string;
  lastLogin: string;
}

export interface ContentItem {
  id: string;
  userId: string;
  userName: string;
  contentType: 'profile_picture' | 'post_media' | 'room_media';
  contentUrl: string;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  reportedBy?: string;
  reportReason?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
}

export interface ChatLog {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  message: string;
  isFlagged: boolean;
  flagReason?: string;
  reportedBy?: string;
  reviewed: boolean;
  reviewedBy?: string;
  actionTaken?: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  userName: string;
  planName: string;
  amount: number;
  paymentId: string;
  status: 'active' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface CoinTransaction {
  id: string;
  userId: string;
  userName: string;
  transactionType: 'earned' | 'spent' | 'bonus' | 'refund';
  amount: number;
  description: string;
  createdBy?: string;
  createdAt: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  idPhotoUrl: string;
  selfieUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  createdAt: string;
}

export interface CoinPackage {
  id: string;
  name: string;
  coinAmount: number;
  price: number;
  features: string[];
  status: 'active' | 'inactive';
  isPopular?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsersDaily: number;
  activeUsersWeekly: number;
  totalConnections: number;
  blockedUsers: number;
  verifiedUsers: number;
  revenueDaily: number;
  revenueWeekly: number;
  genderDistribution: {
    male: number;
    female: number;
    other: number;
  };
}

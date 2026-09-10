export interface NotificationPayload {
  data: Notification[];
  metadata: Metadata;
}

export interface Metadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  link: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetNotificationsParams {
  page?: number;
  limit?: number;
}

export interface UnreadCountPayload {
  unreadCount: number;
}

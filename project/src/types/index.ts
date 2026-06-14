// Shared TypeScript interfaces for the Mantis platform

export interface Product {
  id: string;
  name: string;
  category?: string;
  description?: string;
  image?: string;
  docs?: number;
  status?: 'active' | 'draft' | 'archived';
  companyId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'manual' | 'diagram' | 'guide' | 'datasheet' | 'video';
  url?: string;
  fileSize?: string;
  productId: string;
  createdAt?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
  sessionId?: string;
}

export interface ChatSession {
  id: string;
  productId: string;
  title?: string;
  createdAt: string;
  updatedAt?: string;
  messageCount?: number;
}

export interface DashboardStats {
  totalProducts: number;
  totalDocuments: number;
  totalDiagnostics: number;
  activeUsers: number;
}

export interface AnalyticsCard {
  id: string;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: 'user' | 'admin' | 'company';
  createdAt?: string;
}

export interface MaintenanceRecord {
  id: string;
  productId: string;
  productName?: string;
  type: string;
  description: string;
  date: string;
  status: 'completed' | 'scheduled' | 'overdue';
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  productCount?: number;
  createdAt?: string;
}

export interface SuggestedPrompt {
  id: string;
  text: string;
  category?: string;
}

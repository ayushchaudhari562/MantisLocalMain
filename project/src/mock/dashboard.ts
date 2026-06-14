// Mock dashboard analytics for demo fallback
import type { DashboardStats, AnalyticsCard } from '../types';

export const mockDashboardStats: DashboardStats = {
  totalProducts: 24,
  totalDocuments: 156,
  totalDiagnostics: 1247,
  activeUsers: 89,
};

export const mockAnalyticsCards: AnalyticsCard[] = [
  { id: 'ac-001', label: 'Total Products', value: 24, change: '+3', trend: 'up' },
  { id: 'ac-002', label: 'Documents', value: 156, change: '+12', trend: 'up' },
  { id: 'ac-003', label: 'Diagnostics', value: '1.2K', change: '+8%', trend: 'up' },
  { id: 'ac-004', label: 'Active Users', value: 89, change: '+5', trend: 'up' },
];

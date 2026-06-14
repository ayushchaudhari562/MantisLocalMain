// Dashboard API service with mock fallback
import api from '../api';
import type { DashboardStats, AnalyticsCard, Product, Resource } from '../types';
import { mockDashboardStats, mockAnalyticsCards } from '../mock/dashboard';
import { mockProducts, mockResources } from '../mock/products';

export const dashboardService = {
  // Fetch dashboard summary stats
  async getStats(): Promise<DashboardStats> {
    try {
      const res = await api.get('/dashboard/stats');
      return res.data;
    } catch {
      return mockDashboardStats;
    }
  },

  // Fetch analytics cards
  async getAnalyticsCards(): Promise<AnalyticsCard[]> {
    try {
      const res = await api.get('/dashboard/analytics');
      return res.data;
    } catch {
      return mockAnalyticsCards;
    }
  },

  // Fetch company products for management
  async getCompanyProducts(): Promise<Product[]> {
    try {
      const res = await api.get('/dashboard/products');
      return res.data;
    } catch {
      return mockProducts;
    }
  },

  // Upload document for a product
  async uploadDocument(productId: string, file: File): Promise<Resource> {
    const formData = new FormData();
    formData.append('file', file);
    const res = await api.post(`/products/${productId}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  // Fetch documents for a product
  async getDocuments(productId: string): Promise<Resource[]> {
    try {
      const res = await api.get(`/products/${productId}/documents`);
      return res.data;
    } catch {
      return mockResources.filter((r) => r.productId === productId);
    }
  },

  // Delete a document
  async deleteDocument(documentId: string): Promise<void> {
    await api.delete(`/documents/${documentId}`);
  },
};

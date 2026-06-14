// User API service with mock fallback
import api from '../api';
import type { UserProfile, MaintenanceRecord, Product } from '../types';
import { mockUserProfile, mockMaintenanceRecords } from '../mock/profile';
import { mockProducts } from '../mock/products';

export const userService = {
  // Fetch user profile
  async getProfile(): Promise<UserProfile> {
    try {
      const res = await api.get('/user/profile');
      return res.data;
    } catch {
      return mockUserProfile;
    }
  },

  // Fetch user's owned products
  async getUserProducts(): Promise<Product[]> {
    try {
      const res = await api.get('/user/products');
      return res.data;
    } catch {
      return mockProducts.slice(0, 3);
    }
  },

  // Fetch maintenance records
  async getMaintenanceRecords(productId?: string): Promise<MaintenanceRecord[]> {
    try {
      const url = productId
        ? `/user/maintenance?productId=${productId}`
        : '/user/maintenance';
      const res = await api.get(url);
      return res.data;
    } catch {
      if (productId) {
        return mockMaintenanceRecords.filter((r) => r.productId === productId);
      }
      return mockMaintenanceRecords;
    }
  },
};

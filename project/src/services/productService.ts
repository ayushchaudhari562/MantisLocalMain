// Product API service with mock fallback
import api from '../api';
import type { Product, Resource } from '../types';
import { mockProducts, mockResources } from '../mock/products';

export const productService = {
  // Fetch all products with optional search
  async getAll(search?: string): Promise<Product[]> {
    try {
      const params = search ? { search } : {};
      const res = await api.get('/products', { params });
      return res.data;
    } catch {
      if (search) {
        const q = search.toLowerCase();
        return mockProducts.filter(
          (p) => p.name.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q)
        );
      }
      return mockProducts;
    }
  },

  // Fetch single product by ID
  async getById(id: string): Promise<Product | null> {
    try {
      const res = await api.get(`/products/${id}`);
      return res.data;
    } catch {
      return mockProducts.find((p) => p.id === id) || null;
    }
  },

  // Fetch resources for a product
  async getResources(productId: string): Promise<Resource[]> {
    try {
      const res = await api.get(`/products/${productId}/resources`);
      return res.data;
    } catch {
      return mockResources.filter((r) => r.productId === productId);
    }
  },

  // Create new product
  async create(data: Partial<Product>): Promise<Product> {
    const res = await api.post('/products', data);
    return res.data;
  },

  // Update existing product
  async update(id: string, data: Partial<Product>): Promise<Product> {
    const res = await api.put(`/products/${id}`, data);
    return res.data;
  },

  // Delete product
  async delete(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
  },
};

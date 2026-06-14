import api from '../api';

import type {
  Product,
  Resource,
} from '../types';

import {
  mockProducts,
  mockResources,
} from '../mock/products';

const productService = {

  // Get all products
  async getAll(
    search?: string
  ): Promise<Product[]> {

    try {

      const params = search
        ? { search }
        : {};

      const res = await api.get(
        '/products',
        { params }
      );

      // Backend returns:
      // { status: 'success', data: [...] }

      return res.data.data;

    } catch {

      if (search) {

        const q =
          search.toLowerCase();

        return mockProducts.filter(
          (p) =>
            p.name
              .toLowerCase()
              .includes(q) ||
            p.category
              ?.toLowerCase()
              .includes(q)
        );

      }

      return mockProducts;

    }

  },

  // Get product by ID
  async getById(
    id: string
  ): Promise<Product | null> {

    try {

      const res = await api.get(
        `/products/${id}`
      );

      return res.data.data;

    } catch {

      return (
        mockProducts.find(
          (p) => p.id === id
        ) || null
      );

    }

  },

  // Get product resources
  async getResources(
    productId: string
  ): Promise<Resource[]> {

    try {

      const res = await api.get(
        `/products/${productId}/resources`
      );

      return res.data.data;

    } catch {

      return mockResources.filter(
        (r) =>
          r.productId === productId
      );

    }

  },

  // Create product
  async create(
    data: Partial<Product>
  ): Promise<Product> {

    const res = await api.post(
      '/products',
      data
    );

    return res.data.data;

  },

  // Update product
  async update(
    id: string,
    data: Partial<Product>
  ): Promise<Product> {

    const res = await api.put(
      `/products/${id}`,
      data
    );

    return res.data.data;

  },

  // Delete product
  async delete(
    id: string
  ): Promise<void> {

    await api.delete(
      `/products/${id}`
    );

  },

};

export default productService;
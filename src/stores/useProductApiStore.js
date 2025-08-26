import { create } from 'zustand';
import api from '../lib/axios';

// Utility to build FormData for product with images and variants
const buildProductFormData = (productData) => {
  const formData = new FormData();

  // Basic fields
  formData.append('title', productData.title || '');
  formData.append('subtitle', productData.subtitle || '');
  formData.append('brand', productData.brand || '');
  if (productData.brandId) formData.append('brandId', productData.brandId);
  // Category names and IDs
  formData.append('primeCategory', productData.primeCategory || '');
  if (productData.primeCategoryId) formData.append('primeCategoryId', productData.primeCategoryId);
  formData.append('category', productData.category || '');
  if (productData.categoryId) formData.append('categoryId', productData.categoryId);
  formData.append('subcategory', productData.subcategory || '');
  if (productData.subcategoryId) formData.append('subcategoryId', productData.subcategoryId);
  formData.append('description', productData.description || '');
  formData.append('video', productData.video || '');
  formData.append('seoSlug', productData.seoSlug || '');
  formData.append('visibility', productData.visibility || 'public');
  formData.append('variantMode', productData.variantMode || 'single');
  formData.append('currency', productData.currency || 'usd');

  // Arrays / objects as JSON strings
  formData.append('tags', JSON.stringify(productData.tags || []));
  formData.append('variantTypes', JSON.stringify(productData.variantTypes || []));
  formData.append('enableSizeMatrix', JSON.stringify(!!productData.enableSizeMatrix));
  formData.append('sizes', JSON.stringify(productData.sizes || []));
  formData.append('variants', JSON.stringify(productData.variants || []));

  // Cover image index: backend could decide first image is cover; also send explicit field if available
  if (productData.images && productData.images.length > 0) {
    productData.images.forEach((imgWrapper, idx) => {
      const file = imgWrapper?.file;
      if (file) {
        formData.append('images', file, file.name);
      }
      // If variant-level image is needed, those reside in variants JSON; upload only gallery here
    });
  }

  return formData;
};

export const useProductApiStore = create((set, get) => ({
  products: [],
  stats: null,
  loading: false,
  error: null,

  // Create product
  createProduct: async (productData) => {
    try {
      set({ loading: true, error: null });
      const formData = buildProductFormData(productData);
      const response = await api.post('/product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Optionally push into products list
      set((state) => ({ products: [response.data?.data || response.data, ...state.products] }));
      return response.data;
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Get all products with optional query params
  getAllProducts: async (params = {}) => {
    try {
      set({ loading: true, error: null });
      const response = await api.get('/product', { params });
      const payload = response.data?.data || response.data || {};
      const list = Array.isArray(payload)
        ? payload
        : (Array.isArray(payload.products) ? payload.products : []);
      set({ products: list });
      return list;
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Get stats
  getProductStats: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get('/product/stats');
      const stats = response.data?.data || response.data;
      set({ stats });
      return stats;
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Get by id
  getProductById: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await api.get(`/product/${id}`);
      return response.data?.data || response.data;
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Update
  updateProduct: async (id, updates, { isMultipart = false } = {}) => {
    try {
      set({ loading: true, error: null });
      const payload = isMultipart ? buildProductFormData(updates) : updates;
      const config = isMultipart ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined;
      const response = await api.put(`/product/${id}`, payload, config);
      return response.data?.data || response.data;
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Delete
  deleteProduct: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await api.delete(`/product/${id}`);
      set((state) => ({ products: state.products.filter(p => (p._id || p.id) !== id) }));
      return response.data?.data || response.data;
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useProductApiStore;



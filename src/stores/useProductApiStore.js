import { create } from 'zustand';
import axiosInstance from '../lib/axios';

const buildProductFormData = (productData) => {
  const formData = new FormData();

  formData.append('title', productData.title || '');
  formData.append('subtitle', productData.subtitle || '');
  formData.append('brand', productData.brand || '');
  if (productData.brandId) formData.append('brandId', productData.brandId);
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

  formData.append('tags', JSON.stringify(productData.tags || []));
  formData.append('variantTypes', JSON.stringify(productData.variantTypes || []));
  formData.append('enableSizeMatrix', JSON.stringify(!!productData.enableSizeMatrix));
  formData.append('sizes', JSON.stringify(productData.sizes || []));
  formData.append('variants', JSON.stringify(productData.variants || []));

  if (productData.images && productData.images.length > 0) {
    productData.images.forEach((imgWrapper) => {
      const file = imgWrapper?.file;
      if (file) {
        formData.append('images', file, file.name);
      }
    });
  }

  if (productData.videos && productData.videos.length > 0) {
    const videosMeta = [];
    productData.videos.forEach((vidWrapper) => {
      const file = vidWrapper?.file;
      if (file) {
        formData.append('videos', file, file.name);
        videosMeta.push({ name: file.name, size: file.size, type: file.type });
      } else {
        videosMeta.push({ name: vidWrapper?.name, size: vidWrapper?.size });
      }
    });
    formData.append('videosMeta', JSON.stringify(videosMeta));
  } else {
    formData.append('videosMeta', JSON.stringify([]));
  }

  return formData;
};

export const useProductApiStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  createProduct: async (productData) => {
    try {
      set({ loading: true, error: null });
      const formData = buildProductFormData(productData);
      
      const response = await axiosInstance.post('/product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      set((state) => ({ products: [response.data?.data || response.data, ...state.products] }));
      return response.data;
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (id, updates, { isMultipart = false } = {}) => {
    try {
      set({ loading: true, error: null });
      const payload = isMultipart ? buildProductFormData(updates) : updates;
      const config = isMultipart ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined;
      
      let response;
      try {
        response = await axiosInstance.patch(`/product/${id}`, payload, config);
      } catch (patchError) {
        response = await axiosInstance.put(`/product/${id}`, payload, config);
      }
      
      set((state) => ({
        products: state.products.map(p => 
          (p._id || p.id) === id ? { ...p, ...response.data?.data || response.data } : p
        )
      }));
      return response.data?.data || response.data;
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  getProductById: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get(`/product/${id}`);
      return response.data?.data || response.data;
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  getAllProducts: async (params = {}) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get('/product', { params });
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

  getSellerProducts: async (sellerId) => {
    try {
      set({ loading: true, error: null });
      
      let actualSellerId = sellerId;
      if (!actualSellerId) {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        actualSellerId = userData.id || userData._id;
      }
      
      if (!actualSellerId) {
        throw new Error('Seller ID not found');
      }
      
      const response = await axiosInstance.get(`/product/seller/${actualSellerId}`);
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

  approveProduct: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.patch(`/product/${id}/approve`);
      set((state) => ({
        products: state.products.map(p => 
          (p._id || p.id) === id 
            ? { ...p, status: 'approved', rejectionReason: '' }
            : p
        )
      }));
      return response.data?.data || response.data;
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  rejectProduct: async (id, reason) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.patch(`/product/${id}/reject`, { rejectionReason: reason });
      set((state) => ({
        products: state.products.map(p => 
          (p._id || p.id) === id 
            ? { ...p, status: 'rejected', rejectionReason: reason }
            : p
        )
      }));
      return response.data?.data || response.data;
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.delete(`/product/${id}`);
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
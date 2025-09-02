import { create } from 'zustand';
import api from '../lib/axios';

const buildProductFormData = (productData) => {
  console.log('=== BUILDING FORM DATA ===');
  console.log('Input productData:', productData);
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

  console.log('=== FORM DATA BUILT SUCCESSFULLY ===');
  console.log('FormData entries count:', Array.from(formData.entries()).length);
  return formData;
};

export const useProductApiStore = create((set, get) => ({
  products: [],
  stats: null,
  loading: false,
  error: null,

  createProduct: async (productData) => {
    try {
      console.log('=== CREATE PRODUCT DEBUG ===');
      console.log('Create product data:', productData);
      
      set({ loading: true, error: null });
      const formData = buildProductFormData(productData);
      
      console.log('Create API endpoint:', '/product');
      console.log('Create FormData entries:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      
      const response = await api.post('/product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      console.log('Create API response:', response);
      set((state) => ({ products: [response.data?.data || response.data, ...state.products] }));
      return response.data;
    } catch (err) {
      console.error('=== CREATE PRODUCT ERROR ===');
      console.error('Create error:', err);
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

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

  updateProduct: async (id, updates, { isMultipart = false } = {}) => {
    try {
      console.log('=== API STORE UPDATE PRODUCT ===');
      console.log('Product ID:', id);
      console.log('Updates object:', updates);
      console.log('Is multipart:', isMultipart);
      
      set({ loading: true, error: null });
      const payload = isMultipart ? buildProductFormData(updates) : updates;
      const config = isMultipart ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined;
      
      console.log('API endpoint:', `/product/${id}`);
      console.log('Request config:', config);
      console.log('Payload type:', isMultipart ? 'FormData' : 'JSON');
      
      if (isMultipart) {
        console.log('FormData entries:');
        for (let [key, value] of payload.entries()) {
          console.log(`${key}:`, value);
        }
      }
      
      // Try PATCH first (most common for updates), then PUT
      let response;
      try {
        console.log('Trying PATCH /product/' + id);
        response = await api.patch(`/product/${id}`, payload, config);
        console.log('PATCH successful!');
      } catch (patchError) {
        console.warn('PATCH failed, trying PUT:', patchError.response?.status);
        console.log('Trying PUT /product/' + id);
        response = await api.put(`/product/${id}`, payload, config);
        console.log('PUT successful!');
      }
      console.log('Update API response:', response);
      return response.data?.data || response.data;
    } catch (err) {
      console.error('=== API STORE UPDATE ERROR ===');
      console.error('Error in updateProduct:', err);
      console.error('Error response:', err?.response);
      console.error('Error response data:', err?.response?.data);
      console.error('Error status:', err?.response?.status);
      
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

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



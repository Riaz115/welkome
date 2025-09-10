import { create } from 'zustand';
import axiosInstance from 'lib/axios';

const useBannerApiStore = create((set, get) => ({
  banners: [],
  currentBanner: null,
  loading: false,
  error: null,

  getAllBanners: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/banners', { params });
      console.log('Banner API Response:', response.data);
      const banners = response.data.data.banners || [];
      set({ banners, loading: false });
      return banners;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch banners', loading: false });
      throw error;
    }
  },

  getBannerById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/banners/${id}`);
      const banner = response.data.data.banner || response.data.data;
      set({ currentBanner: banner, loading: false });
      return banner;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch banner', loading: false });
      throw error;
    }
  },

  createBanner: async (bannerData) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      
      Object.keys(bannerData).forEach(key => {
        if (key === 'image' && bannerData[key] instanceof File) {
          formData.append('image', bannerData[key]);
        } else if (Array.isArray(bannerData[key])) {
          bannerData[key].forEach(item => formData.append(`${key}[]`, item));
        } else if (bannerData[key] !== null && bannerData[key] !== undefined) {
          formData.append(key, bannerData[key]);
        }
      });

      const response = await axiosInstance.post('/banners', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const newBanner = response.data.data.banner || response.data.data;
      set(state => ({ 
        banners: [newBanner, ...state.banners], 
        loading: false 
      }));
      return newBanner;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to create banner', loading: false });
      throw error;
    }
  },

  updateBanner: async (id, bannerData) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      
      Object.keys(bannerData).forEach(key => {
        if (key === 'image' && bannerData[key] instanceof File) {
          formData.append('image', bannerData[key]);
        } else if (Array.isArray(bannerData[key])) {
          bannerData[key].forEach(item => formData.append(`${key}[]`, item));
        } else if (bannerData[key] !== null && bannerData[key] !== undefined) {
          formData.append(key, bannerData[key]);
        }
      });

      const response = await axiosInstance.patch(`/banners/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const updatedBanner = response.data.data.banner || response.data.data;
      set(state => ({
        banners: state.banners.map(banner => 
          banner._id === id ? updatedBanner : banner
        ),
        currentBanner: state.currentBanner?._id === id ? updatedBanner : state.currentBanner,
        loading: false
      }));
      return updatedBanner;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to update banner', loading: false });
      throw error;
    }
  },

  deleteBanner: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/banners/${id}`);
      set(state => ({
        banners: state.banners.filter(banner => banner._id !== id),
        currentBanner: state.currentBanner?._id === id ? null : state.currentBanner,
        loading: false
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to delete banner', loading: false });
      throw error;
    }
  },

  toggleBannerStatus: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.patch(`/banners/${id}/toggle`);
      const updatedBanner = response.data.data.banner || response.data.data;
      set(state => ({
        banners: state.banners.map(banner => 
          banner._id === id ? updatedBanner : banner
        ),
        currentBanner: state.currentBanner?._id === id ? updatedBanner : state.currentBanner,
        loading: false
      }));
      return updatedBanner;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to toggle banner status', loading: false });
      throw error;
    }
  },

  getActiveBanners: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/banners/active', { params });
      const banners = response.data.data.banners || response.data.data || [];
      set({ loading: false });
      return banners;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch active banners', loading: false });
      throw error;
    }
  },

  incrementBannerClick: async (id) => {
    try {
      await axiosInstance.post(`/banners/${id}/click`);
    } catch (error) {
      console.warn('Failed to increment banner click count:', error);
    }
  },

  clearError: () => set({ error: null }),
  clearCurrentBanner: () => set({ currentBanner: null }),
}));

export default useBannerApiStore;

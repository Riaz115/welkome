import { create } from 'zustand';
import axiosInstance from 'lib/axios';

const useFlashSaleApiStore = create((set, get) => ({
  flashSales: [],
  currentFlashSale: null,
  loading: false,
  error: null,

  getAllFlashSales: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/flashsales', { params });
      console.log('Flash Sale API Response:', response.data);
      const flashSales = response.data.data.flashSales || [];
      set({ flashSales, loading: false });
      return flashSales;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch flash sales', loading: false });
      throw error;
    }
  },

  getFlashSaleById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/flashsales/${id}`);
      const flashSale = response.data.data.flashSale || response.data.data;
      set({ currentFlashSale: flashSale, loading: false });
      return flashSale;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch flash sale', loading: false });
      throw error;
    }
  },

  createFlashSale: async (flashSaleData) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      
      Object.keys(flashSaleData).forEach(key => {
        if (key === 'image' && flashSaleData[key] instanceof File) {
          formData.append('image', flashSaleData[key]);
        } else if (Array.isArray(flashSaleData[key])) {
          flashSaleData[key].forEach(item => formData.append(`${key}[]`, item));
        } else if (flashSaleData[key] !== null && flashSaleData[key] !== undefined) {
          formData.append(key, flashSaleData[key]);
        }
      });

      const response = await axiosInstance.post('/flashsales', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const newFlashSale = response.data.data.flashSale || response.data.data;
      set(state => ({ 
        flashSales: [newFlashSale, ...state.flashSales], 
        loading: false 
      }));
      return newFlashSale;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to create flash sale', loading: false });
      throw error;
    }
  },

  updateFlashSale: async (id, flashSaleData) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      
      Object.keys(flashSaleData).forEach(key => {
        if (key === 'image' && flashSaleData[key] instanceof File) {
          formData.append('image', flashSaleData[key]);
        } else if (Array.isArray(flashSaleData[key])) {
          flashSaleData[key].forEach(item => formData.append(`${key}[]`, item));
        } else if (flashSaleData[key] !== null && flashSaleData[key] !== undefined) {
          formData.append(key, flashSaleData[key]);
        }
      });

      const response = await axiosInstance.patch(`/flashsales/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const updatedFlashSale = response.data.data.flashSale || response.data.data;
      set(state => ({
        flashSales: state.flashSales.map(flashSale => 
          flashSale._id === id ? updatedFlashSale : flashSale
        ),
        currentFlashSale: state.currentFlashSale?._id === id ? updatedFlashSale : state.currentFlashSale,
        loading: false
      }));
      return updatedFlashSale;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to update flash sale', loading: false });
      throw error;
    }
  },

  deleteFlashSale: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/flashsales/${id}`);
      set(state => ({
        flashSales: state.flashSales.filter(flashSale => flashSale._id !== id),
        currentFlashSale: state.currentFlashSale?._id === id ? null : state.currentFlashSale,
        loading: false
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to delete flash sale', loading: false });
      throw error;
    }
  },

  toggleFlashSaleStatus: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.patch(`/flashsales/${id}/toggle`);
      const updatedFlashSale = response.data.data.flashSale || response.data.data;
      set(state => ({
        flashSales: state.flashSales.map(flashSale => 
          flashSale._id === id ? updatedFlashSale : flashSale
        ),
        currentFlashSale: state.currentFlashSale?._id === id ? updatedFlashSale : state.currentFlashSale,
        loading: false
      }));
      return updatedFlashSale;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to toggle flash sale status', loading: false });
      throw error;
    }
  },

  getActiveFlashSales: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/flashsales/active', { params });
      const flashSales = response.data.data.flashSales || response.data.data || [];
      set({ loading: false });
      return flashSales;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch active flash sales', loading: false });
      throw error;
    }
  },

  getUpcomingFlashSales: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/flashsales/upcoming', { params });
      const flashSales = response.data.data.flashSales || response.data.data || [];
      set({ loading: false });
      return flashSales;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch upcoming flash sales', loading: false });
      throw error;
    }
  },

  validateFlashSale: async (flashSaleId, orderAmount) => {
    try {
      const response = await axiosInstance.post('/flashsales/validate', {
        flashSaleId,
        orderAmount
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  incrementFlashSaleClick: async (id) => {
    try {
      await axiosInstance.post(`/flashsales/${id}/click`);
    } catch (error) {
      console.warn('Failed to increment flash sale click count:', error);
    }
  },

  clearError: () => set({ error: null }),
  clearCurrentFlashSale: () => set({ currentFlashSale: null }),
}));

export default useFlashSaleApiStore;

import { create } from 'zustand';
import { toast } from 'react-toastify';
import axiosInstance from '../lib/axios';

const useSellerApiStore = create((set, get) => ({
  sellers: [],
  loading: false,
  error: null,

  // Create seller registration
  createSellerRegistration: async (sellerData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/seller/become-seller', sellerData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      set({ loading: false });
      return response.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || 'Failed to submit seller registration';
      set({ loading: false, error: errorMsg });
      throw error;
    }
  },

  // Get all sellers
  getSellers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/seller');
      // Handle nested data structure: response.data.data.sellers
      const sellersData = response.data?.data?.sellers || response.data?.sellers || response.data?.data || [];
      set({ sellers: Array.isArray(sellersData) ? sellersData : [], loading: false });
      return response.data;
    } catch (error) {
      // Handle 403 errors silently - don't set error state for permission issues
      if (error?.response?.status === 403) {
        set({ sellers: [], loading: false, error: null });
        throw error;
      }
      
      const errorMsg = error?.response?.data?.message || 'Failed to fetch sellers';
      set({ loading: false, error: errorMsg });
      throw error;
    }
  },

  // Get seller by ID
  getSellerById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`seller/${id}`);
      set({ loading: false });
      return response.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || 'Failed to fetch seller details';
      set({ loading: false, error: errorMsg });
      throw error;
    }
  },

  // Approve seller
  approveSeller: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.patch(`seller/${id}/approve`);
      
      // Update the seller in the local state
      const { sellers } = get();
      const updatedSellers = sellers.map(seller => 
        seller._id === id 
          ? { ...seller, verificationStatus: 'approved' }
          : seller
      );
      set({ sellers: updatedSellers, loading: false });
      
      return response.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || 'Failed to approve seller';
      set({ loading: false, error: errorMsg });
      throw error;
    }
  },

  // Reject seller
  rejectSeller: async (id, rejectionReason) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.patch(`seller/${id}/reject`, {
        rejectionReason
      });
      
      // Update the seller in the local state
      const { sellers } = get();
      const updatedSellers = sellers.map(seller => 
        seller._id === id 
          ? { ...seller, verificationStatus: 'rejected', rejectionReason }
          : seller
      );
      set({ sellers: updatedSellers, loading: false });
      
      return response.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || 'Failed to reject seller';
      set({ loading: false, error: errorMsg });
      throw error;
    }
  },

  // Update seller verification status (legacy function - keeping for backward compatibility)
  updateSellerVerification: async (id, status, rejectionReason = '') => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.patch(`seller/${id}/verification`, {
        verificationStatus: status,
        rejectionReason
      });
      
      // Update the seller in the local state
      const { sellers } = get();
      const updatedSellers = sellers.map(seller => 
        seller._id === id 
          ? { ...seller, verificationStatus: status, rejectionReason }
          : seller
      );
      set({ sellers: updatedSellers, loading: false });
      
      return response.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || 'Failed to update verification status';
      set({ loading: false, error: errorMsg });
      throw error;
    }
  },

  // Delete seller
  deleteSeller: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.delete(`seller/${id}`);
      
      // Remove seller from local state
      const { sellers } = get();
      const updatedSellers = sellers.filter(seller => seller._id !== id);
      set({ sellers: updatedSellers, loading: false });
      
      return response.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || 'Failed to delete seller';
      set({ loading: false, error: errorMsg });
      throw error;
    }
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Reset store
  reset: () => set({ sellers: [], loading: false, error: null }),
}));

export default useSellerApiStore;

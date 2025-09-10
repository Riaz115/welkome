import { create } from 'zustand';
import axiosInstance from '../lib/axios';

export const useCouponApiStore = create((set, get) => ({
  coupons: [],
  couponStats: null,
  loading: false,
  error: null,

  // Get all coupons (admin only)
  getAllCoupons: async (params = {}) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get('/coupons', { params });
      console.log('API Response for getAllCoupons:', response.data); // Debug log
      const payload = response.data?.data || response.data || {};
      const coupons = Array.isArray(payload.coupons) ? payload.coupons : [];
      console.log('Extracted coupons:', coupons); // Debug log
      set({ coupons });
      return { coupons, pagination: payload.pagination };
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Get coupon by ID
  getCouponById: async (couponId) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get(`/coupons/${couponId}`);
      console.log('API Response for getCouponById:', response.data); // Debug log
      return response.data?.data || response.data;
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Create new coupon (admin only)
  createCoupon: async (couponData) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.post('/coupons', couponData);
      const newCoupon = response.data?.data || response.data;
      
      // Add the new coupon to the beginning of the coupons list
      set((state) => ({
        coupons: [newCoupon, ...state.coupons]
      }));
      
      return newCoupon;
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Update coupon (admin only)
  updateCoupon: async (couponId, updateData) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.patch(`/coupons/${couponId}`, updateData);
      const updatedCoupon = response.data?.data || response.data;
      
      // Update the coupon in the local state
      set((state) => ({
        coupons: state.coupons.map(coupon => 
          coupon._id === couponId 
            ? { ...coupon, ...updatedCoupon }
            : coupon
        )
      }));
      
      return updatedCoupon;
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Delete coupon (admin only)
  deleteCoupon: async (couponId) => {
    try {
      set({ loading: true, error: null });
      await axiosInstance.delete(`/coupons/${couponId}`);
      
      // Remove the coupon from the local state
      set((state) => ({
        coupons: state.coupons.filter(coupon => coupon._id !== couponId)
      }));
      
      return true;
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Toggle coupon status (admin only)
  toggleCouponStatus: async (couponId) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.patch(`/coupons/${couponId}/toggle`);
      const updatedCoupon = response.data?.data || response.data;
      
      // Update the coupon in the local state
      set((state) => ({
        coupons: state.coupons.map(coupon => 
          coupon._id === couponId 
            ? { ...coupon, isActive: updatedCoupon.isActive }
            : coupon
        )
      }));
      
      return updatedCoupon;
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Validate coupon code
  validateCoupon: async (couponCode, orderAmount = 0) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.post('/coupons/validate', {
        couponCode,
        orderAmount
      });
      return response.data?.data || response.data;
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Get available coupons for user
  getAvailableCoupons: async (orderAmount = 0) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get('/coupons/available', {
        params: { orderAmount }
      });
      return response.data?.data || response.data;
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Clear coupons from state
  clearCoupons: () => {
    set({ coupons: [], couponStats: null });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  }
}));

export default useCouponApiStore;

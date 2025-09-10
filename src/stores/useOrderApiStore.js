import { create } from 'zustand';
import axiosInstance from '../lib/axios';

export const useOrderApiStore = create((set, get) => ({
  orders: [],
  orderStats: null,
  loading: false,
  error: null,

  // Get all orders (admin only)
  getAllOrders: async (params = {}) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get('/orders/admin/all-orders', { params });
      const payload = response.data?.data || response.data || {};
      const orders = Array.isArray(payload.orders) ? payload.orders : [];
      set({ orders });
      return { orders, pagination: payload.pagination };
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Get user's own orders
  getUserOrders: async (params = {}) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get('/orders/my-orders', { params });
      const payload = response.data?.data || response.data || {};
      const orders = Array.isArray(payload.orders) ? payload.orders : [];
      set({ orders });
      return { orders, pagination: payload.pagination };
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    try {
      set({ loading: true, error: null });
      
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      // Make request with explicit Bearer token
      const response = await axiosInstance.get(`/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data?.data || response.data;
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Update order status (admin only)
  updateOrderStatus: async (orderId, status, notes = '') => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.patch(`/orders/${orderId}/status`, {
        status,
        notes
      });
      
      // Update the order in the local state
      set((state) => ({
        orders: state.orders.map(order => 
          order._id === orderId 
            ? { ...order, status, notes: notes || order.notes }
            : order
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

  // Update payment status (admin only)
  updatePaymentStatus: async (orderId, paymentStatus, transactionId = '') => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.patch(`/orders/${orderId}/payment-status`, {
        paymentStatus,
        transactionId
      });
      
      // Update the order in the local state
      set((state) => ({
        orders: state.orders.map(order => 
          order._id === orderId 
            ? { 
                ...order, 
                paymentDetails: { 
                  ...order.paymentDetails, 
                  paymentStatus,
                  transactionId: transactionId || order.paymentDetails.transactionId
                }
              }
            : order
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

  // Cancel order
  cancelOrder: async (orderId, reason = '') => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.patch(`/orders/${orderId}/cancel`, {
        reason
      });
      
      // Update the order in the local state
      set((state) => ({
        orders: state.orders.map(order => 
          order._id === orderId 
            ? { 
                ...order, 
                status: 'cancelled',
                cancellationReason: reason,
                cancelledAt: new Date().toISOString()
              }
            : order
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

  // Get order statistics (admin only)
  getOrderStats: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get('/orders/admin/stats');
      const stats = response.data?.data || response.data;
      set({ orderStats: stats });
      return stats;
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Create order from cart
  createOrderFromCart: async (orderData) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.post('/orders/cart/checkout', orderData);
      const newOrder = response.data?.data || response.data;
      
      // Add the new order to the beginning of the orders list
      set((state) => ({
        orders: [newOrder, ...state.orders]
      }));
      
      return newOrder;
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Create direct order
  createDirectOrder: async (orderData) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.post('/orders/direct-buy', orderData);
      const newOrder = response.data?.data || response.data;
      
      // Add the new order to the beginning of the orders list
      set((state) => ({
        orders: [newOrder, ...state.orders]
      }));
      
      return newOrder;
    } catch (err) {
      set({ error: err?.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Clear orders from state
  clearOrders: () => {
    set({ orders: [], orderStats: null });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  }
}));

export default useOrderApiStore;

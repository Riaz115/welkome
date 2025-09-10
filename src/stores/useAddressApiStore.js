import { create } from 'zustand';
import axiosInstance from 'lib/axios';

const useAddressApiStore = create((set, get) => ({
  addresses: [],
  currentAddress: null,
  loading: false,
  error: null,

  getAllAddresses: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/addresses', { params });
      const addresses = response.data.data.addresses || [];
      set({ addresses, loading: false });
      return addresses;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch addresses', loading: false });
      throw error;
    }
  },

  getAddressById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/addresses/${id}`);
      const address = response.data.data;
      set({ currentAddress: address, loading: false });
      return address;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch address', loading: false });
      throw error;
    }
  },

  createAddress: async (addressData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/addresses', addressData);
      const newAddress = response.data.data;
      set(state => ({ 
        addresses: [newAddress, ...state.addresses], 
        loading: false 
      }));
      return newAddress;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to create address', loading: false });
      throw error;
    }
  },

  updateAddress: async (id, addressData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put(`/addresses/${id}`, addressData);
      const updatedAddress = response.data.data;
      set(state => ({
        addresses: state.addresses.map(address => 
          address._id === id ? updatedAddress : address
        ),
        currentAddress: state.currentAddress?._id === id ? updatedAddress : state.currentAddress,
        loading: false
      }));
      return updatedAddress;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to update address', loading: false });
      throw error;
    }
  },

  deleteAddress: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/addresses/${id}`);
      set(state => ({
        addresses: state.addresses.filter(address => address._id !== id),
        currentAddress: state.currentAddress?._id === id ? null : state.currentAddress,
        loading: false
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to delete address', loading: false });
      throw error;
    }
  },

  setDefaultAddress: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.patch(`/addresses/${id}/default`);
      const updatedAddress = response.data.data;
      set(state => ({
        addresses: state.addresses.map(address => 
          address._id === id ? { ...address, isDefault: true } : { ...address, isDefault: false }
        ),
        currentAddress: state.currentAddress?._id === id ? updatedAddress : state.currentAddress,
        loading: false
      }));
      return updatedAddress;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to set default address', loading: false });
      throw error;
    }
  },

  getDefaultAddress: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/addresses/default');
      const defaultAddress = response.data.data;
      set({ loading: false });
      return defaultAddress;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch default address', loading: false });
      throw error;
    }
  },

  getAddressStats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/addresses/stats');
      const stats = response.data.data;
      set({ loading: false });
      return stats;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch address statistics', loading: false });
      throw error;
    }
  },

  searchAddressesByLocation: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/addresses/search', { params });
      const addresses = response.data.data || [];
      set({ loading: false });
      return addresses;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to search addresses', loading: false });
      throw error;
    }
  },

  bulkUpdateAddresses: async (operations) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/addresses/bulk', { operations });
      const results = response.data.data;
      set({ loading: false });
      return results;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to perform bulk operations', loading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
  clearCurrentAddress: () => set({ currentAddress: null }),
}));

export default useAddressApiStore;

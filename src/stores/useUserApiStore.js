import { create } from 'zustand';
import axiosInstance from '../lib/axios';
import { toast } from 'react-toastify';

export const useUserApiStore = create((set, get) => ({
  users: [],
  loading: false,
  error: null,

  getAllUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/user/all');
      const users = response.data?.data || response.data || [];
      set({ users: Array.isArray(users) ? users : [], loading: false });
      return response.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || 'Failed to fetch users';
      set({ loading: false, error: errorMsg });
      return { data: [] };
    }
  },

  blockUser: async (userId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.patch(`/user/${userId}/block`);
      
      const { users } = get();
      const updatedUsers = users.map(user => 
        user._id === userId || user.id === userId 
          ? { ...user, status: 'Blocked', isBlocked: true }
          : user
      );
      set({ users: updatedUsers, loading: false });
      
      toast.success('User blocked successfully');
      return response.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || 'Failed to block user';
      set({ loading: false, error: errorMsg });
      return null;
    }
  },

  unblockUser: async (userId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.patch(`/user/${userId}/unblock`);
      
      const { users } = get();
      const updatedUsers = users.map(user => 
        user._id === userId || user.id === userId 
          ? { ...user, status: 'Active', isBlocked: false }
          : user
      );
      set({ users: updatedUsers, loading: false });
      
      toast.success('User unblocked successfully');
      return response.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || 'Failed to unblock user';
      set({ loading: false, error: errorMsg });
      return null;
    }
  },

  getUserById: async (userId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/user/${userId}`);
      set({ loading: false });
      return response.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || 'Failed to fetch user details';
      set({ loading: false, error: errorMsg });
      return null;
    }
  },

  clearError: () => set({ error: null }),

  reset: () => set({ users: [], loading: false, error: null }),
}));

export default useUserApiStore;

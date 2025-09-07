import axios from 'lib/axios';
import { create } from 'zustand';
import { toast } from 'react-toastify';




export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  isInitialized: false,

  login: async ({ email, password, navigate }) => {
    set({ loading: true });
    try {
      const res = await axios.post('/auth/admin-seller/login', {
        emailOrPhone: email,
        password,
      });

      const token = res.data.data.token;
      const user = res.data.data.user;

      // Set axios auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      set({ user, loading: false });
      navigate('/admin/dashboards/welkome');
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || 'Login failed');
    }
  },

  initialize: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      // Set axios auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      set({ user: JSON.parse(user), isInitialized: true });
    } else {
      set({ isInitialized: true });
    }
  },

  logout: (navigate) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Remove axios auth header
    delete axios.defaults.headers.common['Authorization'];
    set({ user: null });
    
    toast.success('Successfully logged out!');
    
    if (navigate) {
      navigate('/auth/sign-in/default#/auth/sign-in/centered');
    }
  },

  fetchProfile: async (userId) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/auth/profile/${userId}`);
      const profileData = res.data.data;
      
      // Update user data in store and localStorage
      set({ user: profileData, loading: false });
      localStorage.setItem('user', JSON.stringify(profileData));
      
      return profileData;
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || 'Failed to fetch profile data');
      throw error;
    }
  },
}));



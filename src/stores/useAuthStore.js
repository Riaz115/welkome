import axios from 'lib/axios';
import { create } from 'zustand';

// export const useAuthStore = create((set, get) => ({
//   user: null,
//   loading: false,
//
//   login: async ({ email, password,navigate }) => {
//     set({ loading: true });
//     try {
//       const res = await axios.post('/auth/login', {
//         emailOrPhone: email,
//         password,
//       });
//
//       const token = res.data.user.token;
//       const user = res.data.user.token;
//
//       // Set axios auth header
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // to get header without assigning token manually
//
//       // Save to localStorage
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
//
//       set({ user: res.data.user });
//       set({ loading: false });
//     } catch (error) {
//       set({ loading: false });
//       console.log(error);
//       alert(error.response?.data?.message || 'Login failed');
//       //   alert(error.response.data.message);
//     }
//   },
//
//   initialize: () => {
//     const token = localStorage.getItem('token');
//     const user = localStorage.getItem('user');
//
//     if (token && user) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       set({ user: JSON.parse(user) });
//     }
//   },
//
//   logout: () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     delete axios.defaults.headers.common['Authorization'];
//     set({ user: null });
//   },
//
//
//
// }));



export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  isInitialized: false,

  login: async ({ email, password, navigate }) => {
    set({ loading: true });
    try {
      const res = await axios.post('/auth/login', {
        emailOrPhone: email,
        password,
      });

      const token = res.data.user.token;
      const user = res.data.user;

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      set({ user, loading: false });
      navigate('/admin/dashboards/welkome');
    } catch (error) {
      set({ loading: false });
      alert(error.response?.data?.message || 'Login failed');
    }
  },

  initialize: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      set({ user: JSON.parse(user), isInitialized: true });
    } else {
      set({ isInitialized: true });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    set({ user: null });
  },
}));



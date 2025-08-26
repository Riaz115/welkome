import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axiosInstance from '../lib/axios';

// Utility function for API calls using axios
const apiCall = async (endpoint, options = {}) => {
  //catagories end points 
  const url = `/categories${endpoint}`;

  try {
    let response;
    const { method = 'GET', body, headers = {} } = options;

    const config = {
      headers: headers,
    };

    switch (method.toLowerCase()) {
      case 'get':
        response = await axiosInstance.get(url, config);
        break;
      case 'post':
        response = await axiosInstance.post(url, body, config);
        break;
      case 'put':
        response = await axiosInstance.put(url, body, config);
        break;
      case 'delete':
        response = await axiosInstance.delete(url, config);
        break;
      default:
        response = await axiosInstance.get(url, config);
    }

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || `HTTP error! status: ${error.response?.status}`);
  }
};

const apiCallBrands = async (endpoint, options = {}) => {
  const url = `/brands${endpoint}`;
  try {
    let response;
    const { method = 'GET', body, headers = {} } = options;
    const config = { headers };
    switch (method.toLowerCase()) {
      case 'get':
        response = await axiosInstance.get(url, config);
        break;
      case 'post':
        response = await axiosInstance.post(url, body, config);
        break;
      case 'put':
        response = await axiosInstance.put(url, body, config);
        break;
      case 'delete':
        response = await axiosInstance.delete(url, config);
        break;
      default:
        response = await axiosInstance.get(url, config);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || `HTTP error! status: ${error.response?.status}`);
  }
};

// const apiCall = async (endpoint, options = {}) => {
//   const url = `/categories${endpoint}`;
//   const { method = 'GET', body, headers = {} } = options;
//
//   try {
//     const isFormData = body instanceof FormData;
//
//     const config = {
//       headers: {
//         ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
//         ...headers,
//       },
//     };
//
//     let response;
//
//     switch (method.toLowerCase()) {
//       case 'get':
//         response = await axiosInstance.get(url, config);
//         break;
//       case 'post':
//         response = await axiosInstance.post(url, body, config);
//         break;
//       case 'put':
//         response = await axiosInstance.put(url, body, config);
//         break;
//       case 'delete':
//         response = await axiosInstance.delete(url, config);
//         break;
//       default:
//         response = await axiosInstance.get(url, config);
//     }
//
//     return response.data;
//   } catch (error) {
//     throw new Error(
//         error.response?.data?.message ||
//         error.message ||
//         `HTTP error! status: ${error.response?.status}`
//     );
//   }
// };



export const useCategoryApiStore = create(devtools((set, get) => ({
  // State
  primeCategories: [],
  categories: [],
  subcategories: [],
  brands: [],
  
  // Loading states
  loading: {
    primeCategories: false,
    categories: false,
    subcategories: false,
    brands: false,
    creating: false,
    updating: false,
    deleting: false,
  },
  
  // Error handlingp
  error: null,

  // Convert API data to your frontend format
  convertToFrontendFormat: (apiData, type) => {
    if (!apiData) return [];
    
    return apiData.map(item => ({
      id: item._id,
      name: item.name,
      serialNumber: item.serialNumber,
      image: item.image || "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=100&h=100&fit=crop&crop=center",
      categoryCount: item.categoryCount || item.subcategoryCount || 0,
      totalProducts: type === 'subcategory' ? (item.productCount || 0) : (item.totalProducts || 0),
      stockStatus: type === 'subcategory' ? (item.stockStatus || 'Out of Stock') : undefined,
      status: item.status,
      // Keep original data for API operations
      _id: item._id,
      originalData: item
    }));
  },

  // BRANDS ACTIONS
  fetchBrands: async () => {
    set((state) => ({
      loading: { ...state.loading, brands: true },
      error: null,
    }));
    try {
      const data = await apiCallBrands('');
      const formatted = (data?.data || []).map((item, index) => ({
        id: item._id,
        name: item.name,
        image: item.image || "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=100&h=100&fit=crop&crop=center",
        index: index + 1,
        _id: item._id,
        originalData: item,
      }));
      set((state) => ({
        brands: formatted,
        loading: { ...state.loading, brands: false },
      }));
      return data;
    } catch (error) {
      set((state) => ({
        error: error.message,
        loading: { ...state.loading, brands: false },
      }));
      throw error;
    }
  },
  createBrand: async (formData) => {
    set((state) => ({ loading: { ...state.loading, creating: true }, error: null }));
    try {
      const data = await apiCallBrands('', { method: 'POST', body: formData });
      await get().fetchBrands();
      set((state) => ({ loading: { ...state.loading, creating: false } }));
      return data?.data;
    } catch (error) {
      set((state) => ({ error: error.message, loading: { ...state.loading, creating: false } }));
      throw error;
    }
  },
  updateBrand: async (id, formData) => {
    set((state) => ({ loading: { ...state.loading, updating: true }, error: null }));
    try {
      const data = await apiCallBrands(`/${id}`, { method: 'PUT', body: formData });
      await get().fetchBrands();
      set((state) => ({ loading: { ...state.loading, updating: false } }));
      return data?.data;
    } catch (error) {
      set((state) => ({ error: error.message, loading: { ...state.loading, updating: false } }));
      throw error;
    }
  },
  deleteBrand: async (id) => {
    set((state) => ({ loading: { ...state.loading, deleting: true }, error: null }));
    try {
      await apiCallBrands(`/${id}`, { method: 'DELETE' });
      set((state) => ({
        brands: state.brands.filter((b) => b._id !== id && b.id !== id),
        loading: { ...state.loading, deleting: false },
      }));
      return true;
    } catch (error) {
      set((state) => ({ error: error.message, loading: { ...state.loading, deleting: false } }));
      throw error;
    }
  },

  // PRIME CATEGORIES ACTIONS
  fetchPrimeCategories: async () => {
    set((state) => ({
      loading: { ...state.loading, primeCategories: true },
      error: null,
    }));

    try {
      const data = await apiCall('/prime');
      console.log(`🎯 Prime Categories API Response:`, data);
      console.log(`🎯 Prime Categories Raw data:`, data.data);
      
      const formattedData = get().convertToFrontendFormat(data.data, 'prime');
      console.log(`🎯 Formatted Prime Categories:`, formattedData);
      
      set((state) => ({
        primeCategories: formattedData,
        loading: { ...state.loading, primeCategories: false },
      }));

      return data;
    } catch (error) {
      set((state) => ({
        error: error.message,
        loading: { ...state.loading, primeCategories: false },
      }));
      throw error;
    }
  },

  // Create prime category
  createPrimeCategory: async (formData) => {
    set((state) => ({
      loading: { ...state.loading, creating: true },
      error: null,
    }));

    console.log("here is the main form data boom",formData)
    try {
      const data = await apiCall('/prime', {
        method: 'POST',
        body: formData,
      });

      // Refresh the list
      await get().fetchPrimeCategories();
      
      set((state) => ({
        loading: { ...state.loading, creating: false },
      }));

      return data.data;
    } catch (error) {
      set((state) => ({
        error: error.message,
        loading: { ...state.loading, creating: false },
      }));
      throw error;
    }
  },

  // Update prime category
  updatePrimeCategory: async (id, formData) => {
    set((state) => ({
      loading: { ...state.loading, updating: true },
      error: null,
    }));

    try {
      const data = await apiCall(`/prime/${id}`, {
        method: 'PUT',
        body: formData,
      });

      // Refresh the list
      await get().fetchPrimeCategories();

      set((state) => ({
        loading: { ...state.loading, updating: false },
      }));

      return data.data;
    } catch (error) {
      set((state) => ({
        error: error.message,
        loading: { ...state.loading, updating: false },
      }));
      throw error;
    }
  },

  // Delete prime category
  deletePrimeCategory: async (id) => {
    set((state) => ({
      loading: { ...state.loading, deleting: true },
      error: null,
    }));

    try {
      await apiCall(`/prime/${id}`, { method: 'DELETE' });

      set((state) => ({
        primeCategories: state.primeCategories.filter(item => item._id !== id && item.id !== id),
        loading: { ...state.loading, deleting: false },
      }));

      return true;
    } catch (error) {
      set((state) => ({
        error: error.message,
        loading: { ...state.loading, deleting: false },
      }));
      throw error;
    }
  },

  // CATEGORIES ACTIONS
  fetchCategoriesByPrimeCategory: async (primeId) => {
    set((state) => ({
      loading: { ...state.loading, categories: true },
      error: null,
    }));

    try {
      const data = await apiCall(`/prime/${primeId}/categories`);
      console.log(`🔍 API Response for prime category ${primeId}:`, data);
      console.log(`📊 Raw data array:`, data.data);
      console.log(`📊 Data length:`, data.data ? data.data.length : 'undefined');
      
      const formattedData = get().convertToFrontendFormat(data.data, 'category');
      console.log(`✨ Formatted categories:`, formattedData);
      
      set((state) => ({
        categories: formattedData,
        loading: { ...state.loading, categories: false },
      }));

      return data;
    } catch (error) {
      set((state) => ({
        error: error.message,
        loading: { ...state.loading, categories: false },
      }));
      throw error;
    }
  },

  // Create category
  createCategory: async (formData, primeId) => {
    set((state) => ({
      loading: { ...state.loading, creating: true },
      error: null,
    }));

    try {
      // Add prime category ID to form data
      formData.append('primeCategoryId', primeId);
      
      const data = await apiCall('/', {
        method: 'POST',
        body: formData,
      });

      // Refresh the categories list
      await get().fetchCategoriesByPrimeCategory(primeId);
      
      set((state) => ({
        loading: { ...state.loading, creating: false },
      }));

      return data.data;
    } catch (error) {
      set((state) => ({
        error: error.message,
        loading: { ...state.loading, creating: false },
      }));
      throw error;
    }
  },

  // Update category
  updateCategory: async (id, formData, primeId) => {
    set((state) => ({
      loading: { ...state.loading, updating: true },
      error: null,
    }));

    try {
      const data = await apiCall(`/${id}`, {
        method: 'PUT',
        body: formData,
      });

      // Refresh the categories list
      await get().fetchCategoriesByPrimeCategory(primeId);

      set((state) => ({
        loading: { ...state.loading, updating: false },
      }));

      return data.data;
    } catch (error) {
      set((state) => ({
        error: error.message,
        loading: { ...state.loading, updating: false },
      }));
      throw error;
    }
  },

  // Delete category
  deleteCategory: async (id, primeId) => {
    set((state) => ({
      loading: { ...state.loading, deleting: true },
      error: null,
    }));

    try {
      await apiCall(`/${id}`, { method: 'DELETE' });

      // Refresh the categories list to ensure data consistency
      await get().fetchCategoriesByPrimeCategory(primeId);

      set((state) => ({
        loading: { ...state.loading, deleting: false },
      }));

      return true;
    } catch (error) {
      set((state) => ({
        error: error.message,
        loading: { ...state.loading, deleting: false },
      }));
      throw error;
    }
  },

  // SUBCATEGORIES ACTIONS
  fetchSubcategoriesByCategory: async (categoryId) => {
    set((state) => ({
      loading: { ...state.loading, subcategories: true },
      error: null,
    }));

    try {
      const data = await apiCall(`/${categoryId}/subcategories`);
      console.log(`🔍 Subcategories API Response:`, data);
      console.log(`📊 Raw subcategories data:`, data.data);
      
      const formattedData = get().convertToFrontendFormat(data.data, 'subcategory');
      console.log(`✨ Formatted subcategories:`, formattedData);
      
      set((state) => ({
        subcategories: formattedData,
        loading: { ...state.loading, subcategories: false },
      }));

      return data;
    } catch (error) {
      set((state) => ({
        error: error.message,
        loading: { ...state.loading, subcategories: false },
      }));
      throw error;
    }
  },

  // Create subcategory
  createSubcategory: async (formData, categoryId) => {
    set((state) => ({
      loading: { ...state.loading, creating: true },
      error: null,
    }));

    try {
      // Add category ID to form data
      formData.append('categoryId', categoryId);
      
      const data = await apiCall('/subcategories', {
        method: 'POST',
        body: formData,
      });

      // Refresh the subcategories list
      await get().fetchSubcategoriesByCategory(categoryId);
      
      set((state) => ({
        loading: { ...state.loading, creating: false },
      }));

      return data.data;
    } catch (error) {
      set((state) => ({
        error: error.message,
        loading: { ...state.loading, creating: false },
      }));
      throw error;
    }
  },

  // Update subcategory
  updateSubcategory: async (id, formData, categoryId) => {
    set((state) => ({
      loading: { ...state.loading, updating: true },
      error: null,
    }));

    try {
      const data = await apiCall(`/subcategories/${id}`, {
        method: 'PUT',
        body: formData,
      });

      // Refresh the subcategories list
      await get().fetchSubcategoriesByCategory(categoryId);

      set((state) => ({
        loading: { ...state.loading, updating: false },
      }));

      return data.data;
    } catch (error) {
      set((state) => ({
        error: error.message,
        loading: { ...state.loading, updating: false },
      }));
      throw error;
    }
  },

  // Delete subcategory
  deleteSubcategory: async (id, categoryId) => {
    set((state) => ({
      loading: { ...state.loading, deleting: true },
      error: null,
    }));

    try {
      await apiCall(`/subcategories/${id}`, { method: 'DELETE' });

      // Refresh the subcategories list to ensure data consistency
      await get().fetchSubcategoriesByCategory(categoryId);

      set((state) => ({
        loading: { ...state.loading, deleting: false },
      }));

      return true;
    } catch (error) {
      set((state) => ({
        error: error.message,
        loading: { ...state.loading, deleting: false },
      }));
      throw error;
    }
  },

  // Generate serial number
  generateSerialNumber: async () => {
    try {
      const data = await apiCall('/utils/generate-serial');
      return data.data.serialNumber;
    } catch (error) {
      // Fallback to client-side generation
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numbers = '0123456789';
      
      let serialLetters = '';
      const letterCount = Math.floor(Math.random() * 2) + 2;
      for (let i = 0; i < letterCount; i++) {
        serialLetters += letters.charAt(Math.floor(Math.random() * letters.length));
      }
      
      let serialNumbers = '';
      const numberCount = Math.floor(Math.random() * 3) + 4;
      for (let i = 0; i < numberCount; i++) {
        serialNumbers += numbers.charAt(Math.floor(Math.random() * numbers.length));
      }
      
      return serialLetters + serialNumbers;
    }
  },

  // Clear error
  clearError: () => set(() => ({ error: null })),

  // Reset categories when prime category changes
  resetCategories: () => set(() => ({ categories: [] })),

  // Reset subcategories when category changes
  resetSubcategories: () => set(() => ({ subcategories: [] })),

}), {
  name: 'category-api-store',
})); 
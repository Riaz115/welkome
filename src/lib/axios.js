import axios from "axios"


const axiosInstance = axios.create({
    // baseURL : "http://localhost:4000/api/v1",  //this is for base url
    
    baseURL : "http://monkmaze-alb-1433160481.ap-south-1.elb.amazonaws.com/api/v1",
    withCredentials: true,
    timeout: 10000,
})

 

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (process.env.NODE_ENV === 'production') {
            console.warn('API Error (suppressed in production):', {
                status: error.response?.status,
                url: error.config?.url,
                method: error.config?.method
            });
        } else {
            console.warn('API Error:', error.response?.status, error.config?.url, error.message);
        }
        
        // Don't automatically redirect on 401 - let components handle it
        // if (error.response?.status === 401) {
        //     localStorage.removeItem('token');
        //     localStorage.removeItem('user');
        //     window.location.href = '/auth/sign-in/default#/auth/sign-in/centered';
        // }
        
        return Promise.reject(error);
    }
)

export default axiosInstance; 
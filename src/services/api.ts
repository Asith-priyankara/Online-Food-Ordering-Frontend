import axios from 'axios';
import axiosRetry from 'axios-retry';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
    baseURL: backendUrl
});

axiosRetry(api, {retries:3});

api.interceptors.request.use(
    
    (config) => {
        const authdata = localStorage.getItem("auth-data");
        const token = authdata ? JSON.parse(authdata).token : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => {
        return response;
    },
    
    (error) => {
        if(error.response) {
            console.error("API Response Error", error.response);
            if(error.response.status === 401) {
                window.location.href = '/login';
            }
        } else {
            console.error("Network/Server Error", error.message);
        }
    return Promise.reject(error);

    }
)

export default api;
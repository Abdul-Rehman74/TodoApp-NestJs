import axios from "axios";
import toast from "react-hot-toast";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL:'http://localhost:3000',
});

api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Network error");
        }
        return Promise.reject(error);
    }
);

export default api;
import axios from 'axios';
import { BASE_URL } from '../../utils/apiURL';

// Helper function to get the CSRF token from cookies
const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Check if this cookie string begins with the name we want
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};


// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: BASE_URL, // Set base URL here
    withCredentials: true, // This enables sending cookies with requests
});


// Add a request interceptor to include the CSRF token in the headers
axiosInstance.interceptors.request.use((config) => {
    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken; // Include the CSRF token in the headers
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
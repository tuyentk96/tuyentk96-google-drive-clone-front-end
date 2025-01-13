import axios from 'axios';

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'http://localhost:3052/v1/api',
});

instance.defaults.withCredentials = true;

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent

        config.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;



        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    function (err) {

        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return err.response.data
    },
);

export default instance;

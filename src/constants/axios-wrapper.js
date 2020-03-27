import axios from 'axios';

export const request = axios.create({
    baseURL: 'http://localhost:3000',
});

request.interceptors.request.use(function (config) {
    return config;
});
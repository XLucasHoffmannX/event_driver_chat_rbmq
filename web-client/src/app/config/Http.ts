import axios from 'axios';
import Cookies from 'js-cookie';

interface AxiosConfig {
    headers?: any;
}

export const Http = axios.create({
    baseURL: process.env.REACT_APP_URL_ROOT,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const HttpAuth = axios.create({
    baseURL: process.env.REACT_APP_URL_ROOT_API
})

/* response */
HttpAuth.interceptors.response.use(res => { return res }, error => {
    if (error.response) {
        if (error.response.status === 401) {
            window.location.replace('/login');
        }
    }
})
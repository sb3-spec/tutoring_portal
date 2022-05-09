import axios from "axios";
import Cookies from 'js-cookie'

// 'https://twitter-clone-drf.herokuapp.com'

const hostname =  process.env.SITE_URL_PRODCTION;


export const api = axios.create({
    baseURL: hostname,
    headers: {
        'Content-Type': 'application/json',        
        // 'withCredentials': 'true'      
    },
});
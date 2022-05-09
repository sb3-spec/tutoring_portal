import axios from "axios";

const hostname =  process.env.SITE_URL_TESTING;


export const api = axios.create({
    baseURL: hostname,
    headers: {
        'Content-Type': 'application/json',        
        // 'withCredentials': 'true'      
    },
});
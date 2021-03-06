import axios from "axios";

const hostname =  process.env.PRODUCTION_URL;


export const api = axios.create({
    baseURL: hostname,
    headers: {
        'Content-Type': 'application/json',        
        // 'withCredentials': 'true'      
    },
});
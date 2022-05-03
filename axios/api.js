import axios from "axios";
import Cookies from 'js-cookie'

// 'https://twitter-clone-drf.herokuapp.com'

const hostname =  'http://localhost:3000';


export const api = axios.create({
    baseURL: hostname,
    headers: {
        'Content-Type': 'application/json',        
        // 'withCredentials': 'true'      
    },
});
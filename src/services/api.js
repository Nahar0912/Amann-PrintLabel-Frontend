import axios from "axios";

const API_BASE_URL = "http://localhost:3000";
// const API_BASE_URL = "http://192.168.3.194:8008";

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

export default api;

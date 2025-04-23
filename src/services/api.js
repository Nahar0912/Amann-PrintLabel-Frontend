import axios from "axios";

const API_BASE_URL = "http://localhost:5091";

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

export default api;

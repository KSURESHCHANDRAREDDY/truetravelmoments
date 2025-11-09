import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, // backend base URL
  withCredentials: true, // ✅ so JWT cookie works
});

export default api;

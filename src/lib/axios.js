import axios from "axios";

/* ✅ Create axios instance for backend API */
export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: true, // 🔥 required for cookies (JWT)
});

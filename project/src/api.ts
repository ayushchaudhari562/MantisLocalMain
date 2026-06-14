// Configured axios instance for backend API communication
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});
// Add interceptor to inject Clerk auth token
api.interceptors.request.use(async (config) => {
  // Access the global Clerk object injected by ClerkProvider
  const clerk = (window as any).Clerk;
  if (clerk && clerk.session) {
    try {
      const token = await clerk.session.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Failed to fetch Clerk token', error);
    }
  }
  return config;
});

export default api;

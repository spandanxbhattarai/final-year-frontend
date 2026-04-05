import axios from 'axios';
import { useAuthStore } from '@/store/auth.store';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const url = err.config?.url || '';
    const isAuthRoute = url.includes('/auth/');
    if (err.response?.status === 401 && !err.config._retry && !isAuthRoute) {
      err.config._retry = true;
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const { accessToken, user } = res.data;
        useAuthStore.getState().setToken(accessToken);
        if (user) useAuthStore.setState({ user });
        err.config.headers.Authorization = `Bearer ${accessToken}`;
        return api(err.config);
      } catch {
        useAuthStore.getState().logout();
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

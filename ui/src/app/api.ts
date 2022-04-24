import axios, { AxiosRequestHeaders } from 'axios';
import { TokenService } from 'features/auth/tokenService';

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

api.interceptors.request.use((config) => {
  const accessToken = TokenService.getAccessToken();
  if (accessToken)
    (
      config.headers as AxiosRequestHeaders
    ).Authorization = `Bearer ${accessToken}`;
  return config;
}, Promise.reject);

export { api };

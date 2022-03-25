import axios, { AxiosRequestHeaders } from 'axios';
import { TokenService } from 'features/auth/tokenService';

const api = axios.create({ baseURL: 'http://localhost:3002' });

api.interceptors.request.use((config) => {
  const accessToken = TokenService.getAccessToken();
  if (accessToken)
    (
      config.headers as AxiosRequestHeaders
    ).Authorization = `Bearer ${accessToken}`;
  return config;
}, Promise.reject);

export { api };

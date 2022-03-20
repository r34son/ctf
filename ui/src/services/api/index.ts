/* eslint-disable no-param-reassign */
import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import { TokenService } from 'services/token';

const api = axios.create({ baseURL: 'http://localhost:3002' });

api.interceptors.request.use((config) => {
  const accessToken = TokenService.getAccessToken();
  if (accessToken)
    (
      config.headers as AxiosRequestHeaders
    ).Authorization = `Bearer ${accessToken}`;
  return config;
}, Promise.reject);

api.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    if (error.response?.status === 429) {
      alert(error.response.data);
    }
    return Promise.reject(error);
  },
);

export { api };

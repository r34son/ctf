/* eslint-disable no-param-reassign */
import axios, { AxiosRequestHeaders } from 'axios';
import { TokenService } from 'services/token';

const api = axios.create({ baseURL: `http://${window.location.hostname}:3002` });

api.interceptors.request.use((config) => {
  const accessToken = TokenService.getAccessToken();
  if (accessToken)
    (
      config.headers as AxiosRequestHeaders
    ).Authorization = `Bearer ${accessToken}`;
  return config;
}, Promise.reject);

export { api };

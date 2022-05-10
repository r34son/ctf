import axios from 'axios';
import { TokenService } from 'features/auth/tokenService';

const accessToken = TokenService.getAccessToken();

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  ...(accessToken
    ? {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    : {}),
});

api.interceptors.request.use((config) => config, Promise.reject);

export { api };

import { Credentials, LoginResponse, Team } from 'interfaces';
import { api } from 'services/api';

export const login = async (credentials: Credentials) =>
  api.post<LoginResponse>('/auth/login', credentials);

export const me = async () => api.get<Team>('/auth/me');

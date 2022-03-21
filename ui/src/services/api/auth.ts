import { Credentials, LoginResponse } from 'interfaces';
import { api } from 'services/api';

export const login = async (credentials: Credentials) =>
  api.post<LoginResponse>('/auth/login', credentials);

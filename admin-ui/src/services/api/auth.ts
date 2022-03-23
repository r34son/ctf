import { Credentials } from 'interfaces';
import { api } from 'services/api';

export const login = async (credentials: Credentials) =>
  api.post<string>('/auth/login-admin', credentials);

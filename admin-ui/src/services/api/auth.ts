import { TeamCredentials } from 'interfaces';
import { api } from 'services/api';

export const login = async (credentials: TeamCredentials) =>
  api.post<string>('/auth/login-admin', credentials);

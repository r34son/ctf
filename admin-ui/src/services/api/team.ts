import { Team, TeamCredentials } from 'interfaces';
import { api } from 'services/api';

export const create = async (data: TeamCredentials) =>
  api.post<Team>('/team', data);

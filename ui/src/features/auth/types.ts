import { Team } from 'common/interfaces';

export interface LoginData {
  name: string;
  password: string;
}

export type LoginErrorResponse = Partial<LoginData>;

export interface LoginResponse {
  accessToken: string;
  team: Team;
}

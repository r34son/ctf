export interface Team {
  id: number;
  name: string;
}

export interface Credentials {
  name: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  team: Team;
}

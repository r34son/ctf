import jwtDecode from 'jwt-decode';
import { Team } from 'common/interfaces';

export class TokenService {
  private static readonly ACCESS_TOKEN_KEY = 'token';

  static getAccessToken = () => localStorage.getItem(this.ACCESS_TOKEN_KEY);

  static setAccessToken = (token: string) =>
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);

  static clearAccessToken = () =>
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);

  static decode = (token: string) => jwtDecode<Team>(token);
}

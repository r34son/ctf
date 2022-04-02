import { TeamCredentials } from 'interfaces';
import * as AuthApi from 'services/api/auth';
import { createContext, FC, useMemo, useEffect, useState } from 'react';
import { TokenService } from 'services/token';
import { api } from 'services/api';
import { AxiosError } from 'axios';

interface Auth {
  isAuthorized: boolean;
  login: (credentials: TeamCredentials) => Promise<void>;
  logout: () => void;
}

const initialAuth = { isAuthorized: false } as Auth;

export const AuthContext = createContext<Auth>(initialAuth);

export const AuthProvider: FC = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const logout = () => {
    TokenService.clearAccessToken();
    setIsAuthorized(false);
  };

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response.data,
      (error: AxiosError) => {
        // Unauthorized
        if (error.response?.status === 401) logout();
        // Request is rate limited
        // eslint-disable-next-line no-alert
        if (error.response?.status === 429) alert(error.response.data);

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, []);

  const auth = useMemo(
    () => ({
      isAuthorized,
      login: async (credentials: TeamCredentials) => {
        const token = await AuthApi.login(credentials);
        TokenService.setAccessToken(token);
        setIsAuthorized(true);
      },
      logout,
    }),
    [isAuthorized],
  );

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

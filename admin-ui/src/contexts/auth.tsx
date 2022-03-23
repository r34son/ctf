import { Credentials } from 'interfaces';
import * as AuthApi from 'services/api/auth';
import { createContext, FC, useMemo, useState } from 'react';
import { TokenService } from 'services/token';

interface Auth {
  isAuthorized: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

const initialAuth = { isAuthorized: false } as Auth;

export const AuthContext = createContext<Auth>(initialAuth);

export const AuthProvider: FC = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const auth = useMemo(
    () => ({
      isAuthorized,
      login: async (credentials: Credentials) => {
        const token = await AuthApi.login(credentials);
        TokenService.setAccessToken(token);
        setIsAuthorized(true);
      },
      logout: () => {
        TokenService.clearAccessToken();
        setIsAuthorized(false);
      },
    }),
    [isAuthorized],
  );

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

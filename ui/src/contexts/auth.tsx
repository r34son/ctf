import { Credentials, Team } from 'interfaces';
import * as AuthApi from 'services/api/auth';
import { createContext, FC, useEffect, useMemo, useState } from 'react';
import { TokenService } from 'services/token';
import { Location, useLocation, useNavigate } from 'react-router-dom';

const initialTeam = null as unknown as Team;

interface Auth {
  isAuthorized: boolean;
  team: Team;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

const initialAuth = {
  isAuthorized: false,
  team: initialTeam,
};

export const AuthContext = createContext<Auth>(initialAuth as Auth);

export const AuthProvider: FC = ({ children }) => {
  const [team, setTeam] = useState<Team>(initialTeam);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authenticate = async () => {
      const token = TokenService.getAccessToken();
      if (token) {
        const authorizedTeam = await AuthApi.me();
        setTeam(authorizedTeam);
      }
    };
    authenticate();
  }, []);

  const auth = useMemo<Auth>(
    () => ({
      isAuthorized: Boolean(team || TokenService.getAccessToken()),
      team,
      login: async (credentials) => {
        const { team: teamResponse, accessToken } = await AuthApi.login(
          credentials,
        );
        TokenService.setAccessToken(accessToken);
        setTeam(teamResponse);
        const to = (location.state as { from: Location })?.from.pathname || '/';
        navigate(to, { replace: true });
      },
      logout: () => {
        TokenService.clearAccessToken();
        setTeam(initialTeam);
        navigate('/', { replace: true });
      },
    }),
    [location.state, navigate, team],
  );

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

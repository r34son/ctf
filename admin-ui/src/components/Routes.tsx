import { LoginPage } from 'pages/Login';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { Layout } from 'components/Layout';
import { useAuth } from 'hooks';

/** Роуты приложения. */
export const Routes = () => {
  const { isAuthorized } = useAuth();

  return (
    <RouterRoutes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={isAuthorized ? <div>sdasdasd</div> : <LoginPage />}
        />
      </Route>
    </RouterRoutes>
  );
};

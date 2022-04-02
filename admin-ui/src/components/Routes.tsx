import { LoginPage } from 'pages/Login';
import { AdminPage } from 'pages/Admin';
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
          element={isAuthorized ? <AdminPage /> : <LoginPage />}
        />
      </Route>
    </RouterRoutes>
  );
};

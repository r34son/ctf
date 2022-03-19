import { LoginPage } from 'pages/Login';
import { Routes as RouterRoutes, Route, useLocation } from 'react-router-dom';

/** Роуты приложения. */
export const Routes = () => {
  const location = useLocation();

  return (
    <RouterRoutes location={location}>
      <Route path="/test" element={<div>sdasdasd</div>} />
      <Route path="/login" element={<LoginPage />} />
    </RouterRoutes>
  );
};

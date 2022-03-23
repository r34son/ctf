import { LoginPage } from 'pages/Login';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { ProtectedRoute } from 'components/ProtectedRoute';
import { Layout } from 'components/Layout';

/** Роуты приложения. */
export const Routes = () => (
  <RouterRoutes>
    <Route element={<Layout />}>
      <Route path="/" element={<div>public</div>} />
      <Route path="/test" element={<ProtectedRoute>test</ProtectedRoute>} />
      <Route path="/login" element={<LoginPage />} />
    </Route>
  </RouterRoutes>
);

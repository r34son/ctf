import { LoginPage } from 'features/auth/LoginPage';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { ProtectedRoute } from 'common/components/ProtectedRoute';
import { Layout } from 'common/components/Layout';

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

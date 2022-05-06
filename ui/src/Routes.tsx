import { Layout } from 'common/components/Layout';
import { ProtectedRoute } from 'common/components/ProtectedRoute';
import { LoginPage } from 'features/auth/LoginPage';
import { TasksPage } from 'features/tasks/TasksPage';
import { Route, Routes as RouterRoutes } from 'react-router-dom';

/** Роуты приложения. */
export const Routes = () => (
  <RouterRoutes>
    <Route element={<Layout />}>
      <Route path="/" element={<div>public</div>} />
      <Route path="/rating" element={<div>rating</div>} />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <TasksPage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
    </Route>
  </RouterRoutes>
);

import { AxiosError } from 'axios';
import { useAuth } from 'hooks';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { api } from 'services/api';

export const ResponseInterceptor = () => {
  const auth = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response.data,
      (error: AxiosError) => {
        // Unauthorized
        if (error.response?.status === 401) {
          auth.logout('/login');
        }
        // Request is rate limited
        if (error.response?.status === 429) {
          enqueueSnackbar(error.response.data, {
            variant: 'warning',
            preventDuplicate: true,
          });
        }
        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [auth, enqueueSnackbar]);

  return null;
};

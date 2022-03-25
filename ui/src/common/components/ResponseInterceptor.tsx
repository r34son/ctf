import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { api } from 'app/api';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'app/hooks';
import { logout } from 'features/auth/authSlice';

export const ResponseInterceptor = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response.data,
      (error: AxiosError) => {
        // Unauthorized
        if (error.response?.status === 401) {
          dispatch(logout());
          navigate('/login');
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
  }, [dispatch, enqueueSnackbar, navigate]);

  return null;
};

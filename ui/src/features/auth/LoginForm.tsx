import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Stack,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { MouseEventHandler, useState } from 'react';
import { useAppDispatch } from 'app/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { login } from './authSlice';
import { LoginData, LoginErrorResponse } from './types';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      await dispatch(login(data)).unwrap();
      const to = (location.state as { from: Location })?.from.pathname || '/';
      navigate(to, { replace: true });
    } catch (error) {
      const typedError = error as AxiosResponse<LoginErrorResponse>;
      if (typedError?.status === 400) {
        Object.entries<string>(typedError.data).forEach(([key, message]) =>
          setError(key as keyof LoginData, { message }),
        );
      }
    }
  };

  const onShowPasswordClick: MouseEventHandler<HTMLButtonElement> = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const onShowPasswordMouseDown: MouseEventHandler<HTMLButtonElement> = (e) =>
    e.preventDefault();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          autoFocus
          fullWidth
          label="Team name"
          autoComplete="username"
          variant="outlined"
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          {...register('name', { required: true })}
        />
        <TextField
          fullWidth
          label="Password"
          autoComplete="current-password"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={onShowPasswordClick}
                  onMouseDown={onShowPasswordMouseDown}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...register('password', { required: true })}
        />
        <Button
          variant="contained"
          size="medium"
          type="submit"
          disabled={isSubmitting}
        >
          Login
        </Button>
      </Stack>
    </form>
  );
};

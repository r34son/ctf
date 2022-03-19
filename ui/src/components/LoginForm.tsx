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
import { useAuth } from 'hooks';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

type LoginFormValues = {
  name: string;
  password: string;
};

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      await auth.login(data);
      navigate((location.state as { from: Location })?.from.pathname || '/', {
        replace: true,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Object.entries<string>(error.response?.data).forEach(([key, message]) =>
          setError(key as keyof LoginFormValues, { message }),
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
          variant="outlined"
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          {...register('name', { required: true })}
        />
        <TextField
          fullWidth
          label="Password"
          autoComplete="password"
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
        <Button variant="contained" size="medium" type="submit">
          Login
        </Button>
      </Stack>
    </form>
  );
};

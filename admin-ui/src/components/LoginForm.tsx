import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { useAuth } from 'hooks';
import { TeamCredentials } from 'interfaces';
import { MouseEventHandler, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TeamCredentials>();
  const auth = useAuth();

  const onSubmit: SubmitHandler<TeamCredentials> = async (data) => {
    try {
      await auth.login(data);
    } catch (error) {
      setError('name', {}, { shouldFocus: true });
      setError('password', {});
    }
  };

  const onShowPasswordClick: MouseEventHandler<HTMLButtonElement> = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const onShowPasswordMouseDown: MouseEventHandler<HTMLButtonElement> = (e) =>
    e.preventDefault();

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          autoFocus
          fullWidth
          label="Login"
          error={Boolean(errors.name)}
          {...register('name', { required: true })}
        />
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          error={Boolean(errors.password)}
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
        <Button variant="contained" type="submit">
          Login
        </Button>
      </Stack>
    </form>
  );
};

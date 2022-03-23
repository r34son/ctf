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

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
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
          variant="outlined"
          error={Boolean(errors.name)}
          {...register('name', { required: true })}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
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
        <Button variant="contained" size="medium" type="submit">
          Login
        </Button>
      </Stack>
    </form>
  );
};

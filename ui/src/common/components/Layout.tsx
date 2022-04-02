import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Chip,
  Stack,
} from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authSelector, logout } from 'features/auth/authSlice';
import { Timer } from 'features/timer/Timer';
import LogoutIcon from '@mui/icons-material/Logout';

export const Layout = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(authSelector);
  const navigate = useNavigate();

  const onLogoutClick = () => {
    dispatch(logout());
    navigate('/', { replace: true });
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CTF
          </Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Timer />
            <Button component={Link} to="/test">
              test
            </Button>
            {auth.isAuthorized ? (
              <>
                <Chip label={auth.team.name} variant="outlined" />
                <Button onClick={onLogoutClick} endIcon={<LogoutIcon />}>
                  Logout
                </Button>
              </>
            ) : (
              <Button component={Link} to="/login">
                Login
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};

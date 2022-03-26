import { AppBar, Box, Button, Toolbar, Typography, Chip } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authSelector, logout } from 'features/auth/authSlice';
import { Timer } from 'features/timer/Timer';

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
          <Timer />
          <Button component={Link} to="/test">
            test
          </Button>
          {auth.isAuthorized ? (
            <>
              <Chip label={auth.team.name} variant="outlined" />
              <Button onClick={onLogoutClick}>Logout</Button>
            </>
          ) : (
            <Button component={Link} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};

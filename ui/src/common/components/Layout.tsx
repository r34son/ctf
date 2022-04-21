import styled from '@emotion/styled';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  AppBar,
  Button,
  Chip,
  Container,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authSelector, logout } from 'features/auth/authSlice';
import { Timer } from 'features/timer/Timer';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Layout = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(authSelector);
  const navigate = useNavigate();

  const onLogoutClick = () => {
    dispatch(logout());
    navigate('/', { replace: true });
  };

  return (
    <AppContainer>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CTF
          </Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Timer />
            <Button component={Link} to="/tasks">
              Tasks
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
      <Container
        disableGutters
        fixed
        maxWidth="xl"
        sx={{ p: 3, flex: 1, overflowY: 'hidden' }}
      >
        <Outlet />
      </Container>
    </AppContainer>
  );
};

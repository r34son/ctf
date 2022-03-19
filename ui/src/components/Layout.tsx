import { AppBar, Box, Button, Toolbar, Typography, Chip } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from 'hooks';

export const Layout = () => {
  const { isAuthorized, team, logout } = useAuth();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CTF
          </Typography>
          <Button component={Link} to="/test">
            test
          </Button>
          {isAuthorized ? (
            <>
              <Chip label={team?.name} variant="outlined" />
              <Button onClick={logout}>Logout</Button>
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

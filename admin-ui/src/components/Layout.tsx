import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const Layout = () => (
  <Box sx={{ height: '100vh' }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">CTF Admin</Typography>
      </Toolbar>
    </AppBar>
    <Outlet />
  </Box>
);

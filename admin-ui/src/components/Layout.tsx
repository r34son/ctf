import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Layout: FC = ({ children }) => (
  <Box sx={{ height: '100vh' }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          CTF Admin
        </Typography>
        <Button component={Link} to="/test">
          test
        </Button>
        <Button component={Link} to="/login">
          Login
        </Button>
      </Toolbar>
    </AppBar>
    {children}
  </Box>
);

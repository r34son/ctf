import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { FC } from 'react';

export const Layout: FC = ({ children }) => (
  <Box>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          CTF
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
    {children}
  </Box>
);

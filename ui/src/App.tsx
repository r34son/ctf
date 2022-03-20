import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes } from 'Routes';
import { AuthProvider } from 'contexts/auth';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({ palette: { mode: 'dark' } });

export const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline enableColorScheme />
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);

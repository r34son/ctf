import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes } from 'Routes';
import { AuthProvider } from 'contexts/auth';
import { BrowserRouter } from 'react-router-dom';
import { ResponseInterceptor } from 'components/ResponseInterceptor';
import { SnackbarProvider } from 'notistack';

const theme = createTheme({ palette: { mode: 'dark' } });

export const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline enableColorScheme />
    <SnackbarProvider
      dense
      maxSnack={2}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <BrowserRouter>
        <AuthProvider>
          <ResponseInterceptor />
          <Routes />
        </AuthProvider>
      </BrowserRouter>
    </SnackbarProvider>
  </ThemeProvider>
);

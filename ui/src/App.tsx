import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes } from 'Routes';
import { BrowserRouter } from 'react-router-dom';
import { ResponseInterceptor } from 'common/components/ResponseInterceptor';
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
        <ResponseInterceptor />
        <Routes />
      </BrowserRouter>
    </SnackbarProvider>
  </ThemeProvider>
);

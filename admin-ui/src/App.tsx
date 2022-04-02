import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Routes } from 'components/Routes';
import { AuthProvider } from 'contexts/auth';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({
  palette: { mode: 'dark' },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});

export const App = () => (
  <LocalizationProvider dateAdapter={DateAdapter}>
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <SnackbarProvider
        dense
        maxSnack={2}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <BrowserRouter>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  </LocalizationProvider>
);

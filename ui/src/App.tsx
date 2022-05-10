import CssBaseline from '@mui/material/CssBaseline';
import darkScrollbar from '@mui/material/darkScrollbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ResponseInterceptor } from 'common/components/ResponseInterceptor';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'Routes';

const theme = createTheme({
  palette: { mode: 'dark' },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: darkScrollbar({
          track: '#121212',
          thumb: '#3a3a3a',
          active: '#959595',
        }),
      },
    },
  },
});

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

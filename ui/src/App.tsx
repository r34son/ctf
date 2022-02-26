import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Layout } from 'components/Layout';
import { Routes } from 'components/Routes';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({ palette: { mode: 'dark' } });

export const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline enableColorScheme />
    <Layout>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Layout>
  </ThemeProvider>
);

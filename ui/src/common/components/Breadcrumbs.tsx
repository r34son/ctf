import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import { ROUTES_CONFIG } from 'consts';
import { useLocation } from 'react-router-dom';
import { LinkRouter } from './LinkRouter';

export const Breadcrumbs = () => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter(Boolean);

  if (!pathnames.length) return null;

  return (
    <MuiBreadcrumbs>
      <LinkRouter underline="hover" color="inherit" to="/">
        Главная
      </LinkRouter>
      {pathnames.map((_value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {ROUTES_CONFIG[to].name}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {ROUTES_CONFIG[to].name}
          </LinkRouter>
        );
      })}
    </MuiBreadcrumbs>
  );
};

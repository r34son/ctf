import Link, { LinkProps } from '@mui/material/Link';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

export const LinkRouter = (props: LinkProps & RouterLinkProps) => (
  <Link {...props} component={RouterLink} />
);

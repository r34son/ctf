import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar as MuiAppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { appSelector, toggleMenu } from 'app/appSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { MENU_DRAWER_WIDTH } from 'consts';
import { authSelector } from 'features/auth/authSlice';
import { Timer } from 'features/timer/Timer';
import { Link as RouterLink } from 'react-router-dom';
import { Account } from './Account';
import { LinkRouter } from './LinkRouter';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: MENU_DRAWER_WIDTH,
    width: `calc(100% - ${MENU_DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const AppBar = () => {
  const auth = useAppSelector(authSelector);
  const { isMenuOpened } = useAppSelector(appSelector);
  const dispatch = useAppDispatch();

  const handleDrawerOpen = () => {
    dispatch(toggleMenu());
  };

  return (
    <StyledAppBar position="static" open={isMenuOpened}>
      <Toolbar>
        {auth.isAuthorized && (
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(isMenuOpened && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          <LinkRouter underline="none" color="inherit" to="/">
            CTF
          </LinkRouter>
        </Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Timer />
          {auth.isAuthorized ? (
            <Account name={auth.team.name} />
          ) : (
            <Button component={RouterLink} to="/login">
              Войти
            </Button>
          )}
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
};

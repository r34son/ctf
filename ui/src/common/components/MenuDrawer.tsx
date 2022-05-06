import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { CSSObject, styled, Theme } from '@mui/material/styles';
import { appSelector, toggleMenu } from 'app/appSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { MENU_DRAWER_WIDTH, ROUTES_CONFIG } from 'consts';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const openedMixin = (theme: Theme): CSSObject => ({
  width: MENU_DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: MENU_DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const MenuDrawer = () => {
  const { isMenuOpened } = useAppSelector(appSelector);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleDrawerClose = () => {
    dispatch(toggleMenu());
  };

  return (
    <Drawer variant="permanent" open={isMenuOpened}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <List>
        {Object.entries(ROUTES_CONFIG).map(([to, { name, icon: Icon }]) => (
          <Tooltip placement="right" title={name}>
            <ListItemButton
              key={to}
              sx={{ px: 2.5 }}
              component={RouterLink}
              to={to}
              selected={location.pathname.includes(to)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isMenuOpened ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Icon />
              </ListItemIcon>
              <ListItemText primary={name} sx={{ opacity: +isMenuOpened }} />
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
};

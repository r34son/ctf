import TaskAltIcon from '@mui/icons-material/TaskAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { FC } from 'react';

export const MENU_DRAWER_WIDTH = 240;

interface RouteConfig {
  name: string;
  icon: FC;
}

export const ROUTES_CONFIG: Record<string, RouteConfig> = {
  '/tasks': {
    name: 'Задания',
    icon: TaskAltIcon,
  },
  '/rating': {
    name: 'Рейтинг',
    icon: TrendingUpIcon,
  },
};

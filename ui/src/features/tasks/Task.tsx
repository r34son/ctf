import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { Task as ITask } from 'common/interfaces';
import { openTask } from './tasksSlice';
// import { useColorScheme, getInitColorSchemeScript } from '@mui/material/styles';

interface TaskProps {
  task: ITask;
}

export const Task = ({ task }: TaskProps) => {
  const dispatch = useAppDispatch();
  const onTaskClick = () => {
    dispatch(openTask(task.id));
  };

  return (
    <Card sx={{ overflow: 'initial' }} onClick={onTaskClick}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" noWrap>
            {task.title}
          </Typography>
        </CardContent>
        <CardActions>
          <Chip
            size="small"
            variant="outlined"
            color="primary"
            label={task.points}
            sx={{ ml: 'auto' }}
          />
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

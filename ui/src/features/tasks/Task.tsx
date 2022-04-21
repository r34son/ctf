import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from '@mui/material';
import { Task as ITask } from 'common/interfaces';
// import { useColorScheme, getInitColorSchemeScript } from '@mui/material/styles';

interface TaskProps {
  task: ITask;
}

export const Task = ({ task }: TaskProps) => (
  <Card sx={{ overflow: 'auto' }}>
    <CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Chip size="small" label={task.points} sx={{ ml: 'auto' }} />
      </CardActions>
    </CardActionArea>
  </Card>
);

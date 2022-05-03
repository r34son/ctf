import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from '@mui/material';
import { Task as ITask } from 'common/interfaces';
import draftToHtml from 'draftjs-to-html';
// import { useColorScheme, getInitColorSchemeScript } from '@mui/material/styles';

interface TaskProps {
  task: ITask;
}

export const Task = ({ task }: TaskProps) => (
  <Card sx={{ overflow: 'initial' }}>
    <CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {task.title}
        </Typography>
        <div
          style={{ fontSize: 16 }}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: draftToHtml(JSON.parse(task.description)),
          }}
        />
      </CardContent>
      <CardActions>
        <Chip size="small" label={task.points} sx={{ ml: 'auto' }} />
      </CardActions>
    </CardActionArea>
  </Card>
);

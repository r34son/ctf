import { Card, CardContent, Grid } from '@mui/material';
import { TaskToggleForm } from 'components/forms/TaskToggleForm';
import { Task } from 'interfaces';

interface TasksControlProps {
  tasks: Task[];
  onUpdate: () => void;
}

export const TasksControl = ({ tasks, onUpdate }: TasksControlProps) => (
  <Grid container spacing={2}>
    {tasks.map((task) => (
      <Grid key={task.id} item xs={6}>
        <Card variant="outlined">
          <CardContent>
            <TaskToggleForm task={task} onUpdate={onUpdate} />
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

import { Card, CardContent, Grid } from '@mui/material';
import { TaskToggleForm } from 'components/forms/TaskToggleForm';
import { Task } from 'interfaces';
import { useEffect, useState } from 'react';
import { getAll } from 'services/api/task';

export const TasksControl = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      setTasks(await getAll());
    };
    fetchTasks();
  }, []);

  return (
    <Grid container spacing={2}>
      {tasks.map((task) => (
        <Grid key={task.id} item xs={6}>
          <Card variant="outlined">
            <CardContent>
              <TaskToggleForm task={task} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

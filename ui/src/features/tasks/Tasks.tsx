import styled from '@emotion/styled';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import _ from 'lodash';
import groupBy from 'lodash/groupBy';
import { useMemo } from 'react';
import { Task } from './Task';
import { tasksSelector } from './tasksSlice';

const Dashboard = styled.div`
  height: 100%;
  overflow-x: auto;
`;

export const Tasks = () => {
  const { data } = useAppSelector(tasksSelector);

  const groupedTasks = useMemo(() => groupBy(data, 'category'), [data]);

  return (
    <Dashboard>
      <Stack direction="row" spacing={2} sx={{ height: '100%' }}>
        {Object.entries(groupedTasks).map(([category, tasks]) => (
          <Card
            key={category}
            variant="outlined"
            sx={{ minWidth: 350, height: '100%' }}
          >
            <CardContent
              sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <Typography
                gutterBottom
                variant="h5"
                align="center"
                textTransform="uppercase"
              >
                {category}
              </Typography>
              <Stack spacing={2} sx={{ flex: 1, overflowY: 'auto' }}>
                {_.sortBy(tasks, 'points').map((task) => (
                  <Task key={task.id} task={task} />
                ))}
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Dashboard>
  );
};

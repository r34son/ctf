import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import { TaskDialog } from './TaskDialog';
import { Tasks } from './Tasks';
import { getTasks, tasksSelector } from './tasksSlice';

export const TasksPage = () => {
  const { data } = useAppSelector(tasksSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const request = dispatch(getTasks());
    return () => {
      request.abort();
    };
  }, [dispatch]);

  if (data.length)
    return (
      <>
        <Tasks />
        <TaskDialog />
      </>
    );
  return null;
};

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import { TaskDialog } from './TaskDialog';
import { Tasks } from './Tasks';
import { getTasks, tasksSelector } from './tasksSlice';

export const TasksPage = () => {
  const { loading } = useAppSelector(tasksSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const request = dispatch(getTasks());
    return () => {
      request.abort();
    };
  }, [dispatch]);

  if (!loading)
    return (
      <>
        <Tasks />
        <TaskDialog />
      </>
    );
  return null;
};

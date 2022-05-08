import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import draftToHtml from 'draftjs-to-html';
import { forwardRef, ReactElement, Ref } from 'react';
import { closeTask, openedTaskSelector } from './tasksSlice';

const Transition = forwardRef(
  (props: TransitionProps & { children: ReactElement }, ref: Ref<unknown>) => (
    <Slide direction="up" ref={ref} {...props} />
  ),
);

export const TaskDialog = () => {
  const task = useAppSelector(openedTaskSelector);
  const dispatch = useAppDispatch();

  const onTaskClose = () => {
    dispatch(closeTask());
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={Boolean(task)}
      onClose={onTaskClose}
      TransitionComponent={Transition}
    >
      <DialogTitle>{task?.title}</DialogTitle>
      <DialogContent>
        {task?.description && (
          <DialogContentText
            dangerouslySetInnerHTML={{
              __html: draftToHtml(JSON.parse(task.description)),
            }}
          />
        )}
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose}>Agree</Button>
      </DialogActions> */}
    </Dialog>
  );
};

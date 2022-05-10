import {
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import draftToHtml from 'draftjs-to-html';
import { forwardRef, ReactElement, Ref } from 'react';
import { FlagForm } from './FlagForm';
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
      <DialogTitle>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flex={1}
          overflow="hidden"
        >
          <Typography variant="h4" title={task?.title} noWrap>
            {task?.title}
          </Typography>
          <Chip
            label={`${task?.category} ${task?.points}`}
            variant="outlined"
            color="primary"
            size="small"
            sx={{ ml: 1 }}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        {task?.description && (
          <DialogContentText
            dangerouslySetInnerHTML={{
              __html: draftToHtml(JSON.parse(task.description)),
            }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <FlagForm />
      </DialogActions>
    </Dialog>
  );
};

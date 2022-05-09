import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Switch,
  Typography,
} from '@mui/material';
import { Task } from 'interfaces';
import { useState } from 'react';
import { edit } from 'services/api/task';
import { UpsertTaskForm } from './UpsertTaskForm';

interface ITaskToggleFormProps {
  task: Task;
  onEdit: () => void;
}

export const TaskToggleForm = ({ task, onEdit }: ITaskToggleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [checked, setChecked] = useState(task.enabled);
  const [loading, setLoading] = useState(false);

  const handleChange = async () => {
    try {
      setLoading(true);
      setChecked((c) => !c);
      await edit(task.id, { enabled: !checked });
    } catch (error) {
      setChecked((c) => !c);
    } finally {
      setLoading(false);
    }
  };

  const onEditClick = () => setIsEditing(true);
  const onEditClose = () => setIsEditing(false);
  const onSubmit = () => {
    onEdit();
    onEditClose();
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flex={1}
      ml={1}
    >
      <FormControlLabel
        sx={{ overflow: 'hidden' }}
        disableTypography
        disabled={loading}
        control={<Switch checked={checked} onChange={handleChange} />}
        label={
          <Typography title={task.title} noWrap>
            {task.title}
          </Typography>
        }
      />
      <Box display="flex" alignItems="center">
        <Chip
          label={`${task.category} ${task.points}`}
          variant="outlined"
          color="primary"
          size="small"
          sx={{ ml: 1 }}
        />
        <IconButton onClick={onEditClick}>
          <EditIcon />
        </IconButton>
        <Dialog open={isEditing} onClose={onEditClose}>
          <DialogTitle>Редактирование</DialogTitle>
          <DialogContent sx={{ overflow: 'visible' }}>
            <UpsertTaskForm
              id="task-edit"
              defaultValues={task}
              onSubmit={onSubmit}
            />
          </DialogContent>
          <DialogActions sx={{ p: '8px 24px' }}>
            <Button onClick={onEditClose}>Отмена</Button>
            <Button variant="contained" type="submit" form="task-edit">
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

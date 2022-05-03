import { Box, Chip, FormControlLabel, Switch, Typography } from '@mui/material';
import { Task } from 'interfaces';
import { useState } from 'react';
import { edit } from 'services/api/task';

interface ITaskToggleFormProps {
  task: Task;
}

export const TaskToggleForm = ({ task }: ITaskToggleFormProps) => {
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

  return (
    <FormControlLabel
      sx={{ display: 'flex' }}
      disableTypography
      disabled={loading}
      control={<Switch checked={checked} onChange={handleChange} />}
      label={
        <Box display="flex" justifyContent="space-between" flex={1}>
          <Typography>{task.title}</Typography>
          <Chip
            label={`${task.category} ${task.points}`}
            variant="outlined"
            color="primary"
            size="small"
          />
        </Box>
      }
    />
  );
};

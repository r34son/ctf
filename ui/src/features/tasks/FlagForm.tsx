import { Button, InputAdornment, TextField } from '@mui/material';
import { api } from 'app/api';
import { useAppDispatch } from 'app/hooks';
import { AxiosError } from 'axios';
import { Task } from 'common/interfaces';
import { useSnackbar } from 'notistack';
import { ChangeEvent, useState } from 'react';
import { closeTask } from './tasksSlice';

interface FlagFormProps {
  taskId: Task['id'];
}

export const FlagForm = ({ taskId }: FlagFormProps) => {
  const [flag, setFlag] = useState('');
  const [isError, setIsError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFlag(e.target.value);
    setIsError(false);
  };

  const onSubmit = async () => {
    try {
      await api.post('/task/solve', { taskId, flag });
      enqueueSnackbar('Флаг принят!', { variant: 'success' });
      dispatch(closeTask());
    } catch (error) {
      const typedError = error as AxiosError<{ message: string }>;
      setIsError(true);
      enqueueSnackbar(typedError.response?.data.message, { variant: 'error' });
    }
  };

  return (
    <TextField
      fullWidth
      autoComplete="off"
      placeholder="Флаг"
      value={flag}
      onChange={onChange}
      error={isError}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button variant="contained" disabled={!flag} onClick={onSubmit}>
              Отправить
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
};

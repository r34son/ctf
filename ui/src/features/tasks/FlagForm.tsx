import { Button, InputAdornment, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';

export const FlagForm = () => {
  const [flag, setFlag] = useState('');
  const [error, setError] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFlag(e.target.value);
    setError(false);
  };

  const onSubmit = async () => {
    try {
      await Promise.resolve();
    } catch {
      setError(true);
    }
  };

  return (
    <TextField
      fullWidth
      placeholder="Флаг"
      value={flag}
      onChange={onChange}
      error={error}
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

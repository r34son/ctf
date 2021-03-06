import LoadingButton from '@mui/lab/LoadingButton';
import { Stack, TextField } from '@mui/material';
import { TeamCredentials } from 'interfaces';
import { useSnackbar } from 'notistack';
import { SubmitHandler, useForm } from 'react-hook-form';
import { create } from 'services/api/team';

export const CreateTeamForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<TeamCredentials>();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: SubmitHandler<TeamCredentials> = async (data) => {
    try {
      await create(data);
      enqueueSnackbar(`Команда ${data.name} создана.`, { variant: 'success' });
      reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      enqueueSnackbar(error.response.data.error, { variant: 'error' });
      setError('name', {}, { shouldFocus: true });
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          autoFocus
          fullWidth
          label="Название команды"
          error={Boolean(errors.name)}
          {...register('name', { required: true })}
        />
        <TextField
          fullWidth
          autoComplete="new-password"
          label="Пароль"
          error={Boolean(errors.password)}
          {...register('password', { required: true })}
        />
        <LoadingButton loading={isSubmitting} variant="outlined" type="submit">
          Создать
        </LoadingButton>
      </Stack>
    </form>
  );
};

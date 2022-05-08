import LoadingButton from '@mui/lab/LoadingButton';
import { MenuItem, Stack, TextField } from '@mui/material';
import { AxiosError } from 'axios';
import { DraftEditor } from 'components/Editor';
import { CATEGORIES } from 'consts';
import { Task } from 'interfaces';
import { useSnackbar } from 'notistack';
import { ChangeEvent } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { create } from 'services/api/task';

interface UpsertTaskFormProps {
  onSubmit: () => void;
}

export const UpsertTaskForm = ({
  onSubmit: onSubmitProp,
}: UpsertTaskFormProps) => {
  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { isSubmitting },
  } = useForm<Task>();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: SubmitHandler<Task> = async (data) => {
    try {
      await create(data);
      enqueueSnackbar(`Task "${data.title}" created.`, { variant: 'success' });
      reset();
      onSubmitProp();
    } catch (error) {
      const axiosError = error as AxiosError<{
        error: Record<keyof Task, string>;
      }>;
      if (axiosError?.response?.status === 422) {
        Object.entries<string>(axiosError?.response.data.error).forEach(
          ([key, message]) => setError(key as keyof Task, { message }),
        );
      }
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Controller
          control={control}
          name="title"
          rules={{ required: true }}
          defaultValue=""
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <TextField
              autoFocus
              fullWidth
              label="Title"
              error={Boolean(error)}
              {...field}
              inputRef={ref}
            />
          )}
        />
        <Stack direction="row" spacing={2}>
          <Controller
            control={control}
            name="category"
            rules={{ required: true }}
            defaultValue=""
            render={({ field: { ref, ...field }, fieldState: { invalid } }) => (
              <TextField
                select
                fullWidth
                label="Category"
                error={invalid}
                {...field}
                inputRef={ref}
              >
                {CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            control={control}
            name="points"
            rules={{ required: true, min: 1 }}
            render={({
              field: { ref, value, onChange, ...field },
              fieldState: { invalid },
            }) => (
              <NumberFormat
                allowNegative={false}
                decimalScale={0}
                label="Points"
                customInput={TextField}
                error={invalid}
                inputRef={ref}
                {...field}
                value={value ?? ''}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  onChange(+e.target.value)
                }
              />
            )}
          />
        </Stack>
        <Controller
          control={control}
          name="description"
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { ref, ...field } }) => (
            <DraftEditor placeholder="Описание" {...field} />
          )}
        />
        <Controller
          control={control}
          name="flag"
          rules={{ required: true }}
          defaultValue=""
          render={({ field: { ref, ...field }, fieldState: { invalid } }) => (
            <TextField
              fullWidth
              label="Flag"
              error={invalid}
              {...field}
              inputRef={ref}
            />
          )}
        />
        <LoadingButton loading={isSubmitting} variant="outlined" type="submit">
          Create
        </LoadingButton>
      </Stack>
    </form>
  );
};

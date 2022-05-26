import LoadingButton from '@mui/lab/LoadingButton';
import { MenuItem, Stack, TextField } from '@mui/material';
import { AxiosError } from 'axios';
import { DraftEditor } from 'components/Editor';
import { CATEGORIES } from 'consts';
import { Task } from 'interfaces';
import { useSnackbar } from 'notistack';
import { ChangeEvent } from 'react';
import {
  Controller,
  DefaultValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { create, edit } from 'services/api/task';

interface UpsertTaskFormProps {
  id?: string;
  defaultValues?: DefaultValues<Task>;
  onSubmit: () => void;
}

export const UpsertTaskForm = ({
  id,
  defaultValues,
  onSubmit: onSubmitProp,
}: UpsertTaskFormProps) => {
  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { isSubmitting },
  } = useForm<Task>({ defaultValues });
  const { enqueueSnackbar } = useSnackbar();

  const isEditing = Boolean(defaultValues?.id);

  const onSubmit: SubmitHandler<Task> = async (data) => {
    try {
      await (isEditing
        ? edit(defaultValues?.id as Task['id'], data)
        : create(data));
      enqueueSnackbar(
        `Задание "${data.title}" успешно ${
          isEditing ? 'отредактировано' : 'создано'
        }.`,
        { variant: 'success' },
      );
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
    <form id={id} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
              label="Заголовок"
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
                label="Категория"
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
                label="Очки"
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
          rules={{ required: !isEditing }}
          render={({
            field: { ref, value = '', ...field },
            fieldState: { invalid },
          }) => (
            <TextField
              fullWidth
              label="Флаг"
              error={invalid}
              value={value}
              {...field}
              inputRef={ref}
            />
          )}
        />
        {!isEditing && (
          <LoadingButton
            loading={isSubmitting}
            variant="outlined"
            type="submit"
          >
            Создать
          </LoadingButton>
        )}
      </Stack>
    </form>
  );
};

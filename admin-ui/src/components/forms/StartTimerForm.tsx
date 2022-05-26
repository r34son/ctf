import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { LoadingButton } from '@mui/lab';
import TimePicker from '@mui/lab/TimePicker';
import { TextField, TextFieldProps } from '@mui/material';
import { AxiosError } from 'axios';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { start } from 'services/api/timer';

type StartTimerFormValues = {
  duration: moment.Moment | null;
};

export const StartTimerForm = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StartTimerFormValues>({
    defaultValues: { duration: null },
  });
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: SubmitHandler<StartTimerFormValues> = async ({
    duration,
  }) => {
    try {
      const normalizedDuration = moment.duration(
        (duration as moment.Moment).format('hh:mm'),
      );
      await start(+normalizedDuration.asMilliseconds());
      enqueueSnackbar('Таймер запущен.', { variant: 'success' });
      reset();
    } catch (error) {
      const axiosError = error as AxiosError;
      enqueueSnackbar(axiosError?.response?.data.error, { variant: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* https://github.com/react-hook-form/react-hook-form/issues/4670 */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Controller
        control={control}
        name="duration"
        rules={{ validate: (date) => date?.isValid() }}
        render={({ field, fieldState: { error } }) => (
          <TimePicker
            desktopModeMediaQuery="@media (max-width: 0)"
            label="Time"
            renderInput={(params: TextFieldProps) => (
              <TextField
                size="small"
                sx={{ marginRight: 1, height: 36.5, width: 108 }}
                {...params}
                error={Boolean(error)}
                InputProps={{
                  ...params.InputProps,
                  sx: { height: 36.5 },
                }}
                inputProps={{
                  ...params.inputProps,
                  placeholder: 'hh:mm',
                }}
              />
            )}
            {...field}
          />
        )}
      />
      <LoadingButton
        variant="outlined"
        loading={isSubmitting}
        type="submit"
        startIcon={<PlayArrowIcon />}
      >
        Старт / Рестарт
      </LoadingButton>
    </form>
  );
};

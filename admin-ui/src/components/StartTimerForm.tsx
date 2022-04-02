import TimePicker from '@mui/lab/TimePicker';
import { Button, TextField, TextFieldProps } from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { start } from 'services/api/timer';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import moment from 'moment';

type StartTimerFormValues = {
  duration: moment.Moment | null;
};

export const StartTimerForm = () => {
  const { control, handleSubmit } = useForm<StartTimerFormValues>({
    defaultValues: { duration: null },
  });

  const onSubmit: SubmitHandler<StartTimerFormValues> = ({ duration }) => {
    const normalizedDuration = moment.duration(
      (duration as moment.Moment).format('hh:mm'),
    );
    start(+normalizedDuration.asMilliseconds());
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
      <Button type="submit" startIcon={<PlayArrowIcon />}>
        Start / Restart
      </Button>
    </form>
  );
};

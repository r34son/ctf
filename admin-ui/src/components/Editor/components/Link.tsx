import AddLinkIcon from '@mui/icons-material/AddLink';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Popover,
  Stack,
  TextField,
  ToggleButton,
} from '@mui/material';
import { URL_REGEXP } from 'consts';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface LinkForm {
  title: string;
  target: string;
  openInNewWindow: boolean;
}

interface ILinkProps {
  config: {
    link: {
      title: string;
    };
    unlink: {
      title: string;
    };
    options: string[];
    defaultTargetOption: string;
  };
  currentState: {
    link?: {
      target: string;
      title: string;
      targetOption: string;
    };
    selectionText: string;
  };
  onChange: (...args: unknown[]) => void;
}

export const Link = ({
  config: { options, link, unlink, defaultTargetOption },
  currentState,
  onChange,
}: ILinkProps) => {
  const { handleSubmit, control, watch, reset } = useForm<LinkForm>({
    defaultValues: {
      title: '',
      target: '',
      openInNewWindow: defaultTargetOption === '_blank',
    },
  });

  const openInNewWindowValue = watch('openInNewWindow');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const onAddLinkClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const { link: linkState } = currentState;
    setAnchorEl(e.currentTarget);
    reset({
      title: linkState?.title || currentState.selectionText,
      target: linkState?.target || '',
      openInNewWindow: linkState?.targetOption
        ? linkState.targetOption === '_blank'
        : openInNewWindowValue,
    });
  };

  const onClose = () => {
    reset();
    setAnchorEl(null);
  };

  const onSubmit: SubmitHandler<LinkForm> = ({
    target,
    title,
    openInNewWindow,
  }) => {
    onChange('link', title, target, openInNewWindow ? '_blank' : '_self');
    onClose();
  };

  const onUnlinkClick = () => onChange('unlink');

  return (
    <>
      {options.includes('link') && (
        <ToggleButton
          value=""
          selected={false}
          onChange={onAddLinkClick}
          title={link.title}
        >
          <AddLinkIcon />
        </ToggleButton>
      )}
      {options.includes('unlink') && (
        <ToggleButton
          value=""
          selected={false}
          onChange={onUnlinkClick}
          disabled={!currentState.link}
          title={unlink.title}
        >
          <AddLinkIcon />
        </ToggleButton>
      )}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <form autoComplete="off">
          <Stack spacing={2} p={1}>
            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              defaultValue=""
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <TextField
                  autoFocus
                  fullWidth
                  label="Текст"
                  error={Boolean(error)}
                  {...field}
                  inputRef={ref}
                />
              )}
            />
            <Controller
              control={control}
              name="target"
              rules={{ required: true, pattern: URL_REGEXP }}
              defaultValue=""
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  label="Адрес ссылки"
                  error={Boolean(error)}
                  {...field}
                  inputRef={ref}
                />
              )}
            />
            <Controller
              control={control}
              name="openInNewWindow"
              render={({ field: { ref, value, ...field } }) => (
                <FormControlLabel
                  control={
                    <Checkbox checked={value} {...field} inputRef={ref} />
                  }
                  label="Открывать в новом окне"
                />
              )}
            />
            <Stack direction="row" justifyContent="space-between">
              <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                Добавить
              </Button>
              <Button onClick={onClose}>Отмена</Button>
            </Stack>
          </Stack>
        </form>
      </Popover>
    </>
  );
};

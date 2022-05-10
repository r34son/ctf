import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

interface IInlineProps {
  currentState: Record<string, boolean>;
  onChange: (k: string) => void;
}

export const Inline = ({ currentState, onChange }: IInlineProps) => {
  const value = Object.keys(currentState).filter((k) => currentState[k]);
  return (
    <ToggleButtonGroup
      value={value}
      onChange={(_event, newFormats: string[]) => {
        const toggleValue = value
          .filter((x) => !newFormats.includes(x))
          .concat(newFormats.filter((x) => !value.includes(x)))[0];
        onChange(toggleValue);
      }}
    >
      <ToggleButton value="bold">
        <FormatBoldIcon />
      </ToggleButton>
      <ToggleButton value="italic">
        <FormatItalicIcon />
      </ToggleButton>
      <ToggleButton value="underline">
        <FormatUnderlinedIcon />
      </ToggleButton>
      <ToggleButton value="strikethrough">
        <StrikethroughSIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

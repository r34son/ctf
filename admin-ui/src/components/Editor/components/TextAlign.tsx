import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

interface AlignmentConfig {
  title: string;
}

interface TextAlignProps {
  config: {
    options: string[];
    left: AlignmentConfig;
    center: AlignmentConfig;
    right: AlignmentConfig;
    justify: AlignmentConfig;
  };
  onChange: (...args: unknown[]) => void;
  currentState: { textAlignment: string };
}

export const TextAlign = ({
  config: { options, left, center, right, justify },
  onChange,
  currentState: { textAlignment },
}: TextAlignProps) => (
  <ToggleButtonGroup
    exclusive
    value={textAlignment}
    onChange={(_, v) => onChange(v)}
  >
    {options.includes('left') && (
      <ToggleButton value="left" title={left.title}>
        <FormatAlignLeftIcon />
      </ToggleButton>
    )}
    {options.includes('center') && (
      <ToggleButton value="center" title={center.title}>
        <FormatAlignCenterIcon />
      </ToggleButton>
    )}
    {options.includes('right') && (
      <ToggleButton value="right" title={right.title}>
        <FormatAlignRightIcon />
      </ToggleButton>
    )}
    {options.includes('justify') && (
      <ToggleButton value="justify" title={justify.title}>
        <FormatAlignJustifyIcon />
      </ToggleButton>
    )}
  </ToggleButtonGroup>
);

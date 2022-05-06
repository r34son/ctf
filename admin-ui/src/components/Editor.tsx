import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { EditorState } from 'draft-js';
import { useState } from 'react';
import { Editor, EditorProps } from 'react-draft-wysiwyg';

interface IInlineProps {
  currentState: Record<string, boolean>;
  onChange: (k: string) => void;
}

const Inline = ({ currentState, onChange }: IInlineProps) => {
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

interface DraftEditorProps extends Omit<EditorProps, 'onChange'> {
  value: string;
  onChange: (state: string) => void;
}

export const DraftEditor = ({
  value,
  onChange,
  ...editorProps
}: DraftEditorProps) => {
  const [editorState, setEditorState] = useState(() =>
    value
      ? EditorState.createWithContent(JSON.parse(value))
      : EditorState.createEmpty(),
  );

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={setEditorState}
      onContentStateChange={(contentState) =>
        onChange(JSON.stringify(contentState))
      }
      locale="ru"
      toolbarStyle={{ border: 0, padding: 0, backgroundColor: 'transparent' }}
      editorStyle={{
        border: '1px solid rgba(255, 255, 255, 0.23)',
        borderRadius: 4,
        marginTop: 16,
        padding: 14,
      }}
      {...editorProps}
      // TODO: add links
      toolbar={{
        options: [
          'inline',
          // 'blockType',
          // 'fontSize',
          // 'fontFamily',
          // 'list',
          // 'textAlign',
          // 'colorPicker',
          // 'link',
          // 'embedded',
          // 'emoji',
          // 'image',
          // 'remove',
          // 'history',
        ],
        inline: { component: Inline },
      }}
    />
  );
};

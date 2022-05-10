import { convertFromRaw, EditorState } from 'draft-js';
import { useEffect, useState } from 'react';
import { Editor, EditorProps } from 'react-draft-wysiwyg';
import { Inline } from './components/Inline';
import { Link } from './components/Link';
import { TextAlign } from './components/TextAlign';

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
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(value)))
      : EditorState.createEmpty(),
  );

  useEffect(() => {
    if (!value) setEditorState(EditorState.createEmpty());
  }, [value]);

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={setEditorState}
      onContentStateChange={(contentState) =>
        onChange(JSON.stringify(contentState))
      }
      locale="ru"
      toolbarStyle={{
        border: 0,
        padding: 0,
        backgroundColor: 'transparent',
        display: 'flex',
        gap: 8,
      }}
      editorStyle={{
        border: '1px solid rgba(255, 255, 255, 0.23)',
        borderRadius: 4,
        marginTop: 16,
        padding: 14,
      }}
      {...editorProps}
      toolbar={{
        options: [
          'inline',
          // 'blockType',
          // 'fontSize',
          // 'fontFamily',
          // 'list',
          'textAlign',
          // 'colorPicker',
          'link',
          // 'embedded',
          // 'emoji',
          // 'image',
          // 'remove',
          // 'history',
        ],
        inline: { component: Inline },
        textAlign: { component: TextAlign },
        link: { component: Link },
      }}
    />
  );
};

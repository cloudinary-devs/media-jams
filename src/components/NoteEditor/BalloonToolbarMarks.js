import {
  BalloonToolbar,
  useStoreEditorRef,
  useEventEditorId,
  ToolbarMark,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  getSlatePluginType,
} from '@udecode/slate-plugins';
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa';

export default function BalloonToolbarMarks() {
  const editor = useStoreEditorRef(useEventEditorId('focus'));

  const arrow = false;
  const theme = 'dark';
  const direction = 'top';
  const hiddenDelay = 0;
  const tooltip = {
    arrow: true,
    delay: 0,
    duration: [200, 0],
    hideOnClick: false,
    offset: [0, 17],
    placement: 'top',
  };

  return (
    <BalloonToolbar
      direction={direction}
      hiddenDelay={hiddenDelay}
      theme={theme}
      arrow={arrow}
    >
      <ToolbarMark
        type={getSlatePluginType(editor, MARK_BOLD)}
        icon={<FaBold />}
        tooltip={{ content: 'Bold (⌘B)', ...tooltip }}
      />
      <ToolbarMark
        type={getSlatePluginType(editor, MARK_ITALIC)}
        icon={<FaItalic />}
        tooltip={{ content: 'Italic (⌘I)', ...tooltip }}
      />
      <ToolbarMark
        type={getSlatePluginType(editor, MARK_UNDERLINE)}
        icon={<FaUnderline />}
        tooltip={{ content: 'Underline (⌘U)', ...tooltip }}
      />
    </BalloonToolbar>
  );
}

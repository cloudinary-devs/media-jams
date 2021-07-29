import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import {
  BalloonToolbar as BalloonToolbarMarks,
  useStoreEditorRef,
  useEventEditorId,
  ToolbarMark,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  getPlatePluginType,
} from '@udecode/plate';
import { Box } from '@chakra-ui/react';
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa';

export default function BalloonToolbar() {
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
    <Box
      styles={{
        zIndex: '999999 !important',
      }}
      as={BalloonToolbarMarks}
      direction={direction}
      hiddenDelay={hiddenDelay}
      theme={theme}
      arrow={arrow}
    >
      <ToolbarMark
        type={getPlatePluginType(editor, MARK_BOLD)}
        icon={<FaBold />}
        tooltip={{ content: 'Bold (⌘B)', ...tooltip }}
      />
      <ToolbarMark
        type={getPlatePluginType(editor, MARK_ITALIC)}
        icon={<FaItalic />}
        tooltip={{ content: 'Italic (⌘I)', ...tooltip }}
      />
      <ToolbarMark
        type={getPlatePluginType(editor, MARK_UNDERLINE)}
        icon={<FaUnderline />}
        tooltip={{ content: 'Underline (⌘U)', ...tooltip }}
      />
    </Box>
  );
}

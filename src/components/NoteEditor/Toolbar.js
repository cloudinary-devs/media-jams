import {
  ELEMENT_CODE_BLOCK,
  ELEMENT_OL,
  ELEMENT_UL,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
  ToolbarCodeBlock,
  ToolbarList,
  ToolbarMark,
  useStoreEditorRef,
  useEventEditorId,
  getPlatePluginType,
} from '@udecode/plate';

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaCode,
  FaListOl,
  FaListUl,
} from 'react-icons/fa';

export default function Toolbar() {
  const editor = useStoreEditorRef(useEventEditorId('focus'));
  return (
    <>
      <ToolbarMark
        type={getPlatePluginType(editor, MARK_BOLD)}
        icon={<FaBold />}
      />
      <ToolbarMark
        type={getPlatePluginType(editor, MARK_ITALIC)}
        icon={<FaItalic />}
      />
      <ToolbarMark
        type={getPlatePluginType(editor, MARK_UNDERLINE)}
        icon={<FaUnderline />}
      />
      <ToolbarMark
        type={getPlatePluginType(editor, MARK_STRIKETHROUGH)}
        icon={<FaStrikethrough />}
      />
      <ToolbarList
        type={getPlatePluginType(editor, ELEMENT_UL)}
        icon={<FaListUl />}
      />
      <ToolbarList
        type={getPlatePluginType(editor, ELEMENT_OL)}
        icon={<FaListOl />}
      />
      <ToolbarCodeBlock
        type={getPlatePluginType(editor, ELEMENT_CODE_BLOCK)}
        icon={<FaCode />}
      />
    </>
  );
}

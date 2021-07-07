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
  getSlatePluginType,
} from '@udecode/slate-plugins';

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
        type={getSlatePluginType(editor, MARK_BOLD)}
        icon={<FaBold />}
      />
      <ToolbarMark
        type={getSlatePluginType(editor, MARK_ITALIC)}
        icon={<FaItalic />}
      />
      <ToolbarMark
        type={getSlatePluginType(editor, MARK_UNDERLINE)}
        icon={<FaUnderline />}
      />
      <ToolbarMark
        type={getSlatePluginType(editor, MARK_STRIKETHROUGH)}
        icon={<FaStrikethrough />}
      />
      <ToolbarList
        type={getSlatePluginType(editor, ELEMENT_UL)}
        icon={<FaListUl />}
      />
      <ToolbarList
        type={getSlatePluginType(editor, ELEMENT_OL)}
        icon={<FaListOl />}
      />
      <ToolbarCodeBlock
        type={getSlatePluginType(editor, ELEMENT_CODE_BLOCK)}
        icon={<FaCode />}
      />
    </>
  );
}

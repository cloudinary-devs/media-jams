import React from 'react';
import { Box } from '@chakra-ui/react';
import BalloonToolbarMarks from './BalloonToolbarMarks';

import { optionsAutoformat } from './autoFormat';

import {
  SlatePlugins,
  HeadingToolbar,
  createReactPlugin,
  createHistoryPlugin,
  createParagraphPlugin,
  createBlockquotePlugin,
  createCodeBlockPlugin,
  createHeadingPlugin,
  createBoldPlugin,
  createItalicPlugin,
  createUnderlinePlugin,
  createStrikethroughPlugin,
  createCodePlugin,
  createSlatePluginsComponents,
  createSlatePluginsOptions,
  createAutoformatPlugin,
  createResetNodePlugin,
  createDeserializeHTMLPlugin,
  createTrailingBlockPlugin,
  createSelectOnBackspacePlugin,
  createNodeIdPlugin,
  createExitBreakPlugin,
  createSoftBreakPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createListPlugin,
  ELEMENT_PARAGRAPH,
  ELEMENT_IMAGE,
} from '@udecode/slate-plugins';

import {
  optionsResetBlockTypePlugin,
  optionsExitBreakPlugin,
  optionsSoftBreakPlugin,
} from './pluginOptions';
import { withStyledPlaceHolders } from './withStyledPlaceholders';

import Toolbar from './Toolbar';
let components = createSlatePluginsComponents();
const options = createSlatePluginsOptions();

components = withStyledPlaceHolders(components);

export default function NoteEditor() {
  const plugins = React.useMemo(() => {
    const p = [
      // editor
      createReactPlugin(),
      createHistoryPlugin(),
      createNodeIdPlugin(),
      createSubscriptPlugin(),
      createSuperscriptPlugin(),
      createAutoformatPlugin(optionsAutoformat),
      createResetNodePlugin(optionsResetBlockTypePlugin),
      createSoftBreakPlugin(optionsSoftBreakPlugin),
      createExitBreakPlugin(optionsExitBreakPlugin),
      createTrailingBlockPlugin({
        type: ELEMENT_PARAGRAPH,
      }),
      createSelectOnBackspacePlugin({
        allow: [ELEMENT_IMAGE],
      }),

      // elements
      createListPlugin(),
      createParagraphPlugin(),
      createBlockquotePlugin(),
      createCodeBlockPlugin(),
      createHeadingPlugin(),

      // marks
      createBoldPlugin(),
      createItalicPlugin(),
      createUnderlinePlugin(),
      createStrikethroughPlugin(),
      createCodePlugin(),
    ];

    p.push(createDeserializeHTMLPlugin({ plugins: p }));

    return p;
  }, []);

  const editableProps = {
    placeholder: 'Start editing here...',
    spellCheck: false,
  };

  return (
    <Box
      padding="20px 20px 0px 20px"
      border="1px solid #D3DDE6"
      h="100%"
      maxH="450px"
      borderRadius="8px"
    >
      <SlatePlugins
        id="NoteEditor"
        editableProps={editableProps}
        plugins={plugins}
        components={components}
        options={options}
      >
        <HeadingToolbar>
          <Toolbar />
        </HeadingToolbar>
        <BalloonToolbarMarks />
      </SlatePlugins>
    </Box>
  );
}

import React from 'react';
import { Box } from '@chakra-ui/react';
import BalloonToolbarMarks from './BalloonToolbarMarks';

import { optionsAutoformat } from './autoFormat';

import {
  SlatePlugins,
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
    <Box border="1px solid black" padding="30px">
      <SlatePlugins
        id="1"
        editableProps={editableProps}
        plugins={plugins}
        components={components}
        options={options}
      >
        <BalloonToolbarMarks />
      </SlatePlugins>
    </Box>
  );
}

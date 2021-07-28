import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import BalloonToolbar from './BalloonToolbar';

import { optionsAutoformat } from './autoFormat';

import {
  Plate,
  HeadingToolbar,
  ELEMENT_H1,
  createNormalizeTypesPlugin,
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
  createPlateComponents,
  createPlateOptions,
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
  withProps,
} from '@udecode/plate';

import {
  optionsResetBlockTypePlugin,
  optionsExitBreakPlugin,
  optionsSoftBreakPlugin,
} from './pluginOptions';

import Toolbar from './Toolbar';
let components = createPlateComponents();
const options = createPlateOptions();

export default function NoteEditor({ title, body, setBody }) {
  const [value, setValue] = React.useState(body);
  console.log(value);
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
      createNormalizeTypesPlugin({
        rules: [
          {
            path: [1],
            strictType: ELEMENT_PARAGRAPH,
          },
        ],
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
    placeholder: 'Type your notes here...',
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
      <Plate
        id="NoteEditor"
        editableProps={editableProps}
        plugins={plugins}
        components={components}
        options={options}
        value={value}
        onChange={(v) => {
          setValue(v);
          setBody(v);
        }}
      >
        <HeadingToolbar>
          <Toolbar />
        </HeadingToolbar>
        <BalloonToolbar />
      </Plate>
    </Box>
  );
}

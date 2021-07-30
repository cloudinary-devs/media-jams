import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  chakra,
  useClipboard,
} from '@chakra-ui/react';
import theme from 'prism-react-renderer/themes/nightOwl';
import React, { useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import Highlight from './highlight';
import scope from './react-live-scope';

/**
 * Heavily inspired by https://github.com/chakra-ui/chakra-ui/tree/main/website/src/components/codeblock
 * and https://github.com/prisma/docs/blob/master/src/components/customMdx/code.tsx
 */

export const liveErrorStyle = {
  fontFamily: 'SF Mono, Menlo, monospace',
  fontSize: 14,
  padding: '1em',
  overflowX: 'auto',
  color: 'white',
  backgroundColor: 'red',
};

const LiveCodePreview = chakra(LivePreview, {
  baseStyle: {
    fontFamily: 'body',
    mt: 5,
    p: 3,
    borderWidth: 1,
    borderRadius: '12px',
  },
});

const CopyButton = (props) => (
  <Button
    size="sm"
    position="absolute"
    textTransform="uppercase"
    colorScheme="whiteAlpha"
    fontSize="xs"
    height="24px"
    top={0}
    zIndex="1"
    right="1.25em"
    {...props}
  />
);

const propList = ['copy', 'bash-symbol', 'terminal', 'no-lines'];
function CodeBlock(props) {
  const {
    className,
    live = true,
    manual,
    render,
    children,
    metastring,
    ...rest
  } = props;
  const [editorCode, setEditorCode] = useState(children.trim());

  const language = className?.replace(/language-/, '');
  const { hasCopied, onCopy } = useClipboard(editorCode);
  let hasNoLine = props['no-lines'] || language === 'no-lines';

  return (
    <Box position="relative" zIndex="0">
      <Box
        padding="5"
        mx={{ base: '-6', md: '0' }}
        rounded={{ base: 0, md: '8px' }}
        my="8"
        bg="#011627"
        px="0"
        overflow="hidden"
        lineHeight="120%"
      >
        <Highlight
          codeString={editorCode}
          language={language}
          metastring={metastring}
          showLines={!hasNoLine}
        />
      </Box>
      <CopyButton
        display={{ base: 'none', md: 'inline' }}
        top="4"
        onClick={onCopy}
      >
        {hasCopied ? 'copied' : 'copy'}
      </CopyButton>
    </Box>
  );
}

CodeBlock.defaultProps = {
  mountStylesheet: false,
};

export default CodeBlock;

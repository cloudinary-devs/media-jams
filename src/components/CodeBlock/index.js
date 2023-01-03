import {
  Box,
  Button,
  useClipboard,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Highlight from './highlight';

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

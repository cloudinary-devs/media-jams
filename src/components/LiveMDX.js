import React, { useContext } from 'react';
import { ThemeContext } from '@emotion/react';

import { Box, Image, Heading } from '@chakra-ui/react';
import { compileSync } from '@mdx-js/mdx';
import { MDXProvider, mdx as createElement } from '@mdx-js/react';
import { LiveProvider, LivePreview, LiveError } from 'react-live';
import removeImports from 'remark-mdx-remove-imports';
import removeExports from 'remark-mdx-remove-exports';

import blocksToText from '@lib/blocksToText';
import CodeBlock from '@components/CodeBlock';
import CodeSandbox from '@components/CodeSandbox';
import EmbeddedIframe from '@components/EmbeddedIframe';
const bundledComponents = {
  CodeSandbox,
  code: CodeBlock,
  img: Image,
  iframe: EmbeddedIframe,
};

/**
 * Used working example of mdx playground
 * https://github.com/mdx-js/mdx/blob/master/packages/gatsby-theme-mdx/src/components/playground-editor.js
 *
 */

const transformCode = (src) => {
  let transpiledMDX = '';

  try {
    transpiledMDX = compileSync(src, {
      skipExport: true,
      remarkPlugins: [removeImports, removeExports],
    });
  } catch (e) {
    return e;
  }

  return `
  ${transpiledMDX}
  render(
        <MDXProvider components={components}>
        <MDXContent {...props} />
        </MDXProvider>
  )
`;
};

const generateOutputs = (src) => {
  let jsx = '';
  let mdast,
    hast = {};

  try {
    jsx = compileSync(src, {
      skipExport: true,
      remarkPlugins: [
        () => (ast) => {
          mdast = ast;
          return ast;
        },
      ],
      rehypePlugins: [
        () => (ast) => {
          hast = ast;
          return ast;
        },
      ],
    });
  } catch (error) {
    return { error };
  }

  return { jsx, mdast, hast };
};

const LiveMDX = ({ content, scope = {}, ...props }) => {
  const theme = useContext(ThemeContext);
  const { jsx, mdast, hast, error } = generateOutputs(content);
  return (
    <Box>
      <LiveProvider
        {...props}
        code={content}
        scope={{
          components: bundledComponents,
          MDXProvider,
          props: {},
          // mdx: createElement,
        }}
        noInline={true}
        transformCode={(code) => {
          return transformCode(code);
        }}
        theme={theme.prism}
      >
        {error ? (
          <div>
            <Heading color="red">Error</Heading>
            <CodeBlock>{error.toString()}</CodeBlock>
            <LiveError />
          </div>
        ) : (
          <LivePreview flex={1} />
        )}
        <LiveError
          style={{
            paddingTop: '100px',
            fontFamily: 'monospace',
            fontSize: 38,
            p: 2,
            color: 'red',
            whiteSpace: 'pre-line',
          }}
        />
      </LiveProvider>
    </Box>
  );
};

export default LiveMDX;

import React, { useContext, Fragment } from 'react';
import { css, jsx, ThemeContext } from '@emotion/react';

import { Box } from '@chakra-ui/react';
import MDX from '@mdx-js/runtime';
import mdx from '@mdx-js/mdx';
import { MDXProvider, mdx as createElement } from '@mdx-js/react';
import { LiveProvider, LivePreview, LiveEditor, LiveError } from 'react-live';
import removeImports from 'remark-mdx-remove-imports';
import removeExports from 'remark-mdx-remove-exports';

import blocksToText from '@lib/blocksToText';
import CodeBlock from '@components/CodeBlock';
import CodeSandbox from '@components/CodeSandbox';
/**
 * Used working example of mdx playground
 * https://github.com/mdx-js/mdx/blob/master/packages/gatsby-theme-mdx/src/components/playground-editor.js
 *
 */

const transformCode = (src) => {
  let transpiledMDX = '';

  try {
    transpiledMDX = mdx.sync(src, {
      skipExport: true,
      remarkPlugins: [removeImports, removeExports],
    });
  } catch (e) {
    return '';
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
    jsx = mdx.sync(src, {
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
          components: { MDXProvider, CodeSandbox, code: CodeBlock },
          MDXProvider,
          props: {},
          mdx: createElement,
        }}
        noInline={true}
        transformCode={(code) => {
          return transformCode(code);
        }}
        theme={theme.prism}
      >
        {error ? (
          <div>
            <h5>Error</h5>
            <Code>{error.toString()}</Code>
            <LiveError />
          </div>
        ) : (
          <LivePreview flex={1} />
        )}
      </LiveProvider>
    </Box>
  );
};

export default LiveMDX;

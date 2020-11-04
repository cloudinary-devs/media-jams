import React, { useContext, Fragment } from 'react';
import { css, jsx, ThemeContext } from '@emotion/core';

import { Box } from '@chakra-ui/core';
import MDX from '@mdx-js/runtime';
import mdx from '@mdx-js/mdx';
import { MDXProvider, mdx as createElement } from '@mdx-js/react';
import { LiveProvider, LivePreview, LiveEditor, LiveError } from 'react-live';
import removeImports from 'remark-mdx-remove-imports';
import removeExports from 'remark-mdx-remove-exports';

import Code from '@components/Code';
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

const LiveMDX = ({ code, scope = {}, ...props }) => {
  const theme = useContext(ThemeContext);
  const { jsx, mdast, hast, error } = generateOutputs(code);

  return (
    <Box flex={1}>
      <LiveProvider
        {...props}
        code={code}
        scope={{
          components: MDXProvider,
          MDXProvider,
          props: {},
          mdx: createElement,
        }}
        noInline={true}
        transformCode={(code) => {
          return transformCode(code);
        }}
      >
        {error ? (
          <div>
            <h5>Error</h5>
            <Code>{error.toString()}</Code>
            <LiveError />
          </div>
        ) : (
          <LivePreview />
        )}
      </LiveProvider>
    </Box>
  );
};

export default LiveMDX;

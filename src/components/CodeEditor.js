import React, { Component } from 'react';
import { Box } from '@chakra-ui/react';
import { Global, css } from '@emotion/core';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import blocksToText from '@lib/blocksToText';
// used for CodeMirror Preivew Content
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';

/**
 *
 * @param {Array.<Object>} code portable text from Sanity
 * code needs to flattened to string for the editor
 */
const CodeEditor = ({ code, onChange = () => {}, ...props }) => (
  <Box width={'50%'}>
    <Global
      styles={css`
        & .CodeMirror {
          height: auto;
          min-height: 300px;
        }
      `}
    />
    <CodeMirror
      {...props}
      value={blocksToText(code)}
      options={{
        theme: 'material',
        mode: 'jsx',
        lineNumbers: true,
        lineWrapping: true,
      }}
      onChange={onChange}
    />
  </Box>
);
export default CodeEditor;

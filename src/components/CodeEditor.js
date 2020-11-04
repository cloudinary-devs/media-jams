import React, { Component } from 'react';
import { Box } from '@chakra-ui/core';
import { Global, css } from '@emotion/core';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';

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
      value={code}
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

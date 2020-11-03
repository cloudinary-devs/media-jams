import React, { Component } from 'react';
import { Box } from '@chakra-ui/core';
import { Global, css } from '@emotion/core';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

const CodeEditor = ({ value, onChange, ...rest }) => (
  <Box>
    <Global
      styles={css`
        & .CodeMirror {
          height: auto;
          min-height: 300px;
        }
      `}
    />
    <CodeMirror
      {...rest}
      value={value}
      options={{ theme: 'material', mode: 'jsx', lineNumbers: true }}
      onChange={onChange}
    />
  </Box>
);
export default CodeEditor;

import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { HStack, Box } from '@chakra-ui/react';
import theme from 'prism-react-renderer/themes/vsDark';
import CopyButton from '@components/CopyButton.js';
import styled from '@emotion/styled';

const Pre = styled.pre`
  text-align: left;
  margin: 0em 0em 0em;
  padding: 0em;
  overflow: scroll;
  white-space: pre;
  max-width: 80ch;
  min-width: 40ch;
  @media (min-width: 48em) {
    padding: 0.5em;
    width: '100%';
  }
`;

const Line = styled.div`
  display: table-row;
  > span: {
    line-height: normal;
  }
`;

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span`
  display: table-cell;
`;

const ActionContent = styled.div`
  @media (min-width: 48em) {
    display: flex;
    min-width: 75px;
    flex-direction: column;
    background-color: rgb(30, 30, 30);
    align-self: stretch;
  }
  display: none;
`;

const ActionContentMobile = styled.div`
  @media (min-width: 48em) {
    display: none;
  }
  display: flex;
  flex-direction: row-reverse;
`;

/**
 *
 * @param {Array<Array>} param0
 * You'd typically iterate over tokens, rendering each line,
 * and iterate over its items, rendering out each token,
 * which is a piece of this line.
 */
export default function Code({ children, className }) {
  const language = className?.replace(/language-/, '');
  return (
    <>
      <HStack spacing="0" my={4} justify="center" align="center">
        <Highlight
          {...defaultProps}
          theme={theme}
          code={children.trim()}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Pre className={className} style={style}>
              {tokens.map((line, i) => (
                <Line key={i} {...getLineProps({ line, key: i })}>
                  <LineNo>{i + 1}</LineNo>
                  <LineContent>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </LineContent>
                </Line>
              ))}
            </Pre>
          )}
        </Highlight>
        {/* In code copy button md size and larger*/}
        <ActionContent>
          <CopyButton float="right" mr="1" my="1" value={children.trim()} />
        </ActionContent>
      </HStack>
      {/* Below code copy button up to md size */}
      <ActionContentMobile>
        <CopyButton
          size="md"
          float="right"
          mr="1"
          my="1"
          value={children.trim()}
        />
      </ActionContentMobile>
    </>
  );
}

import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { HStack, Box } from '@chakra-ui/react';
import psTheme from 'prism-react-renderer/themes/vsDark';
import CopyButton from '@components/CopyButton.js';
import styled from '@emotion/styled';

function cleanTokens(tokens) {
  const tokensLength = tokens.length;
  if (tokensLength === 0) {
    return tokens;
  }
  const lastToken = tokens[tokensLength - 1];

  if (lastToken.length === 1 && lastToken[0].empty) {
    return tokens.slice(0, tokensLength - 1);
  }
  return tokens;
}

const CodeWrapper = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border-radius: 5px;
`;
const PreHighlight = styled.div`
  position: relative;
`;
const Pre = styled.pre`
  text-align: left;
  margin: 0em 0em 16px 0em;
  padding: 2rem 1rem 1rem 1rem;
  overflow: auto;
  webkit-overflow-scrolling: touch;
  white-space: pre;
  width: 80ch;
  @media (min-width: 48em) {
    padding: 0.5em;
    width: 80ch;
  }
`;

const Line = styled.div`
  display: block;
`;

const LineNo = styled.span`
  font-weight: 500;
  line-height: 24px;
  color: 'grey';
  display: inline-block;
  text-align: right;
  user-select: none;
  width: 24px;
`;

const LineContent = styled.span`
  padding: 0px 16px;
  &.break-words {
    display: inline-table;
    white-space: break-spaces;
    width: 95%;
  }
  &.token-line {
    line-height: 1.3rem;
    height: 1.3rem;
  }
`;

const AbsoluteCopyButton = styled.div`
  transition: opacity 100ms ease;
  position: absolute;
  top: 10px;
  left: 72ch;
  z-index: 2;
  > div {
    right: -8px;
    top: -6px;
  }
`;

const propList = ['copy', 'bash-symbol', 'terminal', 'no-lines'];

/**
 *
 * @param {Array<Array>} param0
 * You'd typically iterate over tokens, rendering each line,
 * and iterate over its items, rendering out each token,
 * which is a piece of this line.
 */
export default function Code({ children, className, ...props }) {
  const language = className?.replace(/language-/, '');
  let breakWords = false;
  if (propList.includes(language)) {
    breakWords = true;
  }
  const hasCopy = props['copy'] || language === 'copy';
  let hasNoLine = props['no-lines'] || language === 'no-lines';
  const tokenCopyClass = `${hasCopy ? 'has-copy-button' : ''} ${
    breakWords ? 'break-words' : ''
  }`;
  return (
    <CodeWrapper>
      <PreHighlight>
        <Highlight
          {...defaultProps}
          theme={psTheme}
          code={children.trim()}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Pre className={className} style={style}>
              {/* optional copy to clipboard */}
              {(props['copy'] || language === 'copy') && (
                <AbsoluteCopyButton className="copy-button">
                  <CopyButton value={children.trim()} />
                </AbsoluteCopyButton>
              )}
              <code>
                {cleanTokens(tokens).map((line, i) => {
                  let lineClass = {
                    backgroundColor: '',
                    symbColor: '',
                  };
                  const lineProps = getLineProps({ line, key: i });

                  lineProps.style = { ...lineClass };
                  return (
                    <Line key={i} {...lineClass}>
                      {!hasNoLine && (
                        <LineNo className="line-no">{i + 1}</LineNo>
                      )}
                      <LineContent className={`${tokenCopyClass}`}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </LineContent>
                    </Line>
                  );
                })}
              </code>
            </Pre>
          )}
        </Highlight>
      </PreHighlight>
    </CodeWrapper>
  );
}

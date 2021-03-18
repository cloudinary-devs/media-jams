import { chakra } from '@chakra-ui/react';
import BaseHighlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import React from 'react';
import { liveEditorStyle } from '.';

const RE = /{([\d,-]+)}/;

const calculateLinesToHighlight = (meta) => {
  if (!RE.test(meta)) {
    return () => false;
  }
  const lineNumbers = RE.exec(meta)[1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)));

  return (index) => {
    const lineNumber = index + 1;
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start,
    );
    return inRange;
  };
};

// interface HighlightProps {
//   codeString: string
//   language: Language
//   metastring?: string
//   showLines?: boolean
// }
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

function Highlight({ codeString, language, metastring, showLines, ...props }) {
  const shouldHighlightLine = calculateLinesToHighlight(metastring);
  const highlightlines = props?.highlight;
  return (
    <BaseHighlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={theme}
      {...props}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div style={liveEditorStyle} data-language={language}>
          <pre className={className} style={style}>
            {cleanTokens(tokens).map((line, i) => {
              const lineProps = getLineProps({ line, key: i });

              return (
                <chakra.div
                  px="5"
                  bg={shouldHighlightLine(i) ? 'whiteAlpha.200' : undefined}
                  {...lineProps}
                >
                  {showLines && (
                    <chakra.span opacity={0.3} mr="6" fontSize="xs">
                      {i + 1}
                    </chakra.span>
                  )}
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </chakra.div>
              );
            })}
          </pre>
        </div>
      )}
    </BaseHighlight>
  );
}

export default Highlight;

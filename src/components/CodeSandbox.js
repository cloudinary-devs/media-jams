import React from 'react';
import {
  useColorMode,
  IconButton,
  useColorModeValue,
  Flex,
  Box,
} from '@chakra-ui/react';
import GA from '@lib/googleAnalytics';
import { useElementInteration } from '@hooks/useElementInteraction';

/**
 * Enum string value possible options for view.
 * Default is split-pane 50/50
 * @enum {string}
 */
const View = {
  DEFAULT: '',
  PREVIEW: 'preview',
  EDITOR: 'editor',
};

/**
 *
 * @param {String} title
 * @param {String} id Unquie identifier of specific CodeSandbox
 * @param {View} view Enum options available for displaying sandbox
 * @param {String} showFile specific file to show in editor with path `src/index.js`
 * @param {String} initialPath relitive file path to display on load
 * @param {String} src fully qualified url of mediajam repo (https://github.com/MediaJams/sample-jam-demo)
 * https://codesandbox.io/embed/github/MediaJams/sample-jam-demo/tree/main
 *
 * @returns
 */
export default function CodeSandbox({
  title,
  id,
  initialPath = '',
  view = View.DEFAULT,
  showFile = '',
  src = null,
}) {
  const { colorMode = 'dark' } = useColorMode();
  const iframeRef = React.useRef(null);
  const urlEncodedFilePath = encodeURIComponent(showFile);
  const repoSlug = (str) => str.substring(str.lastIndexOf('/') + 1);

  useElementInteration({
    elementRef: iframeRef,
    onInteraction: () =>
      GA.event('event', 'codesandbox_interaction', { id, title }),
  });

  const baseUrl = src
    ? `https://codesandbox.io/embed/github/MediaJams/${repoSlug(src)}/tree/main`
    : `https://codesandbox.io/embed/${id}`;

  const codeSandboxUrlOptions = `?runonclick=1&autoresize=1&codemirror=1&fontsize=14&hidenavigation=1&theme=${!colorMode}&view=${view}&module=${urlEncodedFilePath}&initialpath=${initialPath}`;

  return (
    <Flex justifyContent="center" ref={iframeRef}>
      <Box
        as="iframe"
        allowFullScreen
        src={baseUrl.concat(codeSandboxUrlOptions)}
        title={title}
        width="full"
        maxW="1280px"
        mx="auto"
        minH="800px"
        overflow="hidden"
        allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></Box>
    </Flex>
  );
}

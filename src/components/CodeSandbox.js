import React from 'react';
import {
  useColorMode,
  IconButton,
  useColorModeValue,
  Flex,
  Box,
} from '@chakra-ui/react';

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
 * @param {String} initialPath relitive file path to display on load
 *
 * @returns
 */
export default function CodeSandbox({
  title,
  id,
  view = View.DEFAULT,
  showFile = '',
}) {
  const { colorMode = 'dark' } = useColorMode();
  const urlEncodedFilePath = encodeURIComponent(showFile);

  const urlWithOptions = `https://codesandbox.io/embed/${id}?runonclick=1&autoresize=1&codemirror=1&fontsize=14&hidenavigation=1&theme=${!colorMode}&view=${view}&module=${urlEncodedFilePath}`;

  return (
    <Flex justifyContent="center">
      <Box
        as="iframe"
        allowFullScreen
        src={urlWithOptions}
        title={title}
        width="full"
        maxW="1280px"
        mx="auto"
        minH="800px"
        overflow="hidden"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></Box>
    </Flex>
  );
}

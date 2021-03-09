import React from 'react';
import {
  useColorMode,
  IconButton,
  useColorModeValue,
  Flex,
  Box,
} from '@chakra-ui/react';

export default function CodeSandbox({
  title,
  name,
  view = '',
  children,
  ...props
}) {
  const { colorMode = 'dark' } = useColorMode();
  const urlWithOptions = `https://codesandbox.io/embed/${name}?runonclick=1&autoresize=1&codemirror=1&fontsize=14&hidenavigation=1&theme=${!colorMode}&view=${view}`;

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

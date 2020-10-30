import React from 'react';
import { useColorMode, IconButton, useColorModeValue } from '@chakra-ui/core';
import Iframe from '@components/Iframe';

const isCodeSandboxUrl = (url) => new URL(url).hostname === 'codesandbox.io';

export default function CodeSandbox({ title, src, children, ...rest }) {
  const { colorMode } = useColorMode();
  const codeSandboxEncodeUrl = (src) => {
    const url = new URL(src);
    url.search = `fontsize=14&hidenavigation=1&theme=${colorMode}`;
    return url;
  };
  return (
    <>
      {/* if it's not an iframe from codesandbox, return unchanged */}
      {!isCodeSandboxUrl(src) && <Iframe src={src} title={title} rest />}
      <Iframe
        src={codeSandboxEncodeUrl(src)}
        title={title}
        width="full"
        maxW="960px"
        mx="auto"
        minH="500px"
        overflow="hidden"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></Iframe>
    </>
  );
}

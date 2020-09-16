import { Box } from '@chakra-ui/core';

export default function Iframe({ src, style, title, ...rest }) {
  return <Box as="iframe" title={title} src={src} allowFullScreen {...rest} />;
}

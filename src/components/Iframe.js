import { Flex, Box } from '@chakra-ui/react';

export default function Iframe({ src, style, title, ...rest }) {
  return (
    <Flex justifyContent="center" width="100vw" height="100vh">
      <Box
        as="iframe"
        title={title}
        src={src}
        style={style}
        allowFullScreen
        {...rest}
      />
    </Flex>
  );
}

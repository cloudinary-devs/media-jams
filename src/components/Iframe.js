import { Flex, Box } from '@chakra-ui/core';

export default function Iframe({ src, style, title, ...rest }) {
  return (
    <Flex justifyContent="center" width="100vw">
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

import { Flex, Box } from '@chakra-ui/core';
import Navbar from '@components/Navbar';
import SEO from '@components/SEO';

export default function Layout({ props, children }) {
  return (
    <Flex direction="column" minH="calc(100vh - 4rem)" minW="100%">
      <SEO {...props} />
      <Navbar />
      <Box flex={1}>{children}</Box>
    </Flex>
  );
}

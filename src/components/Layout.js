import { Flex, Box } from '@chakra-ui/core';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import SEO from '@components/SEO';
export default function Layout({ props, children }) {
  return (
    <Flex direction="column" minH="calc(100vh)" minW="100%">
      <SEO {...props} />
      <Navbar />
      <Box flex={1}>{children}</Box>
      <Footer />
    </Flex>
  );
}

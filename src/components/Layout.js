import { Flex, Box } from '@chakra-ui/react';
import Footer from '@components/Footer';
import SEO from '@components/SEO';
import SideNav from '@components/SideNav';

export default function Layout({ props, children, navContent }) {
  return (
    <Flex minH="calc(100vh)" w="100%">
      <SideNav>{navContent}</SideNav>
      <Flex direction="column">
        <SEO {...props} />
        <Box flex={1}>{children}</Box>
        <Footer />
      </Flex>
    </Flex>
  );
}

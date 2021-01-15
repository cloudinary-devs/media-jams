import { Flex, Box, useDisclosure, Center } from '@chakra-ui/react';
import Footer from '@components/Footer';
import SEO from '@components/SEO';
import SideNav from '@components/SideNav';

export default function Layout({ props, children, navContent }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex minH="calc(100vh)" minW="100%">
      <SideNav onOpen={onOpen} isOpen={isOpen} onClose={onClose}>
        {navContent}
      </SideNav>
      <Flex w="100%" direction="column" justifyContent="space-between">
        <SEO {...props} />
        <Box>{children}</Box>
        <Footer />
      </Flex>
    </Flex>
  );
}

import { Flex, Box, Center, useDisclosure } from '@chakra-ui/react';
import Footer from '@components/Footer';
import SEO from '@components/SEO';
import SideNav from '@components/SideNav';

export default function Layout({
  props,
  children,
  navContent,
  isOpen,
  onClose,
}) {
  return (
    <Flex minH="100vh" minW="100%">
      <SideNav isOpen={isOpen} onClose={onClose}>
        {navContent}
      </SideNav>
      <Flex w="100%" direction="column" justifyContent="space-between">
        <SEO {...props} />
        <Center>{children}</Center>
        <Footer />
      </Flex>
    </Flex>
  );
}

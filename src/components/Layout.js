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
    <Flex minW="100%">
      <SEO {...props} />
      <SideNav isOpen={isOpen} onClose={onClose}>
        {navContent}
      </SideNav>
      <Flex flex="1" direction="column" justifyContent="space-between">
        {children}
        <Footer />
      </Flex>
    </Flex>
  );
}

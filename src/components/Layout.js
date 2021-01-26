import { Flex, IconButton, useMediaQuery } from '@chakra-ui/react';
import SEO from '@components/SEO';
import SideNav from '@components/SideNav';
import SideNavDrawer from '@components/SideNavDrawer';
import { FaBars } from 'react-icons/fa';

export default function Layout({
  seoProps,
  children,
  isOpen,
  onClose,
  onOpen,
}) {
  return (
    <Flex minW="100%" height="100vh">
      <SEO {...seoProps} />
      <IconButton
        bg="none"
        outline="none"
        mt="14px"
        onClick={onOpen}
        size="md"
        icon={<FaBars />}
        alignSelf="flex-start"
        display={{ md: 'none' }}
      />
      <SideNav display={{ base: 'none', md: 'flex' }} />
      <SideNavDrawer
        isOpen={isOpen}
        onClose={onClose}
        display={{ md: 'none' }}
      />
      <Flex overflow="auto" flex="1" direction="column">
        {children}
      </Flex>
    </Flex>
  );
}

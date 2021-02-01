import { Flex, Icon, useMediaQuery } from '@chakra-ui/react';
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
  ...rest
}) {
  return (
    <Flex
      minW="100%"
      height="100vh"
      direction={{ base: 'column', md: 'column', lg: 'row' }}
    >
      <SEO {...seoProps} />
      <Icon
        bg="none"
        outline="none"
        onClick={onOpen}
        size="md"
        as={FaBars}
        cursor="pointer"
        ml={2}
        mt={2}
        alignSelf="flex-start"
        display={{ md: 'none' }}
      />
      <SideNav display={{ base: 'none', md: 'flex' }} />
      <SideNavDrawer
        isOpen={isOpen}
        onClose={onClose}
        display={{ md: 'none', lg: 'none', xl: 'none' }}
      />
      <Flex flex="1" direction="column" {...rest}>
        {children}
      </Flex>
    </Flex>
  );
}

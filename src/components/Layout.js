import { Flex, Box, Icon } from '@chakra-ui/react';
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
      direction={{ base: 'column', md: 'row', lg: 'row' }}
    >
      <SEO {...seoProps} />
      <Box bg="grey.700" display={{ md: 'none', lg: 'none', xl: 'none' }}>
        <Icon
          onClick={onOpen}
          w={6}
          h={6}
          as={FaBars}
          cursor="pointer"
          ml={2}
          mt={2}
          alignSelf="flex-start"
        />
      </Box>

      <SideNav display={{ base: 'none', md: 'flex' }} />
      <SideNavDrawer
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        display={{ md: 'none', lg: 'none', xl: 'none' }}
      />
      <Flex bg="grey.700" flex="1" direction="column" {...rest}>
        {children}
      </Flex>
    </Flex>
  );
}

import { Flex, IconButton, useMediaQuery } from '@chakra-ui/react';
import SEO from '@components/SEO';
import SideNav from '@components/SideNav';
import SideNavDrawer from '@components/SideNavDrawer';
import { FaBars } from 'react-icons/fa';

export default function Layout({ props, children, isOpen, onClose, onOpen }) {
  const [largerThanTablet] = useMediaQuery('(min-width:961px)');

  function renderHamburger() {
    if (largerThanTablet) {
      return;
    } else {
      return (
        <IconButton
          bg="none"
          outline="none"
          mt="14px"
          onClick={onOpen}
          size="md"
          icon={<FaBars />}
          alignSelf="flex-start"
        />
      );
    }
  }

  function chooseSideNavRender() {
    if (largerThanTablet) {
      return <SideNav isOpen={isOpen} onClose={onClose} />;
    } else {
      return <SideNav isOpen={isOpen} onClose={onClose} />;
    }
  }

  return (
    <Flex minW="100%" height="100vh">
      <SEO {...props} />
      {renderHamburger()}
      {chooseSideNavRender()}
      <Flex
        overflow="auto"
        flex="1"
        direction="column"
        justifyContent="space-between"
      >
        {children}
      </Flex>
    </Flex>
  );
}

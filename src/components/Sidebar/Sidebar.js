import {
  Button,
  VStack,
  HStack,
  Flex,
  Box,
  Spacer,
  IconButton,
  ColorModeScript,
} from '@chakra-ui/react';
import React from 'react';
import { motion } from 'framer-motion';
import { MobileDrawer, MobileDrawerContent } from './MobileDrawer';
import {
  Authors,
  Bookmark,
  MoreTab,
  BWLogo,
  SideToggle,
  Note,
  Signup,
  JoinDiscord,
} from '@components/Icons';
import { useSidePanel, TABS } from '@components/SidePanelProvider';
import { MoreContentPanel, AuthorsPanel } from './SideContent';

const SideStripButton = ({ value, onClick, icon, childern, ...props }) => (
  <Box
    as="button"
    colorScheme="ghost"
    aria-label={value}
    onClick={onClick}
    {...props}
  >
    {icon}
    {childern}
  </Box>
);

// Navigation
const SideStrip = () => {
  const { onToggle, setActiveTab, activeTab } = useSidePanel();
  // onClick set nav.ActiveTab to name
  // toogle only if click is activeTab
  const handleOnClick = (e) => {
    if (e.target.value === activeTab) {
      onToggle();
    }
    setActiveTab(e.target.value);
  };
  const { AUTHORS, MORE } = TABS;
  return (
    <VStack
      w="80px"
      h={{ base: '100%', md: '100vh' }}
      bg="#E2E2FE"
      spacing={12}
    >
      <VStack spacing={{ base: 2, md: 6 }}>
        <Spacer />
        <Button
          value={AUTHORS.value}
          isActive={AUTHORS.value === activeTab ? true : false}
          onClick={handleOnClick}
        >
          Authors
        </Button>
        <Button
          value={MORE.value}
          isActive={MORE.value === activeTab ? true : false}
          onClick={handleOnClick}
        >
          More
        </Button>
        <SideStripButton
          name="Bookmark"
          icon={<Bookmark />}
          onClick={handleOnClick}
        />
        <SideStripButton value="Notes" icon={<Note />} />
        <SideStripButton
          name="More Tab"
          fontSize="44px"
          icon={<MoreTab />}
          onClick={handleOnClick}
        />
        <SideStripButton name="Signup" icon={<Signup />} />
      </VStack>
      <Spacer />
      <IconButton
        colorScheme="ghost"
        aria-label="Signup"
        icon={<JoinDiscord />}
        paddingBottom={6}
      />
    </VStack>
  );
};

const SideTopBar = ({ onClose, onToggle }) => {
  return (
    <Flex w="100%" h="64px">
      <HStack display={{ base: 'none', md: 'block' }} spacing={3}>
        <IconButton
          onClick={onClose}
          size="lg"
          variant="ghost"
          aria-label="expand collapse"
          icon={<SideToggle />}
        />
      </HStack>
      <Spacer />
      <HStack spacing={3} px={4}>
        <Button size="sm" variant="ghost" color="primary.500" onClick={onClose}>
          Login
        </Button>
        <Button size="sm" colorScheme="primary">
          Sign Up
        </Button>
      </HStack>
    </Flex>
  );
};

{
  /* <Switch>
<Route path={`${path}`} exact component={Profile} />
<Route path={`${path}/comments`} component={Comments} />
<Route path={`${path}/contact`} component={Contact} />
</Switch> */
}

const SidebarContent = () => {
  const { nav, isOpen, onClose, activeTab } = useSidePanel();
  return (
    <Flex direction="column" h="100vh" width={{ base: '380px' }}>
      <SideTopBar onClose={onClose} />
      {activeTab === TABS.MORE.value ? <MoreContentPanel /> : <AuthorsPanel />}
    </Flex>
  );
};

const animationVariants = {
  open: { width: '100%' },
  closed: { width: 0 },
};
const Sidebar = () => {
  const { nav, isOpen, onClose, onOpen, onToggle, variants } = useSidePanel();
  React.useEffect(() => {
    if (variants?.style === 'sidebar') {
      // onOpen();
    }
  }, []);
  return variants?.style === 'sidebar' ? (
    <motion.div
      style={{
        display: 'flex',
        hieght: '100vh',
        minWidth: '80px',
        maxWidth: '420px',
        background: `radial-gradient(100% 100% at 50% 0%, #E1E2FF 0%, #F5F5FF 100%)`,
      }}
      animate={isOpen ? 'open' : 'closed'}
      variants={animationVariants}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
    >
      <SideStrip onClose={onClose} onToggle={onToggle} />
      {isOpen && (
        <SidebarContent onClose={onClose} isOpen={isOpen} onToggle={onToggle} />
      )}
    </motion.div>
  ) : (
    <MobileDrawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      size="lg"
      isFullHeight={false}
    >
      <MobileDrawerContent bg="radial-gradient(100% 100% at 50% 0%, #E1E2FF 0%, #F5F5FF 100%)">
        <SideStrip onClose={onClose} onToggle={onToggle} />
        <SidebarContent onClose={onClose} isOpen={isOpen} onToggle={onToggle} />
      </MobileDrawerContent>
    </MobileDrawer>
  );
};

export default Sidebar;

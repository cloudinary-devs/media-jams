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
  AuthorsIcon,
  BookmarkIcon,
  MoreTab,
  BWLogo,
  SideToggle,
  Note,
  Signup,
  JoinDiscord,
} from '@components/Icons';
import { useSidePanel, TABS } from '@components/SidePanelProvider';
import { MoreContentPanel, AuthorsPanel, BookmarksPanel } from './SideContent';

const SideNavButtonIcon = ({
  value,
  displayName,
  onClick,
  icon,
  activeTab,
  children,
  ...props
}) => {
  return (
    <Button
      colorScheme="ghost"
      aria-label={displayName}
      value={value}
      onClick={onClick}
      isActive={value === activeTab ? true : false}
      px="3"
      _active={{
        bg: 'primary.500',
        transform: 'scale(0.98)',
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

// Navigation
const SideStrip = () => {
  const { onToggle, setActiveTab, activeTab } = useSidePanel();
  // onClick set nav.ActiveTab to name
  const handleOnClick = (e) => {
    setActiveTab(e.target.value);
  };
  const { AUTHORS, MORE, BOOKMARKS, NOTES } = TABS;
  const sideNavTabs = [AUTHORS, BOOKMARKS, NOTES, MORE];
  return (
    <VStack
      w="80px"
      h={{ base: '100%', md: '100vh' }}
      bg="#E2E2FE"
      spacing={12}
    >
      <VStack spacing={{ base: 2, md: 6 }}>
        <Spacer />
        {sideNavTabs.map(({ value, displayName, Icon }) => (
          <SideNavButtonIcon
            value={value}
            displayName={displayName}
            activeTab={activeTab}
            onClick={handleOnClick}
          >
            <Icon
              pointerEvents="none"
              boxSize="6"
              color={value !== activeTab ? 'primary.500' : 'white'}
            />
          </SideNavButtonIcon>
        ))}
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
      <HStack spacing={3} px={4} minH="48px">
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

const SidebarContent = () => {
  const { nav, isOpen, onClose, activeTab } = useSidePanel();
  const { Content } = TABS[activeTab];
  return (
    <Flex direction="column" h="100vh" width={{ base: '430px' }}>
      <SideTopBar onClose={onClose} />
      <Content />
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
        maxWidth: '480px',
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

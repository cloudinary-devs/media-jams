import {
  Button,
  VStack,
  HStack,
  Flex,
  Link,
  Spacer,
  IconButton,
  Tooltip,
  Avatar,
} from '@chakra-ui/react';
import React from 'react';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { MobileDrawer, MobileDrawerContent } from './MobileDrawer';
import { SideToggle, JoinDiscord, Plus, BWLogo } from '@components/Icons';
import { useSidePanel, TABS } from '@components/SidePanelProvider';
import { useUser } from '@auth0/nextjs-auth0';

import { RiLogoutBoxRLine } from 'react-icons/ri';

// Tooltip currently disabled
// https://github.com/chakra-ui/chakra-ui/issues/4101
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
    <Tooltip
      hasArrow
      isDisabled={true}
      label={displayName}
      placement="right"
      openDelay={800}
      bg="white"
      color="grey.900"
    >
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
    </Tooltip>
  );
};

// Navigation
const SideStrip = () => {
  const { user, isLoading: loadingUser } = useUser();
  const { onToggle, setActiveTab, activeTab } = useSidePanel();
  // onClick set nav.ActiveTab to name
  const handleOnClick = (e) => {
    setActiveTab(e.target.value);
  };
  const { AUTHORS, MORE, BOOKMARKS, NOTES } = TABS;
  const sideNavTabs = [AUTHORS, BOOKMARKS, NOTES, MORE];
  return (
    <VStack w="80px" h={{ base: '100%', md: '100vh' }} bg="#E2E2FE">
      <Link
        as={NextLink}
        display={{ base: 'none', md: 'inline-flex' }}
        href="/"
      >
        <IconButton
          size="lg"
          variant="unstyled"
          aria-label="Logo"
          icon={<BWLogo />}
        />
      </Link>
      <VStack spacing={{ base: 2, md: 6 }}>
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
      {!loadingUser && user && (
        <>
          <Avatar name={user?.name} src={user?.picture} />
          <NextLink href="/api/auth/logout">
            <IconButton
              size="lg"
              isRound={true}
              color="primary.500"
              colorScheme="ghost"
              aria-label="Logout"
              icon={<RiLogoutBoxRLine />}
            />
          </NextLink>
        </>
      )}
      <IconButton
        colorScheme="ghost"
        aria-label="Signup Discord"
        icon={<JoinDiscord />}
        paddingBottom={6}
      />
    </VStack>
  );
};

const SideTopBar = ({ onClose }) => {
  const { user, isLoading: loadingUser } = useUser();
  return (
    <Flex w="100%" h="64px">
      <HStack display={{ base: 'none', md: 'flex' }} spacing={3}>
        <IconButton
          onClick={onClose}
          size="lg"
          variant="ghost"
          aria-label="expand collapse"
          icon={<SideToggle />}
        />
      </HStack>
      <Spacer />
      {!loadingUser && (
        <HStack spacing={3} px={4} minH="64px">
          {user ? (
            <Button leftIcon={<Plus />} variant="link" color="gray.900">
              New Note
            </Button>
          ) : (
            <>
              <NextLink href="/api/auth/login">
                <Button size="md" variant="ghost" color="primary.500">
                  Login
                </Button>
              </NextLink>
              <NextLink href="/api/auth/signup">
                <Button size="md" colorScheme="primary">
                  Sign Up
                </Button>
              </NextLink>
            </>
          )}
        </HStack>
      )}
    </Flex>
  );
};

const SidebarContent = () => {
  const { user, isLoading: loadingUser } = useUser();
  const { onClose, activeTab } = useSidePanel();
  const { Content } = TABS[activeTab];
  return (
    <Flex direction="column" h="100vh" width={{ base: '430px' }}>
      <SideTopBar onClose={onClose} />
      <Content user={user} />
    </Flex>
  );
};

const animationVariants = {
  open: { width: '100%' },
  closed: { width: 0 },
};
const Sidebar = () => {
  const { isOpen, onClose, onOpen, onToggle, variants } = useSidePanel();
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

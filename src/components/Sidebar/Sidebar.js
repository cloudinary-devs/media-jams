import React from 'react';
import {
  Box,
  Button,
  VStack,
  HStack,
  Flex,
  Link,
  IconButton,
  useDisclosure,
  Tooltip,
  Avatar,
  Stack,
  Spacer,
  useBreakpointValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { MobileDrawer, MobileDrawerContent } from './MobileDrawer';
import { SideToggle, JoinDiscord, Plus } from '@components/Icons';
import MJ from '@components/MJ';
import { useSidePanel, TABS } from '@components/SidePanelProvider';
import { useSearch } from '@components/SearchProvider';
import { FiLogOut } from 'react-icons/fi';

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
  const mobileIconMargin = useBreakpointValue({ base: '32px', md: '66px' });
  const displaySideStripLogo = useBreakpointValue({ base: false, md: true });
  const { onToggle, setActiveTab, activeTab } = useSidePanel();
  const { clearSearch } = useSearch();
  // onClick set nav.ActiveTab to name
  const handleOnClick = (e) => {
    setActiveTab(e.target.value);
  };
  const handleOnLogoClick = (e) => {
    clearSearch();
  };
  const { AUTHORS } = TABS;
  const sideNavTabs = [AUTHORS];
  return (
    <VStack w="80px" h={{ base: '100%', md: '100vh' }} bg="#E2E2FE" pt="2">
      <Link as={NextLink} href="/" passHref display={displaySideStripLogo ? 'auto' : 'none'}
        onClick={handleOnLogoClick}>
        <IconButton
          size="lg"
          variant="unstyled"
          aria-label="Media Jams Logo"
          icon={<MJ />}
          display={{ base: 'none', md: 'inline-flex' }}
        />
      </Link>
      <VStack
        justifyContent="flex-start"
        spacing={{ base: '24px', md: 6 }}
        pt={{ base: 0, md: 6 }}
      >
        {sideNavTabs.map(({ value, displayName, Icon }) => (
          <SideNavButtonIcon
            key={value}
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
      <Stack justifyContent="flex-end" spacing={8} my={4} flexGrow="1">
        <IconButton
          as={Link}
          href="https://discord.gg/invite/a26Mcgr"
          isExternal
          colorScheme="ghost"
          aria-label="Signup Discord"
          paddingBottom={6}
          icon={<JoinDiscord />}
        />
      </Stack>
    </VStack>
  );
};

const SideTopBar = ({ activeTab, onClose, onToggle }) => {
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure();

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
    </Flex>
  );
};

const SidebarContent = () => {
  const { onClose, activeTab } = useSidePanel();
  console.log('TABS[activeTab]', TABS[activeTab])
  const { Content } = TABS[activeTab];
  return (
    <Flex direction="column" h="100vh" w={{ base: '430px' }}>
      <SideTopBar activeTab={activeTab} onClose={onClose} />
      <Content />
    </Flex>
  );
};

const animationVariants = {
  open: { width: '100%' },
  closed: { width: 0 },
};
const Sidebar = () => {
  const { isOpen, onClose, onOpen, onToggle, variants } = useSidePanel();

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
      <Box srOnly>{Date.now()}</Box>
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
      <Box srOnly>{Date.now()}</Box>
    </MobileDrawer>
  );
};

export default Sidebar;

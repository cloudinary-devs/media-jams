import React from 'react';
import { Link as NextLink } from 'next/link';
import {
  Avatar,
  Button,
  Flex,
  Icon,
  IconButton,
  Link,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FaStickyNote,
  FaRegFlag,
  FaHome,
  FaPhotoVideo,
  FaBookmark,
  FaChevronUp,
  FaPlusCircle,
  FaUserCircle,
} from 'react-icons/fa';

import { useUser } from '@auth0/nextjs-auth0';
import { boxShadow } from '@utils/styles';
import Image from '@components/Image';
import NewNoteModal from '@components/NewNoteModal';

export default function SideNav(props) {
  const { user } = useUser();
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <NewNoteModal onClose={onClose} isOpen={isOpen} />
      <Flex
        w={60}
        direction="column"
        boxShadow={boxShadow}
        minH="100%"
        backgroundColor="grey.900"
        {...props}
      >
        <Flex direction="column">
          <Flex w="100%" justifyContent="space-between" p={4}>
            <Link href="/">
              <Image
                cloudName="mediadevs"
                publicId="mediajams/logo"
                height={50}
                width={100}
                alt="MediaJams logo"
              />
            </Link>
            {user ? (
              <Link
                _hover={{ textDecoration: 'none' }}
                as={NextLink}
                href="/api/auth/logout"
              >
                <Button
                  mt={2}
                  size="sm"
                  outline="black"
                  background="grey.700"
                  color="yellow.400"
                >
                  Logout
                </Button>
              </Link>
            ) : (
              <Link
                _hover={{ textDecoration: 'none' }}
                as={NextLink}
                href="/api/auth/login"
              >
                <Button
                  mt={2}
                  size="sm"
                  outline="black"
                  background="grey.700"
                  color="yellow.400"
                >
                  Login
                </Button>
              </Link>
            )}
          </Flex>
          <NavLinkGroup />
        </Flex>

        {user ? (
          <Flex
            h="100%"
            direction="column"
            width="100%"
            justify="flex-end"
            align="flex-end"
          >
            <Menu placement="top">
              <MenuButton
                alignSelf="center"
                h={12}
                borderBottomRightRadius="none"
                borderBottomLeftRadius="none"
                borderTopLeftRadius="8px"
                borderTopRightRadius="8px"
                w="95%"
                as={Button}
              >
                <Flex w="100%" alignItems="center" justify="space-around">
                  <Avatar size="sm" src={user.picture} />
                  <Text isTruncated>{user.nickname}</Text>
                  <Icon as={FaChevronUp} />
                </Flex>
              </MenuButton>

              <MenuList w="100%">
                <Link href="/profile" _hover={{ textDecoration: 'none' }}>
                  <MenuItem>
                    <Icon as={FaUserCircle} mr={2} /> Profile
                  </MenuItem>
                </Link>

                <MenuGroup title="Actions">
                  <MenuItem onClick={onOpen}>
                    <Icon as={FaPlusCircle} mr={2} /> Create Note
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Flex>
        ) : (
          <Flex
            h="100%"
            width="100%"
            justify="flex-end"
            align="flex-end"
            pr={4}
            pb={4}
          >
            <IconButton
              as={Link}
              icon={<FaRegFlag />}
              target="_blank"
              href="/feedback"
              textDecoration="none"
              outline="none"
              size="md"
              borderRadius="full"
              bg="grey.700"
              color="yellow.400"
              hover={{ textDecoration: 'none', bg: 'none', outline: 'none' }}
              _active={{ bg: 'none', outline: 'none' }}
            />
          </Flex>
        )}
      </Flex>
    </>
  );
}

function NavLink({ children, ...props }) {
  return (
    <Link
      as={NextLink}
      display="flex"
      _hover={{ background: 'yellow.400', color: 'black' }}
      p="12px"
      minW="100%"
      display="flex"
      color="white"
      alignItems="center"
      {...props}
    >
      {children}
    </Link>
  );
}

function NavLinkGroup() {
  const { user, loading } = useUser();
  return (
    <Flex mt={7} direction="column" alignItems="center" color="white">
      <NavLink href="/dashboard">
        <Icon ml={3} as={FaHome} w={5} h={5} mr={2} />
        <Text ml={2} fontWeight="thin">
          Dashboard
        </Text>
      </NavLink>
      <NavLink href="/post">
        <Icon ml={3} as={FaPhotoVideo} w={5} h={5} mr={2} />
        <Text ml={2} fontWeight="thin">
          Jams
        </Text>
      </NavLink>
      {user && (
        <>
          <NavLink href="/bookmarks">
            <Icon ml={3} as={FaBookmark} w={4} h={4} mr={2} />
            <Text ml={2} fontWeight="thin">
              Bookmarks
            </Text>
          </NavLink>
          <NavLink href="/notes">
            <Icon ml={3} as={FaStickyNote} w={4} h={4} mr={2} />
            <Text ml={2} fontWeight="thin">
              Notes
            </Text>
          </NavLink>
        </>
      )}
    </Flex>
  );
}

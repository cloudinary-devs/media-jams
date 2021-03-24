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
} from '@chakra-ui/react';
import {
  FaStickyNote,
  FaRegFlag,
  FaHome,
  FaPhotoVideo,
  FaBookmark,
  FaUser,
  FaPlusCircle,
  FaUserCircle,
  FaPlus,
} from 'react-icons/fa';

import { boxShadow } from '@utils/styles';
import Image from '@components/Image';
import { useUser } from '@auth0/nextjs-auth0';

export default function SideNav(props) {
  const { user } = useUser();
  return (
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
          position="aboslute"
          pb={4}
        >
          <Flex
            direction="column"
            alignSelf="center"
            width="90%"
            h="300px"
            borderRadius="4px"
            bg="grey.700"
          >
            <Flex mt={2} direction="column" w="100%" align="center" p="4px">
              <Avatar size="md" src={user.picture}></Avatar>
              <Text mt="8px" color="yellow.400">
                Welcome, {user.nickname}
              </Text>
            </Flex>
            {/* <Flex
              alignSelf="center"
              width="70%"
              wrap="wrap"
              justify="space-around"
              align="center"
            >
              <Icon as={FaUserCircle} boxSize="24px" />
              <Icon as={FaPlusCircle} boxSize="24px" />
            </Flex> */}
            <IconButton
              as={Link}
              position="relative"
              top="165px"
              mr="8px"
              icon={<FaRegFlag />}
              target="_blank"
              href="/feedback"
              textDecoration="none"
              outline="none"
              size="sm"
              borderRadius="full"
              bg="black"
              color="yellow.400"
              hover={{ textDecoration: 'none', bg: 'none', outline: 'none' }}
              _active={{ bg: 'none', outline: 'none' }}
              alignSelf="flex-end"
              justifySelf="flex-end"
            />
          </Flex>
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

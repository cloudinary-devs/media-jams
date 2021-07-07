import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  StackDivider,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
// This import is only needed when checking authentication status directly from getServerSideProps
import auth0 from '@lib/auth0';
import { HiCloudUpload } from 'react-icons/hi';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import Layout from '@components/Layout';
import { motion } from 'framer-motion';

import FieldGroup from '@components/AccountFieldGroup';

export const ProfileGroup = ({ user }) => (
  <Flex w="100%">
    <form
      id="profile-form"
      onSubmit={(e) => {
        e.preventDefault();
        // form submit logic
      }}
    >
      <Stack ml={8} spacing="4" divider={<StackDivider />}>
        <Heading size="lg" as="h1" paddingBottom="4">
          Profile Settings
        </Heading>
        <FieldGroup title="Personal Info">
          <VStack width="full" spacing="6">
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input type="text" maxLength={255} />
            </FormControl>

            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" isReadOnly value={user.email} />
            </FormControl>

            <FormControl id="bio">
              <FormLabel>Bio</FormLabel>
              <Textarea rows={5} />
              <FormHelperText>
                Brief description for your profile. URLs are hyperlinked.
              </FormHelperText>
            </FormControl>
          </VStack>
        </FieldGroup>
        <FieldGroup title="Profile Photo">
          <Stack direction="row" spacing="6" align="center" width="full">
            <Avatar size="xl" name={user.name} src={user.picture} />
            <Box>
              <HStack spacing="5">
                <Button leftIcon={<HiCloudUpload />}>Change photo</Button>
                <Button variant="ghost" colorScheme="red">
                  Delete
                </Button>
              </HStack>
              <Text
                fontSize="sm"
                mt="3"
                color={useColorModeValue('gray.500', 'whiteAlpha.600')}
              >
                .jpg, .gif, or .png. Max file size 700K.
              </Text>
            </Box>
          </Stack>
        </FieldGroup>
        <FieldGroup title="Language">
          <VStack width="full" spacing="6"></VStack>
        </FieldGroup>
        <FieldGroup title="Notifications">
          <Stack width="full" spacing="4">
            <Checkbox>
              Get updates about the latest updates and changes.
            </Checkbox>
            <Checkbox>Get notifications about your account activities</Checkbox>
          </Stack>
        </FieldGroup>
        <FieldGroup title="Connect accounts">
          <HStack width="full">
            <Button variant="outline" leftIcon={<FaGithub />}>
              Connect Github
            </Button>
            <Button
              variant="outline"
              leftIcon={<Box as={FaGoogle} color="red.400" />}
            >
              Connect Google
            </Button>
          </HStack>
        </FieldGroup>
      </Stack>
      <FieldGroup mt="8">
        <HStack width="full">
          <Button type="submit" colorScheme="blue">
            Save Changes
          </Button>
          <Button variant="outline">Cancel</Button>
        </HStack>
      </FieldGroup>
    </form>
  </Flex>
);

export default function Profile({ user }) {
  const { roles } = user['https://mediajams-studio'];
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Layout isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <Flex
        as={motion.div}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, ease: 'easein' }}
        direction="column"
        borderRadius="8px"
        align="center"
        p="1rem"
        overflowY="scroll"
        bg="white"
        h="100%"
        m={5}
      >
        <ProfileGroup user={user} />
      </Flex>
    </Layout>
  );
}

Profile.getLayout = (page) => <Layout>{page}</Layout>;

export const getServerSideProps = auth0.withPageAuthRequired();

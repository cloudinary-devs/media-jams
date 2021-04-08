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
  Link,
  Flex,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
// This import is only needed when checking authentication status directly from getServerSideProps
import auth0 from '@lib/auth0';
import NextLink from 'next/link';
import { AiOutlineLogout, AiOutlineSetting } from 'react-icons/ai';
import { HiCloudUpload } from 'react-icons/hi';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import Layout from '@components/Layout';

import FieldGroup from '@components/AccountFieldGroup';

export const ProfileGroup = ({ user }) => (
  <Flex
    px={{ base: '4', md: '10' }}
    py="16"
    maxWidth="3xl"
    overflow="auto"
    mx="auto"
    my="16"
    bg="white"
    boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
    borderRadius="lg"
  >
    <form
      id="profile-form"
      onSubmit={(e) => {
        e.preventDefault();
        // form submit logic
      }}
    >
      <Stack spacing="4" divider={<StackDivider />}>
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

function StudioCard({ user }) {
  const [studioURL, setStudioURL] = useState(null);
  const [refreshStudioURL, triggerRefresh] = useState(false);

  useEffect(() => {
    async function fetchSanitySession() {
      const results = await fetch('/api/auth/studio').then((res) => res.json());
      const { sanitySession } = results;
      setStudioURL(sanitySession);
    }
    fetchSanitySession();
  }, [refreshStudioURL]);

  const handleOnClickStudio = () => {
    window.open(studioURL, '_blank');
    triggerRefresh(!refreshStudioURL);
  };
  return (
    <Flex
      px={{ base: '4', md: '10' }}
      py="16"
      maxWidth="3xl"
      overflow="auto"
      mx="auto"
      my="16"
      bg="white"
      boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
      borderRadius="lg"
    >
      <Stack direction="row" spacing={4}>
        <Button
          leftIcon={<AiOutlineSetting />}
          colorScheme="pink"
          variant="solid"
          onClick={handleOnClickStudio}
        >
          Media Jams Studio
        </Button>
      </Stack>
    </Flex>
  );
}

function Profile({ user }) {
  const { roles } = user['https://mediajams-studio'];
  return (
    <Layout>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        overflow={{ md: 'auto', lg: 'auto', xl: 'none' }}
      >
        <ProfileGroup user={user} />
        {roles && <StudioCard user={user} />}
      </Flex>
    </Layout>
  );
}

export default Profile;
export const getServerSideProps = auth0.withPageAuthRequired();

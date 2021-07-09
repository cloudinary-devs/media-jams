import React from 'react';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
  VStack,
  Flex,
} from '@chakra-ui/react';

// This import is only needed when checking authentication status directly from getServerSideProps
import auth0 from '@lib/auth0';
import { HiCloudUpload } from 'react-icons/hi';
import Layout from '@components/Layout';

import FieldGroup from '@components/FieldGroup';

function FormInput({ value, type, ...rest }) {
  return (
    <Input
      height="48px"
      width="456px"
      type={type}
      value={value ? value : ''}
      {...rest}
    />
  );
}

export const ProfileForm = ({ user }) => {
  return (
    <Flex w="100%" justify="center">
      <form
        id="profile-form"
        onSubmit={(e) => {
          e.preventDefault();
          // form submit logic
        }}
        style={{
          width: '70%',
        }}
      >
        <Stack ml={8} spacing="4" divider={<StackDivider />}>
          <Flex w="100%" justify="space-between">
            <Heading size="H300" paddingBottom="4">
              Account Settings
            </Heading>
            <Button bg="primary.500" color="white" w="100px" height="40px">
              <Text variant="B300" fontWeight="bold">
                Save
              </Text>
            </Button>
          </Flex>
          <FieldGroup>
            <Flex direction="column" w="100%">
              <Heading size="H200" mb="52px">
                Personal information
              </Heading>
              <VStack width="100%" spacing="6">
                <Flex direction="column" w="100%">
                  <FormControl id="name">
                    <Flex w="65%" justify="space-between">
                      <FormLabel>
                        <Text color="grey.900" variant="B200" fontWeight="bold">
                          Name
                        </Text>
                      </FormLabel>
                      <FormInput type="text" value={user.name} />
                    </Flex>
                  </FormControl>
                </Flex>

                <Flex direction="column" w="100%">
                  <FormControl id="email">
                    <Flex width="65%" justify="space-between">
                      <FormLabel>
                        <Text color="grey.900" variant="B200" fontWeight="bold">
                          Email
                        </Text>
                      </FormLabel>
                      <Flex direction="column">
                        <FormInput mb="20px" type="email" value={user.email} />
                        <FormInput
                          type="password"
                          placeholder="Password (if changing email)"
                        />
                      </Flex>
                    </Flex>
                  </FormControl>
                </Flex>
              </VStack>
            </Flex>
          </FieldGroup>
          <FieldGroup>
            <Flex direction="column" w="100%">
              <VStack width="100%" spacing="6">
                <Flex direction="column" w="100%">
                  <FormControl id="name">
                    <Flex width="65%" justify="space-between">
                      <FormLabel>
                        <Text color="grey.900" variant="B200" fontWeight="bold">
                          Password
                        </Text>
                      </FormLabel>
                      <Flex direction="column">
                        <FormInput
                          mb="20px"
                          type="password"
                          placeholder="Current Password..."
                        />
                        <FormInput
                          type="password"
                          placeholder="New Password..."
                        />
                      </Flex>
                    </Flex>
                  </FormControl>
                </Flex>
              </VStack>
            </Flex>
          </FieldGroup>
          <FieldGroup>
            <Flex direction="column" w="100%">
              <Heading size="H200" mb="52px">
                Photo
              </Heading>
              <Stack
                direction="row"
                spacing="6"
                align="center"
                width="50%"
                justify="space-between"
              >
                <Avatar size="3xl" name={user.name} src={user.picture} />
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
            </Flex>
          </FieldGroup>
          <FieldGroup>
            <Flex direction="column" w="100%">
              <Heading size="H200" mb="52px">
                Delete Account
              </Heading>
              <VStack width="100%" spacing="6">
                <Flex direction="column" w="100%">
                  <FormControl>
                    <Flex w="65%" justify="space-between">
                      <FormLabel>
                        <Text
                          color="grey.900"
                          variant="B200"
                          fontWeight="bold"
                        ></Text>
                      </FormLabel>
                    </Flex>
                  </FormControl>
                </Flex>
              </VStack>
            </Flex>
          </FieldGroup>
        </Stack>
      </form>
    </Flex>
  );
};

export default function Profile({ user }) {
  const { roles } = user['https://mediajams-studio'];

  return (
    <Flex
      direction="column"
      borderRadius="8px"
      align="center"
      p="1rem"
      w="100%"
      overflowY="scroll"
      h="100%"
      m={5}
    >
      <ProfileForm user={user} />
    </Flex>
  );
}

Profile.getLayout = (page) => <Layout>{page}</Layout>;

export const getServerSideProps = auth0.withPageAuthRequired();

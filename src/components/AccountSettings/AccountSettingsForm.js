import {
  Flex,
  Heading,
  Text,
  Stack,
  Button,
  StackDivider,
  Input,
  HStack,
  VStack,
  FormControl,
  FormLabel,
  Box,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';

import { HiCloudUpload } from 'react-icons/hi';
import FieldGroup from '@components/FieldGroup';

function FormHeading({ register }) {
  return (
    <Flex w="100%" justify="space-between">
      <Heading size="H300" paddingBottom="4">
        Account Settings
      </Heading>
      <Flex justify="space-evenly" align="center">
        <Input
          height="48px"
          width="456px"
          mr="8px"
          placeholder="Current Password (to save changes)"
          type="password"
          {...register('password')}
        />
        <Button
          type="submit"
          bg="primary.500"
          color="white"
          w="100px"
          height="40px"
        >
          <Text variant="B300" fontWeight="bold">
            Save
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
}

function PersonalInfoFieldGroup({ register }) {
  return (
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
                <Input
                  height="48px"
                  width="456px"
                  type="text"
                  {...register('name')}
                />
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
                <Input
                  height="48px"
                  width="456px"
                  type="email"
                  {...register('email', {
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Entered value does not match email format',
                    },
                  })}
                />
              </Flex>
            </FormControl>
          </Flex>
        </VStack>
      </Flex>
    </FieldGroup>
  );
}

function NewPasswordFieldGroup({ register }) {
  return (
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
                  <Input
                    height="48px"
                    width="456px"
                    type="password"
                    placeholder="Change your password"
                    {...register('newPassword')}
                  />
                </Flex>
              </Flex>
            </FormControl>
          </Flex>
        </VStack>
      </Flex>
    </FieldGroup>
  );
}

function PictureFieldGroup({ user }) {
  return (
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
  );
}

export default function AccountSettingsForm({ user }) {
  console.log();

  const currentEmail = user.email;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      picture: user.picture,
    },
  });

  async function submitFormValues(data) {
    const userId = user.sub.substring(user.sub.indexOf('|') + 1);
    console.log(userId);
    console.log(user.sub);

    await fetch('/api/user/update-user-info', {
      method: 'POST',
      body: JSON.stringify({ userId: user.sub, currentEmail, ...data }),
    });
  }

  return (
    <Flex w="100%" justify="center">
      <form onSubmit={handleSubmit(submitFormValues)} style={{ width: '70%' }}>
        <Stack ml={8} spacing="4" divider={<StackDivider />}>
          <FormHeading register={register} />
          <PersonalInfoFieldGroup register={register} />
          <NewPasswordFieldGroup register={register} />
          <PictureFieldGroup user={user} />
        </Stack>
      </form>
    </Flex>
  );
}

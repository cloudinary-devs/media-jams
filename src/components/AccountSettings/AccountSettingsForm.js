import React from 'react';
import {
  Flex,
  Heading,
  Link,
  Text,
  Stack,
  Button,
  StackDivider,
  Input,
  HStack,
  FormControl,
  FormLabel,
  Box,
  Avatar,
  Spinner,
  useColorModeValue,
  createStandaloneToast,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { useUser } from '@auth0/nextjs-auth0';
import { HiCloudUpload } from 'react-icons/hi';
import { createPlateComponents } from '@udecode/plate';

function FormHeading() {
  return (
    <Flex w="100%" justify="space-between">
      <Heading size="H300" paddingBottom="4">
        Account Settings
      </Heading>
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
  );
}

function NameFieldGroup({ register, name }) {
  return (
    <Flex direction="column">
      <Heading size="H200" mb="52px">
        Personal information
      </Heading>
      <FormControl justifyContent="flex-start" id="name">
        <FormLabel display="flex" w="50px">
          <Text mb="20px" color="grey.900" variant="B200" fontWeight="bold">
            Name
          </Text>
        </FormLabel>
        <Input
          height="48px"
          width={{ base: '343px', md: '456px' }}
          type="text"
          defaultValue={name}
          {...register('name')}
        />
      </FormControl>
    </Flex>
  );
}

function EmailFieldGroup({ verifiedEmail, email, register }) {
  return (
    <FormControl justifyContent="flex-start" id="name">
      <FormLabel display="flex" w="50px">
        <Text mb="20px" color="grey.900" variant="B200" fontWeight="bold">
          Email
        </Text>
      </FormLabel>
      {verifiedEmail ? (
        <Input
          height="48px"
          width={{ base: '343px', md: '456px' }}
          type="email"
          defaultValue={email}
          {...register('email')}
        />
      ) : (
        <Flex
          direction="column"
          justify="center"
          p="24px"
          w={{ base: '343px', md: '456px' }}
          h={{ base: '256px', md: '192px' }}
          bg="primary.200"
        >
          <Heading fontWeight="700" color="grey.900" size="H100">
            You still need to verify your email!
          </Heading>
          <Text
            mt="8px"
            variant="B300"
            color="grey.700"
          >{`We've sent a confirmation email to ${email}. You must click that link in the message before your email is verified`}</Text>
          <Button
            mt="16px"
            bg="primary.500"
            color="white"
            w={{ base: '80%', md: '60%' }}
          >
            <Text variant="B300" fontWeight="bold">
              Resend email confirmation
            </Text>
          </Button>
        </Flex>
      )}
    </FormControl>
  );
}

function PasswordFieldGroup({ email }) {
  const { toast } = createStandaloneToast();
  async function initiateChangePasswordFlow() {
    const res = await fetch('/api/user/change-password', {
      method: 'POST',
      body: JSON.stringify({ email: email }),
    });

    if (res.status === 200) {
      toast({
        title: 'Successfully sent password reset email',
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      });
    }
  }

  return (
    <Flex direction="column" w="100%">
      <Text color="grey.900" variant="B200" fontWeight="bold">
        Password
      </Text>
      <Link
        as={Button}
        onClick={() => initiateChangePasswordFlow()}
        outline="none"
        bg="none"
        h="0"
        w="0"
        paddingRight="0"
        paddingTop="0"
        paddingBottom="0"
        mt="20px"
        mb="10px"
        ml="36px"
        _focus={{
          boxShadow: 'none',
        }}
        _hover={{
          bg: 'none',
          textDecor: 'underline',
        }}
      >
        <Text color="grey.900" variant="B200" fontWeight="bold">
          Change password
        </Text>
      </Link>
    </Flex>
  );
}

const baseAPIUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.VERCEL_ENV === 'production'
      ? `https://mediajams.dev`
      : `https://mediajams-git-studio-creator-input-mediajams.vercel.app`
    : `http://localhost:3000`;

function PictureFieldGroup({ checkSession, user }) {
  const [fileToUpload, setFileToUpload] = React.useState(null);
  const [cloudinaryFile, setCloudinaryFile] = React.useState(null);
  const [uploadStatus, setStatus] = React.useState('idle');
  const { toast } = createStandaloneToast();

  async function submitFormValues(url) {
    const res = await fetch('/api/user/update-user-picture', {
      method: 'POST',
      body: JSON.stringify({ picture: url, userId: user.sub }),
    });

    if (res.status === 200) {
      checkSession();
      toast({
        title: 'Successfully updated your picture',
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      });
    } else {
      toast({
        title: 'Something went wrong! Try again.',
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      });
    }
  }

  function onChange(event) {
    setFileToUpload({
      file: event.target.files[0],
      preview: URL.createObjectURL(event.target.files[0]),
    });
  }

  async function handleOnClick() {
    setStatus('uploading');
    var formdata = new FormData();
    formdata.append('image', fileToUpload.file);
    formdata.append('folder', user.sub);

    fetch(`${baseAPIUrl}/api/upload`, {
      method: 'POST',
      body: formdata,
      headers: { 'Content-Key': 'application/json' },
    })
      .then((resp) => resp.json())
      .then((result) => {
        setStatus('idle');
        setCloudinaryFile(result);
        console.log(result);
        submitFormValues(result.url);
      })
      .catch((error) => setStatus(`Error: ${error}`));
  }

  return (
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
        <Avatar maxH="4xl" maxW="4xl" name={user.name} src={user.picture} />
        <Box>
          <HStack spacing="5">
            <input type="file" placeholder="Choose File" onChange={onChange} />
            <Button
              onClick={handleOnClick}
              padding={[3, 3, 4]}
              text={uploadStatus == 'uploading' ? 'Processing...' : 'Upload'}
              tone="primary"
              disabled={!fileToUpload}
              leftIcon={
                uploadStatus == 'uploading' ? <Spinner /> : <HiCloudUpload />
              }
            >
              Upload
            </Button>
          </HStack>
          <Text
            fontSize="sm"
            mt="3"
            overflowWrap="wrap"
            color={useColorModeValue('gray.500', 'whiteAlpha.600')}
          >
            .jpg, .gif, or .png. Max file size 700K.
          </Text>
        </Box>
        {fileToUpload && (
          <Flex direction="column" marginTop={16}>
            <div>
              <img src={fileToUpload.preview} />
            </div>
          </Flex>
        )}
      </Stack>
    </Flex>
  );
}

export default function AccountSettingsForm() {
  const { user, isLoading: loadingUser, checkSession } = useUser();
  const { toast } = createStandaloneToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      picture: user.picture,
    },
  });

  async function submitFormValues(data) {
    const res = await fetch('/api/user/update-user-info', {
      method: 'POST',
      body: JSON.stringify({ ...data, email: user.email, userId: user.sub }),
    });

    if (res.status === 200) {
      checkSession();
      toast({
        title: 'Successfully updated your profile',
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      });
    } else {
      toast({
        title: 'Something went wrong! Try again.',
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      });
    }
  }

  return (
    <Flex w="100%" justify="center">
      <form onSubmit={handleSubmit(submitFormValues)} style={{ width: '100%' }}>
        <Stack ml={{ base: 0, md: 8 }} spacing="4" divider={<StackDivider />}>
          <FormHeading register={register} />
          <NameFieldGroup name={user.name} register={register} />
          <EmailFieldGroup
            verifiedEmail={user.email_verified}
            register={register}
            email={user.email}
          />
          <PasswordFieldGroup email={user.email} />
          <PictureFieldGroup checkSession={checkSession} user={user} />
        </Stack>
      </form>
    </Flex>
  );
}

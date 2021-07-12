import React from 'react';
import { Flex } from '@chakra-ui/react';

// This import is only needed when checking authentication status directly from getServerSideProps
import auth0 from '@lib/auth0';
import Layout from '@components/Layout';

import AccountSettingsForm from '@components/AccountSettings/AccountSettingsForm';

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
      <AccountSettingsForm user={user} />
    </Flex>
  );
}

Profile.getLayout = (page) => <Layout>{page}</Layout>;

export const getServerSideProps = auth0.withPageAuthRequired();

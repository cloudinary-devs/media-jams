import React, { useEffect } from 'react';
// This import is only needed when checking authentication status directly from getServerSideProps
import auth0 from '@lib/auth0';
import {
  Flex,
  Text,
  Box,
  Link,
  Icon,
  GridItem,
  Grid,
  Stack,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Link as NextLink } from 'next/link';
import Layout from '@components/Layout';
import { useFetchUser } from '@lib/user';

import { generateSanitySession } from './api/auth/studio';

export function ProfileLink({ children, ...props }) {
  return (
    <Button
      borderRadius="3px"
      colorScheme="blue"
      size="lg"
      w={['0px', '150px']}
    >
      {children}
    </Button>
  );
}

function ProfileCard({ user, sanitySession }) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  console.log(isMobile);
  return (
    <>
      <Grid
        h="100%"
        templateRows="75px 1fr"
        templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
        templateAreas={`"header main main" "sidebar main main"`}
        gap={{ base: 0, md: 4 }}
      >
        <GridItem gridArea="header" bg="tomato" />
        <GridItem colSpan={[0, 'auto']} gridArea="sidebar" bg="tomato">
          {!isMobile && (
            <Stack
              direction="column"
              spacing={4}
              align="center"
              w={[0, '100%']}
            >
              <ProfileLink>Account</ProfileLink>
              <ProfileLink>Studio</ProfileLink>
              <ProfileLink>Notes</ProfileLink>
              <ProfileLink>Settings</ProfileLink>
            </Stack>
          )}
        </GridItem>
        <GridItem gridArea="main" bg="papayawhip">
          <h1>Profile</h1>
          <div>
            <h3>Profile (server rendered)</h3>
            <img src={user.picture} alt="user picture" />
            <p>nickname: {user.nickname}</p>
            <p>name: {user.name}</p>
          </div>
          <Link
            href={`${sanitySession.endUserClaimUrl}?origin=${
              process.env.NODE_ENV == 'production'
                ? 'https://mediajams.sanity.studio'
                : 'http://localhost:3333'
            }`}
            isExternal
          >
            Media Jams Studio <Icon name="external-link" mx="2px" />
          </Link>
          )
          <Link as={NextLink} px={2} href="/api/auth/logout">
            Logout
          </Link>
        </GridItem>
      </Grid>
    </>
  );
}

function Profile({ user, sanitySession }) {
  return (
    <Layout>
      <ProfileCard user={user} sanitySession={sanitySession} />
    </Layout>
  );
}

/**
 * Get User Session SSR or redirect to Login
 * Generate Sanity Session for Link to Studio
 *
 */
export async function getServerSideProps({ req, res }) {
  // Here you can check authentication status directly before rendering the page,
  // however the page would be a serverless function, which is more expensive and
  // slower than a static page with client side authentication
  const session = await auth0.getSession(req);

  if (!session || !session.user) {
    res.writeHead(302, {
      Location: '/api/auth/login',
    });
    res.end();
    return;
  }
  const { user } = session;
  const sanitySession = (await generateSanitySession(user)) ?? null;

  return { props: { user, sanitySession } };
}

export default Profile;

import React, { useEffect } from 'react';
// This import is only needed when checking authentication status directly from getServerSideProps
import auth0 from '@lib/auth0';
import { Flex, Text, Box, Link, Icon, Button, Stack } from '@chakra-ui/react';
import { Link as NextLink } from 'next/link';
import { AiOutlineLogout, AiOutlineSetting } from 'react-icons/ai';
import Layout from '@components/Layout';

import { generateSanitySession } from './api/auth/studio';

function ProfileCard({ user, sanitySession }) {
  return (
    <>
      <h1>Profile</h1>
      <div>
        <h3>Profile (server rendered)</h3>
        <img src={user.picture} alt="user picture" />
        <p>nickname: {user.nickname}</p>
        <p>name: {user.name}</p>
      </div>
      <Stack direction="row" spacing={4}>
        <Link href={sanitySession} isExternal>
          <Button
            leftIcon={<AiOutlineSetting />}
            colorScheme="pink"
            variant="solid"
          >
            Media Jams Studio
          </Button>
        </Link>
        <Link as={NextLink} px={2} href="/api/auth/logout">
          <Button
            rightIcon={<AiOutlineLogout />}
            colorScheme="blue"
            variant="outline"
          >
            Logout
          </Button>
        </Link>
      </Stack>
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
  // Match sanity studio url with environment from deployment
  const studioURL =
    process.env.VERCEL_ENV === 'production'
      ? 'https://studio.mediajams.dev'
      : 'https://stage-studio.mediajams.dev';
  return {
    props: {
      user,
      // Build sanity session url with return uri in production or
      // to local running studio in development.
      sanitySession: `${sanitySession?.endUserClaimUrl}?origin=${
        process.env.NODE_ENV == 'production'
          ? studioURL
          : 'http://localhost:3333'
      }`,
    },
  };
}

export default Profile;

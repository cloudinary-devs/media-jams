// This import is only needed when checking authentication status directly from getServerSideProps
import auth0 from '@lib/auth0';
import { Flex, Text, Box, Link, Icon } from '@chakra-ui/core';
import { Link as NextLink } from 'next/link';
import Layout from '@components/Layout';
import { useFetchUser } from '@lib/user';

import { generateSanitySession } from './api/auth/studio';

function ProfileCard({ user }) {
  return (
    <>
      <h1>Profile</h1>

      <div>
        <h3>Profile (client rendered)</h3>
        <img src={user.picture} alt="user picture" />
        <p>nickname: {user.nickname}</p>
        <p>name: {user.name}</p>
      </div>

      <Link
        href={`${user['https://mediajams-studio/claimUrl']}?origin=https://mediajams.sanity.studio`}
        isExternal
      >
        Media Jams Studio <Icon name="external-link" mx="2px" />
      </Link>
      <Link as={NextLink} px={2} href="/api/auth/logout">
        Logout
      </Link>
    </>
  );
}

function Profile({ user }) {
  // const { user, loading } = useFetchUser({ required: true });

  return (
    <Layout>
      <ProfileCard user={user} />
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

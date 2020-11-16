// This import is only needed when checking authentication status directly from getServerSideProps
// import auth0 from '@lib/auth0';
import { Flex, Text, Box, Link, Icon } from '@chakra-ui/core';
import { Link as NextLink } from 'next/link';
import Layout from '@components/Layout';
import { useFetchUser } from '@lib/user';

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
      <Link as={NextLink} px={2} href="/api/auth/logout">
        Logout
      </Link>
      <Link
        href={`${user['https://mediajams-studio/claimUrl']}?origin=https://mediajams.sanity.studio/`}
        isExternal
      >
        Media Jams Studio <Icon name="external-link" mx="2px" />
      </Link>
    </>
  );
}

function Profile() {
  const { user, loading } = useFetchUser({ required: true });

  return (
    <Layout user={user} loading={loading}>
      {loading ? <>Loading...</> : user && <ProfileCard user={user} />}
    </Layout>
  );
}

export default Profile;

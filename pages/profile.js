import React, { useEffect, useState } from 'react';
// This import is only needed when checking authentication status directly from getServerSideProps
import auth0 from '@lib/auth0';
import { Flex, Text, Box, Link, Icon, Button, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { AiOutlineLogout, AiOutlineSetting } from 'react-icons/ai';
import Layout from '@components/Layout';

// `onClick`, `href`, and `ref` need to be passed to the DOM element
// for proper handling
const LogOut = React.forwardRef(({ onClick, href }, ref) => {
  return (
    <Button
      as="a"
      rightIcon={<AiOutlineLogout />}
      colorScheme="blue"
      variant="outline"
      href={href}
      onClick={onClick}
      ref={ref}
    >
      LogOut
    </Button>
  );
});

function ProfileCard({ user }) {
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
    <>
      <h1>Profile</h1>
      <div>
        <h3>Profile (server rendered)</h3>
        <img src={user.picture} alt="user picture" />
        <p>nickname: {user.nickname}</p>
        <p>name: {user.name}</p>
      </div>
      <Stack direction="row" spacing={4}>
        <Button
          leftIcon={<AiOutlineSetting />}
          colorScheme="pink"
          variant="solid"
          onClick={handleOnClickStudio}
        >
          Media Jams Studio
        </Button>
        <Link as={NextLink} px={2} href="/api/auth/logout" passHref>
          <Button
            rightIcon={<AiOutlineLogout />}
            colorScheme="blue"
            variant="outline"
          >
            LogOut
          </Button>
        </Link>
      </Stack>
    </>
  );
}

function Profile({ user }) {
  return (
    <Layout>
      <ProfileCard user={user} />
    </Layout>
  );
}

export default Profile;
export const getServerSideProps = auth0.withPageAuthRequired();

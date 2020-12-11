import React, { useEffect, useState } from 'react';
// This import is only needed when checking authentication status directly from getServerSideProps
import auth0 from '@lib/auth0';
import {
  Flex,
  Text,
  Box,
  Link as LinkWrapper,
  Icon,
  GridItem,
  Grid,
  Stack,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import Layout from '@components/Layout';
import { useFetchUser } from '@lib/user';
import { useRouter } from 'next/router';
import { generateSanitySession } from '../api/auth/studio';

const StudioPanel = (props) => <>I am studio</>;
const AccountPanel = ({ user, sanitySession }) => (
  <>
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
      Media Jams Studio
    </Link>
    <Link px={2} href="/api/auth/logout">
      Logout
    </Link>
  </>
);
const sideMenuItems = [
  {
    name: 'account',
    label: 'Account',
    href: '/profile/account',
    component: AccountPanel,
  },
  {
    name: 'studio',
    label: 'Studio',
    href: '/profile/studio',
    component: StudioPanel,
  },
  { name: 'notes', label: 'Notes', href: '/profile/notes' },
  { name: 'settings', label: 'Settings', href: '/profile/settings' },
];

export function ProfileItemLink({ children, isActive, ...props }) {
  return (
    <Button
      borderRadius="3px"
      colorScheme="blue"
      size="lg"
      w={['0px', '100%']}
      isActive={isActive}
      _active={{
        bg: '#dddfe2',
        transform: 'scale(1.03)',
        borderColor: '#bec3c9',
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

function ProfileCard({ user, sanitySession }) {
  const [activeMenuItem, setMenuItem] = useState('account'); //defaults to account
  const isMobile = useBreakpointValue({ base: true, md: false });
  const router = useRouter();
  useEffect(() => {
    const {
      params: [path],
    } = router.query;
    if (path) setMenuItem(path);
  }, [router.query]);
  return (
    <>
      <Grid
        h="100%"
        templateRows="75px 1fr"
        templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
        templateAreas={`"header main main" "sidebar main main"`}
        gap={{ base: 0, md: 4 }}
      >
        <GridItem gridArea="header" />
        <GridItem colSpan={[0, 'auto']} gridArea="sidebar">
          {!isMobile && (
            <Stack
              direction="column"
              spacing={4}
              align="center"
              w={[0, '100%']}
            >
              {' '}
              {sideMenuItems.map((item) => (
                <Link key={item.name} width="100%" href={item.href}>
                  <ProfileItemLink isActive={item.name === activeMenuItem}>
                    {item.label}
                  </ProfileItemLink>
                </Link>
              ))}
            </Stack>
          )}
        </GridItem>
        <GridItem gridArea="main">
          {sideMenuItems
            .filter(({ name }) => name === activeMenuItem)
            .map((Item) => (
              <Item.component user={user} sanitySession={sanitySession} />
            ))}
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

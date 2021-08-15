import { Button, Stack, Link, Spacer } from '@chakra-ui/react';
import { useUser } from '@auth0/nextjs-auth0';
import NextLink from 'next/link';

import useStudio from '@hooks/useStudio';
import Footer from '@components/Footer';

const SideMenuButton = ({ internal = true, link, children }) => {
  const ToLink = internal ? NextLink : Link;
  return (
    <Button variant="solid" bg="white" w="100%" color="grey.900">
      <ToLink href={link}>{children}</ToLink>
    </Button>
  );
};

/**
 *
 * maxH (-104px) is the h minus the mobile title bar AND the NewNote
 */
const MoreContent = () => {
  const { user, loading } = useUser();
  const openStudio = useStudio();
  return (
    <Stack flex={1} maxH="calc(100% - 104px)">
      <Stack px={{ base: 6, md: 10 }} py={{ base: 0, md: 8 }}>
        <SideMenuButton internal={false} link="/docs/">
          Creator Docs
        </SideMenuButton>
        <SideMenuButton link="/feedback">Provide Feedback</SideMenuButton>
        {user && user['https://mediajams-studio']?.roles && (
          <Button
            variant="solid"
            bg="white"
            w="100%"
            color="grey.900"
            onClick={openStudio}
          >
            MDE Studio
          </Button>
        )}
      </Stack>
      <Spacer margin={0} />
      <Footer />
    </Stack>
  );
};

export default MoreContent;

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

const MoreContent = () => {
  const { user, loading } = useUser();
  const openStudio = useStudio();
  return (
    <Stack flex={1} spacing={8}>
      <Stack px={{ base: 6, md: 10 }} py={8}>
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
      <Spacer />
      <Footer />
    </Stack>
  );
};

export default MoreContent;

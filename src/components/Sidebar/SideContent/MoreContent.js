import { Button, Stack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

import useStudio from '@hooks/useStudio';
import { useUser } from '@auth0/nextjs-auth0';

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
    <Stack spacing={8}>
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
    </Stack>
  );
};

export default MoreContent;

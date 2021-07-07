import { Button, Stack } from '@chakra-ui/react';

const SideMenuButton = ({ children }) => (
  <Button variant="solid" bg="white" w="100%" color="grey.900">
    {children}
  </Button>
);

const MoreContent = () => {
  return (
    <Stack spacing={8}>
      <Stack px={6} py={8}>
        <SideMenuButton>Creator Docs</SideMenuButton>
        <SideMenuButton>Media Kit</SideMenuButton>
        <SideMenuButton>Provide Feedback</SideMenuButton>
      </Stack>
    </Stack>
  );
};

export default MoreContent;

import { Button, Stack, Text } from '@chakra-ui/react';

export default function LoadMoreButton({ disabled = false, onClick }) {
  return (
    <Stack direction="row" justifyContent="center" align="center">
      <Button
        p="6px 32px"
        borderRadius="8px"
        bg="primary.500"
        disabled={disabled}
        onClick={onClick}
      >
        <Text variant="B400" color="#FFFFFF" fontWeight="700">
          Load More
        </Text>
      </Button>
    </Stack>
  );
}

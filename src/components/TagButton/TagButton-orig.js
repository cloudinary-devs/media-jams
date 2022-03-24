import React from 'react';
import { Button, Text } from '@chakra-ui/react';

export default function TagButton({ onClick, isTagSelected = false }) {
  return (
    <Button
      _hover={{
        background: useToken('colors', 'primary.200'),
        color: useToken('colors', 'primary.800'),
      }}
      padding={{ lg: '2px 6px' }}
      minW={{ base: '' }}
      bg={() => (!isTagSelected ? 'grey.200' : 'primary.200')}
      color={() => (!isTagSelected ? 'grey.800' : 'primary.800')}
      borderRadius="4px"
      onClick={onClick}
      height="auto"
      {...rest}
    >
      <Text variant="B300" fontWeight="500">
        {children}
      </Text>
    </Button>
  );
}

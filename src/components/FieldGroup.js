import React from 'react';
import { Stack } from '@chakra-ui/react';

export const FieldGroup = (props) => {
  const { children, ...flexProps } = props;
  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      spacing="6"
      py="4"
      {...flexProps}
    >
      {children}
    </Stack>
  );
};

export default FieldGroup;

import React from 'react';
import { Stack, Input } from '@chakra-ui/core';

export default function SearchInput({ searchValue, setSearchValue }) {
  const onChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <Stack
      direction="column"
      w={['100%', '75%', '50%']}
      align="center"
      spacing={[6, 8, 10]}
      mt={16}
    >
      <Input value={searchValue} onChange={onChange} />
    </Stack>
  );
}

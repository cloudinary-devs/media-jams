import React from 'react';
import { Stack, Input } from '@chakra-ui/core';
import Mixpanel, { useMixPanel } from 'lib/mixpanel';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export default function SearchInput({ searchValue, setSearchValue }) {
  const mixpanel = useMixPanel();
  React.useEffect(() => {
    mixpanel.track('Search Tag', { searchValue });
  }, [searchValue]);
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

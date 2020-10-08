import React from 'react';
import { Stack, Input } from '@chakra-ui/core';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import Mixpanel, { useMixPanel } from 'lib/mixpanel';
import useDebounce from '../hooks/useDebounce';

export default function SearchInput({ searchValue, setSearchValue }) {
  const mixpanel = useMixPanel();
  const debounceSearchValue = useDebounce(searchValue, 500);
  React.useEffect(() => {
    mixpanel.track('Search Tag', { searchInput: debounceSearchValue });
  }, [debounceSearchValue]);
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

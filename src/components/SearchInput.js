import React from 'react';
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useTheme,
} from '@chakra-ui/core';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import Mixpanel, { useMixPanel } from 'lib/mixpanel';
import useDebounce from '../hooks/useDebounce';

export default function SearchInput({ searchValue, setSearchValue }) {
  const mixpanel = useMixPanel();
  const debounceSearchValue = useDebounce(searchValue, 500);
  const theme = useTheme();
  React.useEffect(() => {
    mixpanel.track('Search Tag', { searchInput: debounceSearchValue });
  }, [debounceSearchValue]);
  const onChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <InputGroup size="md" w="35rem">
      <Input
        variant="outline"
        placeholder="Search by tag, title, or keyword..."
        padding="1.2rem 0 1.2rem 1rem"
        value={searchValue}
        onChange={onChange}
        borderColor="blue.200"
        backgroundColor="blue.900"
        _placeholder={{
          color: 'white',
          lineSpacing: '4px',
          fontSize: 'md',
        }}
      />
      <InputRightElement w="10rem" pr=".3rem">
        <Button
          w="100%"
          variant="outline"
          size="sm"
          borderRadius="3px"
          bg="blue.500"
          outline="blue.400"
        >
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

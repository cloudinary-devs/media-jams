import React from 'react';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import Mixpanel, { useMixPanel } from 'lib/mixpanel';
import useDebounce from '../hooks/useDebounce';

export default function SearchInput({ searchValue, setSearchValue, ...rest }) {
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
    <InputGroup size="md" mt={10} {...rest}>
      <Input
        variant="outline"
        placeholder="Search by tag, title, or keyword..."
        padding="1.2rem 0 1.2rem 1rem"
        value={searchValue}
        onChange={onChange}
        borderColor="blue.200"
        backgroundColor="blue.200"
        _placeholder={{
          color: 'black',
          lineSpacing: '4px',
          fontSize: 'sm',
        }}
      />
      <InputRightElement w="6rem" pr="">
        <Button size="sm" borderRadius="3px" colorScheme="blue">
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

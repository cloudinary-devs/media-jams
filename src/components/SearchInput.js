import React from 'react';
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useTheme,
} from '@chakra-ui/react';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import Mixpanel, { useMixPanel } from 'lib/mixpanel';
import useDebounce from '../hooks/useDebounce';

export default function SearchInput({ searchValue, setSearchValue, ...rest }) {
  console.log(rest);
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
    <InputGroup size="md" w="35rem" mt={10} {...rest}>
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
          fontSize: 'md',
        }}
      />
      <InputRightElement w="10rem" pr=".3rem">
        <Button w="100%" size="sm" borderRadius="3px" colorScheme="blue">
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

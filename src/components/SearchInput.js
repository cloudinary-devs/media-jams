import React from 'react';
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { FaFilter } from 'react-icons/fa';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import Mixpanel, { useMixPanel } from 'lib/mixpanel';
import useDebounce from '../hooks/useDebounce';

export default function SearchInput({
  searchValue,
  setSearchValue,
  showFilters,
  setShowFilters,
  width,
  ...rest
}) {
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
    <InputGroup w={width} {...rest}>
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
      <InputRightElement>
        <IconButton
          onClick={() => setShowFilters(!showFilters)}
          icon={<FaFilter />}
          colorScheme="blue"
        ></IconButton>
      </InputRightElement>
    </InputGroup>
  );
}

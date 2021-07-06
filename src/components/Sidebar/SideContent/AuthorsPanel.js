import React from 'react';
import {
  Button,
  Stack,
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  useBreakpointValue,
  useToken,
} from '@chakra-ui/react';
import { Search as SearchIcon } from '@components/Icons';
import { useQuery } from 'react-query';
import { authors } from '@lib/queries/authors';
import SearchInput from '@components/Search/SearchInput';

import Fuse from 'fuse.js';

const fuseOptions = {
  threshold: 0.35,
  location: 0,
  distance: 100,
  minMatchCharLength: 1,
  shouldSort: true,
  includeScore: true,
  useExtendedSearch: true,
  keys: ['author.name'],
};

export const SearchField = ({ searchValue, onChange, ...props }) => {
  return (
    <InputGroup
      size="md"
      bg="#FFFFFF"
      borderRadius="8px"
      border="1px solid #D3DDE6"
      {...props}
    >
      <InputLeftElement pointerEvents="none">
        <SearchIcon opacity={0.82} />
      </InputLeftElement>
      <Input
        value={searchValue}
        onChange={onChange}
        placeholder="Search"
        bg="whiteAlpha.400"
        border={0}
        focusBorderColor="whiteAlpha.800"
        _placeholder={{
          fontFamily: 'DM Sans',
          fontSize: '16px',
          color: useToken('colors', 'grey.700'),
        }}
      />
    </InputGroup>
  );
};

const Authors = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [filteredAuthors, setFilteredAuthors] = React.useState([]);
  const { data } = useQuery(`authors`, () => authors.get());

  React.useEffect(() => {
    if (!searchValue) {
      handleFilter(data?.allPost);
    } else {
      const queries = {
        $or: [
          {
            $path: ['author.name'],
            $val: searchValue,
          },
        ],
      };
      const results = fuse.search(queries).map((result) => result.item);
      handleFilter(results);
    }
  }, [searchValue, data]);

  const fuse = new Fuse(data?.allAuthors, fuseOptions);

  const onChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleFilter = (data) => setFilteredAuthors(data);
  return (
    <Flex width={{ base: 'full' }} direction="column" px={6} py={8}>
      <Stack>
        <SearchField value={searchValue} onChange={onChange} mb={6} />
      </Stack>
    </Flex>
  );
};

export default Authors;

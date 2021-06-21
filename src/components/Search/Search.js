import { Flex } from '@chakra-ui/react';
import SearchInput from './SearchInput';
import TagFilters from './TagFilters';

export default function Search({ searchValue, setSearchValue }) {
  return (
    <Flex w="1000px" alignSelf="center" direction="column">
      <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
      <TagFilters />
    </Flex>
  );
}

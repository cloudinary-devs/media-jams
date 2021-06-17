import { Flex } from '@chakra-ui/react';
import SearchInput from './SearchInput';
import TagFilters from './TagFilters';

export default function Search() {
  return (
    <Flex w="1000px" alignSelf="center" direction="column">
      <SearchInput />
      <TagFilters />
    </Flex>
  );
}

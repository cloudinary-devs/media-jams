import { Flex } from '@chakra-ui/react';
import SearchInput from './SearchInput';
import TagFilters from './TagFilters';

export default function Search() {
  return (
    <Flex direction="column" maxW={{ base: '100%', md: '90%', lg: '980px' }}>
      <SearchInput />
      <TagFilters />
    </Flex>
  );
}

import { Flex } from '@chakra-ui/react';
import SearchInput from './SearchInput';

export default function Search({ searchValue, setSearchValue }) {
  return (
    <Flex
      w={{ base: '90%', lg: '884px' }}
      alignSelf="center"
      direction="column"
    >
      <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
    </Flex>
  );
}

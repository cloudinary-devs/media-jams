import { Flex } from '@chakra-ui/react';
import SearchInput from '@components/SearchInput';

export default function Search({ searchValue, setSearchValue, onFocus }) {
  return (
    <Flex
      w={{ base: '90%', lg: '884px' }}
      alignSelf="center"
      direction="column"
    >
      <SearchInput
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onFocus={onFocus}
      />
    </Flex>
  );
}

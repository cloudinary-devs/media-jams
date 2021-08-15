import { Flex } from '@chakra-ui/react';
import SearchInput from './SearchInput';
import TagFilters from './TagFilters';

export default function Search({
  searchValue,
  setSearchValue,
  selectedFilters,
  setSelectedFilters,
  addTag,
  removeTag,
  clearAllTags,
}) {
  return (
    <Flex
      w={{ base: '90%', lg: '884px' }}
      alignSelf="center"
      direction="column"
    >
      <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
      <TagFilters
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        addTag={addTag}
        removeTag={removeTag}
        clearAllTags={clearAllTags}
      />
    </Flex>
  );
}

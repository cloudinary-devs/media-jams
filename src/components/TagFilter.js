import React from 'react';
import Fuse from 'fuse.js';
import { Box, Button, Input, Flex, Text, Spacer } from '@chakra-ui/react';
import TagButton from '@components/TagButton';

export default function TagFilter({
  tags,
  selectedFilters,
  setSelectedFilters,
  addTag,
  removeTag,
  color,
}) {
  const [search, setSearch] = React.useState('');
  const [filteredTagResults, setFilteredTagResults] = React.useState([]);

  const fuseOptions = {
    threshold: 0.35,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
    shouldSort: true,
    includeScore: true,
    useExtendedSearch: true,
    keys: ['title'],
  };

  React.useEffect(() => {
    if (search === '') {
      // setFilteredTagResults(categories);
    } else {
      const results = fuse.search(search).map((result) => result.item);
      setFilteredTagResults(results);
    }
  }, [search]);

  const fuse = new Fuse(tags, fuseOptions);

  return (
    <Flex h="100%" w="100%" direction="column" justifyContent="space-between">
      <Box>
        <TagSearchInput color={color} setSearch={setSearch} mb={2} />
        <Flex
          mt={2}
          wrap="wrap"
          margin=" -2px 0 0 -2px"
          width="calc(100% + 12px)"
        >
          {search.length > 0
            ? filteredTagResults?.map((tag) => {
                return (
                  <TagButton
                    key={tag._id}
                    addTag={addTag}
                    removeTag={removeTag}
                    searchTags={selectedFilters}
                    tag={tag}
                    color={color}
                    margin=" 2px 0 0 2px"
                  />
                );
              })
            : tags?.map((tag) => {
                return tag.featured === true ? (
                  <TagButton
                    addTag={addTag}
                    removeTag={removeTag}
                    searchTags={selectedFilters}
                    tag={tag}
                    key={tag._id}
                    color={color}
                    margin=" 2px 0 0 2px"
                  />
                ) : null;
              })}
        </Flex>
      </Box>
      <CurrentFilterGroup
        color={color}
        selectedFilters={selectedFilters}
        addTag={addTag}
        removeTag={removeTag}
        searchTags={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
    </Flex>
  );
}

function TagSearchInput({ setSearch, color, ...rest }) {
  return (
    <Input
      size="sm"
      padding={3}
      fontSize={10}
      alignSelf="center"
      placeholder="Filter tags..."
      borderWidth="1px"
      color={color ? `${color}.600` : 'blue.600'}
      bg="white"
      borderRadius="8px"
      onChange={(e) => setSearch(e.target.value)}
      {...rest}
    />
  );
}

function CurrentFilterGroup({
  selectedFilters,
  setSelectedFilters,
  addTag,
  removeTag,
  searchTags,
  color,
  ...rest
}) {
  return (
    <Flex w="100%" direction="column" {...rest}>
      <Flex mb={2} align="center" justify="center">
        <Text fontSize="xs" as="i">
          Current Filters
        </Text>
        <Spacer />
        <ClearTagsButton setSelectedFilters={setSelectedFilters} />
      </Flex>
      <Flex
        mt={2}
        wrap="wrap"
        margin=" -2px 0 0 -2px"
        width="calc(100% + 12px)"
      >
        {selectedFilters ? (
          selectedFilters.map((tag) => (
            <TagButton
              addTag={addTag}
              removeTag={removeTag}
              searchTags={selectedFilters}
              tag={tag}
              key={tag._id}
              color={color}
              margin="2px 0 0 2px"
            />
          ))
        ) : (
          <Box />
        )}
      </Flex>
    </Flex>
  );
}

function ClearTagsButton({ setSelectedFilters, color }) {
  return (
    <Button
      colorScheme={color ? color : 'red'}
      size="sm"
      variant="solid"
      onClick={() => setSelectedFilters([])}
    >
      Clear
    </Button>
  );
}

import React from 'react';
import Fuse from 'fuse.js';
import {
  Box,
  Button,
  VStack,
  Input,
  Flex,
  Icon,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { FaTag, FaMinusCircle } from 'react-icons/fa';
import { BsChevronDoubleRight, BsChevronDoubleLeft } from 'react-icons/bs';
import TagButton from '@components/TagButton';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';

function CategoryTagList({
  addTag,
  removeTag,
  selectedFilters,
  filteredTagResults,
}) {
  return (
    <Wrap spacing="3px">
      {filteredTagResults.map((tag) => {
        return (
          <WrapItem>
            <TagButton
              searchTags={selectedFilters}
              removeTag={removeTag}
              addTag={addTag}
              tag={tag}
              icon={
                selectedFilters.some((selected) => selected === tag) ? (
                  <Icon as={FaMinusCircle} color="red.300" />
                ) : (
                  <FaTag />
                )
              }
            />
          </WrapItem>
        );
      })}
    </Wrap>
  );
}

export default function TagFilterSidebar({
  categories,
  addTag,
  removeTag,
  selectedFilters,
  setSelectedFilters,
}) {
  const [isOpen, setIsOpen] = React.useState(true);
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
  };

  let arr = [];

  React.useEffect(() => {
    if (filteredTagResults.length <= 0 || search.length === 0) {
      categories.map((cat) => {
        if (cat.tags) {
          cat.tags.map((tag) => arr.push(tag));
        }
      });

      return setFilteredTagResults(arr);
    }
    const results = fuse.search(search).map((result) => result.item);
    return setFilteredTagResults(results);
  }, [search]);

  const fuse = new Fuse(filteredTagResults, fuseOptions);

  const onToggle = () => {
    return setIsOpen(!isOpen);
  };

  return (
    <Flex width={isOpen ? '20%' : 'auto'}>
      {isOpen ? (
        <Box
          p="1.2rem"
          position="sticky"
          overflow="scroll"
          h="100vh"
          top="0"
          border="1px solid black"
        >
          <Input
            size="sm"
            fontSize=".6rem"
            placeholder="Filter tags..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            p={2}
            mt={2}
            mb={3}
            variant="outline"
            fontSize="10px"
            onClick={() => setSelectedFilters([])}
          >
            Clear Tags
          </Button>
          <VStack my="1.5rem" alignItems="flex-start">
            <Text fontSize="xs" as="i">
              Current Filters
            </Text>
            <Wrap>
              {selectedFilters ? (
                selectedFilters.map((tag) => (
                  <WrapItem>
                    <TagButton
                      addTag={addTag}
                      removeTag={removeTag}
                      searchTags={selectedFilters}
                      icon={FaTag}
                      tag={tag}
                    />
                  </WrapItem>
                ))
              ) : (
                <Box></Box>
              )}
            </Wrap>
          </VStack>

          {filteredTagResults && (
            <CategoryTagList
              filteredTagResults={filteredTagResults}
              addTag={addTag}
              removeTag={removeTag}
              selectedFilters={selectedFilters}
            />
          )}
        </Box>
      ) : null}
      <Button
        borderTopLeftRadius="0"
        borderBottomLeftRadius="0"
        borderTopRightRadius="xl"
        borderBottomRightRadius="xl"
        colorScheme="blue"
        p={3}
        w={4}
        position="sticky"
        top="0"
        onClick={() => onToggle()}
      >
        {isOpen ? (
          <Icon as={BsChevronDoubleLeft} />
        ) : (
          <Icon as={BsChevronDoubleRight} />
        )}
      </Button>
    </Flex>
  );
}

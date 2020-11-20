import React from 'react';
import Fuse from 'fuse.js';

import { Box, Button, Input, Flex, Icon } from '@chakra-ui/core';
import { BsChevronDoubleRight, BsChevronDoubleLeft } from 'react-icons/bs';
import CategoryTagList from '@components/CategoryTagList';
import { motion } from 'framer-motion';

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

  React.useEffect(() => {
    if (search === '' && filteredTagResults.length <= 0) {
      let arr = [];
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
    <Flex as={motion.div} animate={{}} width={isOpen ? '20%' : 'auto'}>
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
          <Button variant="outline" onClick={() => setSelectedFilters([])}>
            Clear Tags
          </Button>
          {selectedFilters ??
            selectedFilters.map((tag) => (
              <Button
                key={tag.toString()}
                size="sm"
                fontSize="10px"
                onClick={() =>
                  selectedFilters.some((selected) => selected === tag)
                    ? removeTag(tag)
                    : addTag(tag)
                }
                variant={
                  selectedFilters.some((selected) => selected === tag)
                    ? 'solid'
                    : 'outline'
                }
                colorScheme={
                  selectedFilters.some((selected) => selected === tag)
                    ? 'teal'
                    : null
                }
                rightIcon={<FaHashtag />}
              >
                {tag}
              </Button>
            ))}
          {filteredTagResults && (
            <CategoryTagList
              filteredTagResults={filteredTagResults}
              addTag={addTag}
              removeTag={removeTag}
              selectedFilters={selectedFilters}
              categories={categories}
            />
          )}
        </Box>
      ) : null}
      <Button
        borderTopLeftRadius="0"
        borderBottomLeftRadius="0"
        borderTopRightRadius="xl"
        borderBottomRightRadius="xl"
        colorScheme="red"
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

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
import { motion } from 'framer-motion';

export default function TagFilterSidebar({
  tags,
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
    keys: ['title'],
  };

  React.useEffect(() => {
    if (search.length === 0) {
      return setFilteredTagResults(categories);
    }

    const results = fuse.search(search).map((result) => result.item);
    return setFilteredTagResults(results);
  }, [search]);

  const fuse = new Fuse(tags, fuseOptions);

  const onToggle = () => {
    return setIsOpen(!isOpen);
  };

  return (
    <Flex
      as={motion.div}
      initial={false}
      animate={isOpen ? { width: '20%' } : { width: 0 }}
    >
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
                  <WrapItem key={tag._id}>
                    <TagButton
                      addTag={addTag}
                      removeTag={removeTag}
                      searchTags={selectedFilters}
                      icon={<FaTag />}
                      tag={tag}
                    />
                  </WrapItem>
                ))
              ) : (
                <Box />
              )}
            </Wrap>
            <Flex direction="column">
              {search.length > 0
                ? filteredTagResults.map((tag) => {
                    return (
                      <Box mb={10} key={tag._id}>
                        <Wrap spacing={2}>
                          <WrapItem>
                            <TagButton
                              addTag={addTag}
                              removeTag={removeTag}
                              searchTags={selectedFilters}
                              icon={<FaTag />}
                              tag={tag}
                            />
                          </WrapItem>
                        </Wrap>
                      </Box>
                    );
                  })
                : filteredTagResults.map((cat) => {
                    return (
                      <Box key={cat._id} mb={10}>
                        <Text>{cat.title}</Text>
                        <Wrap spacing={2}>
                          {cat.tags.map((tag) => {
                            return (
                              <WrapItem key={tag.title}>
                                <TagButton
                                  addTag={addTag}
                                  removeTag={removeTag}
                                  searchTags={selectedFilters}
                                  icon={<FaTag />}
                                  tag={tag}
                                />
                              </WrapItem>
                            );
                          })}
                        </Wrap>
                      </Box>
                    );
                  })}
            </Flex>
          </VStack>
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

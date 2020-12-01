import React from 'react';
import Fuse from 'fuse.js';
import {
  Box,
  Button,
  Input,
  Flex,
  Icon,
  Wrap,
  Heading,
} from '@chakra-ui/react';
import { FaHashtag, FaMinusCircle } from 'react-icons/fa';
import { BsChevronDoubleRight, BsChevronDoubleLeft } from 'react-icons/bs';
import { motion } from 'framer-motion';

function TagList({ addTag, removeTag, selectedFilters, filteredTagResults }) {
  return (
    <Wrap spacing="3px">
      {filteredTagResults.map((tag) => {
        return (
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
            leftIcon={
              selectedFilters.some((selected) => selected === tag) ? (
                <Icon as={FaMinusCircle} color="red.300" />
              ) : (
                <FaHashtag />
              )
            }
          >
            {tag}
          </Button>
        );
      })}
    </Wrap>
  );
}

export default function TagFilterSidebar({
  tags,
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
    if (search === '' && filteredTagResults.length <= 0) {
      tags.map(({ title }) => arr.push(title));

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
          {filteredTagResults && (
            <TagList
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

import React from 'react';
import Fuse from 'fuse.js';
import {
  Box,
  Button,
  VStack,
  Input,
  Flex,
  Text,
  Wrap,
  Grid,
  WrapItem,
} from '@chakra-ui/react';
import { FaTag } from 'react-icons/fa';
import TagButton from '@components/TagButton';

export default function TagFilter({
  tags,
  categories,
  addTag,
  removeTag,
  selectedFilters,
  setSelectedFilters,
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
    <Flex w="100%">
      <VStack my="1.5rem" alignItems="flex-start">
        <Flex direction="column" p={6}>
          {search.length > 0 &&
            filteredTagResults?.map((tag) => {
              return (
                <Box mb={10} key={tag._id}>
                  <Wrap spacing={2}>
                    <WrapItem>
                      <TagButton
                        addTag={addTag}
                        removeTag={removeTag}
                        searchTags={selectedFilters}
                        tag={tag}
                      />
                    </WrapItem>
                  </Wrap>
                </Box>
              );
            })}
          <Grid
            templateColumns={{
              base: 'repeat(2, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
          >
            {search === '' &&
              filteredTagResults?.map((cat) => {
                return (
                  <Box key={cat._id} mb={10}>
                    <Text color="red.400">{cat.title}</Text>
                    <Wrap spacing={2}>
                      {cat.tags?.slice(0, 5).map((tag) => {
                        return (
                          <WrapItem key={tag.title}>
                            <TagButton
                              addTag={addTag}
                              removeTag={removeTag}
                              searchTags={selectedFilters}
                              tag={tag}
                            />
                          </WrapItem>
                        );
                      })}
                    </Wrap>
                  </Box>
                );
              })}
          </Grid>
        </Flex>
      </VStack>
    </Flex>
  );
}

function TagSearchInput({ setSearch }) {
  return (
    <Input
      size="sm"
      fontSize=".6rem"
      placeholder="Filter tags..."
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

function CurrentFilterGroup() {
  return (
    <>
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
    </>
  );
}

function ClearTagsButton({ setSelectedFilters }) {
  return (
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
  );
}

const topTags = [
  {
    featured: true,
    categories: [{ title: 'Operations' }],
    title: 'lazy loading',
  },
  {
    featured: true,
    categories: [{ title: 'Operations' }],
    title: 'accessibility',
  },
  {
    featured: true,
    categories: [{ title: 'Operations' }],
    title: 'responsive',
  },
  {
    featured: true,
    categories: [{ title: 'Operations' }],
    title: 'transcriptions',
  },
  {
    featured: true,
    categories: [{ title: 'Operations' }],
    title: 'performance',
  },
  {
    featured: true,
    categories: [{ title: 'Elements' }],
    title: 'image',
  },
  {
    featured: true,
    categories: [{ title: 'Elements' }],
    title: 'video',
  },
  {
    featured: true,
    categories: [{ title: 'Elements' }],
    title: 'audio',
  },
  {
    featured: true,
    categories: [{ title: 'Elements' }],
    title: 'widget',
  },
  {
    featured: true,
    categories: [{ title: 'Elements' }],
    title: 'api',
  },
  {
    featured: true,
    categories: [{ title: 'Frameworks' }],
    title: 'react',
  },
  {
    featured: true,
    categories: [{ title: 'Frameworks' }],
    title: 'vue',
  },
  {
    featured: true,
    categories: [{ title: 'Frameworks' }],
    title: 'flutter',
  },
  {
    featured: true,
    categories: [{ title: 'Frameworks' }],
    title: 'nextjs',
  },
  {
    featured: true,
    categories: [{ title: 'Frameworks' }],
    title: 'nuxtjs',
  },
  {
    featured: true,
    categories: [{ title: 'Format' }],
    title: 'webp',
  },
  {
    featured: true,
    categories: [{ title: 'Format' }],
    title: 'mp4',
  },
  {
    featured: true,
    categories: [{ title: 'Format' }],
    title: 'png',
  },
  {
    featured: true,
    categories: [{ title: 'Format' }],
    title: 'jpeg',
  },
  {
    featured: true,
    categories: [{ title: 'Format' }],
    title: 'rtmp',
  },
  {
    featured: true,
    categories: [{ title: 'Language' }],
    title: 'javascript',
  },
  {
    featured: true,
    categories: [{ title: 'Language' }],
    title: 'php',
  },
  {
    featured: true,
    categories: [{ title: 'Language' }],
    title: 'ruby',
  },
  {
    featured: true,
    categories: [{ title: 'Language' }],
    title: 'rails',
  },
  {
    featured: true,
    categories: [{ title: 'Language' }],
    title: 'node',
  },
];

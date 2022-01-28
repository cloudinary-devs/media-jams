import 'tippy.js/dist/tippy.css';
import { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Link,
  List,
  ListItem,
  ListIcon,
  SimpleGrid,
  useBreakpointValue,
  Image,
  VisuallyHidden,
  CheckboxGroup,
  Checkbox,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

import Layout from '@components/Layout';
import JamCardList from '@components/JamCardList';
import SearchInput from '@components/SearchInput';
import {
  GreenCheck,
  Author,
  Close,
  Stack,
  Code,
  Mashups,
  Video,
  Pencil,
} from '@components/Icons';
import ReactIcon from '@components/ReactIcon';
import TagCardList from '@components/TagCardList';
import TagButtonList from '@components/TagButtonList';

import { QueryClient, useQuery } from 'react-query';
import { useFeaturedJamsQuery } from '@hooks/useJams';
import { useTagsQuery } from '@hooks/useTags';
import { useSearch } from '@components/SearchProvider';
import { sortArrayByKey, dedupeArrayByKey } from '@lib/util';

export default function Dashboard() {
  const [displayMoreTags, setDisplayMoreTags] = useState(false);
  const handleShowTags = () => setDisplayMoreTags(!displayMoreTags);

  const jamListColumns = useBreakpointValue({
    base: 1,
    lg: 2,
  });

  const {
    jams: jamResults,
    tags: tagResults,
    state: { searchValue, selectedTagFilters, filteredJams },
    addTag,
    updateSearchValue,
    isLoading,
    isActiveSearch,
  } = useSearch();
  const selectedTagIds = selectedTagFilters.map((tag) => tag._id);

  const hasJams = Array.isArray(jamResults) && jamResults.length > 0;

  const { data: allTags = {} } = useTagsQuery();
  const { tags } = allTags;

  const featuredTags =
    tags?.filter(({ featured }) => featured).slice(0, 3) || [];
  const sortedTags = tags && sortArrayByKey(tags, 'title');

  // Determine what tags to show in the filter list

  let filterTagsToShow;

  if (displayMoreTags) {
    filterTagsToShow = sortedTags;
  } else {
    filterTagsToShow = tags?.slice(0, 10).concat(selectedTagFilters);
    filterTagsToShow =
      filterTagsToShow && dedupeArrayByKey(filterTagsToShow, '_id');
  }

  /**
   * handleOnTagClick
   */

  function handleOnTagClick(e, { tag }) {
    addTag(tag);
  }

  /**
   * handleOnTagSelect
   */

  function handleOnTagSelect(e) {
    const { value } = e.target;
    const tag = tags.find((tag) => tag._id === value);
    if (tag) {
      addTag(tag);
    }
  }

  return (
    <Box w="100%" height="100%" overflowY="auto">
      <Flex direction="column" w="100%">
        <Flex
          w={{ base: '90%', lg: '1280px' }}
          mt="26px"
          mb="50px"
          alignSelf="center"
          h="100%"
          direction="column"
          justify="space-around"
          sx={{ gap: '24px' }}
        >
          <Heading as="h1" fontSize="42" color="blue.800" mt="4">
            Search Jams
          </Heading>

          <SearchInput focusOnLoad={true} setSearchValue={updateSearchValue} />

          <Flex direction="row" mt="6">
            <Box width="220px" flexShrink="0" mr="5">
              <Heading fontSize="24" mb="4">
                Tags
              </Heading>

              <Box>
                <CheckboxGroup value={selectedTagIds}>
                  {filterTagsToShow?.map((tag) => {
                    return (
                      <Checkbox
                        display="flex"
                        key={tag._id}
                        value={tag._id}
                        onChange={handleOnTagSelect}
                        my="1"
                      >
                        {tag.title}
                      </Checkbox>
                    );
                  })}
                </CheckboxGroup>

                {!displayMoreTags && (
                  <Text>
                    <Button
                      rightIcon={<FaCaretDown />}
                      variant="link"
                      onClick={handleShowTags}
                    >
                      Show More Tags
                    </Button>
                  </Text>
                )}

                {displayMoreTags && (
                  <Text textAlign="center">
                    <Button
                      rightIcon={<FaCaretUp />}
                      variant="link"
                      onClick={handleShowTags}
                    >
                      Show Less Tags
                    </Button>
                  </Text>
                )}
              </Box>
            </Box>
            <Box flexGrow="1">
              {isActiveSearch && searchValue.length < 3 && (
                <Text>Keep typing...</Text>
              )}

              {!isLoading && hasJams && (
                <>
                  <Heading as="h3" fontSize="32" color="blue.800" mb="6">
                    Results matching "
                    <Text
                      as="span"
                      fontSize="inherit"
                      fontWeight="inherit"
                      color="secondary.600"
                    >
                      {searchValue}
                    </Text>
                    "...
                  </Heading>

                  <Heading as="h3" fontSize="24" color="blue.800" mb="6">
                    Tags
                  </Heading>

                  <TagButtonList
                    tags={tagResults}
                    activeTags={selectedTagFilters}
                    align="left"
                    onTagClick={handleOnTagClick}
                  />

                  <Heading as="h3" fontSize="24" color="blue.800" mt="8" mb="6">
                    Jams
                  </Heading>

                  <JamCardList jams={jamResults} columns={jamListColumns} />
                </>
              )}

              {(isLoading || !hasJams) && (
                <Box>
                  <Heading as="h2" fontSize="32" color="blue.800" mb="6">
                    Discover Jams
                  </Heading>
                  <TagCardList tags={featuredTags} />
                </Box>
              )}
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

Dashboard.getLayout = (page) => <Layout>{page}</Layout>;

import 'tippy.js/dist/tippy.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { FaCaretDown, FaCaretUp, FaTimes } from 'react-icons/fa';
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
  Icon,
} from '@chakra-ui/react';

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
import AuthorButtonList from '@components/AuthorButtonList';

import { QueryClient, useQuery } from 'react-query';
import { useFeaturedJamsQuery } from '@hooks/useJams';
import { useTagsQuery } from '@hooks/useTags';
import { useAuthorsQuery } from '@hooks/useAuthors';
import { useSearch } from '@components/SearchProvider';
import { sortArrayByKey, dedupeArrayByKey } from '@lib/util';

const DEFAULT_FILTERS_COUNT = 5;

export default function Dashboard() {
  const router = useRouter();

  const jamListColumns = useBreakpointValue({
    base: 1,
    xl: 2,
  });

  const defaultFiltersIsOpen = useBreakpointValue({
    base: false,
    md: true,
  });

  const [filtersIsOpen, setFiltersIsOpen] = useState(defaultFiltersIsOpen);

  useEffect(() => {
    if (defaultFiltersIsOpen !== filtersIsOpen) {
      setFiltersIsOpen(defaultFiltersIsOpen);
    }
  }, [defaultFiltersIsOpen]);

  const {
    jams: jamResults,
    tags: tagResults,
    authors: authorResults,
    state: {
      searchValue,
      selectedTagFilters,
      selectedAuthorFilters,
      filteredJams,
    },
    addTag,
    removeTag,
    addAuthor,
    removeAuthor,
    updateSearchValue,
    clearSearch,
    isLoading,
    isActiveSearch,
  } = useSearch();

  const selectedTagIds = selectedTagFilters.map((tag) => tag._id);
  const selectedTagIdsKey = selectedTagIds.join('-');

  const selectedAuthorIds = selectedAuthorFilters.map((author) => author._id);

  const hasJams = Array.isArray(jamResults) && jamResults.length > 0;

  const { data: allTags = {} } = useTagsQuery();
  const { tags } = allTags;

  const featuredTags =
    tags?.filter(({ featured }) => featured).slice(0, 3) || [];
  const sortedTags = tags && sortArrayByKey(tags, 'title');

  const { data: allAuthors = {} } = useAuthorsQuery();
  let { authors } = allAuthors;

  authors = authors && authors.filter(({ name }) => name);

  const sortedAuthors = authors && sortArrayByKey(authors, 'name');

  /**
   * Filters: Tags
   */

  const [displayMoreTags, setDisplayMoreTags] = useState(false);
  const handleToggleMoreTags = () => setDisplayMoreTags(!displayMoreTags);

  // Determine what tags to show in the filter list

  let filterTagsToShow;

  if (displayMoreTags) {
    filterTagsToShow = sortedTags;
  } else {
    filterTagsToShow = tags
      ?.slice(0, DEFAULT_FILTERS_COUNT)
      .concat(selectedTagFilters);
    filterTagsToShow =
      filterTagsToShow && dedupeArrayByKey(filterTagsToShow, '_id');
  }

  function handleOnTagFilterSelect(e) {
    const { value } = e.target;
    const tag = tags.find((tag) => tag._id === value);
    const isActive = selectedTagFilters.find(({ _id }) => _id === tag._id);
    if (isActive) {
      removeTag(tag);
    } else {
      addTag(tag);
    }
  }

  /**
   * Filters: Authors
   */

  const [displayMoreAuthors, setDisplayMoreAuthors] = useState(false);
  const handleToggleMoreAuthors = () =>
    setDisplayMoreAuthors(!displayMoreAuthors);

  // Determine what authors to show in the filter list

  let filterAuthorsToShow;

  if (displayMoreAuthors) {
    filterAuthorsToShow = sortedAuthors;
  } else {
    filterAuthorsToShow = authors?.slice(0, DEFAULT_FILTERS_COUNT); //.concat(selectedTagFilters);
    filterAuthorsToShow =
      filterAuthorsToShow && dedupeArrayByKey(filterAuthorsToShow, '_id');
  }

  function handleOnAuthorFilterSelect(e) {
    const { value } = e.target;
    const author = authors.find((author) => author._id === value);
    const isActive = selectedAuthorFilters.find(
      ({ _id }) => _id === author._id,
    );
    if (isActive) {
      removeAuthor(author);
    } else {
      addAuthor(author);
    }
  }

  /**
   * UI Functions
   */

  /**
   * handleOnTagClick
   */

  function handleOnTagClick(e, { tag }) {
    const isActive = selectedTagFilters.find(({ _id }) => _id === tag._id);
    if (isActive) {
      removeTag(tag);
    } else {
      addTag(tag);
    }
  }

  /**
   * handleOnAuthorClick
   */

  function handleOnAuthorClick(e, { author }) {
    const isActive = selectedAuthorFilters.find(
      ({ _id }) => _id === author._id,
    );
    if (isActive) {
      removeAuthor(author);
    } else {
      addAuthor(author);
    }
  }

  /**
   * handleOnClearSearch
   */

  function handleOnClearSearch(e) {
    e.preventDefault();
    clearSearch();
  }

  // Update router params to reflect tag state
  // Return null until isReady is true

  const routerPushTags = (tags = null) => {
    if (!router.isReady) return null;
    const routerPath = tags
      ? `${router.pathname}?tags=${tags
          .map((t) => encodeURIComponent(t))
          .join('%2C')}`
      : router.pathname;
    router.push(routerPath, undefined, { shallow: true });
  };

  // handle updating the filteredPosts with different search criteria

  useEffect(() => {
    const formattedTags = selectedTagFilters.map((item) => item && item.title);

    if (formattedTags.length === 0) {
      routerPushTags();
    } else if (formattedTags.length > 0) {
      routerPushTags(formattedTags);
    }
  }, [selectedTagIdsKey]);

  return (
    <Box w="100%" height="100%" overflowY="auto">
      <Flex direction="column" w="100%">
        <Flex
          w={{ base: '90%', '2xl': '1280px' }}
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

          <Flex
            direction={{
              base: 'column',
              md: 'row',
            }}
            mt="6"
          >
            <Box
              width={{
                base: '100%',
                md: '220px',
              }}
              flexShrink="0"
              mr="5"
              mb={{
                base: '12',
                md: '0',
              }}
            >
              <Heading
                display="flex"
                alignItems="center"
                fontSize="18"
                onClick={() =>
                  defaultFiltersIsOpen === false &&
                  setFiltersIsOpen(!filtersIsOpen)
                }
                cursor={{
                  base: 'pointer',
                  md: 'auto',
                }}
              >
                Filters
                <Icon
                  as={filtersIsOpen ? FaCaretUp : FaCaretDown}
                  display={{
                    base: 'block',
                    md: 'none',
                  }}
                  ml="2"
                />
              </Heading>

              <Box display={filtersIsOpen ? 'block' : 'none'} mt="6">
                <Box>
                  <Heading fontSize="24" mb="4">
                    Tags
                  </Heading>

                  <CheckboxGroup value={selectedTagIds}>
                    {filterTagsToShow?.map((tag) => {
                      return (
                        <Checkbox
                          display="flex"
                          key={tag._id}
                          value={tag._id}
                          onChange={handleOnTagFilterSelect}
                          my="1"
                        >
                          {tag.title}
                        </Checkbox>
                      );
                    })}
                  </CheckboxGroup>

                  <Text>
                    {!displayMoreTags && (
                      <Button
                        rightIcon={<FaCaretDown />}
                        variant="link"
                        onClick={handleToggleMoreTags}
                      >
                        Show More Tags
                      </Button>
                    )}
                    {displayMoreTags && (
                      <Button
                        rightIcon={<FaCaretUp />}
                        variant="link"
                        onClick={handleToggleMoreTags}
                      >
                        Show Less Tags
                      </Button>
                    )}
                  </Text>
                </Box>

                <Box mt="8">
                  <Heading fontSize="24" mb="4">
                    Authors
                  </Heading>

                  <CheckboxGroup value={selectedAuthorIds}>
                    {filterAuthorsToShow?.map((author) => {
                      return (
                        <Checkbox
                          display="flex"
                          key={author._id}
                          value={author._id}
                          onChange={handleOnAuthorFilterSelect}
                          my="1"
                        >
                          {author.name}
                        </Checkbox>
                      );
                    })}
                  </CheckboxGroup>

                  <Text>
                    {!displayMoreAuthors && (
                      <Button
                        rightIcon={<FaCaretDown />}
                        variant="link"
                        onClick={handleToggleMoreAuthors}
                      >
                        Show More Authors
                      </Button>
                    )}
                    {displayMoreAuthors && (
                      <Button
                        rightIcon={<FaCaretUp />}
                        variant="link"
                        onClick={handleToggleMoreAuthors}
                      >
                        Show Less Authors
                      </Button>
                    )}
                  </Text>
                </Box>

                <Text
                  display={{
                    base: 'block',
                    md: 'none',
                  }}
                  mt="6"
                >
                  <Button
                    colorScheme="grey"
                    leftIcon={<FaTimes />}
                    onClick={() => setFiltersIsOpen(false)}
                  >
                    Close Filters
                  </Button>
                </Text>
              </Box>
            </Box>
            <Box flexGrow="1">
              {isActiveSearch && searchValue && searchValue.length < 3 && (
                <Text>Keep typing...</Text>
              )}

              {!isLoading && hasJams && (
                <>
                  <Heading as="h3" fontSize="32" color="blue.800" mb="6">
                    Results
                    {searchValue && (
                      <Text
                        as="span"
                        fontSize="inherit"
                        fontWeight="inherit"
                        _before={{
                          content: '" "',
                        }}
                      >
                        matching "
                        <Text
                          as="span"
                          fontSize="inherit"
                          fontWeight="inherit"
                          color="secondary.600"
                        >
                          {searchValue}
                        </Text>
                        "...
                      </Text>
                    )}
                  </Heading>

                  {tagResults.length > 0 && (
                    <>
                      <Heading as="h3" fontSize="24" color="blue.800" mb="6">
                        Tags
                      </Heading>

                      <TagButtonList
                        tags={tagResults}
                        activeTags={selectedTagFilters}
                        align="left"
                        onTagClick={handleOnTagClick}
                      />
                    </>
                  )}

                  {authorResults.length > 0 && (
                    <>
                      <Heading as="h3" fontSize="24" color="blue.800" mb="6">
                        Authors
                      </Heading>

                      <AuthorButtonList
                        authors={authorResults}
                        activeAuthors={selectedAuthorFilters}
                        align="left"
                        onAuthorClick={handleOnAuthorClick}
                      />
                    </>
                  )}

                  <Heading as="h3" fontSize="24" color="blue.800" mt="8" mb="6">
                    Jams
                  </Heading>

                  <JamCardList jams={jamResults} columns={jamListColumns} />
                </>
              )}

              {isActiveSearch && !hasJams && (
                <>
                  <Heading as="h2" fontSize="32" color="blue.800" mb="6">
                    Uh oh, no results found!
                  </Heading>
                  <Text fontSize="22">
                    Try removing some tags or searching for something else.
                  </Text>
                  <Text fontSize="22" mt="4">
                    Or{' '}
                    <Button
                      variant="link"
                      fontSize="inherit"
                      textDecoration="underline"
                      onClick={handleOnClearSearch}
                    >
                      clear your search
                    </Button>{' '}
                    and start from scratch.
                  </Text>
                </>
              )}

              {!isActiveSearch && (
                <Box>
                  <Heading as="h2" fontSize="32" color="blue.800" mb="6">
                    Discover Jams
                  </Heading>
                  <TagCardList
                    tags={featuredTags}
                    onTagClick={handleOnTagClick}
                  />
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

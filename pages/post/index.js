import React from 'react';
import { useRouter } from 'next/router';
import { useFetchUser, useUser } from '@lib/user';
import { allPosts, allTags, allCategories } from 'lib/api';

import JamAccordion from '@components/JamAccordion';
import SearchInput from '@components/SearchInput';
import Layout from '@components/Layout';
import TagFilter from '@components/TagFilter';
import { boxShadow } from '@utils/styles';

import { Flex, Grid, Heading, useDisclosure, Box } from '@chakra-ui/react';

import Fuse from 'fuse.js';

const fuseOptions = {
  threshold: 0.35,
  location: 0,
  distance: 100,
  minMatchCharLength: 1,
  shouldSort: true,
  includeScore: true,
  useExtendedSearch: true,
  keys: ['title', 'tags', 'author.name'],
};

export default function Post({ posts, tags, categories }) {
  const [filteredPosts, setFilteredPosts] = React.useState(posts);
  const [showFilters, setShowFilters] = React.useState(false);
  const [selectedFilters, setSelectedFilters] = React.useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchValue, setSearchValue] = React.useState('');
  const router = useRouter();
  const { user, loading } = useUser();

  // check if there's any tag selections coming from the router and set them
  //
  React.useEffect(() => {
    const routeTags = router.query.tags?.split(',') || [];
    const queryTags = tags.filter((t) => routeTags.includes(t.title));
    setSelectedFilters(queryTags);
  }, [router.query]);

  // handle updating the filteredPosts with different search criteria
  React.useEffect(() => {
    if (searchValue === '' && selectedFilters.length === 0) {
      handleFilter(posts);
    } else {
      // Allow for a search for tag
      const formattedTags = [
        ...selectedFilters.map((item) => ({ tags: item.title })),
      ];
      const queries = {
        $or: [
          { title: searchValue },
          { author: searchValue },
          {
            $and: [...formattedTags],
          },
        ],
      };
      const results = fuse.search(queries).map((result) => result.item);
      handleFilter(results);
    }
  }, [searchValue, selectedFilters]);

  const fuse = new Fuse(posts, fuseOptions);

  function addTag(tag) {
    return setSelectedFilters((prev) => [...prev, tag]);
  }

  function removeTag(tag) {
    return setSelectedFilters((prev) => prev.filter((pt) => pt !== tag));
  }

  const handleFilter = (data) => {
    setFilteredPosts(data);
  };

  return (
    <Layout isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <Grid
        height="100vh"
        templateAreas={{
          base: `
            "JamSearch"
            "JamSearch"
            "three"            
            "four"
            "five"
          `,
          md: `
            "JamSearch JamSearch"
            "three three"
            "four five"
          `,
          xl: `
          "SearchFilters JamSearch three "
          "four JamSearch three"
          "four JamSearch five"
          `,
        }}
        templateColumns={{
          base: '100%',
          md: '1fr 1fr',
          xl: '1fr 2fr 1fr',
        }}
        templateRows={{
          base: '70% repeat(4, 300px)',
          md: '80vh 200px 500px',
          xl: 'auto',
        }}
        gap={8}
        p={8}
        overflow={{ base: 'auto', xl: null }}
      >
        <JamSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          tags={tags}
          categories={categories}
          addTag={addTag}
          removeTag={removeTag}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          filteredPosts={filteredPosts}
        />
        <SearchFilters
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          tags={tags}
          categories={categories}
          addTag={addTag}
          removeTag={removeTag}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          filteredPosts={filteredPosts}
        />

        <Box
          borderRadius="8px"
          boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
          bg="green.200"
          gridArea="three"
        ></Box>

        <Box
          borderRadius="8px"
          boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
          bg="blue.200"
          gridArea="four"
        ></Box>

        <Box
          borderRadius="8px"
          boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
          bg="blue.200"
          gridArea="five"
        ></Box>
      </Grid>
    </Layout>
  );
}

// This function gets called at build time on server-side.
export const getStaticProps = async () => {
  const [posts, tags, categories] = await Promise.all([
    allPosts(),
    allTags(),
    allCategories(),
  ]);
  return {
    props: {
      posts,
      tags,
      categories,
    },
  };
};

function JamSearch({
  searchValue,
  setSearchValue,
  showFilters,
  setShowFilters,
  tags,
  categories,
  addTag,
  removeTag,
  selectedFilters,
  setSelectedFilters,
  filteredPosts,
}) {
  return (
    <Flex
      gridArea="JamSearch"
      p={4}
      bg="red.200"
      overflow="auto"
      borderRadius="8px"
      boxShadow={{ base: 'none', lg: boxShadow }}
      direction="column"
      w="100%"
    >
      <SearchInput
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        width="100%"
        color="red"
        mb={3}
      />
      {showFilters && (
        <Flex
          borderRadius="lg"
          w="100%"
          mb={5}
          mt="16px"
          border="2px solid black"
        >
          <TagFilter
            tags={tags}
            categories={categories}
            addTag={addTag}
            removeTag={removeTag}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </Flex>
      )}
      {filteredPosts.map((post) => (
        <JamAccordion color="red" width="100%" key={post._id} post={post} />
      ))}
    </Flex>
  );
}

function SearchFilters({
  searchValue,
  setSearchValue,
  showFilters,
  setShowFilters,
  tags,
  categories,
  addTag,
  removeTag,
  selectedFilters,
  setSelectedFilters,
  filteredPosts,
}) {
  return (
    <Flex
      borderRadius="8px"
      boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
      bg="white"
      display={{ md: 'none', lg: 'flex', xl: 'flex' }}
      gridArea="SearchFilters"
    ></Flex>
  );
}

const newPosts = [
  {
    author: {
      name: 'Domitrius Clark',
      image:
        'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
    },
    title: 'Responsive images in React',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis tristique sem. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Morbi in ipsum sit amet pede facilisis laoreet.',
    tags: ['react'],
  },
  {
    author: {
      name: 'Domitrius Clark',
      image:
        'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
    },
    title: 'Responsive images in React',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis tristique sem. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Morbi in ipsum sit amet pede facilisis laoreet.',
    tags: ['react'],
  },
  {
    author: {
      name: 'Domitrius Clark',
      image:
        'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
    },
    title: 'Responsive images in React',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis tristique sem. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Morbi in ipsum sit amet pede facilisis laoreet.',
    tags: ['react'],
  },
  {
    author: {
      name: 'Domitrius Clark',
      image:
        'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
    },
    title: 'Responsive images in React',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis tristique sem. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Morbi in ipsum sit amet pede facilisis laoreet.',
    tags: ['react'],
  },
  {
    author: {
      name: 'Domitrius Clark',
      image:
        'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
    },
    title: 'Responsive images in React',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis tristique sem. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Morbi in ipsum sit amet pede facilisis laoreet.',
    tags: ['react'],
  },
];

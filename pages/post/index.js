import React from 'react';
import { useRouter } from 'next/router';
import { useFetchUser, useUser } from '@lib/user';
import { allPosts, allTags, allCategories } from 'lib/api';

import JamAccordion from '@components/JamAccordion';
import SearchInput from '@components/SearchInput';
import Layout from '@components/Layout';
import TagFilter from '@components/TagFilter';
import { boxShadow } from '@utils/styles';

import { Flex, Heading, useDisclosure, Box } from '@chakra-ui/react';

import { FaFilter } from 'react-icons/fa';

import Fuse from 'fuse.js';
import JamAccordian from '../../src/components/JamAccordion';

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
  React.useEffect(() => {
    setSelectedFilters(router.query.tags?.title.split(',') || []);
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
    <Layout
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      p={{ base: 0, md: 5, lg: 10 }}
    >
      <Flex
        overflow="auto"
        w="100%"
        justifyContent="space-around"
        direction={{ base: 'column', md: 'column', lg: 'column', xl: 'row' }}
      >
        {/* LIST ALL JAMS */}
        <Flex
          alignSelf="center"
          h={{ base: '100%', md: '95%' }}
          p={4}
          overflow="auto"
          mt={4}
          boxShadow={boxShadow}
          direction="column"
          w={{ base: '95%', md: '90%', lg: '95%', xl: '50%' }}
        >
          <SearchInput
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            width="100%"
            mb={3}
          />
          {showFilters && (
            <Flex
              borderRadius="lg"
              w="100%"
              mb={5}
              mt="16px"
              border="2px solid black"
              h="auto"
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
            <JamAccordion width="100%" key={post._id} post={post} />
          ))}
        </Flex>

        {/* BOOKMARK CTA  */}
        <Flex
          h="100%"
          justifyContent="space-around"
          alignSelf="center"
          direction="column"
          w={{ base: '90%', md: '90%', lg: '90%', xl: '35%' }}
          mt={4}
        >
          <Flex
            mb={{ base: 4, md: 4, lg: 0 }}
            position="relative"
            boxShadow={boxShadow}
            borderRadius="md"
            h={80}
          >
            <Box
              left="0"
              position="absolute"
              top="0"
              h="100%"
              w="100%"
              overflow="hidden"
            >
              <Box
                left="-64px"
                position="absolute"
                top="32px"
                height="32px"
                width="206px"
                transform="rotate(-45deg)"
                backgroundColor="rgba(0,0,0,.3)"
                textAlign="center"
                color="red.400"
                pt={1}
              >
                Sign up!
              </Box>
            </Box>
          </Flex>
          <Flex
            mb={{ base: 4, md: 4, lg: 0 }}
            mt={{ base: 4, md: 3, lg: 5, xl: 0 }}
            p={4}
            boxShadow={boxShadow}
            borderRadius="md"
            h={80}
            direction="column"
            overflow="auto"
          >
            <Heading textStyle="headline-interstitial" color="red.400" mb={3}>
              Newest Jams
            </Heading>
            {newPosts.map((post) => (
              <JamAccordian width="100%" key={post._id} post={post} />
            ))}
          </Flex>
        </Flex>
      </Flex>
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

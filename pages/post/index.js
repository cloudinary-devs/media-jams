import React from 'react';
import { useRouter } from 'next/router';
import { useFetchUser, useUser } from '@lib/user';
import { allPosts, allTags, allCategories } from 'lib/api';

import JamCard from '@components/JamCard';
import SearchInput from '@components/SearchInput';
import Layout from '@components/Layout';
import TagFilter from '@components/TagFilter';

import {
  Flex,
  Center,
  Grid,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';

import { FaFilter } from 'react-icons/fa';

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
    <Layout isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <Flex mt={9} alignItems="center" justifyContent="center">
        <SearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          w="350px"
        />
        <IconButton
          onClick={() => setShowFilters(!showFilters)}
          ml={2}
          icon={<FaFilter />}
        >
          Filter
        </IconButton>
      </Flex>

      {showFilters && (
        <Flex
          alignSelf="center"
          borderRadius="lg"
          width={{ base: '80%', lg: '70%', xl: '55%' }}
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

      <Grid
        m={16}
        w="auto"
        templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gridColumnGap="25px"
        gridRowGap="35px"
        justifyItems="center"
        alignItems="center"
      >
        {filteredPosts.map((post) => (
          <JamCard key={post._id} post={post} />
        ))}
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

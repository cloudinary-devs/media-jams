import React from 'react';
import { useRouter } from 'next/router';
import { useFetchUser } from 'lib/user';
import { allPosts, allCategories } from 'lib/api';

import Card from '@components/Card';
import TabbedTagSelection from '@components/TabbedTagSelection';
import SearchInput from '@components/SearchInput';
import Layout from '@components/Layout';
import { Flex, Grid } from '@chakra-ui/core';
import Fuse from 'fuse.js';

const fuseOptions = {
  threshold: 0.35,
  location: 0,
  distance: 100,
  minMatchCharLength: 1,
  shouldSort: true,
  includeScore: true,
  useExtendedSearch: true,
  keys: ['title', 'tags', 'author'],
};

export default function Post({ posts, categories }) {
  const [filteredPosts, setFilteredPosts] = React.useState(posts);
  const [searchTags, setSearchTags] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const router = useRouter();
  const { user, loading } = useFetchUser();
  // check if there's any tag selections coming from the router and set them
  React.useEffect(() => {
    setSearchTags(router.query.tags?.split(',') || []);
  }, [router.query]);

  // handle updating the filteredPosts with different search criteria
  React.useEffect(() => {
    if (searchValue === '' && searchTags.length === 0) {
      handleFilter(posts);
    } else {
      // Allow for a search for tag
      const formattedTags = [...searchTags.map((item) => ({ tags: item }))];
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
  }, [searchValue, searchTags]);

  const fuse = new Fuse(posts, fuseOptions);

  function addTag(tag) {
    return setSearchTags((prev) => [...prev, tag]);
  }

  function removeTag(tag) {
    return setSearchTags((prev) => prev.filter((pt) => pt !== tag));
  }

  const handleFilter = (data) => {
    setFilteredPosts(data);
  };

  return (
    <Layout user={user} loading={loading}>
      <Flex w="100vw" h="100vh">
        <Flex w="100%" direction="column" alignItems="center">
          <Flex
            direction="column"
            alignItems="center"
            justify="center"
            height="40%"
          >
            <TabbedTagSelection
              handleFilter={handleFilter}
              tabs={categories}
              addTag={addTag}
              removeTag={removeTag}
              searchTags={searchTags}
              posts={posts}
              fuse={fuse}
            />
            <SearchInput
              mt={16}
              handleFilter={handleFilter}
              posts={posts}
              fuse={fuse}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          </Flex>
          <Grid
            m={20}
            w="80%"
            gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
            gap={8}
          >
            {filteredPosts.map((post) => (
              <Card post={post} />
            ))}
          </Grid>
        </Flex>
      </Flex>
    </Layout>
  );
}

// This function gets called at build time on server-side.
export const getStaticProps = async () => {
  const [posts, categories] = await Promise.all([allPosts(), allCategories()]);
  return {
    props: {
      posts,
      categories,
    },
  };
};

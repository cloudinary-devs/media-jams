import React from 'react';
import { useRouter } from 'next/router';
import { useFetchUser, useUser } from '@lib/user';
import { allPosts, allTags, allCategories } from 'lib/api';

import JamCard from '@components/JamCard';
import SearchInput from '@components/SearchInput';
import TagFilterSidebar from '@components/TagFilterSidebar';
import Layout from '@components/Layout';
import { Flex, WrapItem, Wrap, Heading } from '@chakra-ui/react';

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
  const [selectedFilters, setSelectedFilters] = React.useState([]);
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
    <Layout>
      <Flex
        h="5rem"
        backgroundColor="grey.900"
        alignItems="center"
        justifyContent="center"
      >
        <Heading as="h1" textStyle="headline-page" color="yellow.900" mb="5rem">
          Let's Jam
        </Heading>
      </Flex>
      <Flex w="100vw" h="100%">
        <TagFilterSidebar
          tags={tags}
          categories={categories}
          addTag={addTag}
          removeTag={removeTag}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        <Flex w="100%" direction="column" mt={5}>
          <SearchInput
            searchvalue={searchValue}
            setSearchValue={setSearchValue}
            alignSelf="center"
          />

          <Wrap w="100%" spacing="5.5rem" justify="center" my={8}>
            {filteredPosts.map((post) => (
              <WrapItem key={post._id}>
                <JamCard post={post} />
              </WrapItem>
            ))}
          </Wrap>
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

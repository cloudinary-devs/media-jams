import { Flex, Box, Grid, Text } from '@chakra-ui/core';

import { allTags, allPosts, allCategories } from 'lib/api';

import Card from '@components/Card';
import Search from '@components/Search';
import Layout from '@components/Layout';

export default function Post({ posts, tags, categories }) {
  const [filteredPosts, setFilteredPosts] = React.useState(posts);

  const handleFilter = (data) => {
    setFilteredPosts(data);
  };

  return (
    <Layout>
      <Flex w="100vw" h="100vh">
        <Flex
          direction="column"
          alignItems="center"
          pt={8}
          w="15%"
          borderRight="2px solid black"
        >
          {categories.map((cat) => (
            <Text>{cat.title}</Text>
          ))}
        </Flex>
        <Box w="100%">
          <Search handleFilter={handleFilter} posts={posts} />
          <Grid
            flex="1"
            m={20}
            gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
            gap={8}
          >
            {filteredPosts.map((post) => (
              <Card post={post} />
            ))}
          </Grid>
        </Box>
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

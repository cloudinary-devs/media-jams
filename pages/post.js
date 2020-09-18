import { Box, Flex, Stack } from '@chakra-ui/core';

import { allTags, allPosts } from 'lib/api';

import ContentBox from '@components/ContentBox';
import Search from '@components/Search';
import { Layout } from '@components/Layout';

export default function Post({ posts, tags }) {
  const [filteredPosts, setFilteredPosts] = React.useState(posts);

  const handleFilter = (data) => {
    setFilteredPosts(data);
  };

  return (
    <Layout>
      <Box pb={3}>
        {/* Content Area + Input + Tag filter */}
        <Stack spacing={[4, 8, 12]} justify="center" alignItems="center">
          <Search posts={posts} tagList={tags} handleFilter={handleFilter} />
          <Stack spacing={[2, 6, 12]}>
            {filteredPosts?.map((post) => (
              <ContentBox key={post.slug} post={post} />
            ))}
          </Stack>
        </Stack>
      </Box>
    </Layout>
  );
}

// This function gets called at build time on server-side.
export const getStaticProps = async () => {
  const [posts, tags] = await Promise.all([allPosts(), allTags()]);
  return {
    props: {
      posts,
      tags,
    },
  };
};

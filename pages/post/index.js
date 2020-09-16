import { Box, Flex, Stack } from '@chakra-ui/core';

import sanityClient from '@sanity/client';

import ContentBox from '@components/ContentBox';
import Search from '@components/Search';
import { Layout } from '@components/Layout';

const sanity = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
});

// All posts with tags : [String]
const queryPostWithTags = `*[_type == "post"] {
  _id,
  title,
  "slug": slug.current,
	"tags": tags[]->title,
  "author": author->name,
	_updatedAt,
  body
}
`;
// Array of <Tags></Tags>
const queryTags = `*[_type == "tag"].title`;

export default function Post({ allPosts, allTags }) {
  const [filteredPosts, setFilteredPosts] = React.useState(allPosts);

  const handleFilter = (data) => {
    setFilteredPosts(data);
  };

  return (
    <Layout>
      <Box pb={3}>
        {/* Content Area + Input + Tag filter */}
        <Stack spacing={[4, 8, 12]} justify="center" alignItems="center">
          <Search
            posts={allPosts}
            tagList={allTags}
            handleFilter={handleFilter}
          />
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
export async function getStaticProps() {
  const [allPosts, allTags] = await Promise.all([
    sanity.fetch(queryPostWithTags),
    sanity.fetch(queryTags),
  ]);
  return {
    props: {
      allPosts,
      allTags,
    },
  };
}

import React from 'react';
import { Flex } from '@chakra-ui/react';
import AuthorBanner from '@components/AuthorBanner';
import SearchInput from '@components/Search/SearchInput';
import JamList from '@components/JamList';

import { useQuery } from 'react-query';
import { jams } from '@lib/queries/jams';
import Fuse from 'fuse.js';

const fuseOptions = {
  threshold: 0.35,
  location: 0,
  distance: 100,
  minMatchCharLength: 1,
  shouldSort: true,
  includeScore: true,
  useExtendedSearch: true,
  keys: ['title', 'tags.title', 'author.name'],
};

export default function AuthorPage({ author }) {
  const [searchValue, setSearchValue] = React.useState('');
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  const { data } = useQuery(`${author?.name}'s Jams`, () =>
    jams.getJamsByAuthor(author._id),
  );

  React.useEffect(() => {
    if (!searchValue) {
      handleFilter(data?.allPost);
    } else {
      const queries = {
        $or: [
          { title: searchValue },
          {
            $path: ['author.name'],
            $val: searchValue,
          },
          {
            $path: 'tags.title',
            $val: searchValue,
          },
        ],
      };
      const results = fuse.search(queries).map((result) => result.item);
      handleFilter(results);
    }
  }, [searchValue, data]);

  const fuse = new Fuse(data?.allPost, fuseOptions);

  const handleFilter = (data) => setFilteredPosts(data);

  return (
    <Flex
      w="100%"
      height="100%"
      direction="column"
      overflowY="auto"
      align="center"
    >
      <AuthorBanner author={author} />
      <Flex direction="column" w="100%" mb="24px">
        <Flex
          w={{ base: '90%', lg: '1000px' }}
          alignSelf="center"
          direction="column"
        >
          <SearchInput
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <Flex
            w="100%"
            mt="26px"
            alignSelf="center"
            h="100%"
            direction="column"
            justify="space-around"
            sx={{ gap: '16px' }}
          >
            {data?.allPost && <JamList jams={data.allPost} />}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export async function getStaticPaths() {
  const { authors } = require('../../lib/queries/authors');
  const { data } = await authors.getSlugs();
  return {
    paths:
      data.allAuthor
        ?.filter((author) => author.slug)
        .map(({ slug }) => ({ params: { slug: slug.current } })) || [],
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const { authors } = require('../../lib/queries/authors');
  const { data } = await authors.getStaticAuthorBy(slug);

  return {
    props: { author: data.author[0] },
  };
}

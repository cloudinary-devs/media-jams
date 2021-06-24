import React from 'react';
import {
  Box,
  Heading,
  Flex,
  Avatar,
  Text,
  IconButton,
  useToken,
} from '@chakra-ui/react';
import BlockContent from '@sanity/block-content-to-react';
import { FaTwitter, FaGithub, FaGlobe } from 'react-icons/fa';
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

function SocialHandlesCollection({ author }) {
  return (
    <Flex>
      {author?.socialHandles &&
        Object.keys(author?.socialHandles).map((key) => {
          if (key === 'twitter') {
            return (
              <IconButton
                key={key}
                as="a"
                color="black"
                href={author.socialHandles[key]}
                size="md"
                Icon={FaTwitter}
              />
            );
          } else if (key === 'github') {
            return (
              <IconButton
                key={key}
                as="a"
                color="black"
                href={author.socialHandles[key]}
                size="md"
                Icon={FaGithub}
              />
            );
          } else if (key === 'website') {
            return (
              <IconButton
                key={key}
                as="a"
                color="black"
                href={author.socialHandles[key]}
                size="md"
                Icon={FaGlobe}
              />
            );
          }
        })}
    </Flex>
  );
}

export default function AuthorPage({ author }) {
  const [searchValue, setSearchValue] = React.useState('');
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  const { data, isLoading } = useQuery(`${author?.name}'s Jams`, () =>
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
      <Flex
        w={{ base: '90%', lg: '1000px' }}
        mt="24px"
        border={`2px solid ${useToken('colors', 'primary.400')}`}
        borderRadius="8px"
        h="300px"
        boxShadow={`4px 3px 0px 3px ${useToken('colors', 'primary.400')}`}
        p={5}
      >
        <Flex w="60%" direction="column" justify="space-evenly">
          <Flex align="center" justify="space-between" w="100%">
            <Flex align="center" justify="space-evenly" sx={{ gap: '8px' }}>
              <Avatar
                width="124px"
                height="124px"
                name={author.name}
                src={author.image?.asset.url}
              />
              <Flex direction="column">
                <Flex w="100%" justify="space-between">
                  <Heading size="H200" color="grey.800" fontWeight="500">
                    {author.name}
                  </Heading>
                  <SocialHandlesCollection author={author} />
                </Flex>
                <Text variant="B100">{author.jobTitle}</Text>
                <Box fontSize="sm" textAlign="center">
                  <BlockContent blocks={author?.bioRaw} />
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
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
          {data?.allPost && <JamList jams={data.allPost} />}
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

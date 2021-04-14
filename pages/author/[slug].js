import React from 'react';
import {
  Box,
  Flex,
  Avatar,
  Heading,
  useDisclosure,
  Input,
} from '@chakra-ui/react';

import BlockContent from '@sanity/block-content-to-react';

import { useQuery } from 'react-query';

import { jams } from '@lib/queries/jams';

import Layout from '@components/Layout';
import JamAccordion from '@components/JamAccordion';
import IconButton from '@components/IconButton';
import { motion } from 'framer-motion';

import { FaTwitter, FaGithub, FaGlobe } from 'react-icons/fa';
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
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

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
  // Set Fuse
  const fuse = new Fuse(data?.allPost, fuseOptions);

  const onChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };
  const handleFilter = (data) => {
    setFilteredPosts(data);
  };

  return (
    <Layout isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <Flex
        as={motion.div}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, ease: 'easein' }}
        borderRadius="8px"
        justifyContent="space-between"
        p="1rem"
        overflowY="scroll"
        bg="white"
        h="100%"
        m={5}
        p={10}
        direction={{ base: 'column', lg: 'row' }}
      >
        <Flex
          align="center"
          direction="column"
          bg="white"
          h="100%"
          w={{ base: '100%', lg: '20%' }}
          borderRadius="8px"
          boxShadow="2xl"
        >
          {author?.image?.asset && (
            <Avatar
              borderColor="blue.400"
              alt={author?.name}
              src={author?.image?.asset?.url}
              size="2xl"
              borderWidth="3px"
              mt={10}
              showBorder
            />
          )}
          <Flex p={8} align="center" direction="column">
            <Heading>{author?.name}</Heading>
            <Flex mt={2}>
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

            <Box fontSize="sm" textAlign="center">
              <BlockContent blocks={author?.bioRaw} />
            </Box>
          </Flex>
        </Flex>

        <Flex direction="column" w={{ base: '100%', lg: '70%' }} align="center">
          <Input
            type="text"
            variant="outline"
            bg="white"
            placeholder="Search by keyword or tag..."
            padding="1.2rem 0 1.2rem 1rem"
            mt={{ base: 12 }}
            _placeholder={{
              lineSpacing: '4px',
              fontSize: 'sm',
            }}
            onChange={onChange}
          />

          <Flex
            align="center"
            p={5}
            h={{ base: '100%' }}
            w="auto"
            direction="column"
            align={{ base: 'center', xl: 'none' }}
          >
            {data?.allPost?.map((post) => (
              <JamAccordion
                color="blue"
                boxShadow="lg"
                w="100%"
                key={post._id}
                post={post}
                defaultIndex={[0]}
                borderRadius="lg"
                mb={4}
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Layout>
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

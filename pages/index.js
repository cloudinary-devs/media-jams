import React from 'react';
import { useRouter } from 'next/router';
import { serializeArray, deserializeArray } from '@hooks/useQueryParameter';
import { allPosts, allCategories } from '../lib/api';

import {
  Flex,
  Text,
  Center,
  Heading,
  Button,
  Link,
  VStack,
  HStack,
  Box,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/core';
import Layout from '@components/Layout';
import TabbedTagSelection from '@components/TabbedTagSelection';
import Hero from '@components/Hero';
import FeaturedJams from '@components/FeaturedJams';
import ElementIcon from '@components/ElementIcon';
import EmailSubscription from '@components/EmailSubscription';

export default function Index({ posts, categories }) {
  const [searchTags, setSearchTags] = React.useState([]);
  const router = useRouter();

  function addTagsToRoute(tags) {
    const params = serializeArray(tags);
    return router.push({
      pathname: '/post',
      query: { tags: params },
    });
  }

  function addTag(tag) {
    return setSearchTags((prev) => [...prev, tag]);
  }

  function removeTag(tag) {
    return setSearchTags((prev) => prev.filter((pt) => pt !== tag));
  }
  return (
    <Layout>
      <Hero posts={posts} />
      <VStack spacing={20} justifyContent="space-between" minW="100%" mb={20}>
        <Center maxW="3xl">
          <Heading
            mt="15rem"
            as="h1"
            textStyle="headline-intersitial"
            lineHeight="sm"
          >
            Media Jams connect you with live code and experts to help solve
            media problems in popular tech stacks and use cases
          </Heading>
        </Center>
        <HStack alignItems="stretch" justify="space-around" w="70%">
          <ElementIcon phrase="speed" mr={16} />
          <Box maxW="xl">
            <Heading mt={16} as="h1" textStyle="headline">
              Why Media Matters
            </Heading>
            <Center>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et
              ornare quam, ut scelerisque eros. Nunc urna lacus, pharetra in
              nulla ac, suscipit malesuada augue. Maecenas ac ultrices enim.{' '}
            </Center>
          </Box>
        </HStack>
        <HStack w="100%" justifyContent="space-around">
          <VStack alignItems="stretch" spacing={20} ml="10rem!important">
            <ElementIcon
              phrase="flexibility"
              alignItems="right"
              mr={25}
              mb={16}
            />
            <ElementIcon phrase="power" mb={5} ml="15rem!important" />
          </VStack>
          <Flex
            h="xl"
            w="2xl"
            direction="column"
            alignItems="center"
            ml="5rem!important"
          >
            <Heading
              alignSelf="start"
              textStyle="headline-page"
              mt={16}
              as="h1"
              fontspacing="2px"
              fontSize="3xl"
            >
              Start your media journey
            </Heading>

            <TabbedTagSelection
              tabs={categories}
              searchTags={searchTags}
              addTag={addTag}
              removeTag={removeTag}
            />
            <Button
              as={Link}
              mt={10}
              size="lg"
              p={5}
              colorScheme="blue"
              onClick={() => addTagsToRoute(searchTags)}
              _hover={{ textDecoration: 'none' }}
            >
              Search
            </Button>
          </Flex>
        </HStack>
      </VStack>
      <FeaturedJams posts={posts} />
      <EmailSubscription />
    </Layout>
  );
}

export async function getStaticProps() {
  const [posts, categories] = await Promise.all([allPosts(), allCategories()]);

  return {
    props: {
      posts,
      categories,
    },
  };
}

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

export default function Index({ posts, categories, camera }) {
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
      <Hero posts={posts} heroImage={camera} />
      <VStack minW="100%">
        <Center maxW="3xl">
          <Heading
            mt={16}
            as="h1"
            textStyle="headline-intersitial"
            lineHeight="sm"
          >
            With MediaJams, we connect you with the code that gets you working
            faster and the experts that teach it
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
        <HStack w="70%">
          <VStack alignItems="stretch" justify="space-around">
            <ElementIcon
              phrase="flexibility"
              alignItems="right"
              mr={16}
              mb={16}
            />
            <ElementIcon phrase="power" mr={16} mb={16} />
          </VStack>
          <Flex h="xl" direction="column" alignItems="center" minW="100%">
            <Center mb={16}>
              <Heading mt={16} mx={16} as="h1" size="2xl">
                Start your media journey
              </Heading>
            </Center>
            <TabbedTagSelection
              tabs={categories}
              searchTags={searchTags}
              addTag={addTag}
              removeTag={removeTag}
            />
            <Link
              as={Button}
              mt={16}
              size="lg"
              onClick={() => addTagsToRoute(searchTags)}
              _hover={{ textDecoration: 'none' }}
            >
              Search
            </Link>
          </Flex>
        </HStack>
      </VStack>
      <FeaturedJams posts={posts} />
      <VStack mb={16}>
        <Center>
          <Heading mt={16} mx={16} textStyle="headline-interestitial">
            Keep up with all the Jams
          </Heading>
        </Center>
        <Center maxWidth="2xl">
          There’s always something new happening in the world of media. Our
          Media Developer Experts are always pushing new horizons. If you want
          to stay up to date, get weekly updates in your inbox.
        </Center>
        <InputGroup mt={12} maxWidth="lg">
          <Input
            variant="filled"
            placeholder="Enter your email for updates ..."
          />
          <InputRightElement height="100%" width="25%">
            <Button size="sm" colorScheme="blue" onClick={() => {}}>
              <Text color="white">Subscribe</Text>
            </Button>
          </InputRightElement>
        </InputGroup>
      </VStack>
    </Layout>
  );
}

export async function getStaticProps() {
  const cloudinary = require('cloudinary').v2;

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const [posts, categories] = await Promise.all([allPosts(), allCategories()]);

  const publicIds = ['camera'];

  let urls = {};

  publicIds.map((pid) => {
    const url = cloudinary.url(pid);
    return (urls = {
      ...urls,
      [pid]: url,
    });
  });

  return {
    props: {
      posts,
      categories,
      ...urls,
    },
  };
}

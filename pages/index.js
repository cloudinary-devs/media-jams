import React from 'react';
import { useRouter } from 'next/router';
import { serializeArray, deserializeArray } from '@hooks/useQueryParameter';
import { allPosts, allCategories } from '../lib/api';

import {
  Flex,
  Center,
  Heading,
  Button,
  Link,
  VStack,
  HStack,
  Box,
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
      <VStack>
        <Center>
          <Heading mt={16} as="h1" textStyle="headline-intersitial">
            With MediaJams, we connect you with the code that gets you working
            faster and the experts that teach it
          </Heading>
        </Center>
        <HStack>
          <ElementIcon phrase="power" />
          <Box>
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
      </VStack>
      <Flex h="xl" direction="column" alignItems="center" minW="100%">
        <Center mb={16}>
          <Heading mt={16} mx={16} as="h1" size="2xl">
            Find the right content for you
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
      <FeaturedJams posts={posts} />
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

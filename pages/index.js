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
} from '@chakra-ui/react';
import Layout from '@components/Layout';
import TabbedTagSelection from '@components/TabbedTagSelection';
import Hero from '@components/Hero';
import FeaturedJams from '@components/FeaturedJams';
import ElementIcon from '@components/ElementIcon';
import EmailSubscription from '@components/EmailSubscription';

export default function Index({ posts, categories, assets }) {
  const [searchTags, setSearchTags] = React.useState([]);
  const router = useRouter();

  function addTagsToRoute(tags) {
    const tagsArr = [];
    tags.map((tag) => tagsArr.push(tag.title));
    const params = serializeArray(tagsArr);

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
      <Hero heroImg={assets ? assets[0] : null} />

      <VStack w="100%" mt={20} mb={40}>
        <Center maxW="5xl" textAlign="center">
          <Heading
            fontSize="2.5rem"
            mt={['0rem', '15rem']}
            as="h1"
            textStyle="headline-intersitial"
            lineHeight="sm"
          >
            Media Jams connect you with live code and experts to help solve
            media problems in popular tech stacks and use cases
          </Heading>
        </Center>
        <Flex w="100%">
          <HStack
            display={['none', 'none', 'flex']}
            justifyContent="space-around"
            flexGrow="2"
          >
            <VStack w="70%" alignItems="stretch" spacing={20}>
              <ElementIcon phrase="speed" ml={20} />
              <ElementIcon
                phrase="flexibility"
                alignItems="right"
                alignSelf="center"
              />
              <ElementIcon phrase="power" alignSelf="flex-end" />
            </VStack>
          </HStack>

          <VStack flexGrow="2">
            <Box ml={[1, 50]} alignSelf="flex-start" maxW="xl">
              <Heading mt={16} as="h1" textStyle="headline">
                Why Media Matters
              </Heading>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et
                ornare quam, ut scelerisque eros. Nunc urna lacus, pharetra in
                nulla ac, suscipit malesuada augue. Maecenas ac ultrices enim.{' '}
              </span>
            </Box>
            <Flex direction="column" w={'100%'} pt={50}>
              <TabbedTagSelection
                tabs={categories}
                addTag={addTag}
                removeTag={removeTag}
                searchTags={searchTags}
              />
              <Button
                as={Link}
                mt={10}
                size="lg"
                p={5}
                colorScheme="blue"
                onClick={() => addTagsToRoute(searchTags)}
                _hover={{ textDecoration: 'none' }}
                w={64}
                alignSelf="center"
              >
                Search
              </Button>
            </Flex>
          </VStack>
        </Flex>
      </VStack>

      <FeaturedJams posts={posts} />

      <EmailSubscription />
    </Layout>
  );
}

export async function getStaticProps() {
  const cloudinary = require('cloudinary').v2;
  const [posts, categories] = await Promise.all([allPosts(), allCategories()]);

  cloudinary.config({
    cloud_name: 'mediadevs',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const config = [
    {
      publicId: 'mediajams/hero',
      transforms: {},
    },
  ];

  const assets = [];

  config.map((pid) =>
    assets.push(cloudinary.url(pid.publicId, pid.transforms)),
  );

  return {
    props: {
      posts,
      categories,
      assets,
    },
  };
}

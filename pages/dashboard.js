import Layout from '@components/Layout';

import {
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

import { boxShadow } from '@utils/styles';

import JamCard from '@components/JamCard';

const featuredPosts = [
  {
    author: {
      name: 'Domitrius Clark',
      image:
        'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
    },
    title: 'Responsive images in React',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis tristique sem. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Morbi in ipsum sit amet pede facilisis laoreet.',
    tags: ['react'],
  },
  {
    author: {
      name: 'Domitrius Clark',
      image:
        'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
    },
    title: 'Responsive images in React',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis tristique sem. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Morbi in ipsum sit amet pede facilisis laoreet.',
    tags: ['react'],
  },
  {
    author: {
      name: 'Domitrius Clark',
      image:
        'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
    },
    title: 'Responsive images in React',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis tristique sem. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Morbi in ipsum sit amet pede facilisis laoreet.',
    tags: ['react'],
  },
  {
    author: {
      name: 'Domitrius Clark',
      image:
        'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
    },
    title: 'Responsive images in React',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis tristique sem. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Morbi in ipsum sit amet pede facilisis laoreet.',
    tags: ['react'],
  },
  {
    author: {
      name: 'Domitrius Clark',
      image:
        'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
    },
    title: 'Responsive images in React',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis tristique sem. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Morbi in ipsum sit amet pede facilisis laoreet.',
    tags: ['react'],
  },
  {
    author: {
      name: 'Domitrius Clark',
      image:
        'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
    },
    title: 'Responsive images in React',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis tristique sem. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Morbi in ipsum sit amet pede facilisis laoreet.',
    tags: ['react'],
  },
];

const topTags = [
  'react',
  'nextjs',
  'a11y',
  'lazy loading',
  'CDN',
  'responsive',
];

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Layout isOpen={isOpen} onClose={onClose}>
      <Flex direction="column" minH="100%" p={8}>
        <Flex
          h="auto"
          direction={{
            base: 'column',
            md: 'column',
            lg: 'row',
          }}
          justifyContent={{
            base: 'center',
            md: 'center',
            lg: 'space-around',
          }}
          p={8}
        >
          <Flex direction="column">
            <Heading
              fontSize="6.5rem"
              as="h1"
              textStyle="headline-page"
              color="red.900"
            >
              Featured Jams
            </Heading>
            <Grid
              templateColumns="repeat(3, 1fr)"
              templateRows="repeat(2, 1fr)"
              gap={5}
            >
              {featuredPosts.map((post) => (
                <JamCard post={post} />
              ))}
            </Grid>
          </Flex>
          <VStack justifyContent="space-between">
            <Flex
              borderRadius="16px"
              boxShadow={boxShadow}
              p={7}
              mt="26px"
              h="40%"
              direction="column"
              alignItems="flex-start"
            >
              <Heading as="h6">Top Tags</Heading>
              <Grid
                templateColumns="repeat(3, 2fr)"
                templateRows="repeat(2, 1fr)"
                width="80%"
              >
                {topTags.map((tag) => (
                  <Text>{tag}</Text>
                ))}
              </Grid>
            </Flex>
            <Flex
              borderRadius="16px"
              boxShadow={boxShadow}
              p={7}
              mt="26px"
              h="40%"
              direction="column"
              alignItems="flex-start"
            >
              <Heading as="h6">Top Tags</Heading>
              <Grid
                templateColumns="repeat(3, 2fr)"
                templateRows="repeat(2, 1fr)"
                width="80%"
              >
                {topTags.map((tag) => (
                  <Text>{tag}</Text>
                ))}
              </Grid>
            </Flex>
          </VStack>
        </Flex>
      </Flex>
    </Layout>
  );
}

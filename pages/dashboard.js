import Layout from '@components/Layout';

import {
  Flex,
  Box,
  Grid,
  Heading,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import JamAccordion from '@components/JamAccordion';
import { boxShadow } from '@utils/styles';

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
    <Layout isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <Flex
        overflow="auto"
        alignItems="center"
        pt={2}
        justifyContent="space-around"
        direction={{ base: 'column', md: 'column', lg: 'column', xl: 'row' }}
      >
        <Flex
          direction={{ base: 'row', md: 'row', lg: 'column', xl: 'column' }}
          h={{ base: '30%', md: '40%', lg: '40%', xl: '80%' }}
          width={{ base: '95%', md: '80%', lg: '90%', xl: '20%' }}
          border="1px solid black"
          borderRadius="md"
          mb={{ base: 4, md: 4, lg: 4, xl: 0 }}
          boxShadow={boxShadow}
        ></Flex>

        {/* HEADER */}
        <Flex
          direction="column"
          boxShadow={boxShadow}
          borderRadius="lg"
          h={{ base: '700px', md: '90%', lg: '90%', xl: '80%' }}
          w={{ base: '100%', md: '90%', lg: '90%', xl: '50%' }}
          p={5}
          overflow="auto"
        >
          <Heading textStyle="headline-interstitial" color="red.400" mb={3}>
            Featured Jams
          </Heading>
          <Flex direction="column" w="100%">
            {featuredPosts.map((post) => (
              <JamAccordion
                w={{ base: '100%', md: '90%', lg: '70%', xl: '50%' }}
                key={post._id}
                post={post}
              />
            ))}
          </Flex>
        </Flex>

        <Flex
          direction={{ base: 'row', md: 'row', lg: 'column', xl: 'column' }}
          h={{ base: '30%', md: '40%', lg: '40%', xl: '80%' }}
          w={{ base: '95%', md: '80%', lg: '90%', xl: '20%' }}
          border="1px solid black"
          borderRadius="md"
          mt={{ base: 4, md: 4, lg: 4, xl: 0 }}
          boxShadow={boxShadow}
        ></Flex>
      </Flex>

      {/* PATHS */}
      <Flex
        direction="column"
        w={{ base: '95%', md: '80%', lg: '90%', xl: '95%' }}
        alignSelf="center"
        boxShadow={boxShadow}
        height="300px"
        borderRadius="lg"
        border="1px solid black"
        mt={{ base: 3, md: 3, lg: 3, xl: 0 }}
        mb={4}
      >
        <Heading ml={4} textStyle="headline-page" color="red.400">
          Paths
        </Heading>
      </Flex>
    </Layout>
  );
}

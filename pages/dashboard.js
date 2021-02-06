import Layout from '@components/Layout';

import {
  Flex,
  Box,
  Text,
  Link,
  Grid,
  Heading,
  useDisclosure,
  Icon,
} from '@chakra-ui/react';
import { FaDiscord } from 'react-icons/fa';
import { Link as NextLink } from 'next/link';

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
      <Grid
        height="100vh"
        templateAreas={`
          "featured paths ad"
          "featured paths five"
          "featured authors five"
        `}
        templateColumns="1.3fr 1fr 1fr"
        templateRows="1fr 1fr 1fr"
        gap={8}
        p={8}
      >
        {/* FEATURED */}
        <Flex
          gridArea="featured"
          overflow="scroll"
          bg="blue.200"
          direction="column"
          boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
          borderRadius="lg"
          p={5}
        >
          <Heading textStyle="headline-interstitial" color="blue.400" mb={3}>
            Featured Jams
          </Heading>
          <Flex direction="column" w="100%">
            {featuredPosts.map((post) => (
              <JamAccordion
                color="blue"
                w="100%"
                key={post._id}
                post={post}
                defaultIndex={[0]}
              />
            ))}
          </Flex>
        </Flex>

        {/* AD */}
        <Flex
          direction="column"
          justify="center"
          align="center"
          bg="#7289DA"
          borderRadius="8px"
          boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
          gridArea="ad"
        >
          <Icon as={FaDiscord} color="white" h={32} w={32} />
          <Text color="white" fontSize="md">
            Learn with others & meet our authors
          </Text>
          <Link
            as={NextLink}
            color="white"
            _visited="white"
            textDecor="underline"
            href="https://discord.gg/mediadevs"
          >
            discord.gg/mediadevs
          </Link>
        </Flex>

        {/* AUTHORS */}
        <Flex
          w="100%"
          align="center"
          overflowX="auto"
          flexWrap="nowrap"
          borderRadius="8px"
          boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
          bg="green.200"
          gridArea="authors"
        >
          <Flex
            ml={8}
            mr={8}
            flex="0 0 auto"
            bg="white"
            w="150px"
            height="200px"
            borderRadius="8px"
            boxSahdow={boxShadow}
          ></Flex>
          <Flex
            mr={8}
            flex="0 0 auto"
            bg="white"
            w="150px"
            height="200px"
            borderRadius="8px"
            boxSahdow={boxShadow}
          ></Flex>
          <Flex
            mr={8}
            flex="0 0 auto"
            bg="white"
            w="150px"
            height="200px"
            borderRadius="8px"
            boxSahdow={boxShadow}
          ></Flex>
          <Flex
            mr={8}
            flex="0 0 auto"
            bg="white"
            w="150px"
            height="200px"
            borderRadius="8px"
            boxSahdow={boxShadow}
          ></Flex>
        </Flex>

        {/* PATHS */}
        <Flex
          bg="#AAAAAA"
          w="100%"
          direction="column"
          align="center"
          borderRadius="8px"
          boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
          gridArea="paths"
          position="relative"
          overflow="hidden"
        >
          <Box
            position="absolute"
            zIndex="2"
            backgroundColor="rgba(0,0,0,0.7)"
            height="100%"
            width="100%"
            top="0px"
            left="0px"
          />
          <Box
            position="absolute"
            zIndex="4"
            height="34px"
            width="260px"
            left="-64px"
            top="50px"
            transform="rotate(-40deg)"
            backgroundColor="red.400"
            textAlign="center"
            color="white"
          >
            <Text size="md" fontWeight="bold" pt={1} letterSpacing="2px">
              Coming Soon
            </Text>
          </Box>
          <Heading
            pl={4}
            textStyle="headline-page"
            color="white"
            alignSelf="flex-start"
            fontSize="5xl"
          >
            Learning Paths
          </Heading>
          <Flex
            flexGrow="1"
            direction="column"
            justify="space-evenly"
            align="center"
            width="100%"
          >
            <Box
              w="95%"
              h="30%"
              bg="#D2D2D2"
              borderRadius="8px"
              boxShadow={boxShadow}
            ></Box>
            <Box
              w="95%"
              h="30%"
              bg="#D2D2D2"
              borderRadius="8px"
              boxShadow={boxShadow}
            ></Box>
            <Box
              w="95%"
              h="30%"
              bg="#D2D2D2"
              borderRadius="8px"
              boxShadow={boxShadow}
            ></Box>
          </Flex>
        </Flex>

        {/* FIVE */}
        <Box
          borderRadius="8px"
          boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
          bg="gray.200"
          gridArea="five"
        ></Box>
      </Grid>
    </Layout>
  );
}

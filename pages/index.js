import React from 'react';
import { useRouter } from 'next/router';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { serializeArray, deserializeArray } from '@hooks/useQueryParameter';
import { jams as queryJams } from '@lib/queries/jams';

import {
  Avatar,
  Flex,
  Box,
  Tooltip,
  Heading,
  Text,
  Grid,
  Icon,
  useToken,
} from '@chakra-ui/react';

import { keyframes } from '@emotion/react';

import { IoMdHand } from 'react-icons/io';

import { FaTwitter, FaGithub } from 'react-icons/fa';
import Hero from '@components/Hero';
import EmailSubscription from '@components/EmailSubscription';
import Footer from '@components/Footer';
import Navbar from '@components/Navbar';
import { boxShadow } from '@utils/styles';
import JamAccordion from '@components/JamAccordion';

export default function Index(props) {
  const [searchTags, setSearchTags] = React.useState([]);
  const router = useRouter();
  // Query
  const { data: jamData, isLoading } = useQuery('allJams', queryJams.get);

  function addTagsToRoute(tags) {
    const tagsArr = [];
    tags.map((tag) => tagsArr.push(tag.title));
    const params = serializeArray(tagsArr);

    return router.push({
      pathname: '/post',
      query: { tags: params },
    });
  }

  return (
    <Flex direction="column" minH="calc(100vh)" w="100%">
      <Navbar />
      <Flex direction="column">
        <Box flex={1}>
          <Hero />
          <Features />
          <Authors />
          <FrameworkJams />
          <EmailSubscription />
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
}

export async function getStaticProps() {
  const cloudinary = require('cloudinary').v2;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('allJams', queryJams.getStatic);

  cloudinary.config({
    cloud_name: 'mediadevs',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function Features() {
  return (
    <Flex
      alignItems="center"
      justify="space-evenly"
      height="300px"
      bg="green.200"
    >
      <Flex w="15%" align="center" justify="center" direction="column">
        <Text textAlign="center">
          Learn media best practices from our media experts
        </Text>
      </Flex>
      <Flex
        w="15%"
        align="center"
        justify="center"
        direction="column"
        alignSelf="flex-end"
      >
        <Text textAlign="center" mb={10}>
          Create notes as you learn without leaving the site
        </Text>
      </Flex>
      <Flex w="15%" align="center" justify="center" direction="column">
        <Text textAlign="center">
          Boomark and curate the important Jams you know you'll be coming back
          to
        </Text>
      </Flex>
    </Flex>
  );
}

function Authors() {
  const authors = [
    {
      name: 'Bryan Robinson',
      occupation: 'Developer Advocate @ Sanity',
      twitter: 'https://twitter.com/bryanlrobinson',
      github: 'https://twitter.com/bryanlrobinson',
      image: {
        asset: {
          url:
            'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
        },
      },
    },
    {
      name: 'Bryan Robinson',
      occupation: 'Developer Advocate @ Sanity',
      twitter: 'https://twitter.com/bryanlrobinson',
      github: 'https://twitter.com/bryanlrobinson',
      image: {
        asset: {
          url:
            'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
        },
      },
    },
    {
      name: 'Bryan Robinson',
      occupation: 'Developer Advocate @ Sanity',
      twitter: 'https://twitter.com/bryanlrobinson',
      github: 'https://twitter.com/bryanlrobinson',
      image: {
        asset: {
          url:
            'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
        },
      },
    },
    {
      name: 'Bryan Robinson',
      occupation: 'Developer Advocate @ Sanity',
      twitter: 'https://twitter.com/bryanlrobinson',
      github: 'https://twitter.com/bryanlrobinson',
      image: {
        asset: {
          url:
            'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
        },
      },
    },
  ];
  return (
    <Flex alignItems="center" justify="center" h="5xl" direction="column">
      <Heading textStyle="headline-page">Meet our Authors</Heading>
      <Text fontSize="xl" width="20%" textAlign="center">
        Media Jam authors are from all around the globe. Get to know them!
      </Text>
      <Flex justify="space-evenly" w="80%" mt={12} wrap="wrap">
        {authors.map((author) => (
          <AuthorCard h={72} w={64} author={author} />
        ))}
      </Flex>
    </Flex>
  );
}

function AuthorCard({ author, ...rest }) {
  const wave = keyframes`
    0% { transform: rotate( 0.0deg) }
    10% { transform: rotate(14.0deg) }
    20% { transform: rotate(-8.0deg) }
    30% { transform: rotate(14.0deg) }
    40% { transform: rotate(-4.0deg) }
    50% { transform: rotate(10.0deg) }
    60% { transform: rotate( 0.0deg) }
    100% { transform: rotate( 0.0deg) }
  `;
  return (
    <Flex
      p={8}
      borderRadius="8px "
      align="center"
      justify="space-evenly"
      boxShadow={boxShadow}
      direction="column"
      {...rest}
    >
      <Avatar size="xl" src={author.image.asset.url} />
      <Heading fontSize="xl">{author.name}</Heading>
      <Text fontSize="xs">{author.occupation}</Text>
      <Flex mt={3}>
        <Icon as={FaTwitter} mr={3} /> <Icon as={FaGithub} />
      </Flex>
      <Tooltip
        label="Some bio about the author. This could honestly be something that the author writes specifically for the learners."
        hasArrow
        placement="bottom"
      >
        <span>
          <Icon
            sx={{
              ':hover': {
                animationName: `${wave}`,
                animationDuration: '3s',
                animationIterationCount: 'infinite',
                transformOrigin: '70% 70%',
                display: 'inline-block',
              },
            }}
            as={IoMdHand}
            color="yellow.900"
            boxSize="2em"
            mt={3}
          />
        </span>
      </Tooltip>
    </Flex>
  );
}

function FrameworkJams() {
  const [yellow900] = useToken('colors', ['yellow.900']);
  return (
    <Flex
      h="1200px"
      direction="column"
      bg="red.200"
      align="center"
      justify="center"
    >
      <Heading
        textStyle="headline-page"
        fontSize="6xl"
        textAlign="center"
        width="30%"
        color="white"
        lineHeight={1}
        mb={20}
      >
        <span style={{ color: yellow900 }}>Jam</span> in your favorite Framework
      </Heading>
      <Grid
        templateAreas='
          "React Vue Vue"
          "React Svelte Svelte" 
        '
        w="60%"
        h="60%"
        gap={4}
      >
        <Flex
          overflow="auto"
          borderRadius="8px"
          direction="column"
          bg="white"
          boxShadow={boxShadow}
          gridArea="React"
        >
          <Flex
            borderTopRadius="8px"
            p={2}
            justify="space-between"
            w="100%"
            bg="blue.400"
          >
            <Heading color="blue.200">React</Heading>
          </Flex>
          {featuredPosts.map((post) => (
            <JamAccordion color="blue" w="100%" key={post._id} post={post} />
          ))}
        </Flex>
        <Flex
          overflow="auto"
          borderRadius="8px"
          direction="column"
          bg="white"
          boxShadow={boxShadow}
          gridArea="Vue"
        >
          <Flex
            borderTopRadius="8px"
            p={2}
            justify="space-between"
            w="100%"
            bg="green.400"
          >
            <Heading color="green.200">Vue</Heading>
          </Flex>
          {featuredPosts.map((post) => (
            <JamAccordion color="green" w="100%" key={post._id} post={post} />
          ))}
        </Flex>
        <Flex
          overflow="auto"
          borderRadius="8px"
          direction="column"
          bg="white"
          boxShadow={boxShadow}
          gridArea="Svelte"
        >
          <Flex
            borderTopRadius="8px"
            p={2}
            justify="space-between"
            w="100%"
            bg="red.400"
          >
            <Heading color="red.200">Svelte</Heading>
          </Flex>
          {featuredPosts.map((post) => (
            <JamAccordion color="red" w="100%" key={post._id} post={post} />
          ))}
        </Flex>
      </Grid>
    </Flex>
  );
}

const featuredPosts = [
  {
    author: {
      name: 'Domitrius Clark',
      image: {
        asset: {
          url:
            'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
        },
      },
    },
    slug: {
      current: 'it-a-post',
    },
    title: 'Responsive images in React',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis tristique sem. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Morbi in ipsum sit amet pede facilisis laoreet.',
    tags: ['react'],
  },
  {
    author: {
      name: 'Domitrius Clark',
      image: {
        asset: {
          url:
            'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
        },
      },
    },
    slug: {
      current: 'it-a-post',
    },
    title: 'Responsive images in React',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis tristique sem. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Morbi in ipsum sit amet pede facilisis laoreet.',
    tags: ['react'],
  },
  {
    author: {
      name: 'Domitrius Clark',
      image: {
        asset: {
          url:
            'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
        },
      },
    },
    slug: {
      current: 'it-a-post',
    },
    title: 'Responsive images in React',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis tristique sem. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Morbi in ipsum sit amet pede facilisis laoreet.',
    tags: ['react'],
  },
  {
    author: {
      name: 'Domitrius Clark',
      image: {
        asset: {
          url:
            'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
        },
      },
    },
    slug: {
      current: 'it-a-post',
    },
    title: 'Responsive images in React',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis tristique sem. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Morbi in ipsum sit amet pede facilisis laoreet.',
    tags: ['react'],
  },
];

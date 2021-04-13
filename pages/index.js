import React from 'react';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { jams as queryJams } from '@lib/queries/jams';
import { authors as queryAuthors } from '@lib/queries/authors';
import { routes as queryRoutes } from '@lib/queries/routes';
import { boxShadow } from '@utils/styles';

import { Flex, Box, Heading, Grid, useToken } from '@chakra-ui/react';
import Hero from '@components/Hero';
import Footer from '@components/Footer';
import Navbar from '@components/Navbar';
import JamAccordion from '@components/JamAccordion';
import AuthorCard from '@components/AuthorCard';
import { keyframes } from '@emotion/react';

export default function Index() {
  return (
    <Flex direction="column" minH="calc(100vh - 50px)" w="100%">
      <Navbar />
      <Flex direction="column">
        <Box flex={1}>
          <Hero />
          <Features />
          <Authors />
          <FrameworkJams />
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
}

function Features() {
  return (
    <Flex
      alignItems="center"
      minH={{ base: '8xl', xl: 'xl' }}
      direction="column"
      bg="blue.200"
    >
      <Heading
        mt={32}
        fontSize="5xl"
        fontFamily="Bangers"
        textAlign="center"
        letterSpacing="wide"
      >
        What are Media Jams?
      </Heading>
    </Flex>
  );
}

function Authors() {
  const { data } = useQuery('authors', queryAuthors.get);

  const infiniteScroll = keyframes`
  0% {
    margin-left: 0px
  }
  100% {
    margin-left: -2150px;
 }
`;

  // The section needs to scroll horizontally

  // We need to know what the beginning and the end of the array are

  // We need the AuthorCards to loop to the left and stop on hover

  // Once the loop finishes -- it must reset to the first item again

  // const firstAuthor = authors[0];
  // const lastAuthor = authors[authors.length - 1];

  // console.log(authors?.indexOf(lastAuthor));

  return (
    <Flex direction="column">
      <Heading mt={10} fontSize="6xl" fontFamily="bangers" textAlign="center">
        Jam Authors
      </Heading>
      <Flex
        alignItems="center"
        justify="space-evenly"
        minH={{ base: '8xl', lg: '2xl' }}
        w="100%"
        overflow="hidden"
      >
        {data.allAuthor?.map((author) => (
          <AuthorCard
            key={author?._id}
            h={72}
            mr={4}
            _first={{
              animation: `${infiniteScroll} 6s linear infinite`,
            }}
            minW={52}
            author={author}
            boxShadow="none"
            border="1px solid black"
          />
        ))}
      </Flex>
    </Flex>
  );
}

function FrameworkJams() {
  const { data } = useQuery('jams', queryJams.get);
  const [yellow900] = useToken('colors', ['yellow.900']);
  const reactJams = data?.jams?.filter((jam) =>
    jam.tags?.some(
      (tag) =>
        tag.title === 'React' ||
        tag.title === 'NextJS' ||
        tag.title === 'Gatsby',
    ),
  );

  const vueJams = data?.jams?.filter((jam) =>
    jam.tags?.some((tag) => tag.title === 'Vue' || tag.title === 'NuxtJS'),
  );

  // const svelteJams = data?.jams?.filter((jam) =>
  //   jam.tags?.some((tag) => tag.title === 'Svelte'),
  // );

  const angularJams = data?.jams?.filter((jam) =>
    jam.tags?.some((tag) => tag.title === 'Angular'),
  );

  return (
    <Flex
      h={{ base: 'auto', lg: '1200px' }}
      pt={{ base: 10, lg: 0 }}
      pb={{ base: 10, lg: 0 }}
      direction="column"
      bg="red.200"
      align="center"
      justify="center"
    >
      <Heading
        as="h1"
        fontFamily="Bangers, cursive"
        fontSize={{ base: '6xl', lg: '8xl' }}
        letterSpacing="wide"
        lineHeight="base"
        color="white"
        textAlign="center"
        lineHeight={1}
        letterSpacing="wide"
        mb={20}
      >
        <span style={{ color: yellow900 }}>Jam</span> in your favorite Framework
      </Heading>
      <Grid
        templateAreas={{
          base: `
            "React React"
            "Vue Vue"            
            "Angular Angular"
          `,
          lg: `
            "React Vue Angular"
            "React Vue Angular" 
          `,
        }}
        templateColumns={{ base: '1fr', md: '1fr', lg: 'repeat(3, 2fr)' }}
        templateRows={{
          base: 'repeat(4, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'none',
        }}
        w={{ base: '90%' }}
        h={{ base: '100%', base: '100%', lg: '60%' }}
        gap={4}
      >
        <Flex
          overflow="auto"
          borderRadius="8px"
          direction="column"
          bg="white"
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
          {reactJams?.map((post) => (
            <JamAccordion
              color="blue"
              width="100%"
              key={post._id}
              post={post}
            />
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
          {vueJams?.map((post) => (
            <JamAccordion color="green" w="100%" key={post._id} post={post} />
          ))}
        </Flex>
        {/* <Flex
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
          {svelteJams?.map((post) => (
            <JamAccordion color="red" w="100%" key={post._id} post={post} />
          ))}
        </Flex> */}
        <Flex
          overflow="auto"
          borderRadius="8px"
          direction="column"
          bg="white"
          boxShadow={boxShadow}
          gridArea="Angular"
        >
          <Flex
            borderTopRadius="8px"
            p={2}
            justify="space-between"
            w="100%"
            bg="gray.400"
          >
            <Heading color="gray.200">Angular</Heading>
          </Flex>
          {angularJams?.map((post) => (
            <JamAccordion color="gray" w="100%" key={post._id} post={post} />
          ))}
        </Flex>
      </Grid>
    </Flex>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('routes', queryRoutes.getStatic);
  await queryClient.prefetchQuery('jams', queryJams.getStatic);
  await queryClient.prefetchQuery('authors', queryAuthors.getStatic);
  await queryClient.prefetchQuery(
    'featuredJams',
    queryJams.getStaticFeaturedJams,
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

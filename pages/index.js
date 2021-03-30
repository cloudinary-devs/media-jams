import React from 'react';
import { useRouter } from 'next/router';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { serializeArray } from '@hooks/useQueryParameter';
import { jams as queryJams } from '@lib/queries/jams';
import { authors as queryAuthors } from '@lib/queries/authors';
import { boxShadow } from '@utils/styles';

import {
  Flex,
  Box,
  Heading,
  Text,
  Grid,
  useToken,
  Icon,
} from '@chakra-ui/react';
import { FaStickyNote, FaBookmark, FaChalkboardTeacher } from 'react-icons/fa';
import Hero from '@components/Hero';
import EmailSubscription from '@components/EmailSubscription';
import Footer from '@components/Footer';
import Navbar from '@components/Navbar';
import JamAccordion from '@components/JamAccordion';
import AuthorCard from '@components/AuthorCard';

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
          <EmailSubscription />
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
      justify="center"
      height="300px"
      w="100%"
      color="white"
      bgGradient="linear(to-r, green.200, green.400)"
    >
      <Flex justify="space-around" w={{ base: '100%', lg: '60%' }}>
        <Flex p={4} align="center" justify="center" direction="column">
          <Icon
            color="white.600"
            as={FaChalkboardTeacher}
            boxSize={{ base: '2em', lg: '3em' }}
          />
          <Text textAlign="center">
            Learn media best practices from our media experts
          </Text>
        </Flex>
        <Flex
          align="center"
          justify="center"
          direction="column"
          alignSelf="flex-end"
          mt={5}
          p={4}
        >
          <Icon
            color="white.600"
            as={FaStickyNote}
            boxSize={{ base: '2em', lg: '3em' }}
          />
          <Text textAlign="center">
            Create notes as you learn without leaving the site
          </Text>
        </Flex>
        <Flex p={4} align="center" justify="center" direction="column">
          <Icon
            color="white.600"
            as={FaBookmark}
            boxSize={{ base: '2em', lg: '3em' }}
          />
          <Text textAlign="center">
            Boomark and curate the important Jams you know you'll be coming back
            to
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

function Authors() {
  const { data: authors } = useQuery('authors', queryAuthors.get);

  const getRandomElements = (sourceArray, neededElements) => {
    var result = [];
    for (var i = 0; i < neededElements; i++) {
      var index = Math.floor(Math.random() * sourceArray.length);
      result.push(sourceArray[index]);
      sourceArray.splice(index, 1);
    }
    return result;
  };
  return (
    <Flex
      alignItems="center"
      justify="center"
      minH={{ base: '8xl', lg: '6xl' }}
      direction="column"
    >
      <Heading
        as="h1"
        fontFamily="Bangers, cursive"
        fontSize={{ base: '6xl', lg: '8xl' }}
        letterSpacing="wide"
        lineHeight="base"
        textAlign="center"
        w={{ base: '90%' }}
        lineHeight={1}
        mt={{ base: 10 }}
      >
        Meet our Authors
      </Heading>
      <Text
        mt={{ base: 5, lg: 0 }}
        mb={{ base: 10, lg: 0 }}
        width={{ base: '80%', lg: '20%' }}
        textAlign="center"
        w="60%"
      >
        Media Jam authors are from all around the globe. Get to know them!
      </Text>
      <Grid
        gap={5}
        templateRows={{
          base: 'none',
          md: 'none',
          lg: 'repeat(2, 1fr)',
          xl: 'repeat(2, 1fr)',
        }}
        templateColumns={{
          base: 'repeat(1, 100%)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
          xl: 'repeat(4, 1fr)',
        }}
        w={{ base: '100%', lg: '70%' }}
        mt={{ base: 0, lg: 12 }}
        mb={{ base: 10, lg: 0 }}
        p={{ base: 1, lg: 'none' }}
        justifyItems={{ base: 'center', lg: 'none' }}
      >
        {authors?.allAuthor?.slice(0, 8).map((author) => (
          <AuthorCard h={72} w={{ base: '90%', lg: 64 }} author={author} />
        ))}
      </Grid>
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

  const svelteJams = data?.jams?.filter((jam) =>
    jam.tags?.some((tag) => tag.title === 'Svelte'),
  );

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
            "Svelte Svelte"
            "Angular Angular"
          `,
          lg: `
            "React Vue Svelte Angular"
            "React Vue Svelte Angular" 
          `,
        }}
        templateColumns={{ base: '1fr', md: '1fr', lg: 'repeat(4, 2fr)' }}
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
          {svelteJams?.map((post) => (
            <JamAccordion color="red" w="100%" key={post._id} post={post} />
          ))}
        </Flex>
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

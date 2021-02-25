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
  const router = useRouter();

  const { data: jams } = useQuery('jams', queryJams.get);
  const { data: authors } = useQuery('authors', queryAuthors.get);

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
          <Authors authors={authors.allAuthor} />
          <FrameworkJams jams={jams.jams} />
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
      justify="space-evenly"
      height="300px"
      bg="green.200"
    >
      <Flex w="15%" align="center" justify="center" direction="column">
        <Icon color="green.600" as={FaChalkboardTeacher} boxSize="3em" />
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
        <Icon color="green.600" as={FaStickyNote} boxSize="3em" />
        <Text textAlign="center" mb={10}>
          Create notes as you learn without leaving the site
        </Text>
      </Flex>
      <Flex w="15%" align="center" justify="center" direction="column">
        <Icon color="green.600" as={FaBookmark} boxSize="3em" />
        <Text textAlign="center">
          Boomark and curate the important Jams you know you'll be coming back
          to
        </Text>
      </Flex>
    </Flex>
  );
}

function Authors({ authors }) {
  return (
    <Flex alignItems="center" justify="center" h="5xl" direction="column">
      <Heading textStyle="headline-page">Meet our Authors</Heading>
      <Text fontSize="xl" width="20%" textAlign="center">
        Media Jam authors are from all around the globe. Get to know them!
      </Text>
      <Flex justify="space-evenly" w="100%" mt={12} wrap="wrap">
        {authors?.map((author) => (
          <AuthorCard h={72} w={64} author={author} />
        ))}
      </Flex>
    </Flex>
  );
}

function FrameworkJams({ jams }) {
  const [yellow900] = useToken('colors', ['yellow.900']);

  const reactJams = jams?.filter((jam) =>
    jam.tags.some(
      (tag) =>
        tag.title === 'React' ||
        tag.title === 'NextJS' ||
        tag.title === 'Gatsby',
    ),
  );
  const vueJams = jams?.filter((jam) =>
    jam.tags.some((tag) => tag.title === 'Vue' || tag.title === 'NuxtJS'),
  );
  const svelteJams = jams?.filter((jam) =>
    jam.tags.some((tag) => tag.title === 'Svelte'),
  );

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
          {reactJams?.map((post) => (
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
      </Grid>
    </Flex>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('jams', queryJams.getStatic);
  await queryClient.prefetchQuery('authors', queryAuthors.getStatic);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

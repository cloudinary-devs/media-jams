import React from 'react';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { jams as queryJams } from '@lib/queries/jams';
import { authors as queryAuthors } from '@lib/queries/authors';
import { routes as queryRoutes } from '@lib/queries/routes';
import { boxShadow } from '@utils/styles';
import {
  FaVideo,
  FaCode,
  FaPencilAlt,
  FaUserAstronaut,
  FaPills,
  FaBuffer,
} from 'react-icons/fa';
import {
  Flex,
  Text,
  Box,
  Heading,
  Grid,
  useToken,
  SimpleGrid,
  Stack,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import Hero from '@components/Hero';
import Footer from '@components/Footer';
import Navbar from '@components/Navbar';
import JamAccordion from '@components/JamAccordion';
import AuthorCard from '@components/AuthorCard';
import { keyframes } from '@emotion/react';
import { useMixPanel } from '@lib/mixpanel';

export default function Index() {
  const mixpanel = useMixPanel();
  mixpanel.pageView();
  return (
    <Flex direction="column" minH="calc(100vh - 50px)" w="100%">
      <Navbar />
      <Flex direction="column">
        <Box flex={1}>
          <Hero />
          <Features />
          <Authors />
          <AuthFeatures />
          <FeaturedJams />
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
}

function FeatureItem(props) {
  const { title, children, icon } = props;
  return (
    <Box py={{ base: '8', md: '10' }} mx={{ base: '2', md: '4' }}>
      <Box color={mode('blue.500', 'blue.300')} fontSize="5xl">
        {icon}
      </Box>
      <Stack mt="6">
        <Text
          as="h3"
          color={mode('blue.500', 'blue.300')}
          fontSize="xl"
          fontWeight="extrabold"
        >
          {title}
        </Text>
        <Text pr="6" lineHeight="tall">
          {children}
        </Text>
      </Stack>
    </Box>
  );
}

function Features() {
  return (
    <Box as="section" bg={mode('gray.50', 'gray.800')} py="20">
      <Heading
        fontSize="5xl"
        fontFamily="Bangers"
        textAlign="center"
        letterSpacing="wide"
        color="blue.600"
        pb={{ base: '2', md: '10' }}
      >
        What are Media Jams?
      </Heading>
      <Box
        maxW={{ base: 'xl', md: '7xl' }}
        mx="auto"
        px={{ base: '6', md: '8' }}
      >
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacingY={{ base: 'xl', md: 'xs' }}
          rowGap={{ base: 'xs', md: 'xl' }}
        >
          <FeatureItem title="Bite-size Tutorials" icon={<FaPills />}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </FeatureItem>
          <FeatureItem title="Run & Play Sandboxes" icon={<FaCode />}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </FeatureItem>
          <FeatureItem title="Authored by Experts" icon={<FaUserAstronaut />}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </FeatureItem>
          <FeatureItem title=" Tech Stack Mashups" icon={<FaBuffer />}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </FeatureItem>
          <FeatureItem title="Practical Use-Cases" icon={<FaPencilAlt />}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </FeatureItem>
          <FeatureItem title="Program with Media" icon={<FaVideo />}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </FeatureItem>
        </SimpleGrid>
      </Box>
    </Box>
  );
}

function Authors() {
  const { data } = useQuery('authors', queryAuthors.get);

  const scrollLoop = keyframes`
    0% {
      margin-left: 0px
    }
    100% {
      margin-left: -1000px
    }
  `;

  return (
    <Flex direction="column" minH="xl" bg="green.200">
      <Heading
        color="green.600"
        mt={10}
        fontSize="6xl"
        fontFamily="bangers"
        textAlign="center"
      >
        Jam Authors
      </Heading>
      <Flex
        mt={10}
        overflowX="auto"
        flexWrap="nowrap"
        overflowY="hidden"
        mr="2"
      >
        {/* arbitrary set to the first 6 authors, update to 'feature flag' or wieghted */}
        {data.allAuthor?.slice(0, 6).map((author) => (
          <AuthorCard
            key={author?._id}
            h={72}
            mr={4}
            minW={52}
            author={author}
            boxShadow="none"
            bg="white"
            _first={{
              marginLeft: 10,
              // animation: `${scrollLoop} 6s linear infinite`
            }}
            _last={{
              marginRight: 10,
            }}
          />
        ))}
      </Flex>
    </Flex>
  );
}

function MemberItem({ title, children, icon }) {
  return (
    <Stack
      spacing={{ base: '3', md: '6' }}
      direction={{ base: 'column', md: 'row' }}
    >
      {icon && <Box fontSize="6xl">{icon}</Box>}
      <Stack spacing="1">
        <Text fontWeight="extrabold" fontSize="lg">
          {title}
        </Text>
        <Box color={mode('gray.600', 'gray.400')}>{children}</Box>
      </Stack>
    </Stack>
  );
}

function AuthFeatures() {
  return (
    <Box as="section" maxW="7xl" mx="auto" py="12" px={{ base: '6', md: '8' }}>
      <Heading
        my={10}
        fontSize="6xl"
        fontFamily="bangers"
        textAlign="center"
        letterSpacing="wider"
      >
        As a member...
      </Heading>
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacingX="10"
        spacingY={{ base: '8', md: '14' }}
      >
        <MemberItem title="You can create notes without leaving the app">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </MemberItem>
        <MemberItem title="Bookmark all of your favorite jams to return to">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </MemberItem>
        <MemberItem title="Return to your most recently viewed jam">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </MemberItem>
      </SimpleGrid>
    </Box>
  );
}

function FeaturedJams() {
  const { data } = useQuery('featuredJams', queryJams.getFeaturedJams);
  return (
    <Flex
      gridArea="Featured"
      bg={mode('blue.50', 'blue.800')}
      direction="column"
      alignItems="center"
      p={5}
      h={{
        base: 'auto',
        lg: '',
      }}
    >
      <Heading
        fontSize="6xl"
        fontFamily="Bangers"
        textAlign="center"
        letterSpacing="wide"
        color="blue.600"
        pb={{ base: '2', md: '10' }}
      >
        Featured Jams
      </Heading>
      <Flex
        direction="column"
        maxW={{ base: 'xl', md: '2xl' }}
        w="100%"
        alignItems="center"
      >
        {data.allPost?.map((post) => (
          <JamAccordion
            color="blue"
            shadow
            w="100%"
            key={post._id}
            post={post}
            defaultIndex={[0]}
            borderRadius="lg"
            mb={4}
          />
        ))}
      </Flex>
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

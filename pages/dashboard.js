import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import {
  Flex,
  Box,
  Text,
  Link,
  Grid,
  Heading,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import { FaDiscord } from 'react-icons/fa';
import { Link as NextLink } from 'next/link';

import { authors as queryAuthors } from '@lib/queries/authors';
import { jams as queryJams } from '@lib/queries/jams';
import Layout from '@components/Layout';
import JamAccordion from '@components/JamAccordion';
import AuthorCard from '@components/AuthorCard';
import { boxShadow } from '@utils/styles';

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Layout isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <Grid
        height={{
          base: 'auto',
          md: '100%',
          lg: '100%',
          xl: '100vh',
        }}
        templateAreas={{
          base: `
            "Featured"                        
            "Paths"
            "DiscordAd"
            "GettingStarted"
            "Authors"            
          `,
          md: `
            "Featured Featured"
            "DiscordAd Paths"
            "GettingStarted GettingStarted"
            "Authors Authors"
          `,
          lg: `
            "Featured Featured"
            "DiscordAd Paths"
            "GettingStarted GettingStarted"
            "Authors Authors"
          `,
          xl: `
            "Featured Paths DiscordAd"
            "Featured Paths GettingStarted"
            "Featured Authors GettingStarted"
          `,
        }}
        templateColumns={{
          base: '100%',
          md: '1fr 1fr',
          lg: '1fr 1fr',
          xl: '1.3fr 1fr 1fr',
        }}
        templateRows={{
          base: 'repeat(5 , 500px)',
          md: 'repeat(4, 300px)',
          lg: 'repeat(4, 300px)',
          xl: '1fr 1fr 1fr',
        }}
        gap={8}
        p={8}
        ml={-3}
        overflow={{ md: 'auto', lg: 'auto', xl: 'none' }}
      >
        <Featured />
        <DiscordAd />
        <Authors />
        <Paths />
        <GettingStarted />
      </Grid>
    </Layout>
  );
}

function Featured() {
  const { data } = useQuery('featuredJams', queryJams.getFeaturedJams);

  return (
    <Flex
      gridArea="Featured"
      overflow="scroll"
      bg="blue.200"
      direction="column"
      boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
      borderRadius="lg"
      p={5}
      h={{
        base: 'auto',
        lg: '',
      }}
    >
      <Heading textStyle="headline-interstitial" color="blue.400" mb={3}>
        Featured Jams
      </Heading>
      <Flex direction="column" w="100%">
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

function DiscordAd() {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      bg="#7289DA"
      borderRadius="8px"
      boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
      gridArea="DiscordAd"
    >
      <Icon
        as={FaDiscord}
        color="white"
        h={{ base: 64, md: 32, xl: 32 }}
        w={{ base: 64, md: 32, xl: 32 }}
      />
      <Text
        textAlign="center"
        w="50%"
        mt={2}
        color="white"
        fontSize="md"
        fontWeight="bold"
      >
        Join our community of media newcomers & experts
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
  );
}

function Authors() {
  const { data } = useQuery('authors', queryAuthors.get);
  return (
    <Flex
      w="100%"
      align="center"
      overflowX="auto"
      flexWrap="nowrap"
      borderRadius="8px"
      boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
      bg="green.200"
      gridArea="Authors"
      px={5}
    >
      {data.allAuthor?.map((author) => (
        <AuthorCard
          minH="90%"
          bg="white"
          maxH="90%"
          minW={60}
          mr={4}
          author={author}
        />
      ))}
    </Flex>
  );
}

function Paths() {
  return (
    <Flex
      bg="#AAAAAA"
      w="100%"
      direction="column"
      align="center"
      borderRadius="8px"
      boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
      gridArea="Paths"
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
        right="-43px"
        top="50px"
        transform="rotate(40deg)"
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
  );
}

function GettingStarted() {
  return (
    <Box
      borderRadius="8px"
      boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
      bg="red.200"
      gridArea="GettingStarted"
    ></Box>
  );
}
export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    'featuredJams',
    queryJams.getStaticFeaturedJams,
  );
  await queryClient.prefetchQuery('authors', queryAuthors.getStatic);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

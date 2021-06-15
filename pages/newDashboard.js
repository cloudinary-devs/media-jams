import React from 'react';
import NextLink from 'next/link';
import {
  SimpleGrid,
  IconButton,
  Link,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useToken,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import {
  Author,
  Close,
  GreenCheck,
  Stack,
  Code,
  Mashups,
  Video,
  Pencil,
} from '@components/Icons';

import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { tags as queryTags } from '@lib/queries/tags';
import { useUser } from '@auth0/nextjs-auth0';

import Sidebar from '@components/Sidebar';

function Tag() {}

// Banner
function Feature({ children, ...rest }) {
  return (
    <Flex w="auto" align="center" {...rest}>
      <GreenCheck />
      <Text variant="B400" color="grey.700" pl={3}>
        {children}
      </Text>
    </Flex>
  );
}

function FeatureBlock({ header, text, LeftIcon }) {
  return (
    <Flex w="100%" direction="column">
      <Flex align="center">
        <LeftIcon />
        <Text ml="12px" variant="B400" fontWeight="bold" color="grey.900">
          {header}
        </Text>
      </Flex>
      <Text pl={8} mt="5px" variant="B300" color="grey.700">
        {text}
      </Text>
    </Flex>
  );
}

function SignupButton() {
  return (
    <Link as={NextLink} href="/api/auth/signup">
      <Button p="6px 32px" borderRadius="8px" bg="primary.500">
        <Text variant="B400" color="#FFFFFF" fontWeight="700">
          Sign Up
        </Text>
      </Button>
    </Link>
  );
}

function Banner() {
  const [show, setShow] = React.useState(true);
  const { user, loading } = useUser();

  React.useEffect(() => {
    console.log(window.localStorage.getItem('keep-hero-closed'));
    if (user || window.localStorage.getItem('keep-hero-closed')) {
      setShow(false);
    }
  }, [user]);

  return show ? (
    <Flex bg="#FFFFFF" direction="column" h="420px" w="100%" p="24px">
      <IconButton
        _hover={{ bg: 'none', outline: 'none' }}
        alignSelf="flex-end"
        bg="none"
        outline="none"
        w="auto"
        onClick={() => {
          window.localStorage.setItem('keep-hero-closed', 'true');
          setShow(false);
        }}
        icon={<Close />}
      />
      <Flex h="100%" w="100%" justify="space-evenly">
        <Flex h="260px" ml={8} justify="space-evenly" direction="column">
          <Heading mt="-16px" as="h2">
            Learn Media for Apps
          </Heading>
          <Feature mt="17px">Create notes right in the app</Feature>
          <Feature>Bookmark your favorite jams</Feature>
          <Feature>Return to your recent jams</Feature>
          <Flex mt="25px">
            <SignupButton />
            <Button p="6px 32px" borderRadius="8px" bg="primary.200" ml={4}>
              <Text fontWeight="700" variant="B400" color="primary.500">
                Got It
              </Text>
            </Button>
          </Flex>
        </Flex>
        <SimpleGrid
          templateColumns="repeat(2, minmax(0, 310px))"
          spacingY={8}
          spacingX={4}
        >
          <FeatureBlock
            LeftIcon={Stack}
            header="Bite-size Tutorials"
            text="How-to learning guides, limited in scope and easy to follow"
          />
          <FeatureBlock
            LeftIcon={Code}
            header="Run & Play Sandboxes"
            text="Learn-by-example demox, open code reeady to run & modify"
          />
          <FeatureBlock
            LeftIcon={Author}
            header="Authored by Experts"
            text="Content represents the most advanced dev best practices"
          />
          <FeatureBlock
            LeftIcon={Mashups}
            header="Tech Stack Mashups"
            text="Shows media design patterns for most popular tech stacks"
          />
          <FeatureBlock
            LeftIcon={Video}
            header="Program with Media"
            text="Create, manage, transform, optimize & deliver images/videos"
          />
          <FeatureBlock
            LeftIcon={Pencil}
            header="Practical Use-Cases"
            text="Solutions to media challenges encountered in building apps"
          />
        </SimpleGrid>
      </Flex>
    </Flex>
  ) : null;
}

// Search and Filter
function Tags() {
  const [selectedFilters, setSelectedFilters] = React.useState([]);
  const { data: jamTagData } = useQuery('jamTags', queryTags.get);

  function addTag(tag) {
    return setSelectedFilters((prev) => [...prev, tag]);
  }

  function removeTag(tag) {
    return setSelectedFilters((prev) => prev.filter((pt) => pt !== tag));
  }

  const clearAllTags = () => {
    routerPushTags();
    setSelectedFilters([]);
  };

  return jamTagData?.tags
    ? jamTagData?.tags
        .slice(0, 8)
        .map((tag) => <Text variant="B300">{tag.title}</Text>)
    : null;
}

function TagFilters() {
  return (
    <Flex mt="22px" w="480px">
      <Text variant="B300" color={useToken('colors', 'grey.900')}>
        Topics:
      </Text>
      <Flex w="632px" justify="space-evenly">
        <Tags />
      </Flex>
    </Flex>
  );
}

function SearchInput() {
  return (
    <Input
      bg="#FFFFFF"
      w="100%"
      h="56px"
      border="2px solid #88B1FC"
      borderRadius="8px"
      boxSizing="border-box"
      p="0px 16px"
      mt="24px"
      placeholder="Search by tag, title, keyword, author, etc..."
      _placeholder={{
        fontFamily: 'DM Sans',
        fontSize: '16px',
        lineHeight: '152%',
        color: useToken('colors', 'grey.700'),
      }}
    />
  );
}

const smVariant = { navigation: 'drawer', navigationButton: true };
const mdVariant = { navigation: 'sidebar', navigationButton: false };

// Page
export default function NewDashboard() {
  const { isOpen, onToggle } = useDisclosure();
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  return (
    <Flex bg="#F8F7FC">
      <Sidebar
        variant={variants?.navigation}
        isOpen={isOpen}
        onClose={onToggle}
      />

      <Flex
        w="100%"
        height="100%"
        overflow="auto"
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Banner />
        <Flex
          direction="column"
          maxW={{ base: '100%', md: '90%', lg: '980px' }}
        >
          <SearchInput />
          <TagFilters />
        </Flex>
      </Flex>
    </Flex>
  );
}

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('jamTags', queryTags.getStatic);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

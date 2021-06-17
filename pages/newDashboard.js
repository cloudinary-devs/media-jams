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
import { MobileTopBar } from '@components/Sidebar/MobileTopBar';

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
    <Flex w="280px" direction="column">
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
    if (user) {
      setShow(false);
    }
  }, [user]);

  return show ? (
    <Flex
      bg="#FFFFFF"
      direction="column"
      h="420px"
      w="100%"
      p="24px"
      align="center"
    >
      <IconButton
        _hover={{ bg: 'none', outline: 'none' }}
        alignSelf="flex-end"
        bg="none"
        outline="none"
        w="auto"
        onClick={() => setShow(false)}
        icon={<Close />}
      />
      <Flex h="100%" w="90%">
        <Flex w="50%" h="260px" justify="space-evenly" direction="column">
          <Heading as="h2">Learn Media for Apps</Heading>
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
        <SimpleGrid columns={2} spacingY={8} spacingX={20} w="520px">
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

// Mobile Navigation Bar
const MobileNavBar = ({ onClose }) => {
  return (
    <Flex w="100%" h="64px">
      <HStack spacing={3}>
        <IconButton
          onClick={onClose}
          size="lg"
          variant="ghost"
          aria-label="expand collapse"
          icon={<SideBarToggle />}
        />
      </HStack>
      <Spacer />
      <HStack spacing={3} px={4}>
        <Button size="sm" variant="ghost" color="white" onClick={onClose}>
          Login
        </Button>
        <Button size="sm" color="white" bg="rgba(255, 255, 255, 0.16)">
          Sign Up
        </Button>
      </HStack>
    </Flex>
  );
};

// Page
const smVariant = { navigation: 'drawer', navigationButton: true };
const mdVariant = { navigation: 'sidebar', navigationButton: false };
export default function NewDashboard() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure({
    defaultIsOpen: true,
  });
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  return (
    <Flex direction="column" bg="#F8F7FC">
      <Sidebar
        variants={variants}
        onClose={onClose}
        isOpen={isOpen}
        onToggle={onToggle}
        onOpen={onOpen}
      />

      <MobileTopBar
        variants={variants}
        onClose={onClose}
        isOpen={isOpen}
        onToggle={onToggle}
        onOpen={onOpen}
      />
      <Flex
        w="100%"
        height="100%"
        overflowY="auto"
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Banner />
        <Flex direction="column" w="90%">
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

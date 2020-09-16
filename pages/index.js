import sanityClient from '@sanity/client';

import {
  Flex,
  Box,
  Center,
  Wrap,
  Stack,
  Heading,
  Text,
  Button,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/core';
import { FaHashtag } from 'react-icons/fa';
import Image from '@components/Image';
import { Layout } from '@components/Layout';

const sanity = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
});

const queryPostWithTags = `*[_type == "post"] {
  _id,
  title,
  "slug": slug.current,
  "tags": tags[]->title,
  "author": author->name,
  _updatedAt,
  body
}
`;

const queryTags = `*[_type == "tag"].title`;

function Hero({ heroImage }) {
  const headings = useBreakpointValue({
    base: '2xl',
    lg: 'xl',
    md: 'lg',
    sm: 'md',
  });
  return (
    <Stack alignItems="center">
      <Flex w={['90%', '80%', '70%']} direction="column" textAlign="center">
        <Heading mt={16} mx={16} as="h1" size={headings}>
          Learning Media is hard MediaJams will fix that 👍
        </Heading>
        <Text mt={6}>
          With MediaJams, we connect you with the code that gets you working
          faster and the experts that teach it
        </Text>
      </Flex>
      <Image alignSelf="center" w="70%" mt={8} src={heroImage} />
    </Stack>
  );
}

function TagSelection({ tags, tabs }) {
  const [searchTags, setSearchTags] = React.useState([]);

  function addTag(tag) {
    return setSearchTags((prev) => [...prev, tag]);
  }

  function removeTag(tag) {
    return setSearchTags((prev) => prev.filter((pt) => pt !== tag));
  }

  return (
    <Flex direction="column" alignItems="center">
      <Center mb={16}>
        <Heading mt={16} mx={16} as="h1" size="2xl">
          Find the right content for you
        </Heading>
      </Center>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          {tabs.map((tab) => (
            <Tab>{tab}</Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel>
            <Wrap spacing={8}>
              {tags.map((tag) => {
                return (
                  <Button
                    onClick={() =>
                      searchTags.some((selected) => selected === tag)
                        ? removeTag(tag)
                        : addTag(tag)
                    }
                    variant={
                      searchTags.some((selected) => selected === tag)
                        ? 'solid'
                        : 'outline'
                    }
                    colorScheme={
                      searchTags.some((selected) => selected === tag)
                        ? 'teal'
                        : null
                    }
                    rightIcon={<FaHashtag />}
                  >
                    {tag}
                  </Button>
                );
              })}
            </Wrap>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

function Card({ post }) {
  return (
    <Stack height="240px" border="2px solid black">
      <Flex height="50%" alignItems="center" justify="center">
        <Heading as="h3" size="lg">
          {post.author}
        </Heading>
      </Flex>
      <Box
        flex="1"
        backgroundColor="black"
        style={{ clipPath: 'polygon(49% 0, 0% 100%, 100% 100%)' }}
      >
        <Heading as="h3" size="lg">
          {post.title}
        </Heading>
      </Box>
    </Stack>
  );
}

function FeaturedJams({ posts }) {
  return (
    <Stack>
      <Center mb={16}>
        <Heading mt={16} mx={16} as="h1" size="2xl">
          Featured Jams
        </Heading>
      </Center>
      <HStack>
        {posts.map((post) => (
          <Card post={post} />
        ))}
      </HStack>
    </Stack>
  );
}

export default function Index({ allPosts, allTags, camera }) {
  return (
    <Layout>
      <Stack spacing={32}>
        <Hero posts={allPosts} heroImage={camera} />
        <TagSelection tags={allTags} tabs={['Frameworks', 'Specializations']} />
        <FeaturedJams posts={allPosts} />
      </Stack>
    </Layout>
  );
}

export async function getStaticProps() {
  const cloudinary = require('cloudinary').v2;

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const [allPosts, allTags] = await Promise.all([
    sanity.fetch(queryPostWithTags),
    sanity.fetch(queryTags),
  ]);

  const publicIds = ['camera'];

  let urls = {};

  publicIds.map((pid) => {
    const url = cloudinary.url(pid);
    return (urls = {
      ...urls,
      [pid]: url,
    });
  });

  return {
    props: {
      allPosts,
      allTags,
      ...urls,
    },
  };
}

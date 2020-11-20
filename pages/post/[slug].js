import React from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import BlockContent from '@sanity/block-content-to-react';

import { postBySlug, postsWithSlug } from 'lib/api';

import { Code } from '@mdnextjs/components';
import CodeSandbox from '@components/CodeSandbox';
import Layout from '@components/Layout';

const components = { code: Code, iframe: CodeSandbox };

import JamDetailHero from '@components/JamDetailHero';
import JamAuthorBanner from '@components/JamAuthorBanner';
import EmailSubscription from '@components/EmailSubscription';

import {
  Flex,
  Text,
  Center,
  Heading,
  Button,
  Link,
  VStack,
  HStack,
  Box,
  Image,
} from '@chakra-ui/core';
import styled from '@emotion/styled';

const AuthorByline = styled(Text)`
  text-indent: 5px;
`;

/**
 * Can override any general styles set for textStyle="main-jam-content"
 * in the `styled(Box)` -->
 * */
const JamContent = styled(Box)``;

export default function Post({ post, preview }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  if (router.isFallback) {
    return null;
  }
  const content = hydrate(post.content, { components });
  const { author } = post;

  return (
    <Layout>
      <JamDetailHero>
        <VStack align="stretch" flex={1}>
          <Box backgroundColor="yellow.400" height="100%" py={4}>
            <Box
              backgroundColor="blue.200"
              ml="-10%"
              width="110%"
              display="block"
              py={4}
            >
              <Box color="grey.900" my={4} pl={4}>
                <Heading as="h1" fontSize="4xl" textStyle="headline-accent">
                  {post.title}
                </Heading>
                <AuthorByline fontSize="xs">
                  By {post.author?.name}
                </AuthorByline>
                <Text maxWidth="80%">{post.description}</Text>
              </Box>
            </Box>
          </Box>
        </VStack>
      </JamDetailHero>
      <JamContent textStyle="main-jam-content">{content}</JamContent>
      <JamAuthorBanner>
        <Box boxSize="sm" overflow="hidden">
          <Image
            fit="contain"
            width="100%"
            src={author.image}
            alt={author.name}
          />
        </Box>
        <Box backgroundColor="blue.200" py={4} maxWidth="50%">
          <Box color="grey.900" my={4} pl={4}>
            <Heading as="h1" fontSize="4xl" textStyle="headline-accent">
              {author.name}
            </Heading>
            <AuthorByline fontSize="xs">
              By Media Developer Expert, Developer 🥑
            </AuthorByline>
            <Text maxWidth="80%">
              <BlockContent blocks={author.bio} />
            </Text>
          </Box>
        </Box>
      </JamAuthorBanner>
      <EmailSubscription />
    </Layout>
  );
}
/**
 * Get all posts w/slug to pre-render url path
 * Filter out any posts that might not have a slug set
 * @returns {Object} paths based on post slug, and fallback true to live-preview drafts
 */
export const getStaticPaths = async () => {
  // Get the paths we want to pre-render based on posts
  const posts = await postsWithSlug();
  return {
    paths:
      posts
        ?.filter((post) => post?.slug)
        .map(({ slug }) => ({
          params: {
            slug,
          },
        })) || [],
    fallback: true,
  };
};

// This function gets called at build time on server-side.
export const getStaticProps = async ({ params: { slug }, preview = false }) => {
  const { title, body, slug: slug_current, ...post } = await postBySlug(
    slug,
    preview,
  );
  try {
    const mdx = await renderToString(body, { components }, null);
    return {
      props: {
        preview,
        post: {
          content: mdx,
          title: title,
          slug: slug_current,
          ...post,
        },
      },
    };
  } catch (error) {
    console.error(error);
  }
};

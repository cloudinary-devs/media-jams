import React from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import BlockContent from '@sanity/block-content-to-react';
import blocksToText from '@lib/blocksToText';

import { postBySlug, postsWithSlug } from 'lib/api';

import Code from '@components/Code';
import CodeSandbox from '@components/CodeSandbox';
import JamImage from '@components/Image';
import Layout from '@components/Layout';

const components = { code: Code, iframe: CodeSandbox, img: JamImage };

import JamContentHero from '@components/JamContentHero';
import JamAuthorBanner from '@components/JamAuthorBanner';
import EmailSubscription from '@components/EmailSubscription';

import { Text, Heading, VStack, Box, Image } from '@chakra-ui/react';
import styled from '@emotion/styled';

const AuthorByline = styled(Text)`
  text-indent: 5px;
`;

/**
 * Can override any general styles set for textStyle="jam-content"
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
      <JamContentHero
        author={author}
        description={post.description}
        title={post.title}
      ></JamContentHero>
      <JamContent textStyle="jam-content">{content}</JamContent>
      <JamAuthorBanner author={author}></JamAuthorBanner>
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
    // Convert the body of Jam from sanity portable text to string
    // Then serialize to mdx formated string for hydration in components.
    const bodyToString = blocksToText(body);
    const mdx = await renderToString(bodyToString, { components }, null);
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

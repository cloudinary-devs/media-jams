import React from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';

import blocksToText from '@lib/blocksToText';
import { postBySlug, postsWithSlug } from 'lib/api';

import { Flex, Text, Image, useDisclosure } from '@chakra-ui/react';
import Code from '@components/Code';
import CodeSandbox from '@components/CodeSandbox';
import Layout from '@components/Layout';
import JamContentHero from '@components/JamContentHero';
import JamContent from '@components/JamContent';
import JamAuthorBanner from '@components/JamAuthorBanner';
import EmailSubscription from '@components/EmailSubscription';

const components = { code: Code, iframe: CodeSandbox, img: Image };

export default function Post({ post, preview }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    <Layout isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <Flex direction="column" width="100%" height="100%" overflow="auto">
        <JamContentHero
          author={author}
          description={post.description}
          title={post.title}
        ></JamContentHero>
        <JamContent>{content}</JamContent>
        <JamAuthorBanner author={author}></JamAuthorBanner>
        <EmailSubscription />
      </Flex>
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

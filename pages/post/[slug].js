import React from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';

import { postBySlug, postsWithSlug } from '@lib/api';

import { Flex, Text, Image, useDisclosure } from '@chakra-ui/react';
import CodeBlock from '@components/CodeBlock';
import CodeSandbox from '@components/CodeSandbox';
import Layout from '@components/Layout';
import JamContentHero from '@components/JamContentHero';
import JamContent from '@components/JamContent';
import JamAuthorBanner from '@components/JamAuthorBanner';
import EmailSubscription from '@components/EmailSubscription';
import EmbeddedIframe from '@components/EmbeddedIframe';

const components = {
  CodeSandbox,
  code: CodeBlock,
  img: Image,
  iframe: EmbeddedIframe,
};

export default function Post({ post, preview, error }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  if (error || (!router.isFallback && !post?.slug)) {
    return <ErrorPage statusCode={404} />;
  }
  if (router.isFallback) {
    return null;
  }
  const content = hydrate(post.content, { components });
  const { author } = post;

  return (
    <Layout isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <Flex
        bg="white"
        direction="column"
        width="100%"
        height="100%"
        overflow="auto"
      >
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
 * Get the paths we want to pre-render based on jams
 * filter out any jams that may not have a slug
 * map over jams and wrap slug in a `params` Object that will get passed to `getStaticProps` on build
 * @returns {Object} paths based on jam slug, and fallback true to live-preview drafts
 */
export const getStaticPaths = async () => {
  // Get the paths we want to pre-render based on posts
  const jams = await postsWithSlug();
  return {
    paths:
      jams
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
// Also when constructing preview draft from /api/preivew
export const getStaticProps = async ({ params: { slug }, preview = false }) => {
  const jam = await postBySlug(slug, preview);
  try {
    // Then serialize to mdx formated string for hydration in components.
    const mdx = await renderToString(jam.body, { components }, null);
    return {
      props: {
        error: null,
        preview,
        post: {
          content: mdx,
          slug: slug,
          ...jam,
        },
      },
    };
  } catch (error) {
    console.error(error);
    return { props: error };
  }
};

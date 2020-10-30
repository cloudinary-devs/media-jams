import React from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';

import { postBySlug, postsWithSlug } from 'lib/api';

import { Code } from '@mdnextjs/components';
import CodeSandbox from '@components/CodeSandbox';

const components = { code: Code, iframe: CodeSandbox };

export default function Post({ post, preview }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  if (router.isFallback) {
    return null;
  }
  const content = hydrate(post.content, { components });

  return (
    <Layout>
      <h1>{post.title}</h1>
      {content}
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
  const { title, body, slug: slug_current, tags = null } = await postBySlug(
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
          tags,
        },
      },
    };
  } catch (error) {
    console.error(error);
  }
};

import sanityClient from '@sanity/client';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';

import { getPostBySlug, getAllPostsWithSlug } from 'lib/api';

import Code from '@components/Code';
import Iframe from '@components/Iframe';
import { Chakra } from '@components/Chakra';

const components = { code: Code };

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
    <Chakra evaluateThemeLazily>
      <h1>{post.title}</h1>
      {content}
      {post?.codeSandbox && (
        <Iframe
          src={`${post.codeSandbox}?codemirror=1&fontsize=12&hidenavigation=1&theme=dark`}
          maxW="960px"
          mx="auto"
          minH="500px"
          width="100%"
          overflow="hidden"
        />
      )}
    </Chakra>
  );
}

export const getStaticPaths = async () => {
  // Get the paths we want to pre-render based on posts
  const posts = await getAllPostsWithSlug();
  const paths = posts.map(({ _id, slug }) => ({
    params: { slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
};

// This function gets called at build time on server-side.
export const getStaticProps = async ({ params: { slug }, preview = false }) => {
  const {
    title,
    body,
    slug: slug_current,
    codeSandbox = null, // set default value for SSR serialization
  } = await getPostBySlug(slug, preview);

  const mdx = await renderToString(body, { components }, null);
  return {
    props: {
      preview,
      post: {
        content: mdx,
        title: title,
        slug: slug_current,
        codeSandbox,
      },
    },
  };
};

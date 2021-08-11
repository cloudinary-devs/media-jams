import React from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { NextSeo } from 'next-seo';

import { postBySlug, postsWithSlug } from '@lib/api';
import { useMixPanel } from '@lib/mixpanel';
import { useOnRead } from '@hooks/useOnRead';

import { Flex } from '@chakra-ui/react';
import Layout from '@components/Layout';
import JamContentHero from '@components/JamContentHero';
import JamContent from '@components/JamContent';
import JamAuthorBanner from '@components/JamAuthorBanner';
import EmailSubscription from '@components/EmailSubscription';
import MDXComponents from '@components/MDXComponents';
export default function Post({ post, preview, error, og }) {
  const mixpanel = useMixPanel();
  const mainContentRef = React.useRef(null);
  const router = useRouter();
  if (error || (!router.isFallback && !post?.slug)) {
    return <ErrorPage statusCode={404} />;
  }
  if (router.isFallback) {
    return null;
  }
  const { author } = post;

  useOnRead({
    parentElRef: mainContentRef,
    onRead: () =>
      mixpanel.interaction('Read Jam', mainContentRef, { post, author }),
  });

  const baseUrl = () => {
    if (process.env.NODE_ENV === 'production') {
      return `https://mediajams.dev`;
    } else if (process.env.VERCEL_ENV === 'production') {
      return `https://v2.mediajams.dev`;
    } else {
      return `http://localhost:3000`;
    }
  };

  return (
    <>
      <NextSeo
        openGraph={{
          url: `${baseUrl()}/post/${post.slug}`,
          title: post.title,
          description: post.description,
          images: [
            {
              url: og,
              height: 630,
              width: 1200,
            },
          ],
        }}
      />
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
          imageUrl={post.coverImage}
          date={post.updatedAt}
        ></JamContentHero>
        <main ref={mainContentRef}>
          <JamContent>
            <MDXRemote {...post.content} components={MDXComponents} />
          </JamContent>
        </main>
        <JamAuthorBanner author={author}></JamAuthorBanner>
        <EmailSubscription />
      </Flex>
    </>
  );
}

/**
 *
 * @param {ComponentPage} page
 * share the same layout and sidebar
 * https://github.com/vercel/next.js/tree/canary/examples/layout-component
 * @returns
 */
Post.getLayout = (page) => <Layout>{page}</Layout>;
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
  const cloudinary = require('cloudinary').v2;

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const jam = await postBySlug(slug, preview);

  const placeholder = cloudinary.url('mediajams/placeholder');

  const url = cloudinary.url('mediajams/og-image-blog', {
    transformation: [
      {
        // Author image overlay
        overlay: {
          url: jam.author.image.asset.url,
        },
        height: 90,
        width: 90,
        crop: 'scale',
        gravity: 'south_west',
        y: 72,
        x: 57,
        radius: 90,
      },
      // Jam header image overlay
      {
        overlay: {
          url: jam?.coverImage || placeholder,
        },
        height: 490,
        width: 490,
        crop: 'scale',
        gravity: 'east',
        y: -7,
        x: 101,
        radius: 8,
      },
      {
        // Author name overlay
        overlay: {
          text: jam.author.name,
          font_family: 'Arial',
          font_size: 28,
        },
        gravity: 'south_west',
        y: 130,
        x: 160,
      },
      // Author job title
      {
        overlay: {
          text: jam.author.jobTitle,
          font_family: 'Arial',
          font_size: 24,
        },
        gravity: 'south_west',
        y: 80,
        x: 160,
        width: 376,
        crop: 'fit',
      },
      // Jam Title
      {
        overlay: {
          text: jam.title,
          font_family: 'Arial',
          font_size: 52,
        },
        gravity: 'west',
        x: 50,
        y: -30,
        width: 488,
        crop: 'fit',
      },
    ],
  });

  try {
    // Then serialize to mdx formated string for hydration in components.
    const mdx = await serialize(jam.body);
    return {
      props: {
        og: url,
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

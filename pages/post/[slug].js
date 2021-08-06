import React from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { NextSeo } from 'next-seo';
import imageToBase64 from 'image-to-base64';

import { postBySlug, postsWithSlug } from '@lib/api';
import { useMixPanel } from '@lib/mixpanel';
import { useOnRead } from '@hooks/useOnRead';

import { Flex, Text, Image, useDisclosure, Stack } from '@chakra-ui/react';
import Layout from '@components/Layout';
import JamContentHero from '@components/JamContentHero';
import JamContent from '@components/JamContent';
import JamAuthorBanner from '@components/JamAuthorBanner';
import EmailSubscription from '@components/EmailSubscription';
import CodeBlock from '@components/CodeBlock';
import CodeSandbox from '@components/CodeSandbox';
import EmbeddedIframe from '@components/EmbeddedIframe';
import MDXComponents from '@components/MDXComponents';
export default function Post({ post, preview, error, og }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  return (
    <>
      <NextSeo
        openGraph={{
          type: 'website',
          url: `http://localhost:3000/post/${post.slug}`,
          title: 'Open Graph Title',
          description: 'Open Graph Description',
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
        overlay: {
          text: jam.author.name,
          font_family: 'Arial',
          font_size: 28,
        },
        gravity: 'south_west',
        y: 130,
        x: 160,
      },
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

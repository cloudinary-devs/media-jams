import React from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { NextSeo } from 'next-seo';

import { postBySlug, postsWithSlug } from '@lib/api';
import GA from '@lib/googleAnalytics';
import { useOnRead } from '@hooks/useOnRead';
import { useRelatedJams } from '@hooks/useJams';

import { Flex, Box, ListItem } from '@chakra-ui/react';
import Layout from '@components/Layout';
import JamContentHero from '@components/JamContentHero';
import JamContent from '@components/JamContent';
import JamAuthorBanner from '@components/JamAuthorBanner';
import EmailSubscription from '@components/EmailSubscription';
import MDXComponents from '@components/MDXComponents';
import RelatedJams from '@components/RelatedJams';

import format from 'date-fns/format';
export default function Post({ post, preview, error, og }) {
  const mainContentRef = React.useRef(null);
  const heroContentRef = React.useRef(null);
  const router = useRouter();
  const { data } = useRelatedJams(post?.tags);
  const { jams = {}, tag = {} } = data || {};
  const { allPost: relatedJams } = jams;

  if (error || (!router.isFallback && !post?.slug)) {
    return <ErrorPage statusCode={404} />;
  }
  if (router.isFallback) {
    return null;
  }
  const { author } = post;

  /**
   * Analytics Per Jam
   */
  useOnRead({
    parentElRef: mainContentRef,
    onRead: (time) => {
      GA.readJam(post, time);
    },
  });

  /**
   * We do this to scroll up on jam content when selecting a related jam
   * Scoll window doesn't work, since we are overflow scrolling the content
   * to keep the sidbar always visable at 100hv
   */
  React.useEffect(() => {
    const handleRouteChange = async (err, url) => {
      if (err.cancelled) return null;
      heroContentRef.current.scrollIntoView({ behavior: 'auto' });
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const baseUrl = () => {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
      return `https://mediajams.dev`;
    } else if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
      return process.env.NEXT_PUBLIC_VERCEL_URL;
    } else {
      return `http://localhost:3000`;
    }
  };

  return (
    <>
      <NextSeo
        title={post.title}
        description={post.description}
        canonical={`${baseUrl()}/post/${post.slug}`}
        additionalMetaTags={[
          {
            property: 'author',
            content: post.author.name,
          },
        ]}
        openGraph={{
          url: `${baseUrl()}/post/${post.slug}`,
          title: post.title,
          description: post.description,
          images: [
            {
              url: og,
              height: 630,
              width: 1200,
              alt: post.description,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <Flex
        bg="grey-200"
        direction="column"
        width="100%"
        height="100%"
        overflow="auto"
        mt={{ base: '24px', md: '32px' }}
        pb="8"
        useRef={heroContentRef}
      >
        <JamContentHero
          author={author}
          description={post.description}
          title={post.title}
          imageUrl={post.coverImage}
          date={post.updatedAt}
          ref={heroContentRef}
        />
        <main ref={mainContentRef}>
          <JamContent>
            <MDXRemote {...post.content} components={MDXComponents} />
          </JamContent>
        </main>
        <JamAuthorBanner author={author}></JamAuthorBanner>

        <EmailSubscription />

        {Array.isArray(relatedJams) && relatedJams.length > 0 && (
          <RelatedJams jams={relatedJams} title={tag.title} />
        )}
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
  const paths =
    jams
      ?.filter((post) => post?.slug)
      .map(({ slug }) => ({
        params: {
          slug,
        },
      })) || [];
  return { paths, fallback: 'blocking' };
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
  const url = cloudinary.url('mediajams/MediaJams-og-blog-2', {
    transformation: [
      {
        // Author image overlay
        overlay: {
          url: jam?.author.image?.asset.url,
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
        // Author name overlay
        overlay: {
          text: `${jam?.author.name || ''} - ${format(
            new Date(jam.updatedAt),
            'dd MMMM yyy',
          )}`,
          font_family: 'DMSans.ttf',
          font_size: 28,
        },
        gravity: 'south_west',
        y: 105,
        x: 160,
      },
      // Jam Title
      {
        overlay: {
          text: jam.title,
          font_family: 'DMSans.ttf',
          font_size: 60,
        },
        gravity: 'west',
        x: 50,
        y: -70,
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
      revalidate: 60, // 60 second revalidation
    };
  } catch (error) {
    console.error(error);
    return { props: error };
  }
};

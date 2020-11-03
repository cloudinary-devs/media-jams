import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import dynamic from 'next/dynamic';
import client, { previewClient, authClient } from '../../../lib/sanity';

const CodeEditor = dynamic(import('@components/CodeEditor'), {
  ssr: false,
});

import { postBySlug, postsWithSlug } from 'lib/api';

import Layout from '@components/Layout';

export default function LiveEdit({ post, preview }) {
  const [content, updateContent] = useState(post.content);
  useEffect(() => {
    updateContent(post.content);
  }, [post.content]);

  useEffect(() => {
    // subscribe to home component messages
    const subscription = previewClient
      .listen(`* [_id == $postId ].body[0]`, { postId: post._id })
      .subscribe((update) => {
        console.info('content updated >>>>>>', update.result);
        updateContent(update.result);
      });
    // return unsubscribe method to execute when component unmounts
    return subscription.unsubscribe;
  }, []);
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  if (router.isFallback) {
    return null;
  }

  const handleChange = (content) => {
    console.log(content.getValue());
    authClient
      .patch(post._id) // Document ID to patch
      .set({ body: content.getValue() }) // Shallow merge
      .commit() // Perform the patch and return a promise
      .then((updatedContent) => {
        console.log(updatedContent);
        updateContent(updateContent);
      })
      .catch((err) => {
        console.error('Oh no, the update failed: ', err.message);
      });
  };

  return (
    <Layout>
      <CodeEditor value={content} onChange={handleChange} />
    </Layout>
  );
}

// Get the paths we want to pre-render based on live edit, which is none
export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

// This function gets called at build time on server-side.
export const getStaticProps = async ({
  params: {
    params: [slug],
  },
  preview = false,
}) => {
  const { _id, body, slug: slug_current } = await postBySlug(slug, preview);
  try {
    return {
      props: {
        preview,
        post: {
          _id,
          content: body,
          slug: slug_current,
        },
      },
    };
  } catch (error) {
    console.error(error);
  }
};

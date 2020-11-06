import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Flex } from '@chakra-ui/core';
import auth0 from '@lib/auth0';
import client, { previewClient, authClient } from '@lib/sanity';

const CodeEditor = dynamic(import('@components/CodeEditor'), {
  ssr: false,
});
import LiveMDX from '@components/LiveMDX';

import { postBySlug, postsWithSlug } from 'lib/api';

import Layout from '@components/Layout';

export default function LiveEdit({ user, post, preview }) {
  const [content, updateContent] = useState(null);
  useEffect(() => {
    updateContent(post.content);
  }, [post.content]);

  useEffect(() => {
    // subscribe to home component messages
    // const subscription = previewClient
    //   .listen(`* [_id == $postId ].body[0]`, { postId: post._id })
    //   .subscribe((update) => {
    //     console.info('content updated >>>>>>', update.result);
    //     updateContent(update.result);
    //   });
    // return unsubscribe method to execute when component unmounts
    // return subscription.unsubscribe;
  }, []);

  const handleChange = (content) => {
    console.log(content.getValue());
    // authClient
    //   .patch(post._id) // Document ID to patch
    //   .set({ body: content.getValue() }) // Shallow merge
    //   .commit() // Perform the patch and return a promise
    //   .then((updatedContent) => {
    //     console.log(updatedContent);
    //     updateContent(updateContent);
    //   })
    //   .catch((err) => {
    //     console.error('Oh no, the update failed: ', err.message);
    //   });
    updateContent(content.getValue());
  };

  return (
    <Layout user={user}>
      <Flex>
        <CodeEditor onChange={handleChange} code={content} />
        <LiveMDX code={content} />
      </Flex>
    </Layout>
  );
}

export const getServerSideProps = async ({
  params: {
    params: [slug],
  },
  preview = false,
  req,
  res,
}) => {
  try {
    const { _id, body, slug: slug_current } = await postBySlug(slug, preview);
    const session = await auth0.getSession(req);

    if (!session || !session.user) {
      res.writeHead(302, {
        Location: '/api/auth/login',
      });
      res.end();
      return;
    }

    return {
      props: {
        preview,
        post: {
          _id,
          content: body,
          slug: slug_current,
        },
        user: session.user,
      },
    };
  } catch (error) {
    console.error(error);
  }
};

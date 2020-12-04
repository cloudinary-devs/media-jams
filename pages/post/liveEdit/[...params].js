import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Flex } from '@chakra-ui/react';
import { withAuthServerSideProps } from '@components/withAuth';
import { postBySlug, postsWithSlug } from 'lib/api';
import {
  getClient,
  usePreviewSubscription,
  urlFor,
  PortableText,
  previewClient,
} from '@lib/sanity';

import LiveMDX from '@components/LiveMDX';
import Layout from '@components/Layout';

const CodeEditor = dynamic(import('@components/CodeEditor'), {
  ssr: false,
});

const queryDraftPost = `*[_type == "post" && _id == $postId].body`;

function LiveEdit({ user, data: { post } }) {
  const [content, updateContent] = useState(post.content);
  useEffect(() => {
    updateContent(post.content);
  }, [post]);
  useEffect(() => {
    console.log('start subscription');
    const subscription = previewClient(user['https://mediajams-studio/token'])
      .listen(queryDraftPost, { postId: post._id })
      .subscribe((update) => {
        console.log({ update });
        updateContent(update.result.body);
      });
    console.log(subscription);
    //unsubscribe
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Layout user={user}>
      <Flex>
        <LiveMDX content={content} />
      </Flex>
    </Layout>
  );
}

export const getServerSideProps = withAuthServerSideProps(
  async ({
    params: {
      params: [slug, draftPostId],
    },
    preview = false,
    req,
    res,
  }) => {
    const { _id, body, slug: slug_current } = await postBySlug(slug, preview);
    return {
      preview,
      post: {
        _id,
        content: body,
        slug: slug_current,
      },
    };
  },
);

export default LiveEdit;

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Flex } from '@chakra-ui/react';
import { withAuthServerSideProps } from '@components/withAuth';
import { postBySlug, queryDraftPostBody } from '@lib/api';
import { previewClient } from '@lib/sanity';

import LiveMDX from '@components/LiveMDX';
import Layout from '@components/Layout';

/**
 *
 * @param {Object} Props
 * Renders draft post content and then subscribes
 * to changes via 'previewClient' for realtime results in Studio
 * when creators are editing
 */
function LiveEdit({ user, data: { post } }) {
  const [content, updateContent] = useState(post.content);
  useEffect(() => {
    updateContent(post.content);
  }, [post]);
  useEffect(() => {
    const subscription = previewClient(user['https://mediajams-studio/token'])
      .listen(queryDraftPostBody, { postId: post._id })
      .subscribe((update) => {
        updateContent(update.result.body);
      });
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

import React, { useState, useEffect } from 'react';
import Error from '../../_error';
import dynamic from 'next/dynamic';
import Layout from '@components/Layout';
import { useUser } from '@auth0/nextjs-auth0';
import { postBySlug, queryDraftPostBody } from '@lib/api';
import { previewClient } from '@lib/sanity';

// Force LiveMDXD to only render on the browser
const DynamicLiveMDXNoSSR = dynamic(() => import('@components/LiveMDX'), {
  ssr: false,
});

import JamContent from '@components/JamContent';

/**
 *
 * @param {Object} Props
 * Renders draft post content and then subscribes
 * to changes via 'previewClient' for realtime results in Studio
 * when creators are editing
 */
function LiveEdit({ post }) {
  const { user, loading } = useUser();
  const [content, updateContent] = useState(post.content);
  useEffect(() => {
    updateContent(post.content);
  }, [post]);
  useEffect(() => {
    if (!loading && user) {
      const subscription = previewClient(user['https://mediajams-studio'].token)
        .listen(queryDraftPostBody, { postId: post?._id })
        .subscribe((update) => {
          updateContent(update.result.body);
        });
      //unsubscribe
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user, loading]);

  return (
    <JamContent>
      <DynamicLiveMDXNoSSR content={content} />
    </JamContent>
  );
}

export const getServerSideProps = async ({
  params: {
    params: [slug, draftPostId],
  },
  preview = false,
  req,
  res,
}) => {
  const { _id = null, body, slug: slug_current } = await postBySlug(
    slug,
    preview,
  );
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
};

export default LiveEdit;
LiveEdit.getLayout = (page) => <Layout>{page}</Layout>;

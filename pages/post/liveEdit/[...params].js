import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Flex } from '@chakra-ui/react';
import auth0 from '@lib/auth0';
import useDebounce from '@hooks/useDebounce';
import { previewClient } from '@lib/sanity';

const CodeEditor = dynamic(import('@components/CodeEditor'), {
  ssr: false,
});
import LiveMDX from '@components/LiveMDX';

import { postBySlug, postsWithSlug } from 'lib/api';

import Layout from '@components/Layout';

export default function LiveEdit({ post, user, error }) {
  const [content, updateContent] = useState(post.content);
  useEffect(() => {
    updateContent(post.content);
  }, [post]);
  const debouncedContentValue = useDebounce(content, 500);
  // useEffect(() => {
  //   previewClient(user['https://mediajams-studio/token'])
  //     .patch(post._id) // Document ID to patch
  //     .set({ body: debouncedContentValue }) // Shallow merge
  //     .commit() // Perform the patch and return a promise
  //     .then((updatedContent) => {})
  //     .catch((err) => {
  //       console.error('Oh no, the update failed: ', err.message);
  //     });
  // }, [debouncedContentValue]);

  const handleChange = (editor, data, value) => {
    updateContent(value);
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
    params: [slug, draftPostId],
  },
  preview = false,
  req,
  res,
}) => {
  const { _id, body, slug: slug_current } = await postBySlug(slug, preview);
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

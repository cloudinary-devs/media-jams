import React, { useState, useEffect } from 'react';
import { postBySlug } from '@lib/api';

export default function PostMedia({ jam }) {
  return <div>{jam.slug}</div>;
}

export const getServerSideProps = async ({
  params: {
    params: [slug, draftPostId],
  },
  preview = false,
  req,
  res,
}) => {
  const { _id = null, body, slug: slug_current, ...restJam } = await postBySlug(
    slug,
    preview,
  );
  return {
    props: {
      preview,
      jam: {
        _id,
        slug: slug_current,
        ...restJam,
      },
    },
  };
};

import sanityClient from '@sanity/client';

import { Stack } from '@chakra-ui/core';
import Layout from '@components/Layout';
import TabbedTagSelection from '@components/TabbedTagSelection';
import Hero from '@components/Hero';
import FeaturedJams from '@components/FeaturedJams';

const sanity = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
});

const queryPostWithTags = `*[_type == "post"] {
  _id,
  title,
  "slug": slug.current,
  "tags": tags[]->title,
  "author": author->name,
  _updatedAt,
  body
}
`;

const queryTags = `*[_type == "tag"].title`;

export default function Index({ allPosts, allTags, camera }) {
  return (
    <Layout>
      <Stack spacing={32}>
        <Hero posts={allPosts} heroImage={camera} />
        <TabbedTagSelection
          tags={allTags}
          tabs={['Frameworks', 'Specializations']}
        />
        <FeaturedJams posts={allPosts} />
      </Stack>
    </Layout>
  );
}

export async function getStaticProps() {
  const cloudinary = require('cloudinary').v2;

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const [allPosts, allTags] = await Promise.all([
    sanity.fetch(queryPostWithTags),
    sanity.fetch(queryTags),
  ]);

  const publicIds = ['camera'];

  let urls = {};

  publicIds.map((pid) => {
    const url = cloudinary.url(pid);
    return (urls = {
      ...urls,
      [pid]: url,
    });
  });

  return {
    props: {
      allPosts,
      allTags,
      ...urls,
    },
  };
}

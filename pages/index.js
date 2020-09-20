import { Stack, Container } from '@chakra-ui/core';
import Layout from '@components/Layout';
import TabbedTagSelection from '@components/TabbedTagSelection';
import Hero from '@components/Hero';
import FeaturedJams from '@components/FeaturedJams';

import { allPosts, allCategories } from 'lib/api';

export default function Index({ posts, categories, camera }) {
  return (
    <Layout>
      <Stack spacing={48}>
        <Hero posts={posts} heroImage={camera} />
        <TabbedTagSelection tabs={categories} />
        <FeaturedJams posts={posts} />
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

  const [posts, categories] = await Promise.all([allPosts(), allCategories()]);
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
      posts,
      categories,
      ...urls,
    },
  };
}

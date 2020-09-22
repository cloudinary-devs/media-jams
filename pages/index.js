import { Flex } from '@chakra-ui/core';

import Layout from '@components/Layout';
import TabbedTagSelection from '@components/TabbedTagSelection';
import Hero from '@components/Hero';
import FeaturedJams from '@components/FeaturedJams';

import { allPosts, allTags, allCategories, tagsByCategory } from 'lib/api';

export default function Index({ posts, categories, tags, camera }) {
  return (
    <Layout>
      <Hero posts={posts} heroImage={camera} />
      <TabbedTagSelection tabs={categories} tags={tags} />
      <FeaturedJams posts={posts} />
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

  const tagsByCategories = categories.map((category) => {
    const tags = tagsByCategory(category._id);

    return tags.then((data) => data);
  });

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
      tags: await Promise.all(tagsByCategories),
      ...urls,
    },
  };
}

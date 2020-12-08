import client, { previewClient } from './sanity';
import groq from 'groq';

const postFields = `
_id,
title,
"slug": slug.current,
"author": author->{
  name,
  "image": image.asset->url,
  bio
},
description,
_updatedAt,
body,
"tags": tags[]-> title
`;
const postSlugsQuery = `*[_type == "post"]{_id, "slug": slug.current}`;
const singlePostBySlug = groq`*[_type == "post" && slug.current == $slug] {${postFields}}`;
const singleDraftPostBySlug = groq`*[_type == "post" && slug.current == $slug && (_id in path("drafts.**"))] {${postFields}}`;
const postsQuery = groq`*[_type == "post"] {${postFields}}`;

const categoriesQuery = `*[_type == "category" ] {
  title,
  _id,
  "tags": *[ _type == "tag" && references(^._id) ]{ title, _id, featured, rank }
}`;

const tagsByCategoryId = `*[_type == "tag" && category[]._ref == $categoryId]{
  title,
  _id,
}`;

const tagQuery = `*[_type == "tag"] {
  title, _id, featured, rank,
  "categories": category[]->{_id,  title}
}`;

/**
 * Uses a read-only token to make fetch requests
 * to Sanity for rendering drafts before they are published publicly
 * @param {boolean} preview defaults to false, published posts only
 * @returns @function sanityFetch
 */
const getClient = (preview) => (preview ? previewClient() : client);

/**
 * @param {string} slug unique urlEncoded string for post
 * @param {boolean} preview defaults to false, published posts only
 * @returns @type {Post} First post matching slug
 */
export async function postBySlug(slug, preview = false) {
  const data = await getClient(preview).fetch(
    preview ? singleDraftPostBySlug : singlePostBySlug,
    { slug },
  );
  return data[0];
}

/**
 * Generate getStaticPaths from post slugs
 * @param {boolean} preview defaults to false, published posts only
 * @returns {Post[]}
 */
export async function postsWithSlug(preview = false) {
  const data = await getClient(preview).fetch(postSlugsQuery);
  return data;
}

/**
 * All posts with all fields and references populated
 * for staticly generated build
 * @param {boolean} preview defaults to false, published posts only
 * @returns {Post[]}
 */
export async function allPosts() {
  const data = await client.fetch(postsQuery);
  return data;
}

export async function allTags(preview = false) {
  const data = await client.fetch(tagQuery);
  return data;
}

/**
 *
 * @param {boolean} preview defaults to false, published posts only
 * @returns {Array}
 */
export async function allCategories(preview = false) {
  const data = await getClient(preview).fetch(categoriesQuery);
  return data;
}

/**
 * All tags belonging to a specific category
 * @param {string} categoryId Category ID
 * @param {boolean} preview defaults to false, published posts only
 * @returns {Array}
 */
export async function tagsByCategory(categoryId, preview = false) {
  const data = await getClient(preview).fetch(tagsByCategoryId, {
    categoryId,
  });
  return data;
}

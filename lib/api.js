import client, { previewClient } from './sanity';
import groq from 'groq';

/**
 * inReview
 * {
"type": "workflow.metadata",
 "state": "inReview"
}
 */
const postDraftsWithAuthor = groq`
* [_type == $type && $state == state]{
  ...coalesce(
    *[_id == "drafts." + ^.documentId]{
    title,
    author->{name, _id}
    }[0],
    *[_id == ^.documentId]{_id,_type}[0]
  )
}[0]
`;

const postWorkflowByID = groq`
* [_type == $type && $id == _id]{
  	state,
    ...coalesce(
      *[_id == "drafts." + ^.documentId]{
      title,
      author->{name, _id}
      }[0],
      *[_id == ^.documentId]{_id,_type}[0]
    )
  }[0]
  `;

const postFields = groq`
_id,
title,
slug,
"author": author->{
  name,
  jobTitle,
  slug,
  "image": image{
    "asset": asset-> {
      url
    },
  },
  socialHandles {
    twitter,
    github,
    website,
  },
  "bioRaw":bio,
},
description,
publishedAt,
"updatedAt": _updatedAt,
body,
"tags": tags[]-> {_id, title},
"coverImage": cover.asset->url,
"cover": {
    "asset": cover.asset->
  }
`;

const tagFields = groq`
title, "slug": slug.current, _id, featured, rank,
  "bg-image": image.asset->url,
  "icon":icon{
    name,
    provider
  }
  "categories": category[]->{_id,  title}`;
const postSlugsQuery = groq`*[_type == "post"]{_id, "slug": slug.current}`;
const singlePostBySlug = groq`*[_type == "post" && slug.current == $slug] {${postFields}}`;
const singleDraftPostBySlug = groq`*[_type == "post" && slug.current == $slug && (_id in path("drafts.**"))] {${postFields}}`;

const postsQuery = groq`*[_type == "post"] {${postFields}}`;

const categoriesQuery = groq`*[_type == "category" ] {
  title,
  _id,
  "tags": *[ _type == "tag" && references(^._id) ]{ title, _id, featured, rank }
}`;

const tagsByCategoryId = groq`*[_type == "tag" && category[]._ref == $categoryId]{
  title,
  _id,
}`;

const tagQuery = groq`*[_type == "tag"] {${tagFields}}`;

const jamsByTag = groq`*[_type == "tag" && title == $title]{
  title,
  "jams": *[_type == "post" && references(^._id) && !(_id in path('drafts.**'))]._id
}`;
const jamsByTagSlug = groq`*[_type == "tag" && slug.current == $slug]{
  title, "slug": slug.current, _id, featured, rank,
  "bg-image": image.asset->url,
  "icon":icon{
    name,
    provider
  },
  "jams": *[_type == "post" && references(^._id) && !(_id in path('drafts.**'))]._id
}`;

/**
 * Query will ONLY return draft post by specfic _id
 */
export const queryDraftPostBody = groq`*[_type == "post" && _id == $postId && (_id in path("drafts.**"))].body`;
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
 * passing `true` will return post that is in 'draft'
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
 * Get Jams by tag title that are published.
 * @param {String} title tag title
 * @returns results[] w/ jam
 */
export async function postsByTag(title, n = 3) {
  const data = await client.fetch(jamsByTag, { title });
  return (
    data[0]?.jams.sort(() => Math.random() - Math.random()).slice(0, n) || []
  );
}

/**
 * Get Jams by tag slug that are published
 * @param {String} slug generated & associated to tag
 * @returns results [] w/ jam ids
 */
export async function postsByTagSlug(slug) {
  const data = await client.fetch(jamsByTagSlug, { slug });
  const { jams, ...tag } = data[0] || {};
  return { jamIds: jams, tag };
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

export async function workflowById(id, type = 'workflow.metadata') {
  const data = await getClient(true).fetch(postWorkflowByID, {
    id,
    type,
  });
  return data;
}

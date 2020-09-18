import client, { previewClient } from './sanity';

const postsQuery = `*[_type == "post"]{_id, "slug": slug.current}`;
// query by unique slug as a param
const singlePostBySlug = `*[_type == "post" && slug.current == $slug] {
  _id,
  title,
  "slug": slug.current,
  author-> {
  name
  },
  codeSandbox,
	_updatedAt,
  body,
  "tags": tags[]-> title
}
`;

const categoriesQuery = `*[_type == "category" ] {
  title,
  _id
}`;

const tagsByCategoryId = `*[_type == "tag" && category[]._ref == $categoryId]{
  title,
  _id
}`;

/**
 *
 * @param {boolean} preview uses a read access token to make fetch requests
 * to Sanity for rendering drafts before they are published publicly
 */
const getClient = (preview) => (preview ? previewClient : client);

export async function getPostBySlug(slug, preview = false) {
  const data = await getClient(preview).fetch(singlePostBySlug, { slug });
  return data[0];
}

export async function getPreviewPostBySlug(slug) {
  const data = await getClient(true).fetch(singlePostBySlug, { slug });
  return data[0];
}

export async function getAllPostsWithSlug(preview = false) {
  const data = await client(preview).fetch(postsQuery);
  return data;
}

export async function categories(preview = false) {
  const data = await getClient(preview).fetch(categoriesQuery);
  return data;
}

export async function tagsByCategory(id, preview = false) {
  const data = await getClient(preview).fetch(tagsByCategoryId, {
    categoryId: id,
  });
  return data;
}

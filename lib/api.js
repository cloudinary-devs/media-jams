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
	_updatedAt,
body
}
`;

const getClient = (preview) => (preview ? previewClient : client);

export async function getPostBySlug(slug, preview = false) {
  const data = await getClient(preview).fetch(singlePostBySlug, { slug });
  return data[0];
}

export async function getPreviewPostBySlug(slug) {
  const data = await getClient(true).fetch(singlePostBySlug, { slug });
  return data[0];
}

export async function getAllPostsWithSlug() {
  const data = await client.fetch(postsQuery);
  return data;
}

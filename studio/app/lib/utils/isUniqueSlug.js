import sanityClient from 'part:@sanity/base/client';

const client = sanityClient.withConfig({ apiVersion: '2019-05-28' });

// Note: this assumes that every document that has a slug field
// have it on the `slug` field at the root
export function isUniqueSlug(slug, options) {
  const { document } = options;

  const id = document._id.replace(/^drafts\./, '');
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  };

  const query = `!defined(*[!(_id in [$draft, $published]) && slug.current == $slug][0]._id)`;

  return client.fetch(query, params);
}

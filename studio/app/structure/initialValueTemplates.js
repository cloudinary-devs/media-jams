/**
 * Learn more about initial values on https://www.sanity.io/docs/initial-value-templates-api
 * https://www.sanity.io/docs/initial-value-templates#resolving-initial-values-asyncronously-ebf7bda4492b
 */
import T from '@sanity/base/initial-value-template-builder';

export default [
  ...T.defaults(),
  T.template({
    id: 'post-by-author',
    title: 'Post by author',
    description: 'Posts by a specific author',
    schemaType: 'post',
    parameters: [{ type: 'string' }],
    value: {
      type: type,
    },
  }),
];

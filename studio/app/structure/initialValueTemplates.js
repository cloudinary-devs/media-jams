/**
 * Learn more about initial values on https://www.sanity.io/docs/initial-value-templates-api
 * https://www.sanity.io/docs/initial-value-templates#resolving-initial-values-asyncronously-ebf7bda4492b
 */
import T from '@sanity/base/initial-value-template-builder';
import userStore from 'part:@sanity/base/user';

const postByAuthor = {
  title: 'Post by Author',
  id: 'post-by-author',
  description: 'Post by a specific author',
  schemaType: 'post',
  name: 'post-by-author',
  value: async () => {
    const { id } = await userStore.getUser('me');
    const self = `${id}-self`;
    return {
      author: {
        _ref: self,
        _type: 'reference',
      },
      postMetadata: {
        _type: 'postMetadata',
        featured: false,
        paid_content: false,
      },
    };
  },
};

const defaults = T.defaults();
export default [T.template(postByAuthor), ...defaults];

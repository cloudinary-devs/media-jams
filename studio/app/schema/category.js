import categoryTags from '../components/categoryTags';

/**
 * Defines a Category, a group of tags
 * @typedef {Object} Category
 * @property {Object} category
 * @property {string} category.title - category name
 * @property {string} category.description - details of grouping
 * @property {Tag[]} category.tags - reference to child tags
 */
export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      inputComponent: categoryTags,
      of: [{ type: 'string' }],
    },
  ],
};

/**
 * Defines a Tag, belongs to  specific  categories
 * @typedef {Object} Tag
 * @property {Object} tag
 * @property {string} tag.title - tag name
 * @property {string} tag.description - details of what the tag is for
 * @property {Category[]} tag.category - reference to child tags
 */
export default {
  name: 'tag',
  title: 'Tag',
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
      title: 'Category',
      name: 'category',
      type: 'array',
      validation: (Rule) => Rule.required().min(1), // require at least 1 category for a tag
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
        },
      ],
    },
  ],
};

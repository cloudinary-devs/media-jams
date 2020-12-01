import { getDocumentQuery$ } from '../lib/document';

const WORKFLOW_DOCUMENTS_QUERY = `
*[_type == $type ].title 
`;
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
      name: 'rank',
      title: 'Ranking',
      description:
        'Weighted value of a tag when searching, higher will appear more often',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(10),
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
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
      readOnly: false,
    },
  ],
  initialValue: async () => {
    // const response = await getDocumentQuery$(WORKFLOW_DOCUMENTS_QUERY, {
    //   type: 'category',
    // });
    return { rank: 1, featured: false };
  },
};

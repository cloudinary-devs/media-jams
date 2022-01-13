import preview from 'part:sanity-plugin-icon-picker/preview';

const WORKFLOW_DOCUMENTS_QUERY = `
*[_type == $type ].title 
`;
/**
 * Defines a Tag, belongs to  specific  categories
 * @typedef {Object} Tag
 * @property {Object} tag
 * @property {Obect} tag.icon - associated icon for frontend display
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
      title: 'Icon',
      name: 'icon',
      type: 'iconPicker',
      options: {
        providers: ['fa', 'hi'],
        outputFormat: 'react',
      },
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
      title: 'Background Image',
      name: 'image',
      type: 'image',
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
      weak: true,
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
  preview: {
    select: {
      title: 'title',
    },
    prepare(tag, icon, quantity, other) {
      const { title } = tag;
      return {
        title: title,
        media: preview(icon),
      };
    },
  },
};

/**
 * Defines an Author of Media Jams
 * @typedef {Object} Author
 * @property {Object} author
 * @property {string} author.name - display name of the author
 * @property {slug} author.Slug - unique value generated from the name
 * @property {Image} author.image - avatar of the author's choosing
 * @property {string} author.bio - short about the author
 */
export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  __experimental_actions: ['create', 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'jobTitle',
      title: 'Job Title',
      type: 'string',
      description: 'What would you say you do?',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'socialHandles',
      type: 'socialHandles',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
};

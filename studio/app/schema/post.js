/**
 * Defines a Media Jam
 * @typedef {Object} Post
 * @property {Object} post
 * @property {string} post.Title - title of media jam
 * @property {slug} post.Slug - unique value generated from the title
 * @property {Object} post.Author - reference to Auther
 * @property {boolean} post.featured - to flag an article as featured for specific styling or display
 * @property {string} post.CodeSandbox - url to code sample related to media jam
 * @property {string[]} post.Tags - reference to Tag. One to many relationship
 * @property {string[]} post.Categories - reference to Categories. One to many relationship
 * @property {datetime} post.publishedAt - date media jam is published
 * @property {markdown} post.body - content of media supporting markdown
 */
export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) =>
        Rule.max(50).warning('Shorter titles are usually better'),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      readOnly: true,
      to: { type: 'author' },
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      readOnly: true,
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [{ type: 'reference', to: { type: 'tag' } }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'markdown',
      options: {
        minRows: 20,
      },
    },
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
};

import autoCompleteTags from '../components/autoCompleteTags';
export default {
  name: 'group',
  title: 'Group',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      inputComponent: autoCompleteTags,
      of: [{ type: 'reference', to: { type: 'tag' } }],
    },
  ],
};

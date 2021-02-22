import adminConditional from '../../components/adminConditional';

export default {
  name: 'postMetadata',
  title: 'Post Metadata',
  type: 'object',
  inputComponent: adminConditional,
  fields: [
    {
      title: 'Featured',
      name: 'featured',
      type: 'boolean',
    },
    {
      title: 'Paid Content',
      name: 'paid_content',
      type: 'boolean',
    },
  ],
};

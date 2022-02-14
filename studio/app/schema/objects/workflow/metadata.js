export default {
  type: 'document',
  name: 'workflow.metadata',
  title: 'Workflow metadata',
  fields: [
    { type: 'string', name: 'state', title: 'State' },
    { type: 'string', name: 'documentId', title: 'Document ID' },
  ],
  liveEdit: true,
};

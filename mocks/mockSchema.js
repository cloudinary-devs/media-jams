export const tagsSchema = {
  _id: '{{random.uuid}}',
  description: '{{lorem.sentence}}',
  feature: '{{dataType.boolean}}',
  rank: 1,
  category: [
    {
      _id: '{{random.uuid}}',
      title: 'Frameworks',
    },
  ],
};

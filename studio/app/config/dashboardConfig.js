import { getCurrentUser$ } from '../lib/user';
const { id } = getCurrentUser$();
export default {
  widgets: [
    {
      name: 'sanity-tutorials',
    },
    {
      name: 'airtable-list',
    },
    {
      name: 'document-list',
      options: {
        title: 'My Jams',
        query: '*[_type == $type && author._ref == $authorId]',
        queryParams: {
          type: 'post',
          authorId: `${id}-self`,
        },
      },
    },
  ],
};

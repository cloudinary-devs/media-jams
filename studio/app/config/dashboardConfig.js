import { getCurrentUser$ } from '../lib/user';
const { id } = getCurrentUser$();
export default {
  widgets: [
    {
      name: 'sanity-tutorials',
    },
    {
      name: 'dashboard-image-upload',
      options: {
        title: 'Image Upload',
        createButtonText: 'Add Image',
      },
      layout: {
        width: 'medium',
        height: 'small',
      },
    },
    {
      name: 'my-jams-list',
      layout: {
        width: 'medium',
        height: 'medium',
      },
      options: {
        title: 'My Jams',
        createButtonText: 'Create new Jam',
        types: ['post'],
      },
    },
  ],
};

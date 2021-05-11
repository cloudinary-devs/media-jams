import { getCurrentUser$ } from '../lib/user';
const { id } = getCurrentUser$();
export default {
  widgets: [
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
    {
      name: 'tags-count',
      layout: {
        width: 'auto',
        height: 'medium',
      },
      options: {
        title: 'My Jams',
        createButtonText: 'Create new Jam',
      },
    },
  ],
};

/**
 * Learn more about initial values on https://www.sanity.io/docs/initial-value-templates-api
 */
import T from '@sanity/base/initial-value-template-builder';
import userStore from 'part:@sanity/base/user';

export default [
  ...T.defaults(),
  T.template({
    id: 'author-jam',
    title: 'New Jam',
    schemaType: 'post',
    parameters: [{ name: 'authorId', type: 'string' }],
    value: async () => {
      const { name, id } = await userStore.getUser('me');
      return {
        id: `${id}.`,
        author: {
          name,
          id,
          _type: 'user',
        },
      };
    },
  }),
];

//  export default {
//    ...T.defaults,
//    T.template({
//      title: 'New Post',
//      schemaType: 'post',
//      value: async () => {
//        const {name, id} = await userStore.getUser('me')
//        return {
//          id: `${id}.`,
//          author: {
//            name,
//            id,
//            _type: 'user'
//          },
//        }
//      }
//    })
//  }

/*
 Shape of the user object from userStore.getUser('me'):
 {
   "id": "<user-id>",
   "name": "Your Name",
   "email": "your@email.com",
   "profileImage": "https://url.to.loginprovider/image",
   "role": "<project-role>",
 }
 */

require('dotenv').config({ path: './.env.development' }); //loaded from .env.development
const r2 = require('r2');

/**
 * Adding access to stage data set.
 * After generating a user through auth0,
 * Prefix `e-` to the id of your new user,
 * Ensure your `.env.development` is set to "stage" for SANITY_STUDIO_API_DATASET
 * Then add them to the 'creator' or 'moderator' array of members below
 * TODO: create a sync script to fetch all members from production and update members on stage
 */

// const mutations = [
//   {
//     createOrReplace: {
//       _id: '_.groups.creator',
//       _type: 'system.group',
//       grants: [
//         {
//           filter: "_type == 'post'",
//           permissions: ['read', 'update', 'create'],
//         },
//         {
//           filter: "_type == 'workflow.metadata'",
//           permissions: ['read', 'update', 'create'],
//         },
//         {
//           filter: "_type == 'tag'",
//           permissions: ['read'],
//         },
//         {
//           filter: "_type == 'category'",
//           permissions: ['read'],
//         },
//         {
//           filter: "_type == 'author'",
//           permissions: ['read', 'update', 'create'],
//         },
//         {
//           filter: '_id in path("**")',
//           permissions: ['read', 'create', 'update'],
//         },
//         {
//           path: 'drafts.**',
//           permissions: ['read'],
//         },
//       ],
//       members: [
//         'e-a5ce59720555a32a37fc4b93a30bfed0',
//         'e-11f130d2d23ffb63950957c0831e8762',
//         'e-5369fe0e1fd16b4055e3772820d56f1f',
//         'e-39f2223a237d3ce5eeb9c2d316a22351',
//       ], //jtomchak@gmail.com
//     },
//   },
//   {
//     createOrReplace: {
//       _id: '_.groups.moderator',
//       _type: 'system.group',
//       grants: [
//         {
//           filter: '_id in path("**")',
//           permissions: ['create', 'update', 'read', 'editHistory', 'history'],
//         },
//       ],
//       members: [
//         'e-093e43c0f098447a554b0ba08f0a4c92',
//         'e-5369fe0e1fd16b4055e3772820d56f1f',
//         'e-1ce8d42c0f8988a83fe2529c25bfdf3f',
//         'e-28e5c40c39fd1d448cb08a2afc57454c',
//       ],
//     },
//   },
// ];

// const mutations = [
//   {
//     patch: {
//       id: '_.groups.moderator',
//       insert: {
//         after: 'grants[-1]',
//         items: [
//           {
//             path: 'drafts.**',
//             permissions: ['create', 'update', 'read'],
//           },
//         ],
//       },
//     },
//   },
// ];

const updateAccess = async () => {
  try {
    const response = await r2.post(
      `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/${process.env.SANITY_STUDIO_API_DATASET}`,
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${process.env.CREATE_SESSION_TOKEN}`,
        },
        body: JSON.stringify({ mutations }),
      },
    ).json;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

updateAccess();

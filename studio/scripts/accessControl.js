require('dotenv').config({ path: './.env.production' }); //loaded from .env.development
const r2 = require('r2');

/**
 * Adding access to stage data set.
 * After generating a user through auth0,
 * Prefix `e-` to the id of your new user,
 * Ensure your `.env.development` is set to "stage" for SANITY_STUDIO_API_DATASET
 * Then add them to the 'creator' or 'moderator' array of members below
 * TODO: create a sync script to fetch all members from production and update members on stage
 */
const mutations = [
  {
    patch: {
      id: `_.groups.creator`,
      insert: {
        after: 'members[-1]',
        items: [`e-608869859419f40069d7fa47`],
      },
    },
  },
];

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
//           permissions: ['create', 'update', 'read'],
//         },
//       ],
//       members: [
//         'e-5f8a2ac9edc64a00681eb8ab',
//         'e-5f88a51450e8ee007814d5e0',
//         'e-60354e32ba3535006813ce00',
//         'e-6037ff5847033100712f6364',
//         'e-60380029c15b1e0069aeabc8',
//         'e-603d76165de8d30068f3fbd6',
//         'e-5f9714d15dda650077be4f83',
//         'e-603fc5c4e6c0b4006873832e',
//         'e-603fc597e6c0b400687382c2',
//         'e-5fad5ece80a1ef006f42d70e',
//         'e-603fc55d218a650069f5228b',
//         'e-603fc4c5464f430069ebf05f',
//         'e-603fc45fe6c0b4006873802f',
//         'e-5f8a32648e36ac0069e79fb5',
//         'e-5f8a321de7bf55006fde9dc3',
//         'e-6050eb0636174b00688e66be',
//         'e-5fad5e521a30af006f363cd5',
//         'e-605901f1fc3b7d0070b4fb08',
//         'e-6050ebe5fc4f80006ab1b4a0',
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
//         'e-5f80acaf5907aa0068f59a19',
//         'e-5f88a51450e8ee007814d5e0',
//         'e-603d758de6c0b400686fd8c9',
//         'e-603d76165de8d30068f3fbd6',
//         'e-603fc5fe218a650069f52411',
//         'e-603d75c6c59ab3006929a6b7',
//         'e-5f8a321de7bf55006fde9dc3',
//         'e-5f8a32648e36ac0069e79fb5',
//         'e-6050eb0636174b00688e66be',
//       ],
//     },
//   },
// ];

// const mutations = [
//   {
//     patch: {
//       id: '_.groups.creator',
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

require('dotenv').config(); //loaded from .env.sample
const r2 = require('r2');

const mutations = [
  {
    createOrReplace: {
      _id: '_.groups.creator',
      _type: 'system.group',
      grants: [
        {
          filter: "_type == 'post'",
          permissions: ['read', 'update', 'create'],
        },
        {
          filter: "_type == 'workflow.metadata'",
          permissions: ['read', 'update', 'create'],
        },
        {
          filter: "_type == 'author'",
          permissions: ['read', 'update', 'create'],
        },
        {
          filter: '_id in path("**")',
          permissions: ['read', 'history'],
        },
      ],
      members: ['pMVNYTrk5', 'po38b98q1'], //jtomchak@gmail.com
    },
  },
];

const updateAccess = async () => {
  try {
    const response = await r2.post(
      `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/${process.env.SANITY_DATASET}`,
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

function authByRole(user, context, callback) {
  const axios = require('axios@0.19.2');
  var queryRoles = {
    method: 'get',
    url:
      'https://5ad74sb4.api.sanity.io/v1/data/query/production?query=*%5B_id%20%3D%3D%20%22_.groups.creator%22%5D.members&%24userId=%22pMVNYTrk5.self%22&%24type=%22post%22',
    headers: {
      Authorization: 'Bearer <AUTH_TOKEN>',
    },
  };
  const data = {
    mutations: [
      {
        patch: {
          id: '_.groups.creator',
          insert: {
            after: 'members[-1]',
            items: [`e-${user._id}`],
          },
        },
      },
    ],
  };
  var mutationRoles = {
    method: 'post',
    url: 'https://5ad74sb4.api.sanity.io/v1/data/mutate/production',
    headers: {
      Authorization: 'Bearer <AUTH_TOKEN>',
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  };
  //Check user roles for 'Creator'
  const updateSanityRole = async () => {
    if (context.idToken['https://mediajams-studio/roles'].includes('Creator')) {
      try {
        const response = await axios(queryRoles);
        // Check return for user's id prefixed with 'e'
        // update w/ mutation if needed
        if (!response.data.result[0].includes(`e-${user._id}`)) {
          await axios(mutationRoles);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  updateSanityRole();
  return callback(null, user, context);
}

function authByRole(user, context, callback) {
  const axios = require('axios@0.19.2');
  const role = {
    MODERATOR: 'moderator',
    CREATOR: 'creator',
  };
  var queryRoles = (role) => ({
    method: 'get',
    url: `https://5ad74sb4.api.sanity.io/v1/data/query/production?query=*%5B%20%20_id%20%3D%3D%20%22_.groups.${role}%22%5D.members`,
    headers: {
      Authorization: 'Bearer <AUTH_TOKEN>',
    },
  });
  const data = (role) => ({
    mutations: [
      {
        patch: {
          id: `_.groups.${role}`,
          insert: {
            after: 'members[-1]',
            items: [`e-${user._id}`],
          },
        },
      },
    ],
  });
  var mutationRole = (data) => ({
    method: 'post',
    url: 'https://5ad74sb4.api.sanity.io/v1/data/mutate/production',
    headers: {
      Authorization: 'Bearer <AUTH_TOKEN>',
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  });
  //Check user roles for 'administrator' or 'creator'
  const updateSanityRole = async () => {
    /**
     * User has an moderator role
     */
    if (
      context.idToken['https://mediajams-studio/roles'].includes(role.MODERATOR)
    ) {
      try {
        const response = await axios(queryRoles(role.MODERATOR));
        // Check return for user's id prefixed with 'e'
        // update w/ mutation if needed
        if (!response.data.result[0].includes(`e-${user._id}`)) {
          await axios(mutationRole(data(role.MODERATOR)));
          return;
        }
      } catch (err) {
        console.log(err);
      }
    }

    /**
     * User has a creator role
     */
    if (
      context.idToken['https://mediajams-studio/roles'].includes(role.CREATOR)
    ) {
      try {
        const response = await axios(queryRoles(role.CREATOR));
        // Check return for user's id prefixed with 'e'
        // update w/ mutation if needed
        if (!response.data.result[0].includes(`e-${user._id}`)) {
          await axios(mutationRole(data(role.CREATOR)));
          return;
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  updateSanityRole();
  return callback(null, user, context);
}

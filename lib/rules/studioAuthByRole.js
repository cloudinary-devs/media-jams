function authByRole(user, context, callback) {
  const dataSet = 'production';
  // Sanity can't have special chars
  // drop the auth0| prefix
  const userID = user.user_id.substring(6);
  console.log('USERID>>>>', userID);
  const axios = require('axios@0.19.2');
  const role = {
    MODERATOR: 'moderator',
    CREATOR: 'creator',
  };
  var queryRoles = (role) => ({
    method: 'get',
    url: `https://5ad74sb4.api.sanity.io/v1/data/query/${dataSet}?query=*%5B%20%20_id%20%3D%3D%20%22_.groups.${role}%22%5D.members`,
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
            items: [`e-${userID}`],
          },
        },
      },
    ],
  });
  var mutationRole = (data) => ({
    method: 'post',
    url: `https://5ad74sb4.api.sanity.io/v1/data/mutate/${dataSet}`,
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
    console.log(context.idToken['https://mediajams-studio'].roles);
    if (
      context.idToken['https://mediajams-studio'].roles.includes(role.MODERATOR)
    ) {
      try {
        const response = await axios(queryRoles(role.MODERATOR));
        // Check return for user's id prefixed with 'e'
        // update w/ mutation if needed
        console.log('result>>>>>> ', response.data.result[0]);
        if (!response.data.result[0].includes(`e-${userID}`)) {
          await axios(mutationRole(data(role.MODERATOR)));
        }
      } catch (err) {
        console.log(err);
      }
    }

    /**
     * User has a creator role
     */
    if (
      context.idToken['https://mediajams-studio'].roles.includes(role.CREATOR)
    ) {
      try {
        const response = await axios(queryRoles(role.CREATOR));
        // Check return for user's id prefixed with 'e'
        // update w/ mutation if needed
        console.log(response.data.result[0]);
        if (!response.data.result[0].includes(`e-${userID}`)) {
          await axios(mutationRole(data(role.CREATOR)));
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Check for presents of studio url property on idToken
  // assigned in `Append User Role` Rule
  if (context.idToken['https://mediajams-studio']?.roles) {
    updateSanityRole();
  }
  return callback(null, user, context);
}

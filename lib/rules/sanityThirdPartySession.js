function sanityThirdPartySession(user, context, callback) {
  const axios = require('axios@0.19.2');
  const role = {
    MODERATOR: 'moderator',
    CREATOR: 'creator',
  };
  const userData = (role) => ({
    userId: `e-${user._id}`,
    userFullName: user.nickname,
    userEmail: user.email,
    userRole: role === roles.MODERATOR ? 'administrator' : 'editor',
    userImage: user.picture,
  });
  const sessionQuery = (data) => ({
    method: 'post',
    url: 'https://5ad74sb4.api.sanity.io/v1/auth/thirdParty/session',
    headers: {
      Authorization: 'Bearer <>',
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  });

  const generateSanitySession = async () => {
    const assignedRoles = context.idToken['https://mediajams-studio/roles'];
    const userRole = assignedRoles.includes(roles.MODERATOR)
      ? roles.MODERATOR
      : assignedRoles.includes(roles.CREATOR)
      ? roles.CREATOR
      : null;
    if (!userRole) return;
    try {
      const response = await axios(sessionQuery(userData(userRole)));
      context.idToken['https://mediajams-studio/claimUrl'] =
        response.data.endUserClaimUrl;
      context.accessToken['https://mediajams-studio/claimUrl'] =
        response.data.endUserClaimUrl;
      return callback(null, user, context);
    } catch (err) {
      console.log(err);
    }
  };

  generateSanitySession();
}

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
    userRole: role === role.MODERATOR ? 'administrator' : 'editor',
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
    const userRole = assignedRoles.includes(role.MODERATOR)
      ? role.MODERATOR
      : assignedRoles.includes(role.CREATOR)
        ? role.CREATOR
        : null;
    if (!userRole) return;
    try {
      const response = await axios(sessionQuery(userData(userRole)));
      // Append Snaity Studio Session Claim URL to context
      context.idToken['https://mediajams-studio/claimUrl'] =
        response.data.endUserClaimUrl;
      context.accessToken['https://mediajams-studio/claimUrl'] =
        response.data.endUserClaimUrl;
      // Append Sanity Studio Token to content
      context.idToken['https://mediajams-studio/token'] = response.data.token;
      context.accessToken['https://mediajams-studio/token'] =
        response.data.token;
      return callback(null, user, context);
    } catch (err) {
      console.log(err);
    }
  };

  // Check for presents of studio url property on idToken
  // assigned in `Append User Role` Rule
  if (context.idToken['https://mediajams-studio']) {
    generateSanitySession();
  }
}

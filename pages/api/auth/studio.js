import fetch from 'isomorphic-unfetch';
import auth0 from '@lib/auth0';
import { initSentry, sentryHandler } from '@lib/sentry';
//initialize Sentry
initSentry();

const sanityURL = 'https://5ad74sb4.api.sanity.io/v1/auth/thirdParty/session';
const role = {
  MODERATOR: 'moderator',
  CREATOR: 'creator',
};
// Strip the auth0 prefix for Sanity Studio Sessions
const userData = (user, role) => ({
  userId: `e-${user.sub.substring(6)}`,
  userFullName: user.nickname,
  userEmail: user.email,
  userRole: role === role.MODERATOR ? 'administrator' : 'editor',
  userImage: user.picture,
});
const studioURL =
  process.env.VERCEL_ENV === 'production'
    ? 'https://studio.mediajams.dev'
    : 'https://stage-studio.mediajams.dev';

const sessionQuery = (data) => ({
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.SANITY_SESSION_ROBOT}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});
export const generateSanitySession = async (user) => {
  const assignedRoles = user['https://mediajams-studio'].roles;
  const userRole = assignedRoles.includes(role.MODERATOR)
    ? role.MODERATOR
    : assignedRoles.includes(role.CREATOR)
    ? role.CREATOR
    : null;
  if (!userRole) throw new Error('No roles for user.');
  const userDataResult = userData(user, userRole);
  try {
    const response = await fetch(sanityURL, sessionQuery(userDataResult));
    const session = response.ok ? await response.json() : null;
    return session;
  } catch (err) {
    throw err;
  }
};

const studioAuth = sentryHandler(async (req, res) => {
  try {
    const { user } = await auth0.getSession(req, res);
    const studioSession = await generateSanitySession(user);
    res.status(200).json({
      success: true,
      sanitySession: `${studioSession?.endUserClaimUrl}?origin=${
        process.env.NODE_ENV == 'production'
          ? studioURL
          : 'http://localhost:3333'
      }`,
    });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

export default studioAuth;

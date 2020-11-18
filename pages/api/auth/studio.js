import fetch from 'isomorphic-unfetch';
import auth0 from '@lib/auth0';

const studioURL = 'https://5ad74sb4.api.sanity.io/v1/auth/thirdParty/session';
const role = {
  MODERATOR: 'moderator',
  CREATOR: 'creator',
};
const userData = (user, role) => ({
  userId: `e-${user['https://mediajams-studio/user_id']}`,
  userFullName: user.nickname,
  userEmail: user.email,
  userRole: role === role.MODERATOR ? 'administrator' : 'editor',
  userImage: user.picture,
});
const sessionQuery = (data) => ({
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.SANITY_SESSION_ROBOT}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

const studioAuth = async (req, res) => {
  try {
    const { user } = await auth0.getSession(req);
    const studioSession = await generateSanitySession(user);
    res.status(200).json({ success: true, studioSession });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const generateSanitySession = async (user) => {
  const assignedRoles = user['https://mediajams-studio/roles'];
  const userRole = assignedRoles.includes(role.MODERATOR)
    ? role.MODERATOR
    : assignedRoles.includes(role.CREATOR)
    ? role.CREATOR
    : null;
  if (!userRole) throw new Error('No roles for user.');
  try {
    const response = await fetch(
      studioURL,
      sessionQuery(userData(user, userRole)),
    );
    const session = response.ok ? await response.json() : null;
    return session;
  } catch (err) {
    throw err;
  }
};

export default studioAuth;

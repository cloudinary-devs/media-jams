/**
 * baseUrl : process.env.AUTH0_DOMAIN
 *
 */
const baseURL = 'https://media-jams.us.auth0.com';

/**
 *
 * @returns Machine Access Token that is short lived
 */
const featchAccessToken = async () => {
  const result = await fetch(`${baseURL}/oauth/token`, {
    method: 'POST',
    headers: { 'content-type': ' application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
      client_secret: process.env.AUTH0_MANAGMENT_CLIENT_SECRET,
      audience: `${baseURL}/api/v2/`,
    }),
  }).then((res) => res.json());

  return result;
};

/**
 *
 * @param {String} id unique id of user from auth0
 * @returns email address of user as String
 */
export async function creatorEmail(id) {
  const url = `${baseURL}/api/v2/users/auth0%7C${id}?fields=email&include_fields=true`;
  const tk = await featchAccessToken();
  const creator = await fetch(url, {
    headers: {
      Authorization: `Bearer ${tk.access_token}`,
    },
  }).then((res) => res.json());
  return creator.email;
}

/**
 * https://media-jams.us.auth0.com/api/v2/roles/rol_ErF1oycslqHRnFGq/users?include_totals=true
 * @returns
 */
export async function getModoratorEmails() {
  const url = `${baseURL}/api/v2/roles/rol_ErF1oycslqHRnFGq/users?include_totals=true`;
  const tk = await featchAccessToken();
  const modorators = await fetch(url, {
    headers: {
      Authorization: `Bearer ${tk.access_token}`,
    },
  }).then((res) => res.json());
  return modorators.users.map((user) => user.email);
}

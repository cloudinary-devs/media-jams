/**
 * baseUrl : process.env.AUTH0_DOMAIN
 *
 */
const baseURL = 'https://media-jams.us.auth0.com';

/**
 *
 * @returns Machine Access Token that is short lived
 */
const fetchAccessToken = async () => {
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
  const tk = await fetchAccessToken();
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
  const tk = await fetchAccessToken();
  const modorators = await fetch(url, {
    headers: {
      Authorization: `Bearer ${tk.access_token}`,
    },
  }).then((res) => res.json());
  // transform users to Array<Object> of only {email: user.email}
  return modorators.users.map(({ email }) => ({ email }));
}

export async function checkAuthCredentials(email, password) {
  const baseUrl = 'https://media-jams.us.auth0.com';
  var urlencoded = new URLSearchParams();
  urlencoded.append('grant_type', 'password');
  urlencoded.append('username', email);
  urlencoded.append('password', password);
  urlencoded.append('audience', process.env.AUTH0_AUDIENCE);
  urlencoded.append('scope', 'openid profile email');
  urlencoded.append('client_id', process.env.AUTH0_CLIENT_ID);
  urlencoded.append('client_secret', process.env.AUTH0_CLIENT_SECRET);

  const res = await fetch(`${baseUrl}/oauth/token`, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: urlencoded,
  });

  return res;
}

export async function updateUserProfilePicture(picture, userId) {
  const url = `${baseURL}/api/v2/users/${encodeURIComponent(userId)}`;
  const tk = await fetchAccessToken();

  const prepareForFetch = JSON.stringify({ picture });

  let res = await fetch(url, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${tk.access_token}`,
      'content-type': 'application/json',
    },
    body: prepareForFetch,
  });

  return res;
}

export async function updateUserSettings(name, email, picture, userId) {
  const url = `${baseURL}/api/v2/users/${encodeURIComponent(userId)}`;
  const tk = await fetchAccessToken();

  const prepareForFetch = JSON.stringify({ email, name, picture });

  let res = await fetch(url, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${tk.access_token}`,
      'content-type': 'application/json',
    },
    body: prepareForFetch,
  });

  return res;
}

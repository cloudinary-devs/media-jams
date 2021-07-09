import { changeUserEmail } from '@lib/auth0Management';

/* 

First we'll need to accept the `POST` from the form 
Once we have the user's credentials { email, newEmail, password }
We need to send through the password to the "Resource Owner Password Flow" -- https://auth0.com/docs/flows/call-your-api-using-resource-owner-password-flow?_ga=2.88185949.775239198.1625812263-1582869543.1625697544&_gl=1*1y8w437*rollup_ga*MTU4Mjg2OTU0My4xNjI1Njk3NTQ0*rollup_ga_F1G3E656YZ*MTYyNTgxMjIwNy4zLjEuMTYyNTgxNTU1My42MA.. 
If that succeeds, we allow the change of email 
If it fails, can we find out if it was a wrong password to let the user know? Does this matter?
audience: process.env.AUTH0_AUDIENCE,
      scope: 'read:sample',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
*/

async function checkAuthCredentials(email, password) {
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

export default async function handler(req, res) {
  const { body, method } = req;

  const authResponse = await checkAuthCredentials(body.email, body.password);
  const result = await authResponse.json();

  console.log(result);

  res.send(result);
}

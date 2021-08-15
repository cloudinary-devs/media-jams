export default async function handler(req, res) {
  const { body } = req;

  const { email } = JSON.parse(body);

  await fetch('https://media-jams.us.auth0.com/dbconnections/change_password', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.AUTH0_CLIENT_ID,
      email,
      connection: 'Username-Password-Authentication',
    }),
  });

  res.send(200);
}

import { updateUserSettings, checkAuthCredentials } from '@lib/auth0Management';

export default async function handler(req, res) {
  const { body } = req;

  const { email, password, userId, name, picture } = JSON.parse(body);

  const authResponse = await checkAuthCredentials(email, password);
  const authResult = await authResponse.json();

  const token = authResult.access_token;

  if (authResult.hasOwnProperty('error')) {
    res.status(401).send(authResult);
  } else {
    const updatedUser = await updateUserSettings(
      name,
      email,
      picture,
      userId,
      token,
    );
    res.send(updatedUser);
  }
}

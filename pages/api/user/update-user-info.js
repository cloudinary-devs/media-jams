import { updateUserSettings } from '@lib/auth0Management';

export default async function handler(req, res) {
  const { body } = req;

  const { email, userId, name, picture } = JSON.parse(body);

  const updatedUser = await updateUserSettings(name, email, picture, userId);

  res.send(updatedUser.status);
}

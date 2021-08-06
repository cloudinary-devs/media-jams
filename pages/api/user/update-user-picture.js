import { updateUserProfilePicture } from '@lib/auth0Management';

export default async function handler(req, res) {
  const { body } = req;

  const { userId, picture } = JSON.parse(body);

  const updatedUser = await updateUserProfilePicture(picture, userId);

  res.send(updatedUser.status);
}

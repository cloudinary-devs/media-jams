import { workflowById } from '@lib/api';
/**
 * Webhook steps
 * get id's for created and groq to notifiy author and moderators
 * get id's for updated, groq and state == 'changesRequests' to author, 'inReview' to moderators
 */
/**
 *
 * @param {*} req
 * @param {*} res
 */
const handler = (req, res) => {
  const { method, body } = req;
  // Only allow POST requests
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
  console.log(body);
  return res.status(200).json({ status: 'success' });
};

export default handler;

// import { workflowById } from '@lib/api';
const NOTIFICATION = {
  created: 'created',
  updated: 'updated',
  deleted: 'deleted',
  all: 'all',
};
/**
 * Webhook steps
 * get id's for created and groq to notifiy author and moderators
 * get id's for updated, groq and state == 'changesRequests' to author, 'inReview' to moderators
 */
function notification({ ids }) {
  if (ids) {
    Object.entries(ids).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
  }
}
/**
 *
 * @param {*} req
 * @param {*} res
 */
const handler = async (req, res) => {
  const { method, body } = req;
  // Only allow POST requests
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
  notification(body);
  // auto return 200 for incoming requests
  return res.status(200).json({ status: 'success' });
};

export default handler;

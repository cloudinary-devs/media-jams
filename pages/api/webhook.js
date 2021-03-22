import { workflowById } from '@lib/api';
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
async function fetchWorkflowDetails({ ids }) {
  if (ids) {
    const results = await Promise.all(
      Object.entries(ids)
        .filter(([key, value]) => value.length !== 0 && key !== 'all')
        .map(async ([key, value]) => {
          console.log(`${key}: ${value}`);
          console.log(value[0]);
          const workflow = await workflowById(value[0]);
          return { [key]: workflow };
        }),
    );

    return results;
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
  console.log('payload: ', body);
  const workflows = await fetchWorkflowDetails(body);
  console.log([...workflows]);
  // auto return 200 for incoming requests
  return res.status(200).json({ status: 'success' });
};

export default handler;

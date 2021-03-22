import { workflowById } from '@lib/api';
import { creatorEmail, getModoratorEmails } from '@lib/auth0Management';
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
 * https://media-jams.us.auth0.com/api/v2/roles/rol_ErF1oycslqHRnFGq/users?include_totals=true
 *
 */
function getModeratorEmailList() {}

/**
 * Strip CMS prefix and `self` from user ID
 *
 */
function getCreatorEmailBy(id) {
  const formatId = id.split('-')[1];
  return creatorEmail(formatId);
}

function sendWorkflowNotifications(workflows) {
  workflows?.map(async ([action, value]) => {
    switch (action) {
      case NOTIFICATION.updated:
        const email = await getCreatorEmailBy(value.author._id);
        const moderatorList = await getModoratorEmails();
        console.log(email, moderatorList);
        break;

      default:
        break;
    }
  });
}

/**
 *
 * @param {Object} param0 key value of document id's for created, deleted, updated, & all
 * @returns {Array<Object>} workflow details for id's  given
 * filter out 'all' as it is an aggregate of the other categories, empty arrays, as well as those id's
 * that are not preappended with 'workflow-metadata.'
 * then fetch details and return
 */
async function fetchWorkflowDetails({ ids }) {
  if (ids) {
    const results = await Promise.all(
      Object.entries(ids)
        .filter(
          ([key, value]) =>
            key !== 'all' &&
            value.length !== 0 &&
            value.filter((s) => s.startsWith('workflow-metadata.')),
        )
        .map(async ([key, value]) => {
          //TODO map to multiple id's
          const workflow = await workflowById(value[0]);
          return [key, workflow];
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
  const workflows = await fetchWorkflowDetails(body);
  //send workflow notifications based on workflow type
  sendWorkflowNotifications(workflows);
  // auto return 200 for incoming requests
  return res.status(200).json({ status: 'success' });
};

export default handler;

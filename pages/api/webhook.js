import { workflowById } from '@lib/api';
import { creatorEmail, getModoratorEmails } from '@lib/auth0Management';
import { sendNotification } from '@lib/sendGrid';
const NOTIFICATION = {
  created: 'created',
  updated: 'updated',
  deleted: 'deleted',
  all: 'all',
};

const JAM_STATE = {
  changesRequested: 'Changes Requested',
  inReview: 'In Review',
  approved: 'Approved',
  published: 'Published 🚀',
};
/**
 * Webhook steps
 * get id's for created and groq to notifiy author and moderators
 * get id's for updated, groq and state == 'changesRequests' to author, 'inReview' to moderators
 * https://media-jams.us.auth0.com/api/v2/roles/rol_ErF1oycslqHRnFGq/users?include_totals=true
 *
 */

/**
 * Strip CMS prefix and `self` from user ID
 *
 */
function getCreatorEmailBy(id) {
  const formatId = id.split('-')[1];
  return creatorEmail(formatId);
}

async function sendWorkflowNotifications([action, value]) {
  switch (action) {
    case NOTIFICATION.updated:
      const authorEmail = await getCreatorEmailBy(value.author._id);
      const moderators = await getModoratorEmails();
      const msgData = {
        authorEmail,
        templateName: 'authorNotification',
        authorName: value.author.name,
        moderators,
        workflowState: JAM_STATE[value.state],
        title: value.title,
      };
      //Notify Author and BCC Moderators
      if (value.state === 'approved' || value.state === 'inReview') {
        await sendNotification(msgData);
      }
      // Notify Author Only
      if (value.state === 'changesRequested' || value.state === 'published') {
        const { moderators, ...msgDataAuthorOnly } = msgData;
        await sendNotification(msgDataAuthorOnly);
      }
      break;

    default:
      break;
  }
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
  await Promise.all(workflows.map(sendWorkflowNotifications));
  // auto return 200 for incoming requests
  return res.status(200).json({ status: 'success' });
};

export default handler;

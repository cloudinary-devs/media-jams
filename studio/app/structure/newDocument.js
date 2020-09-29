import S from '@sanity/base/structure-builder';
import client from 'part:@sanity/base/client';
import userStore from 'part:@sanity/base/user';
import { filter, map, switchMap } from 'rxjs/operators';
import { getDocumentMutations$ } from '../lib/document';
import { getDocumentQuery$ } from '../lib/document';
import { getCurrentUser$ } from '../lib/user';

const CREATOR_TEMPLATES = ['post'];

// A groq query to find all access groups the current user is a member of. This
// includes both built in groups like 'administrator' and any custom groups you
// may have created as part of SSO etc.
const groupQuery = '* [_type == "system.group" && $identity in members] {_id}';

const newDocsByRole = async (docItem) => {
  //   const { name, id, role } = await userStore.getUser('me');
  client
    .fetch(groupQuery)
    // Convenience: Get the last portion of the group documents '_id' property,
    // since we'd like to just work with the string 'editors' instead of
    // '_.groups.editors'
    .then((docs) => docs.map((doc) => doc._id.split('.').pop()))
    .then((groupNames) => {
      console.log(groupNames);
      // groupNames now reflect the groups the current user is a member of

      // Build up an array of items depending on group membership. You may of
      // course do this completely different. This is just an example.
      if (groupNames.includes('administrator')) {
        // Add the items that administrators should see
        return docItem;
      }
      if (groupNames.includes('creator')) {
        // Add the doctypes that a creators should see to
        console.log(docItem);
        console.log(CREATOR_TEMPLATES.includes(docItem.spec.templateId));
        return CREATOR_TEMPLATES.includes(docItem.spec.templateId);
      }

      return false; //default do not include item
    })
    .catch(() => {
      // In case of any errors fetching the groups, just return some standard
      // structure. This will only happen if the query cannot be performed for
      // some reason.
      return docItem;
    });
};

/**
 * Currently unable to set this async
 */
export default [
  ...S.defaultInitialValueTemplateItems().filter(
    (i) => i.spec.templateId === 'post',
  ),
];

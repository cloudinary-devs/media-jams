import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import sanityClient from 'part:@sanity/base/client';
import { workflowListItems } from './workflow';
import { creatorListItems } from './creator';

const client = sanityClient.withConfig({ apiVersion: '2019-05-28' });
const HIDDEN_TYPES = [
  // NOTE: comment this to debug
  'workflow.metadata',
];

const hiddenDocTypes = (listItem) => !HIDDEN_TYPES.includes(listItem.getId());

const docTypeListItems = S.documentTypeListItems().filter(hiddenDocTypes);

// A groq query to find all access groups the current user is a member of. This
// includes both built in groups like 'administrator' and any custom groups you
// may have created as part of SSO etc.
const groupQuery = '* [_type == "system.group" && $identity in members] {_id}';

/**
 * Structure Builder By Role
 * Query system groups that logged in user is a part of
 * Append desk items for each group the user a part of
 * @property {string[]} Groups - Moderator, Creator
 */
export default () =>
  client
    .fetch(groupQuery)

    // Convenience: Get the last portion of the group documents '_id' property,
    // since we'd like to just work with the string 'editors' instead of
    // '_.groups.editors'
    .then((docs) => docs.map((doc) => doc._id.split('.').pop()))
    .then((groupNames) => {
      // groupNames now reflect the groups the current user is a member of

      // Build up an array of items depending on group membership. You may of
      // course do this completely different. This is just an example.
      const deskItems = [];
      if (groupNames.includes('moderator')) {
        // Add the items that administrators should see
        deskItems.push(...workflowListItems, S.divider(), ...docTypeListItems);
      }
      if (groupNames.includes('creator')) {
        // Add the doctypes that a creators should see to
        deskItems.push(...creatorListItems);
      }
      return S.list().title('Content').items(deskItems);
    })
    .catch(() => {
      // In case of any errors fetching the groups, just return some standard
      // structure. This will only happen if the query cannot be performed for
      // some reason.
      return S.list().title('Standard structure').items([]);
    });

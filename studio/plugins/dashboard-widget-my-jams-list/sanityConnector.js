import { of as observableOf } from 'rxjs';
import { switchMap, delay, tap, mergeMap } from 'rxjs/operators';
import { uniqBy } from 'lodash';
import sanityClient from 'part:@sanity/base/client';
import userStore from 'part:@sanity/base/user';
import { getCurrentUser$ } from '../../app/lib/user';
import { console } from 'get-it/lib/util/global';

const client = sanityClient.withConfig({ apiVersion: '2019-05-28' });
const draftId = (nonDraftDoc) => `drafts.${nonDraftDoc._id}`;

const prepareDocumentList = async (incoming) => {
  if (!incoming) {
    return Promise.resolve([]);
  }
  const documents = Array.isArray(incoming) ? incoming : [incoming];

  // filter out drafts
  const ids = documents
    .filter((doc) => !doc._id.startsWith('drafts.'))
    .map(draftId);

  // find all doc items and if it has a draft version
  return sanityClient
    .fetch('*[_id in $ids]', {
      ids,
    })
    .then((drafts) => {
      const outgoing = documents.map((doc) => {
        const foundDraft = drafts.find((draft) => draft._id === draftId(doc));
        return foundDraft || doc;
      });
      return uniqBy(outgoing, '_id');
    })
    .catch((error) => {
      throw new Error(`Problems fetching docs ${ids}. Error: ${error.message}`);
    });
};

const getSubscription = (query, params) =>
  sanityClient
    .listen(query, params, {
      events: ['welcome', 'mutation'],
      includeResult: false,
      visibility: 'query',
    })
    .pipe(
      switchMap((event) => {
        return observableOf(1).pipe(
          event.type === 'welcome' ? tap() : delay(1000),
          mergeMap(() =>
            sanityClient
              .fetch(query, params)
              .then((incoming) => {
                return prepareDocumentList(incoming);
              })
              .catch((error) => {
                if (error.message.startsWith('Problems fetching docs')) {
                  throw error;
                }
                throw new Error(
                  `Query failed ${query} and ${JSON.stringify(
                    params,
                  )}. Error: ${error.message}`,
                );
              }),
          ),
        );
      }),
    );

module.exports = {
  getSubscription,
};

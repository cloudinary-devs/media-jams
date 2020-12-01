import S from '@sanity/desk-tool/structure-builder';
import { filter, map, switchMap } from 'rxjs/operators';
import { getDocumentMutations$ } from '../lib/document';
import { getDocumentQuery$ } from '../lib/document';
import { getCurrentUser$ } from '../lib/user';

const WORKFLOW_DOCUMENTS_FILTER = `_type == $type && $state == state`;
const WORKFLOW_DOCUMENTS_QUERY = `
  * [_type == $type && $state == state] {
    ...coalesce(
      *[_id == "drafts." + ^.documentId]{_id,_type}[0],
      *[_id == ^.documentId]{_id,_type}[0]
    )
  }  
`;

export const workflowListItems = [
  S.listItem()
    .title('In Review')
    .id('me')
    .child(() => {
      return getCurrentUser$().pipe(
        filter(Boolean),
        switchMap((user) => {
          return getDocumentMutations$(WORKFLOW_DOCUMENTS_FILTER, {
            type: 'workflow.metadata',
            state: 'inReview',
          }).pipe(
            switchMap(() => {
              return getDocumentQuery$(WORKFLOW_DOCUMENTS_QUERY, {
                type: 'workflow.metadata',
                state: 'inReview',
              });
            }),
          );
        }),
        map((docs) => {
          return S.list()
            .title(docs.length ? 'Needs Review' : 'All Clear')
            .id('me')
            .items(
              docs.map((item) =>
                S.documentListItem().id(item._id).schemaType(item._type),
              ),
            );
        }),
      );
    }),
];

import S from '@sanity/desk-tool/structure-builder';
import { filter, map, switchMap } from 'rxjs/operators';
import { getDocumentMutations$ } from '../lib/document';
import { getDocumentQuery$ } from '../lib/document';
import { getCurrentUser$ } from '../lib/user';
import { MdThumbUp, MdSync, MdRateReview } from 'react-icons/md';

const WORKFLOW_DOCUMENTS_FILTER = `_type == $type && $state == state`;
const WORKFLOW_DOCUMENTS_QUERY = `
  * [_type == $type && $state == state] {
    ...coalesce(
      *[_id == "drafts." + ^.documentId]{_id,_type}[0],
      *[_id == ^.documentId]{_id,_type}[0]
    )
  }  
`;

const workFlowDirectories = [
  {
    title: 'In Review',
    id: 'in-review',
    subTitle: 'Needs Review',
    icon: MdRateReview,
    state: 'inReview',
  },
  {
    title: 'Changes Requested',
    id: 'in-change',
    subTitle: 'Pending Author Changes',
    icon: MdSync,
    state: 'changesRequested',
  },
  {
    title: 'Approved',
    id: 'approved',
    subTitle: 'Approved, ready to publish',
    icon: MdThumbUp,
    state: 'approved',
  },
];

export const workflowListItems = [
  ...workFlowDirectories.map(({ title, id, subTitle, state, icon }) =>
    S.listItem()
      .title(title)
      .id(id)
      .icon(icon)
      .child(() => {
        return getCurrentUser$().pipe(
          filter(Boolean),
          switchMap((user) => {
            return getDocumentMutations$(WORKFLOW_DOCUMENTS_FILTER, {
              type: 'workflow.metadata',
              state: state,
            }).pipe(
              switchMap(() => {
                return getDocumentQuery$(WORKFLOW_DOCUMENTS_QUERY, {
                  type: 'workflow.metadata',
                  state: state,
                });
              }),
            );
          }),
          map((docs) => {
            // docs returns Array with a single empty object from `...coalesce`
            // validate that the first element has `_id` value
            if (!docs[0]?._id) {
              return S.list().title(`${subTitle} (All Clear)`).items();
            }

            return S.list()
              .title(subTitle)
              .id(id)
              .items(
                docs.map((item) =>
                  S.documentListItem().id(item._id).schemaType(item._type),
                ),
              );
          }),
        );
      }),
  ),
];

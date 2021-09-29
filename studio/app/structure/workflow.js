import S from '@sanity/desk-tool/structure-builder';
import { getPublishedId } from 'part:@sanity/base/util/draft-utils';
import { filter, map, switchMap } from 'rxjs/operators';
import { getDocumentMutations$ } from '../lib/document';
import { getDocumentQuery$ } from '../lib/document';
import { getCurrentUser$ } from '../lib/user';
import { MdThumbUp, MdSync, MdRateReview, MdUpdate } from 'react-icons/md';
import { GoPencil, GoPerson, GoEye, GoTextSize } from 'react-icons/go';
import LiveEditPreview from '../components/liveEditPreview';

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
    title: 'Initial Review',
    id: 'in-review',
    subTitle: 'New Jam for review',
    icon: MdRateReview,
    state: 'inReview',
  },
  {
    title: 'Updated Review',
    id: 'updated-review',
    subTitle: 'Published Jam, updates to be reviewed',
    icon: MdUpdate,
    state: 'updatedReview',
  },
  {
    title: 'Changes Requested',
    id: 'in-change',
    subTitle: 'Awaiting Changes By Author',
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
                docs
                  .filter((d) => d._id)
                  .map((item) => {
                    return S.documentListItem()
                      .id(item._id)
                      .schemaType(item._type)
                      .child((documentId) =>
                        S.document()
                          .documentId(getPublishedId(documentId))
                          .schemaType('post')
                          .views([
                            S.view.form().icon(GoTextSize).title('Editor'),
                            S.view
                              .component(LiveEditPreview)
                              .icon(GoEye)
                              .title('Live Preview'),
                          ]),
                      );
                  }),
              );
          }),
        );
      }),
  ),
];

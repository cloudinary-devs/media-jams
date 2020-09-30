import S from '@sanity/desk-tool/structure-builder';
import Pencil from 'react-icons/lib/ti/pencil';
import User from 'react-icons/lib/ti/user-outline';
import { filter, map, switchMap } from 'rxjs/operators';
import { getDocumentMutations$ } from '../lib/document';
import { getDocumentQuery$ } from '../lib/document';
import { getCurrentUser$ } from '../lib/user';

const CREATOR_DOCUMENTS_QUERY = `
* [_type == $type  && author._ref == $userId ] 
`;

const CREATOR_AUTHOR_QUERY = `
 *[_type == $type && _id == $userId]
`;

export const creatorListItems = [
  // Show only posts authored by current_user
  S.listItem()
    .title('My Jams')
    .icon(Pencil)
    .child(() => {
      return getCurrentUser$().pipe(
        switchMap(({ id }) => {
          return getDocumentQuery$(CREATOR_DOCUMENTS_QUERY, {
            type: 'post',
            userId: `${id}.self`,
          });
        }),
        map((docs) => {
          return S.list()
            .title('Posts')
            .items(
              docs.map((item) =>
                S.documentListItem().id(item._id).schemaType(item._type),
              ),
            );
        }),
      );
    }),
  S.listItem()
    .title('Author Profile')
    .icon(User)
    .child(() => {
      return getCurrentUser$().pipe(
        map(({ id }) => {
          return S.editor().schemaType('author').documentId(`${id}.self`);
        }),
      );
    }),
];

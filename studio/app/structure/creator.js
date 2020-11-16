import S from '@sanity/desk-tool/structure-builder';
import { GoPencil, GoPerson, GoEye, GoTextSize } from 'react-icons/go';
import userStore from 'part:@sanity/base/user';
import client from 'part:@sanity/base/client';
import { map } from 'rxjs/operators';
import IframePreview from '../components/iframePreview';
import { getCurrentUser$ } from '../lib/user';

const AUTHOR_QUERY = '_type == $type && author._ref == $authorId';

export const creatorListItems = [
  // Show only posts authored by current_user
  S.listItem({
    id: 'posts-by-author',
    title: 'My Jams',
    icon: GoPencil,
    schemaType: 'post',
    child: async () => {
      // Check for author profile, else create it
      const { id } = await userStore.getUser('me');
      const self = `${id}.self`;
      await client.createIfNotExists({
        _id: self,
        _type: 'author',
      });
      return S.documentTypeList('post')
        .title('Jams')
        .filter(AUTHOR_QUERY)
        .params({ type: 'post', authorId: self })
        .child((documentId) =>
          S.document()
            .documentId(documentId)
            .schemaType('post')
            .views([
              S.view.form().icon(GoTextSize).title('Editor'),
              S.view.component(IframePreview).icon(GoEye).title('Web Preview'),
            ]),
        );
    },
  }),
  S.listItem()
    .title('Author Profile')
    .icon(GoPerson)
    .child(() => {
      return getCurrentUser$().pipe(
        map(({ id }) => {
          return S.editor().schemaType('author').documentId(`${id}.self`);
        }),
      );
    }),
];

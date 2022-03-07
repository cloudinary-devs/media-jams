import S from '@sanity/desk-tool/structure-builder';
import { getPublishedId } from 'part:@sanity/base/util/draft-utils';
import { GoEye, GoTextSize, GoFileMedia, GoMegaphone } from 'react-icons/go';

import {
  resolveProductionUrl,
  resolveMediaPreviewUrl,
  resolveMediaSneakPeakUrl,
} from '../config/resolveProductionUrl';
import Iframe from '../components/Iframe';

export function jamView(documentId) {
  return S.document()
    .documentId(getPublishedId(documentId))
    .schemaType('post')
    .views([
      S.view.form().icon(GoTextSize).title('Editor'),
      S.view
        .component(Iframe)
        .icon(GoEye)
        .options({
          // Required: Accepts an async function
          url: (doc) => resolveProductionUrl(doc),
          reload: {
            button: true, // default `undefined`
            revision: true, // default `undefined`
          },
        })
        .title('Preview'),
      S.view
        .component(Iframe)
        .icon(GoFileMedia)
        .options({
          // Required: Accepts an async function
          url: (doc) => resolveMediaPreviewUrl(doc),
          reload: {
            button: true, // default `undefined`
            revision: true, // default `undefined`
          },
        })
        .title('Image'),
      S.view
        .component(Iframe)
        .icon(GoMegaphone)
        .options({
          // Required: Accepts an async function
          url: (doc) => resolveMediaSneakPeakUrl(doc),
          reload: {
            button: true, // default `undefined`
            revision: true, // default `undefined`
          },
        })
        .title('Sneak Peak'),
    ]);
}

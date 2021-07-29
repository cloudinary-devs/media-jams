import {
  ELEMENT_H1,
  ELEMENT_PARAGRAPH,
  withPlaceholders,
  withProps,
} from '@udecode/plate';

export const withStyledPlaceHolders = (components) =>
  withPlaceholders(components, [
    {
      key: ELEMENT_PARAGRAPH,
      placeholder: 'Type a paragraph',
      hideOnBlur: true,
    },
    {
      key: ELEMENT_H1,
      placeholder: 'Untitled',
      hideOnBlur: false,
    },
  ]);

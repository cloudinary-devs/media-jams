import { Heading } from '@chakra-ui/react';
import {
  ELEMENT_H1,
  ELEMENT_PARAGRAPH,
  withPlaceholders,
  withProps,
} from '@udecode/slate-plugins';

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

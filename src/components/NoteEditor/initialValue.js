import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_PARAGRAPH,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
} from '@udecode/slate-plugins';

// Quick helper to create a block element with (marked) text
const createElement = (text = '', { type = ELEMENT_PARAGRAPH, mark } = {}) => {
  const leaf = { text };

  if (mark) {
    leaf[mark] = true;
  }

  return {
    type,
    children: [leaf],
  };
};

const initialValue = [
  createElement('🧱 Elements', { type: ELEMENT_H1 }),
  createElement('🔥 Basic Elements', { type: ELEMENT_H2 }),
  createElement('These are the most common elements, known as blocks:'),
  createElement('Heading 1', { type: ELEMENT_H1 }),
  createElement('Heading 2', { type: ELEMENT_H2 }),
  createElement('Heading 3', { type: ELEMENT_H3 }),
  createElement('Heading 4', { type: ELEMENT_H4 }),
  createElement('Heading 5', { type: ELEMENT_H5 }),
  createElement('Heading 6', { type: ELEMENT_H6 }),
  createElement('Blockquote', { type: ELEMENT_BLOCKQUOTE }),
  {
    type: ELEMENT_CODE_BLOCK,
    children: [
      {
        type: ELEMENT_CODE_LINE,
        children: [
          {
            text: "const a = 'Hello';",
          },
        ],
      },
      {
        type: ELEMENT_CODE_LINE,
        children: [
          {
            text: "const b = 'World';",
          },
        ],
      },
    ],
  },
  createElement('💅 Marks', { type: ELEMENT_H1 }),
  createElement('💧 Basic Marks', { type: ELEMENT_H2 }),
  createElement(
    'The basic marks consist of text formatting such as bold, italic, underline, strikethrough, subscript, superscript, and code.',
  ),
  createElement(
    'You can customize the type, the component and the hotkey for each of these.',
  ),
  createElement('This text is bold.', { mark: MARK_BOLD }),
  createElement('This text is italic.', { mark: MARK_ITALIC }),
  createElement('This text is underlined.', {
    mark: MARK_UNDERLINE,
  }),
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text: 'This text is bold, italic and underlined.',
        [MARK_BOLD]: true,
        [MARK_ITALIC]: true,
        [MARK_UNDERLINE]: true,
      },
    ],
  },
  createElement('This is a strikethrough text.', {
    mark: MARK_STRIKETHROUGH,
  }),
  createElement('This is an inline code.', { mark: MARK_CODE }),
];

export default initialValue;

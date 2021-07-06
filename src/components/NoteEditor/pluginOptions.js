import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_PARAGRAPH,
  ELEMENT_TD,
  ELEMENT_TODO_LI,
  ELEMENT_IMAGE,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  createSlatePluginsOptions,
  KEYS_HEADING,
} from '@udecode/slate-plugins';

export const options = createSlatePluginsOptions();

const resetBlockTypesCommonRule = {
  types: [options[ELEMENT_BLOCKQUOTE].type, options[ELEMENT_TODO_LI].type],
  defaultType: options[ELEMENT_PARAGRAPH].type,
};

export const optionsResetBlockTypePlugin = {
  rules: [
    {
      ...resetBlockTypesCommonRule,
      hotkey: 'Enter',
      predicate: isBlockAboveEmpty,
    },
    {
      ...resetBlockTypesCommonRule,
      hotkey: 'Backspace',
      predicate: isSelectionAtBlockStart,
    },
  ],
};

export const optionsSoftBreakPlugin = {
  rules: [
    { hotkey: 'shift+enter' },
    {
      hotkey: 'enter',
      query: {
        allow: [
          options[ELEMENT_CODE_BLOCK].type,
          options[ELEMENT_BLOCKQUOTE].type,
          options[ELEMENT_TD].type,
        ],
      },
    },
  ],
};

export const optionsExitBreakPlugin = {
  rules: [
    {
      hotkey: 'mod+enter',
    },
    {
      hotkey: 'mod+shift+enter',
      before: true,
    },
    {
      hotkey: 'enter',
      query: {
        start: true,
        end: true,
        allow: KEYS_HEADING,
      },
    },
    {
      hotkey: 'enter',
      query: {
        allow: [options[ELEMENT_IMAGE].type],
      },
    },
    {
      hotkey: 'enter',
      before: true,
      query: {
        start: true,
        allow: [options[ELEMENT_PARAGRAPH].type],
      },
    },
  ],
};

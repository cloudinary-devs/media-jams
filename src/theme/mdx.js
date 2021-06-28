const mdx = {
  h1: {
    mt: '2rem',
    mb: '.25rem',
    lineHeight: 1.2,
    fontWeight: 'bold',
    fontSize: '1.875rem',
    letterSpacing: '-.025em',
    '& + p': {
      mt: '0.50rem',
    },
  },
  h2: {
    mt: '4rem',
    mb: '0.5rem',
    lineHeight: 1.3,
    fontWeight: 'semibold',
    fontSize: '1.5rem',
    letterSpacing: '-.025em',
    '& + h3': {
      mt: '1.5rem',
    },
    '& + p': {
      mt: '0.50rem',
    },
  },
  h3: {
    mt: '3rem',
    // mb: "0.5rem",
    lineHeight: 1.25,
    fontWeight: 'semibold',
    fontSize: '1.25rem',
    letterSpacing: '-.025em',
    '& + p': {
      mt: '0.50rem',
    },
  },
  h4: {
    mt: '3rem',
    lineHeight: 1.375,
    fontWeight: 'semibold',
    fontSize: '1.125rem',
    '& + p': {
      mt: '0.50rem',
    },
  },
  a: {
    color: 'link',
    transition: 'color 0.15s',
    transitionTimingFunction: 'ease-out',
    _hover: {
      color: 'teal.600',
    },
  },
  p: {
    mt: '1.25rem',
    lineHeight: 1.7,
    'blockquote &': {
      mt: 0,
    },
    '& + p': {
      mt: '0.75rem',
    },
  },
  hr: {
    my: '4rem',
  },
  blockquote: {
    bg: 'orange.100',
    borderWidth: '1px',
    borderColor: 'orange.200',
    rounded: 'lg',
    px: '1.25rem',
    py: '1rem',
    my: '1.5rem',
  },
  ul: {
    mt: '1.5rem',
    ml: '1.25rem',
    'blockquote &': { mt: 0 },
    '& > * + *': {
      mt: '0.25rem',
    },
  },
  code: {
    rounded: 'sm',
    backgroundColor: '#EFE3F9',
    borderRadius: '0.25rem',
    px: '1',
    fontSize: '0.875em',
    py: '2px',
    whiteSpace: 'nowrap',
    lineHeight: 'normal',
  },
};

export default mdx;

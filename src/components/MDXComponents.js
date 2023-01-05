import {
  Alert,
  Box,
  chakra,
  Grid,
  Flex,
  HTMLChakraProps,
  Kbd,
  useColorModeValue,
  useTheme,
  Stack,
  Heading,
  Text,
  Image as ChakraImage,
} from '@chakra-ui/react';
import React from 'react';
import { constructCloudinaryUrl } from 'next-cloudinary';
import CodeBlock from './CodeBlock/index';
import CodeSandbox from './CodeSandbox';
import EmbeddedIframe from './EmbeddedIframe';
import { ColorPalette, ColorPalettes, ColorWrapper } from './ColorPalette';

const Pre = (props) => <chakra.div my="2em" borderRadius="sm" {...props} />;

const Table = (props) => (
  <chakra.div overflowX="auto">
    <chakra.table textAlign="left" mt="32px" width="full" {...props} />
  </chakra.div>
);

const THead = (props) => (
  <chakra.th
    bg={useColorModeValue('gray.50', 'whiteAlpha.100')}
    fontWeight="semibold"
    p={2}
    fontSize="sm"
    {...props}
  />
);

const TData = (props) => (
  <chakra.td
    p={2}
    borderTopWidth="1px"
    borderColor="inherit"
    fontSize="sm"
    whiteSpace="normal"
    {...props}
  />
);

const LinkedHeading = (props) => (
  <chakra.h2 data-group="" css={{ scrollMarginBlock: '6.875rem' }} {...props}>
    <span className="content">{props.children}</span>
    {props.id && (
      <chakra.a
        aria-label="anchor"
        color="teal.500"
        fontWeight="normal"
        outline="none"
        _focus={{ opacity: 1, boxShadow: 'outline' }}
        opacity={0}
        _groupHover={{ opacity: 1 }}
        ml="0.375rem"
        href={`#${props.id}`}
      >
        #
      </chakra.a>
    )}
  </chakra.h2>
);

const InlineCode = (props) => (
  <chakra.code
    apply="mdx.code"
    color={useColorModeValue('inlineCode', 'purple.200')}
    {...props}
  />
);

const Image = ({ src, alt, title, ...props }) => {
  const width = 800;
  const height = 600;
  console.log(src);
  const cdlUrl = src.includes('res.cloudinary.com')
    ? src
    : constructCloudinaryUrl({
        options: {
          src,
          deliveryType: 'fetch',
          crop: 'fit',
          width,
          height,
        },
      });
  console.log(cdlUrl);

  return (
    <ChakraImage src={cdlUrl} alt={alt} borderRadius="8px" margin="0 auto" />
  );
};

const MDXComponents = {
  h1: (props) => <chakra.h1 apply="mdx.h1" {...props} />,
  h2: (props) => <LinkedHeading apply="mdx.h2" {...props} />,
  h3: (props) => <LinkedHeading as="h3" apply="mdx.h3" {...props} />,
  h4: (props) => <LinkedHeading as="h4" apply="mdx.h4" {...props} />,
  hr: (props) => <chakra.hr apply="mdx.hr" {...props} />,
  strong: (props) => <Box as="strong" fontWeight="semibold" {...props} />,
  inlineCode: InlineCode,
  code: CodeBlock,
  pre: Pre,
  kbd: Kbd,
  br: ({ reset, ...props }) => (
    <Box
      as={reset ? 'br' : undefined}
      height={reset ? undefined : '24px'}
      {...props}
    />
  ),
  table: Table,
  th: THead,
  td: TData,
  a: (props) => {
    let rel = 'noopener';

    if (!props.href.includes('cloudinary.com')) {
      rel = `${rel} noreferrer`;
    }

    return <chakra.a apply="mdx.a" rel={rel} target="_blank" {...props} />;
  },
  img: Image,
  p: (props) => <chakra.p apply="mdx.p" {...props} />,
  ul: (props) => <chakra.ul apply="mdx.ul" {...props} />,
  ol: (props) => <chakra.ol apply="mdx.ul" {...props} />,
  li: (props) => <chakra.li pb="4px" {...props} />,
  blockquote: (props) => (
    <Alert
      mt="4"
      role="none"
      status="info"
      variant="left-accent"
      as="blockquote"
      rounded="4px"
      my="1.5rem"
      {...props}
    />
  ),
  CodeSandbox: CodeSandbox,
  iframe: EmbeddedIframe,
  useTheme,
  ColorPalette,
  ColorPalettes,
  ColorWrapper,
  Box,
  Grid,
  Flex,
  Stack,
  Heading,
  Text,
};

export default MDXComponents;

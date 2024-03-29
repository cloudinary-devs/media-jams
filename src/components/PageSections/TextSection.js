import React from 'react';
import { Flex, Input, Box, useDisclosure, Heading } from '@chakra-ui/react';
import BlockContent from '@sanity/block-content-to-react';

function TextSection({ heading, label, textRaw }) {
  return (
    <Box alignSelf="start">
      <section>
        <Heading as="h2" my={{ base: 2, md: 8 }}>
          {heading}
        </Heading>
        <Heading my={{ base: 1, md: 4 }} textColor="gray.400" as="h5" size="sm">
          {label}
        </Heading>
        {textRaw && (
          <Box ml={{ base: 2, md: 4 }}>
            <BlockContent blocks={textRaw} />
          </Box>
        )}
      </section>
    </Box>
  );
}

export default TextSection;

import { Box, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';

export const LinkGroup = ({ data }) => {
  const { links, title } = data;
  const anchorLink = React.useRef(null);

  return (
    <Box marginBottom={8}>
      <HStack
        as="ul"
        spacing={{ base: 12 }}
        listStyleType="none"
        justifyContent="center"
      >
        {links.map((link, idx) => (
          <Box as="li" key={idx}>
            <NextLink href={link.href} passHref>
              <Box
                ref={anchorLink}
                color="grey.700"
                _hover={{ textDecoration: 'underline' }}
              >
                <Text fontSize="xs">{link.label}</Text>
                {link.badge && (
                  <Box as="span" ms="2">
                    {link.badge}
                  </Box>
                )}
              </Box>
            </NextLink>
          </Box>
        ))}
      </HStack>
    </Box>
  );
};

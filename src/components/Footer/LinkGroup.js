import { Box, HStack, Text } from '@chakra-ui/react';
import { useMixPanel } from '@lib/mixpanel';
import React from 'react';
import NextLink from 'next/link';

export const LinkGroup = ({ data }) => {
  const { links, title } = data;
  const mixpanel = useMixPanel();

  return (
    <Box marginBottom={8}>
      <HStack
        as="ul"
        spacing={{ base: 12 }}
        listStyleType="none"
        justifyContent="center"
      >
        {links.map((link, idx) => (
          <Box as="li" key={link.href}>
            <NextLink href={`/${link.href}`} passHref>
              <Box
                as="a"
                color="grey.700"
                onClick={() => mixpanel.link(link.href)}
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

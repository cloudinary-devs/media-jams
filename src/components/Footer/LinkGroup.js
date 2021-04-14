import { Box, Stack, Text } from '@chakra-ui/react';
import { useMixPanel } from '@lib/mixpanel';
import React from 'react';
import NextLink from 'next/link';

export const LinkGroup = ({ data }) => {
  const { links, title } = data;
  const anchorLink = React.useRef(null);
  const mixpanel = useMixPanel();

  const handleOnClick = (e) => {
    mixpanel.link(anchorLink.current);
  };

  return (
    <Box>
      <Text
        textTransform="uppercase"
        mb={{ base: '6', md: '10' }}
        fontWeight="bold"
        letterSpacing="wide"
        textColor="white"
      >
        {title}
      </Text>
      <Stack as="ul" spacing={{ base: 2, md: 4 }} listStyleType="none">
        {links.map((link, idx) => (
          <Box as="li" key={idx}>
            <NextLink href={link.href} passHref>
              <Box
                as="a"
                ref={anchorLink}
                onClick={handleOnClick}
                color="yellow.200"
                _hover={{ textDecoration: 'underline' }}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <Box as="span" ms="2">
                    {link.badge}
                  </Box>
                )}
              </Box>
            </NextLink>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

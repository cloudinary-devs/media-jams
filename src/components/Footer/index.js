import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { routes as queryRoutes } from '@lib/queries/routes';
import { SocialLink } from './SocialLink';
import { links, socialLinks } from './_data';
import { LinkGroup } from './LinkGroup';
import { SubscribeForm } from './SubscribeForm';

function Footer() {
  const { data } = useQuery('routes', queryRoutes.get);
  const [sanityGroup, updateSanityGroup] = React.useState({
    title: 'Resources',
    links: [],
  });
  React.useEffect(() => {
    if (data?.routes) {
      const sanityLinks = data?.routes?.map(({ page, slug }) => ({
        label: page.title,
        href: slug.current,
      }));
      updateSanityGroup({ ...sanityGroup, links: sanityLinks });
    }
  }, [data]);

  return (
    <Box as="footer">
      <Box>
        <Flex
          direction="column"
          justify="space-between"
          mb={{ base: '2', md: '6' }}
          align="center"
          alignSelf="flex-end"
          id="top"
        >
          <Text variant="B300" casing="uppercase">
            Subscribe to get more jams
          </Text>
          <SubscribeForm />
        </Flex>

        <HStack
          justifyContent="center"
          spacing="2"
          mb={{ base: '0', md: '6' }}
          as="ul"
          listStyleType="none"
        >
          {socialLinks.map((link, idx) => (
            <Box as="li" key={idx}>
              <SocialLink href={link.href}>
                <Box srOnly>{link.label}</Box>
                {link.icon}
              </SocialLink>
            </Box>
          ))}
        </HStack>
        <LinkGroup data={sanityGroup} />
      </Box>
    </Box>
  );
}

export default Footer;

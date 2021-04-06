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
import Image from '@components/Image';
import { SubscribeForm } from './SubscribeForm';

const Footer = () => {
  const { data } = useQuery('routes', queryRoutes.get);
  const [sanityGroup, updateSanityGroup] = React.useState({
    title: 'Resources',
    links: [],
  });
  React.useEffect(() => {
    if (data?.data?.routes) {
      const sanityLinks = data?.data?.routes?.map(({ page, slug }) => ({
        label: page.title,
        href: slug.current,
      }));
      updateSanityGroup({ ...sanityGroup, links: sanityLinks });
    }
  }, [data]);

  return (
    <Box as="footer" bg={mode('gray.900', 'gray.200')}>
      <Box
        maxW={{ base: 'xl', md: '7xl' }}
        mx="auto"
        px={{ base: '6', md: '8' }}
        py={{ base: '12', md: '20' }}
      >
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          justify="space-between"
          mb={{ base: '10', lg: '16' }}
          align="flex-start"
          id="top"
        >
          <SimpleGrid
            flex="1"
            w={{ base: 'full', lg: 'auto' }}
            maxW={{ lg: '2xl' }}
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={{ base: '12', md: '10' }}
            fontSize="sm"
            marginEnd={{ md: '4', lg: '16' }}
          >
            <LinkGroup data={sanityGroup} />
            {links.map((group, idx) => (
              <LinkGroup key={idx} data={group} />
            ))}
          </SimpleGrid>
          <Box
            flex="2"
            maxW={{ lg: '420px' }}
            ml={{ lg: 'auto' }}
            fontSize="sm"
            mt={{ base: '12', lg: 0 }}
          >
            <Text
              casing="uppercase"
              mb={{ base: 6, lg: 10 }}
              fontWeight="bold"
              letterSpacing="wide"
              textColor="white"
            >
              Keep Jammin'!
            </Text>
            <Text lineHeight="tall" textColor="white">
              There’s always something new happening in the world of media. Our
              Media Developer Experts are always pushing new horizons. If you
              want to stay up to date, get weekly updates in your inbox.
            </Text>
            <SubscribeForm />
          </Box>
        </Flex>

        <Flex
          direction={{ base: 'column-reverse', lg: 'row' }}
          align={{ base: 'flex-start', lg: 'center' }}
          justify="space-between"
          fontSize="sm"
        >
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: '4', md: '12' }}
            mt={{ base: '8', lg: 0 }}
            w={{ base: 'full', lg: 'auto' }}
            justify={{ base: 'space-between', lg: 'flex-start' }}
            align={{ base: 'flex-start', md: 'center' }}
          >
            <Image
              cloudName="mediadevs"
              publicId="mediajams/logo"
              height={60}
              width={120}
              alt="MediaJams logo"
            />
            <HStack spacing="2" mt={{ lg: '8' }} as="ul" listStyleType="none">
              {socialLinks.map((link, idx) => (
                <Box as="li" key={idx}>
                  <SocialLink href={link.href}>
                    <Box srOnly>{link.label}</Box>
                    {link.icon}
                  </SocialLink>
                </Box>
              ))}
            </HStack>
          </Stack>
          <Box>
            <Text>&copy; {new Date().getFullYear()} MediaJams</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;
